import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const [variants, products] = await Promise.all([
      prisma.productVariant.findMany({
        where: {
          stock: { gt: 0 },
          isDeleted: false,
        },
        select: {
          size: true,
          color: true,
        },
        distinct: ["size", "color"],
      }),
      prisma.product.findMany({
        where: {
          isDeleted: false,
          inStock: true,
        },
        select: {
          fabric: true,
        },
        distinct: ["fabric"],
      }),
    ])

    const sizes = [...new Set(variants.map((v) => v.size))].sort()
    const colors = [...new Set(variants.map((v) => v.color))].sort()
    const fabrics = [...new Set(products.map((p) => p.fabric))].sort()

    return NextResponse.json({
      success: true,
      filters: {
        sizes,
        colors,
        fabrics,
      },
    })
  } catch (error) {
    console.error(" Error fetching filters:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch filters" }, { status: 500 })
  }
}
