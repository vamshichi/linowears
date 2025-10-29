import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { addToCart } from "@/lib/cart"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, size, color, quantity } = body

    if (!productId || !size || !color) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    await addToCart(user.id, productId, size, color, quantity || 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Add to cart error:", error)
    return NextResponse.json({ success: false, error: "Failed to add to cart" }, { status: 500 })
  }
}
