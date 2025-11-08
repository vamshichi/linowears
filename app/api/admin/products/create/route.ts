import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const admin = await isAdmin()

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      comparePrice,
      images,
      categoryId,
      brand,
      tags,
      metaTitle,
      metaDescription,
      attributes,
      fabric,
      fabricCare,
      inStock,
      featured,
      variants,
      collectionIds,
    } = body

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        comparePrice,
        images,
        categoryId,
        brand,
        tags,
        metaTitle: metaTitle || name,
        // metaDescription: metaDescription || description,
        attributes: attributes || {},
        fabric,
        fabricCare,
        inStock,
        featured,
        variants: {
          create: variants.map((variant: any) => ({
            size: variant.size,
            color: variant.color,
            sku: variant.sku,
            stock: variant.stock,
          })),
        },
        ...(collectionIds?.length > 0 && {
          collections: {
            connect: collectionIds.map((id: string) => ({ id })),
          },
        }),
      },
      include: {
        variants: true,
        category: true,
        collections: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error(" Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
