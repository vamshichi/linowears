import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupon = await prisma.coupon.update({
      where: { id: params.id },
      data: {
        code: data.code,
        discountType: data.discountType,
        // discountValue: data.discountValue,
        minPurchase: data.minPurchase,
        // maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        // isActive: data.isActive,
        validFrom: new Date(data.validFrom),
        // validUntil: data.validUntil ? new Date(data.validUntil) : null,
      },
    })

    return NextResponse.json(coupon)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Soft delete by marking inactive
    await prisma.coupon.update({
      where: { id: params.id },
      data: { active: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete coupon:", error)
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 })
  }
}
