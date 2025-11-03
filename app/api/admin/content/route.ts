import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [hero, features] = await Promise.all([
      prisma.heroSection.findFirst({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.feature.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
    ])

    return NextResponse.json({ hero, features })
  } catch (error) {
    console.error("[v0] Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
