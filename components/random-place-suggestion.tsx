"use client"

import { useState } from "react"
import { Shuffle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { HistoricalPlace } from "@/lib/features/historical-places/historicalPlacesSlice"

interface RandomPlaceSuggestionProps {
  places: HistoricalPlace[]
}

export function RandomPlaceSuggestion({ places }: RandomPlaceSuggestionProps) {
  const [suggestedPlace, setSuggestedPlace] = useState<HistoricalPlace | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const getRandomPlace = () => {
    if (places.length === 0) return

    setIsAnimating(true)

    // Add a small delay for animation effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * places.length)
      setSuggestedPlace(places[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button
          onClick={getRandomPlace}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={isAnimating}
        >
          <Shuffle className={`w-4 h-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
          {isAnimating ? "Finding..." : "Suggest Random Place"}
        </Button>
      </div>

      {suggestedPlace && (
        <Card className="max-w-md mx-auto border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="text-sm font-medium text-accent">Random Suggestion</div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground">{suggestedPlace.name}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{suggestedPlace.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{suggestedPlace.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
