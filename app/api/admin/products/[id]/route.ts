import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin"
import prisma from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
      category,
      fabric,
      fabricCare,
      inStock,
      featured,
      variants,
    } = body

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Delete existing variants
    await prisma.productVariant.deleteMany({
      where: { productId: params.id },
    })

    // Update product with new variants
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        price,
        comparePrice,
        images,
        category,
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
      },
      include: {
        variants: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await isAdmin()

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
