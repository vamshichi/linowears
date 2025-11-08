import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { sendOTPEmail } from "@/lib/email" // Import email function

export async function generateOTP(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendOTP(email: string, code: string) {
  console.log(` Sending OTP ${code} to ${email}`)

  // Send email using Nodemailer
  const result = await sendOTPEmail(email, code)

  if (!result.success) {
    throw new Error("Failed to send OTP email")
  }

  return true
}

export async function createOTPCode(email: string, phone?: string) {
  const code = await generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  await prisma.oTPCode.create({
    data: {
      code,
      email,
      phone,
      expiresAt,
    },
  })

  await sendOTP(email, code)
  return true
}

export async function verifyOTP(email: string, code: string) {
  const otpRecord = await prisma.oTPCode.findFirst({
    where: {
      email,
      code,
      verified: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  })

  if (!otpRecord) {
    return { success: false, error: "Invalid or expired OTP" }
  }

  // Mark OTP as verified
  await prisma.oTPCode.update({
    where: { id: otpRecord.id },
    data: { verified: true },
  })

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: { email },
    })
  }

  // Create session
  await createSession(user.id)

  return { success: true, user }
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()

  // In production, use proper session management (JWT, session tokens, etc.)
  cookieStore.set("user_id", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  return user
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user_id")
}
