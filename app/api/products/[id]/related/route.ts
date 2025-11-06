import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ unwrap once

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { categoryId: true, tags: true },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: id },
        isDeleted: false,
        OR: [
          { categoryId: product.categoryId },
          ...(product.tags?.length ? [{ tags: { hasSome: product.tags } }] : []),
        ],
      },
      include: {
        reviews: { select: { rating: true } },
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    })

    const productsWithRating = relatedProducts.map((p) => {
      const reviews = p.reviews ?? []
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
            reviews.length
          : 0

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        comparePrice: p.comparePrice ?? null,
        images: p.images,
        averageRating: Number(avgRating.toFixed(1)),
        reviewCount: reviews.length,
      }
    })

    return NextResponse.json(productsWithRating)
  } catch (error) {
    console.error("[GET /api/products/[id]/related] Error:", error)
    return NextResponse.json({ error: "Failed to fetch related products" }, { status: 500 })
  }
}
