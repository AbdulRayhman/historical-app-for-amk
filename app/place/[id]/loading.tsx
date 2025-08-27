import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PlaceDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" disabled className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
              <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section Loading */}
        <div className="aspect-[16/9] md:aspect-[21/9] bg-muted animate-pulse rounded-lg" />

        {/* Content Section Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="h-12 bg-muted animate-pulse rounded-md w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded-md" />
                <div className="h-4 bg-muted animate-pulse rounded-md w-5/6" />
                <div className="h-4 bg-muted animate-pulse rounded-md w-4/6" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded-md w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded-md" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-5/6" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded-md w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded-md w-1/3" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-2/3" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded-md w-1/4" />
                  <div className="h-4 bg-muted animate-pulse rounded-md w-1/2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded-md w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="h-10 bg-muted animate-pulse rounded-md w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
