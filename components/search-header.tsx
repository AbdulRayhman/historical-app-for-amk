"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filterBy: "all" | "visited" | "unvisited"
  onFilterChange: (filter: "all" | "visited" | "unvisited") => void
}

export function SearchHeader({ searchQuery, onSearchChange, filterBy, onFilterChange }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search places, locations, or eras..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterBy === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("all")}
            >
              All
            </Button>
            <Button
              variant={filterBy === "visited" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("visited")}
            >
              Visited
            </Button>
            <Button
              variant={filterBy === "unvisited" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("unvisited")}
            >
              To Visit
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
