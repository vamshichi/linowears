import { getSession } from "@/lib/auth"

// In production, store admin emails in environment variables or database
const ADMIN_EMAILS = ["admin@linowears.com", "owner@linowears.com"]

export async function isAdmin() {
  const user = await getSession()
  if (!user) return false
  return ADMIN_EMAILS.includes(user.email)
}
