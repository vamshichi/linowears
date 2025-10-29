import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Deactivate all existing hero sections
    await prisma.heroSection.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    })

    // Create or update hero section
    const hero = await prisma.heroSection.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
        secondaryCtaText: data.secondaryCtaText || null,
        secondaryCtaLink: data.secondaryCtaLink || null,
        isActive: true,
        order: 0,
      },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error("[v0] Error updating hero section:", error)
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 })
  }
}
