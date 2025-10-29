import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getSession()
    return NextResponse.json({ authenticated: !!user, user })
  } catch (error) {
    return NextResponse.json({ authenticated: false, user: null })
  }
}
