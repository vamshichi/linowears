"use client"

import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const reviews = [
  {
    id: 1,
    author: "Rahul Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Excellent quality and fit!",
    comment:
      "This shirt exceeded my expectations. The fabric is soft, breathable, and perfect for our climate. The fit is true to size and the quality is outstanding.",
    helpful: 24,
    images: [],
  },
  {
    id: 2,
    author: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    verified: true,
    title: "Great shirt, runs slightly large",
    comment:
      "Love the fabric and color. Very comfortable to wear all day. Only note is that it runs slightly large, so consider sizing down if you're between sizes.",
    helpful: 18,
    images: [],
  },
  {
    id: 3,
    author: "Amit Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "Perfect for summer!",
    comment:
      "The cotton-linen blend is perfect for hot weather. Stays fresh throughout the day and looks great even after multiple washes.",
    helpful: 15,
    images: [],
  },
]

export function ProductReviews({ productId }: { productId: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold mb-2">4.8</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on 128 reviews</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm w-12">{rating} star</span>
                <Progress value={rating === 5 ? 75 : rating === 4 ? 20 : 5} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {rating === 5 ? "96" : rating === 4 ? "26" : "6"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Verified Purchase</span>
                  )}
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
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
