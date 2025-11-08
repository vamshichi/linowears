import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, chest, waist, shoulder, sleeveLength, shirtLength, neck, notes, isDefault } = body

    const measurement = await prisma.customMeasurement.create({
      data: {
        userId: session.userId,
        name,
        chest,
        waist,
        shoulder,
        sleeveLength,
        shirtLength,
        neck,
        notes: notes || null,
        isDefault: isDefault || false,
      },
    })

    return NextResponse.json({ success: true, measurement })
  } catch (error) {
    console.error(" Create measurement error:", error)
    return NextResponse.json({ success: false, error: "Failed to create measurement" }, { status: 500 })
  }
}
