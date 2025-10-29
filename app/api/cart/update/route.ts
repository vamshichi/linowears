import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { updateCartItem } from "@/lib/cart"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { itemId, quantity } = body

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    await updateCartItem(itemId, quantity)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Update cart error:", error)
    return NextResponse.json({ success: false, error: "Failed to update cart" }, { status: 500 })
  }
}
