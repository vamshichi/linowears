import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
      include: {
        products: true,
      },
    })

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error("Failed to fetch collection:", error)
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, image, isActive, productIds } = body

    const collection = await prisma.collection.update({
      where: { id: params.id },
      data: {
        title:name,
        slug,
        // description,
        image,
        // isActive,
        products: {
          set: productIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error("Failed to update collection:", error)
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 })
  }
}
