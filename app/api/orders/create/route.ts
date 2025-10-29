import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getOrCreateCart, calculateCartTotal, clearCart } from "@/lib/cart"
import { addLoyaltyPoints } from "@/lib/loyalty"

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `LW${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, phone, addressLine1, addressLine2, city, state, postalCode, notes } = body

    // Get cart items
    const cart = await getOrCreateCart(user.id)

    if (cart.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    const subtotal = calculateCartTotal(cart.items)
    const shipping = subtotal > 999 ? 0 : 99
    const tax = Math.round(subtotal * 0.18)
    const totalAmount = subtotal + shipping + tax

    // Create shipping address string
    const shippingAddress = `${fullName}\n${phone}\n${addressLine1}${addressLine2 ? "\n" + addressLine2 : ""}\n${city}, ${state} ${postalCode}\nIndia`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        totalAmount,
        shippingAddress,
        notes,
        status: "PENDING",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            size: item.size,
            color: item.color,
          })),
        },
        statusHistory: {
          create: {
            status: "PENDING",
            note: "Order placed successfully",
          },
        },
      },
    })

    const pointsEarned = Math.floor(totalAmount / 100) * 10
    await addLoyaltyPoints(user.id, pointsEarned, "purchase", order.id)

    // Clear cart
    await clearCart(user.id)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
