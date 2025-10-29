"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface WishlistButtonProps {
  productId: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WishlistButton({ productId, variant = "outline", size = "icon" }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      checkWishlist()
    }
  }, [session, productId])

  const checkWishlist = async () => {
    try {
      const res = await fetch(`/api/wishlist/check?productId=${productId}`)
      const data = await res.json()
      setIsInWishlist(data.inWishlist)
    } catch (error) {
      console.error("Failed to check wishlist:", error)
    }
  }

  const toggleWishlist = async () => {
    if (!session?.user) {
      router.push("/auth/login?redirect=" + window.location.pathname)
      return
    }

    setLoading(true)

    try {
      if (isInWishlist) {
        const res = await fetch(`/api/wishlist/remove?productId=${productId}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setIsInWishlist(false)
          toast({
            title: "Removed from wishlist",
            description: "Item has been removed from your wishlist",
          })
        }
      } else {
        const res = await fetch("/api/wishlist/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        })

        if (res.ok) {
          setIsInWishlist(true)
          toast({
            title: "Added to wishlist",
            description: "Item has been added to your wishlist",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={toggleWishlist} disabled={loading}>
      <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
    </Button>
  )
}
