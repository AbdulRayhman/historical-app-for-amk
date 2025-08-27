"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Calendar, CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch } from "@/lib/hooks/redux"
import { toggleVisited } from "@/lib/features/historical-places/historicalPlacesSlice"
import type { HistoricalPlace } from "@/lib/features/historical-places/historicalPlacesSlice"

interface HistoricalPlaceCardProps {
  place: HistoricalPlace
}

export function HistoricalPlaceCard({ place }: HistoricalPlaceCardProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [imageLoading, setImageLoading] = useState(true)

  const handleCardClick = () => {
    router.push(`/place/${place.id}`)
  }

  const handleVisitedToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when toggling visited status
    dispatch(toggleVisited(place.id))
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={getPlaceImage(place.id) || "/placeholder.svg"}
            alt={place.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />
          {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
        </div>

        {place.isVisited && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Visited
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {place.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{place.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{place.era}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant={place.isVisited ? "secondary" : "outline"}
          size="sm"
          className="w-full"
          onClick={handleVisitedToggle}
        >
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
      </CardFooter>
    </Card>
  )
}

function getPlaceImage(placeId: string): string {
  const imageMap: Record<string, string> = {
    "1": "/roman-colosseum-ancient-amphitheatre.png",
    "2": "/machu-picchu-incan-citadel-andes-mountains.png",
    "3": "/great-wall-of-china-ancient-fortification.png",
    "4": "/petra-jordan-rock-cut-architecture-treasury.png",
    "5": "/angkor-wat-cambodia-temple-complex-hindu-architect.png",
    "6": "/stonehenge-prehistoric-stone-circle-england.png",
  }

  return imageMap[placeId] || "/placeholder.svg"
}
