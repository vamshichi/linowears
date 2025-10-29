import prisma from "@/lib/prisma"

export async function getLoyaltyPoints(userId: string) {
  const transactions = await prisma.loyaltyTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })

  const totalPoints = transactions.reduce((sum, t) => {
    return t.type === "earned" ? sum + t.points : sum - t.points
  }, 0)

  return { points: transactions, totalPoints }
}

export async function addLoyaltyPoints(userId: string, points: number, description: string, orderId?: string) {
  const transaction = await prisma.loyaltyTransaction.create({
    data: {
      userId,
      points,
      type: "earned",
      description,
      orderId: orderId || null,
    },
  })

  // Update user's total loyalty points
  const { totalPoints } = await getLoyaltyPoints(userId)
  await prisma.user.update({
    where: { id: userId },
    data: { loyaltyPoints: totalPoints },
  })

  return transaction
}

export async function createReferral(referrerId: string, referredEmail: string) {
  const referral = await prisma.referral.create({
    data: {
      referrerId,
      referredEmail: referredEmail.toLowerCase(),
      status: "pending",
      rewardPoints: 500,
    },
  })

  return referral
}

export async function completeReferral(referralId: string, referredUserId: string) {
  const referral = await prisma.referral.update({
    where: { id: referralId },
    data: {
      referredUserId,
      status: "completed",
      completedAt: new Date(),
    },
  })

  // Add points to both referrer and referred user
  await addLoyaltyPoints(referral.referrerId, 500, "Referral bonus", undefined)
  await addLoyaltyPoints(referredUserId, 500, "Sign up bonus from referral", undefined)

  return referral
}
