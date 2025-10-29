"use client"

import type { User } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Heart, MapPin, LogOut, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AccountDashboard({ user }: { user: User }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.name || user.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/account/orders">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardHeader>
              <Package className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Orders</CardTitle>
              <CardDescription>Track and manage your orders</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/account/loyalty">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardHeader>
              <Gift className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Loyalty & Rewards</CardTitle>
              <CardDescription>View points and referrals</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardHeader>
              <Heart className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>View your saved items</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <MapPin className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Addresses</CardTitle>
            <CardDescription>Manage delivery addresses</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Name</p>
            <p className="font-medium">{user.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <p className="font-medium">{user.phone || "Not set"}</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
