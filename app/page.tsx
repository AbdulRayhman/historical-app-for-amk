"use client"

import { useState } from "react"
import { useAppSelector } from "@/lib/hooks/redux"
import { HistoricalPlaceCard } from "@/components/historical-place-card"
import { SearchHeader } from "@/components/search-header"
import { RandomPlaceSuggestion } from "@/components/random-place-suggestion"

export default function HomePage() {
  const { places } = useAppSelector((state) => state.historicalPlaces)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState<"all" | "visited" | "unvisited">("all")

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.era.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "visited" && place.isVisited) ||
      (filterBy === "unvisited" && !place.isVisited)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      />

      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Historical Places</h1>
          <p className="text-muted-foreground text-lg">
            Explore and track your visits to historical landmarks around the world
          </p>
        </div>

        <RandomPlaceSuggestion places={places} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <HistoricalPlaceCard key={place.id} place={place} />
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No places found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
