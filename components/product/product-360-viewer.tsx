"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RotateCw, Maximize2, X } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Product360ViewerProps {
  productName: string
  productColor: string
}

export function Product360Viewer({ productName, productColor }: Product360ViewerProps) {
  const [currentAngle, setCurrentAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)

  // 8 angles for 360-degree view (front, front-right, right, back-right, back, back-left, left, front-left)
  const totalAngles = 8
  const angles = [
    { angle: 0, label: "Front" },
    { angle: 45, label: "Front Right" },
    { angle: 90, label: "Right" },
    { angle: 135, label: "Back Right" },
    { angle: 180, label: "Back" },
    { angle: 225, label: "Back Left" },
    { angle: 270, label: "Left" },
    { angle: 315, label: "Front Left" },
  ]

  // Auto-rotate effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentAngle((prev) => (prev + 1) % totalAngles)
    }, 200)

    return () => clearInterval(interval)
  }, [isAutoRotating, totalAngles])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    startXRef.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startXRef.current
    const sensitivity = 20 // pixels needed to change angle

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1
      setCurrentAngle((prev) => (prev + direction + totalAngles) % totalAngles)
      startXRef.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    startXRef.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startXRef.current
    const sensitivity = 20

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1
      setCurrentAngle((prev) => (prev + direction + totalAngles) % totalAngles)
      startXRef.current = e.touches[0].clientX
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const getImageUrl = (angleIndex: number) => {
    const angleLabel = angles[angleIndex].label.toLowerCase().replace(" ", "-")
    return `/products/${productColor.toLowerCase()}-shirt-${angleLabel}.jpg?height=800&width=600&query=${productColor} ${productName} shirt ${angleLabel} view on white background product photography`
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main 360 Viewer */}
        <Card
          ref={containerRef}
          className={`relative overflow-hidden bg-background border-2 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-[3/4] rounded-lg"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button for fullscreen */}
          {isFullscreen && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4 z-10"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}

          {/* 360 Badge */}
          <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            360° View
          </div>

          {/* Current angle label */}
          <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {angles[currentAngle].label}
          </div>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={getImageUrl(currentAngle) || "/placeholder.svg"}
              alt={`${productName} - ${angles[currentAngle].label} view`}
              fill
              className="object-contain p-8"
              priority
              draggable={false}
            />
          </div>

          {/* Drag instruction */}
          {!isDragging && !isAutoRotating && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-muted-foreground">
              Drag to rotate
            </div>
          )}
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Angle thumbnails */}
          <div className="flex gap-2 overflow-x-auto flex-1">
            {angles.map((angle, index) => (
              <button
                key={angle.angle}
                onClick={() => {
                  setCurrentAngle(index)
                  setIsAutoRotating(false)
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                  currentAngle === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl(index) || "/placeholder.svg"}
                    alt={angle.label}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant={isAutoRotating ? "default" : "outline"}
              size="icon"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title="Auto rotate"
            >
              <RotateCw className={`h-5 w-5 ${isAutoRotating ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsFullscreen(!isFullscreen)} title="Fullscreen">
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Drag left or right to rotate • Click thumbnails to jump to view • Auto-rotate available</p>
        </div>
      </div>
    </>
  )
}
