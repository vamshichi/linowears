import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)
    
    // if (!session || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const variants = await prisma.productVariant.findMany({
      where: {
        product: {
          isDeleted: false,
        },
      },
      select: {
        id: true,
        size: true,
        color: true,
        stock: true,
        // lowStockThreshold: true,
        product: {
          select: {
            id: true,
            name: true,
            // sku: true,
          },
        },
      },
      orderBy: {
        stock: "asc",
      },
    })

    return NextResponse.json(variants)
  } catch (error) {
    console.error("Failed to fetch inventory:", error)
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    )
  }
}
