import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.wishlistItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
  }
}
