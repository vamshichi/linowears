import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const collection = await prisma.collection.create({
      data: {
        title: data.title, // ✅ changed from name → title
        slug: data.slug,
        image: data.image,
      },
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 })
  }
}
