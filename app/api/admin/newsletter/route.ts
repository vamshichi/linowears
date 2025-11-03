import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc", // ✅ Correct field name
      },
    })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Failed to fetch subscribers:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    )
  }
}
