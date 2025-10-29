import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ inWishlist: false })
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
      return NextResponse.json({ inWishlist: false })
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          where: { productId },
        },
      },
    })

    return NextResponse.json({ inWishlist: (wishlist?.items.length || 0) > 0 })
  } catch (error) {
    return NextResponse.json({ inWishlist: false })
  }
}
