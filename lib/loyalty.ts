import prisma from "@/lib/prisma"

// ✅ Get all loyalty point transactions for a user
export async function getLoyaltyPoints(userId: string) {
  const transactions = await prisma.loyaltyPoint.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })

  const totalPoints = transactions.reduce(
    (sum: number, t) => sum + t.points,
    0
  )

  return { transactions, totalPoints }
}

// ✅ Add new loyalty points transaction
export async function addLoyaltyPoints(
  userId: string,
  points: number,
  reason: string,
  orderId?: string
) {
  const transaction = await prisma.loyaltyPoint.create({
    data: {
      userId,
      points,
      reason,
      orderId: orderId || null,
    },
  })

  // Optional: compute total points again (if you need to show live totals)
  const { totalPoints } = await getLoyaltyPoints(userId)

  return { transaction, totalPoints }
}

// ✅ Create a referral entry
export async function createReferral(referrerId: string, refereeEmail: string) {
  const referral = await prisma.referral.create({
    data: {
      referrerId,
      refereeEmail: refereeEmail.toLowerCase(),
      status: "pending",
      reward: 500, // using 'reward' field from your schema
    },
  })

  return referral
}

// ✅ Mark referral completed and reward both users
export async function completeReferral(referralId: string, refereeId: string) {
  const referral = await prisma.referral.update({
    where: { id: referralId },
    data: {
      refereeId,
      status: "completed",
    },
  })

  // Reward both users
  await addLoyaltyPoints(referral.referrerId, 500, "Referral bonus")
  await addLoyaltyPoints(refereeId, 500, "Sign-up bonus from referral")

  return referral
}
