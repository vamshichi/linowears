import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { removeFromCart } from "@/lib/cart"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { itemId } = body

    if (!itemId) {
      return NextResponse.json({ success: false, error: "Missing item ID" }, { status: 400 })
    }

    await removeFromCart(itemId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Remove from cart error:", error)
    return NextResponse.json({ success: false, error: "Failed to remove from cart" }, { status: 500 })
  }
}
