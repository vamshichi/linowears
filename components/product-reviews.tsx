"use client"

import { useState, useEffect } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

interface ReviewData {
  reviews: Review[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  averageRating: number
  totalReviews: number
  ratingBreakdown: Array<{ rating: number; count: number }>
}

export function ProductReviews({ productId }: { productId: string }) {
  const [data, setData] = useState<ReviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/reviews?page=${page}&limit=10`)
        if (!response.ok) throw new Error("Failed to fetch reviews")
        const reviewData = await response.json()
        setData(reviewData)
      } catch (error) {
        console.error("[v0] Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId, page])

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-32" />
          <div className="md:col-span-2 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return <div className="text-center py-12">No reviews yet</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold mb-2">{data.averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(data.averageRating) ? "fill-accent text-accent" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {data.totalReviews} reviews</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            {data.ratingBreakdown.map(({ rating, count }) => {
              const percentage = data.totalReviews > 0 ? (count / data.totalReviews) * 100 : 0
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-12">{rating} star</span>
                  <Progress value={percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {data.reviews.map((review) => {
          const timeAgo = getTimeAgo(new Date(review.createdAt))
          const userName = review.user.name || review.user.email.split("@")[0]

          return (
            <div key={review.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{userName}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Verified Purchase</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{timeAgo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {data.pagination.totalPages > 1 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page >= data.pagination.totalPages}>
            {page >= data.pagination.totalPages ? "No More Reviews" : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`
    }
  }

  return "just now"
}
