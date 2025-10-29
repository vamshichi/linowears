import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      where: { isDeleted: false },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(collections)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 })
  }
}
