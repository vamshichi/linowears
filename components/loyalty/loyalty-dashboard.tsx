"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Gift, Share2, Star, Copy, Check } from "lucide-react"

export function LoyaltyDashboard({
  user,
  totalPoints,
  points,
  referrals,
}: {
  user: any
  totalPoints: number
  points: any[]
  referrals: any[]
}) {
  const [copied, setCopied] = useState(false)
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/signup?ref=${user?.referral_code || user?.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Your Loyalty Points
                </CardTitle>
                <CardDescription>Earn points with every purchase and referral</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-2">How to earn points:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Earn 10 points for every $10 spent</li>
                  <li>• Get 500 points for each successful referral</li>
                  <li>• Earn 50 points for writing a product review</li>
                  <li>• Birthday bonus: 200 points</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold mb-2">Redeem your points:</p>
                <p className="text-sm text-muted-foreground">100 points = $10 discount on your next order</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {points.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No points earned yet. Start shopping to earn!</p>
              ) : (
                points.map((point) => (
                  <div
                    key={point.id}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-semibold capitalize">{point.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(point.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className={`font-bold text-lg ${point.type === "earned" ? "text-primary" : "text-destructive"}`}>
                      {point.type === "earned" ? "+" : "-"}
                      {point.points}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Refer & Earn
            </CardTitle>
            <CardDescription>Invite friends and earn 500 points each</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Your Referral Link</Label>
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="text-sm" />
                <Button size="icon" variant="outline" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-semibold mb-2">How it works:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Share your referral link</li>
                <li>Friend signs up and makes first purchase</li>
                <li>You both get 500 points</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">No referrals yet</p>
              ) : (
                referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground truncate">{referral.referred_email}</span>
                    <Badge variant={referral.status === "completed" ? "default" : "secondary"}>{referral.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Rewards Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Tier</span>
                <Badge>{totalPoints < 1000 ? "Silver" : totalPoints < 5000 ? "Gold" : "Platinum"}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Silver</span>
                  <span className="text-muted-foreground">0 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Gold</span>
                  <span className="text-muted-foreground">1,000 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Platinum</span>
                  <span className="text-muted-foreground">5,000 pts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
