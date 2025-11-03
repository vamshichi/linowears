import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(coupons)
  } catch (error) {
    console.error("Failed to fetch coupons:", error)
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupon = await prisma.coupon.create({
  data: {
    code: data.code,
    discountType: data.discountType,
    discount: data.discountValue,
    minPurchase: data.minPurchase,
    usageLimit: data.usageLimit,
    validFrom: new Date(data.validFrom),
    validUntil: new Date(data.validUntil), // ✅ required
    active: data.isActive ?? true,
  },
})


    return NextResponse.json(coupon)
  } catch (error) {
    console.error("Failed to create coupon:", error)
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}
