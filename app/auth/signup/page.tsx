import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Linowares and start shopping</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
