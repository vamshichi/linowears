import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(coupons)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minPurchase: data.minPurchase,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        isActive: data.isActive,
        validFrom: new Date(data.validFrom),
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
      },
    })

    return NextResponse.json(coupon)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}
