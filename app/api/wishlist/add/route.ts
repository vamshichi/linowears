import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id },
      })
    }

    const existingItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId,
      },
    })

    if (existingItem) {
      return NextResponse.json({ message: "Already in wishlist" })
    }

    const item = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}
