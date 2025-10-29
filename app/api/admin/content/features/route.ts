import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { features } = await request.json()

    // Delete existing features
    await prisma.feature.deleteMany({})

    // Create new features
    const createdFeatures = await Promise.all(
      features.map((feature: any, index: number) =>
        prisma.feature.create({
          data: {
            icon: feature.icon,
            title: feature.title,
            description: feature.description,
            order: index,
            isActive: true,
          },
        }),
      ),
    )

    return NextResponse.json(createdFeatures)
  } catch (error) {
    console.error("[v0] Error updating features:", error)
    return NextResponse.json({ error: "Failed to update features" }, { status: 500 })
  }
}
