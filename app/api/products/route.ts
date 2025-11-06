import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const categoryId = searchParams.get("categoryId")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sizes = searchParams.get("sizes")?.split(",").filter(Boolean)
    const colors = searchParams.get("colors")?.split(",").filter(Boolean)
    const fabrics = searchParams.get("fabrics")?.split(",").filter(Boolean)
    const sortBy = searchParams.get("sortBy") || "featured"
    const search = searchParams.get("search")

    const where: any = {
      isDeleted: false,
      inStock: true,
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = Number.parseFloat(minPrice)
      if (maxPrice) where.price.lte = Number.parseFloat(maxPrice)
    }

    if (fabrics && fabrics.length > 0) {
      where.fabric = { in: fabrics }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ]
    }

    if ((sizes && sizes.length > 0) || (colors && colors.length > 0)) {
      where.variants = {
        some: {
          AND: [
            sizes && sizes.length > 0 ? { size: { in: sizes } } : {},
            colors && colors.length > 0 ? { color: { in: colors } } : {},
            { stock: { gt: 0 } },
          ],
        },
      }
    }

    let orderBy: any = { createdAt: "desc" }
    if (sortBy === "price-asc") orderBy = { price: "asc" }
    else if (sortBy === "price-desc") orderBy = { price: "desc" }
    else if (sortBy === "featured") orderBy = { featured: "desc" }
    else if (sortBy === "newest") orderBy = { createdAt: "desc" }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        variants: {
          where: { stock: { gt: 0 } },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    })

    const productsWithRatings = products.map((product) => {
      const avgRating =
        product.reviews.length > 0 ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length : 0

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        comparePrice: product.comparePrice,
        images: product.images,
        fabric: product.fabric,
        inStock: product.inStock,
        featured: product.featured,
        tags: product.tags,
        category: product.category,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: product._count.reviews,
        variants: product.variants,
      }
    })

    return NextResponse.json({
      success: true,
      products: productsWithRatings,
      count: productsWithRatings.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
