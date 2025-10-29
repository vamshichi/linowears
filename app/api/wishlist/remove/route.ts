import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE(request: Request) {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
    })

    if (!wishlist) {
      return NextResponse.json({ success: true })
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        wishlistId: wishlist.id,
        productId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
  }
}
