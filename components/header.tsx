"use client"

import Link from "next/link"
import { ShoppingBag, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in by checking for session cookie
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        const data = await response.json()
        setIsLoggedIn(data.authenticated)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold tracking-tight">linowares</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
            Shop
          </Link>
          <Link href="/custom-fit" className="text-sm font-medium transition-colors hover:text-primary">
            Custom Fit
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/sustainability" className="text-sm font-medium transition-colors hover:text-primary">
            Sustainability
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={isLoggedIn ? "/account" : "/auth/login"}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
