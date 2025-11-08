import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AccountDashboard } from "@/components/account/account-dashboard"

export default async function AccountPage() {
  const user = await getSession()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl container py-8">
          <AccountDashboard user={user} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
