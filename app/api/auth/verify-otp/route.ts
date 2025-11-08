import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, name, phone } = body

    if (!email || !code) {
      return NextResponse.json({ success: false, error: "Email and code are required" }, { status: 400 })
    }

    const result = await verifyOTP(email, code)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    // Update user profile if name/phone provided (for signup)
    if (result.user && (name || phone)) {
      await prisma.user.update({
        where: { id: result.user.id },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
        },
      })
    }

    return NextResponse.json({ success: true, user: result.user })
  } catch (error) {
    console.error(" Verify OTP error:", error)
    return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 })
  }
}
