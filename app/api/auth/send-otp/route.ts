import { type NextRequest, NextResponse } from "next/server"
import { createOTPCode } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone } = body

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    await createOTPCode(email, phone)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Send OTP error:", error)
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 })
  }
}
