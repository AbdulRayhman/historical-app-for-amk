"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Info, CheckCircle2, Circle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux"
import { toggleVisited } from "@/lib/features/historical-places/historicalPlacesSlice"
import { useState } from "react"

export default function PlaceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [imageLoading, setImageLoading] = useState(true)

  const placeId = params.id as string
  const place = useAppSelector((state) => state.historicalPlaces.places.find((p) => p.id === placeId))

  if (!place) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Place Not Found</h1>
          <p className="text-muted-foreground">The historical place you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    )
  }

  const handleVisitedToggle = () => {
    dispatch(toggleVisited(place.id))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: place.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button variant={place.isVisited ? "secondary" : "default"} size="sm" onClick={handleVisitedToggle}>
                {place.isVisited ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Visited
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-2" />
                    Mark as Visited
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="relative">
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src={place.image || "/placeholder.svg"}
              alt={place.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />}
          </div>

          {place.isVisited && (
            <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Visited
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{place.name}</h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{place.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Historical Significance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{place.significance}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Location</div>
                    <div className="text-foreground">{place.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Era</div>
                    <div className="text-foreground">{place.era}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visit Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant={place.isVisited ? "secondary" : "default"}
                  className="w-full"
                  onClick={handleVisitedToggle}
                >
                  {place.isVisited ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Unvisited
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      Mark as Visited
                    </>
                  )}
                </Button>

                {place.isVisited && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Great! You've visited this amazing place.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
