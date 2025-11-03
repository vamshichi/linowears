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

    const customers = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        // isActive: true,
        createdAt: true,
        _count: {
          select: {
            orders: true,
            addresses: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error("Failed to fetch customers:", error)
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}
