import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createReferral } from "@/lib/loyalty"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { referredEmail } = body

    if (!referredEmail) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    const referral = await createReferral(session.userId, referredEmail)

    return NextResponse.json({ success: true, referral })
  } catch (error) {
    console.error("[v0] Create referral error:", error)
    return NextResponse.json({ success: false, error: "Failed to create referral" }, { status: 500 })
  }
}
