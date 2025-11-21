import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
        isDeleted: false,
      },
      include: {
        children: {
          where: { isDeleted: false },
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // const session = await getSession()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const data = await request.json()
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        // description: data.description,
        // image: data.image,
        // isActive: data.isActive,
        parentId: data.parentId || null,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
