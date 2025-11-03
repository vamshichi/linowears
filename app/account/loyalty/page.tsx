import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getLoyaltyPoints } from "@/lib/loyalty"
import { LoyaltyDashboard } from "@/components/loyalty/loyalty-dashboard"
import prisma from "@/lib/prisma"

export default async function LoyaltyPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const userData = await prisma.user.findUnique({
    where: { id: session.id },
  })

  const { points, totalPoints } = await getLoyaltyPoints(session.id)

  const referrals = await prisma.referral.findMany({
    where: { referrerId: session.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl mb-8 text-foreground">Loyalty & Rewards</h1>
        <LoyaltyDashboard user={userData} totalPoints={totalPoints} points={points} referrals={referrals || []} />
      </div>
    </div>
  )
}
