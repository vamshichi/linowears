import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { code, orderTotal } = await request.json()

    const coupon = await prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        isDeleted: false,
        validFrom: { lte: new Date() },
        OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
      },
    })

    if (!coupon) {
      return NextResponse.json({ error: "Invalid or expired coupon code" }, { status: 400 })
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 })
    }

    if (coupon.minPurchase && orderTotal < coupon.minPurchase) {
      return NextResponse.json({ error: `Minimum purchase of ₹${coupon.minPurchase} required` }, { status: 400 })
    }

    let discount = 0
    if (coupon.discountType === "PERCENTAGE") {
      discount = (orderTotal * coupon.discountValue) / 100
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount)
      }
    } else {
      discount = coupon.discountValue
    }

    return NextResponse.json({
      valid: true,
      discount,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to validate coupon" }, { status: 500 })
  }
}
