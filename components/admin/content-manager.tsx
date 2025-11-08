"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface HeroSection {
  id?: string
  title: string
  subtitle: string
  image: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
}

interface Feature {
  id?: string
  icon: string
  title: string
  description: string
  order: number
}

export function ContentManager() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [hero, setHero] = useState<HeroSection>({
    title: "",
    subtitle: "",
    image: "",
    ctaText: "",
    ctaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
  })
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/content")
      const data = await response.json()
      if (data.hero) setHero(data.hero)
      if (data.features) setFeatures(data.features)
    } catch (error) {
      console.error(" Error fetching content:", error)
    }
  }

  const saveHero = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/content/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Hero section updated successfully" })
      } else {
        throw new Error("Failed to update hero section")
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update hero section", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const saveFeatures = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/content/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Features updated successfully" })
      } else {
        throw new Error("Failed to update features")
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update features", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <TabsList>
        <TabsTrigger value="hero">Hero Section</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>

      <TabsContent value="hero">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                placeholder="Timeless Elegance, Natural Comfort"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                placeholder="Discover our premium cotton-linen shirt collection..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-image">Image URL</Label>
              <Input
                id="hero-image"
                value={hero.image}
                onChange={(e) => setHero({ ...hero, image: e.target.value })}
                placeholder="/hero-image.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-cta-text">Primary CTA Text</Label>
                <Input
                  id="hero-cta-text"
                  value={hero.ctaText}
                  onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                  placeholder="Shop Collection"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-cta-link">Primary CTA Link</Label>
                <Input
                  id="hero-cta-link"
                  value={hero.ctaLink}
                  onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                  placeholder="/shop"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-secondary-cta-text">Secondary CTA Text</Label>
                <Input
                  id="hero-secondary-cta-text"
                  value={hero.secondaryCtaText}
                  onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                  placeholder="Custom Fit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-secondary-cta-link">Secondary CTA Link</Label>
                <Input
                  id="hero-secondary-cta-link"
                  value={hero.secondaryCtaLink}
                  onChange={(e) => setHero({ ...hero, secondaryCtaLink: e.target.value })}
                  placeholder="/custom-fit"
                />
              </div>
            </div>

            <Button onClick={saveHero} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Hero Section
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features">
        <Card>
          <CardHeader>
            <CardTitle>Features Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Icon Name</Label>
                    <Input
                      value={feature.icon}
                      onChange={(e) => {
                        const newFeatures = [...features]
                        newFeatures[index].icon = e.target.value
                        setFeatures(newFeatures)
                      }}
                      placeholder="Leaf, Shirt, Star"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...features]
                        newFeatures[index].title = e.target.value
                        setFeatures(newFeatures)
                      }}
                      placeholder="Feature Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...features]
                      newFeatures[index].description = e.target.value
                      setFeatures(newFeatures)
                    }}
                    placeholder="Feature description..."
                    rows={2}
                  />
                </div>
              </div>
            ))}

            <Button onClick={saveFeatures} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Features
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
