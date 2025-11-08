import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch all homepage content
    const [heroSections, features, featuredProducts, siteSettings] = await Promise.all([
      prisma.heroSection.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.feature.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.product.findMany({
        where: { featured: true, inStock: true },
        take: 4,
        orderBy: { createdAt: "desc" },
      }),
      prisma.siteSettings.findMany(),
    ])

    // Convert site settings array to object
    const settings = siteSettings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, string>,
    )

    return NextResponse.json({
      hero: heroSections[0] || null,
      features,
      featuredProducts,
      settings,
    })
  } catch (error) {
    console.error(" Error fetching homepage content:", error)
    return NextResponse.json({ error: "Failed to fetch homepage content" }, { status: 500 })
  }
}
