"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPinIcon, UsersIcon, MinusIcon, PlusIcon, SearchIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const popularDestinations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "Las Vegas, NV",
  "San Francisco, CA",
  "Boston, MA",
  "Seattle, WA",
  "Orlando, FL",
  "Washington, DC",
]

export function HotelBookingForm() {
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [showDestinations, setShowDestinations] = useState(false)
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  })
  const [showGuestSelector, setShowGuestSelector] = useState(false)

  const filteredDestinations = popularDestinations.filter((dest) =>
    dest.toLowerCase().includes(destination.toLowerCase()),
  )

  const handleDestinationSelect = (dest: string) => {
    setDestination(dest)
    setShowDestinations(false)
  }

  const updateGuests = (type: "adults" | "children" | "rooms", increment: boolean) => {
    setGuests((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }))
  }

  const handleSearch = () => {
    console.log("[v0] Search initiated with:", {
      destination,
      checkIn,
      checkOut,
      guests,
    })
    // Handle search logic here
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-card/95 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Destination Input */}
          <div className="relative lg:col-span-2">
            <Label htmlFor="destination" className="text-sm font-medium text-foreground mb-2 block">
              Where are you going?
            </Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="destination"
                type="text"
                placeholder="Enter city or hotel name"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  setShowDestinations(true)
                }}
                onFocus={() => setShowDestinations(true)}
                className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
              />
              {showDestinations && destination && (
                <div className="absolute top-full left-0 right-0 bg-popover border border-border rounded-md shadow-lg z-10 mt-1">
                  {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((dest, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => handleDestinationSelect(dest)}
                      >
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {dest}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-muted-foreground">No destinations found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Check-in Date */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-input border-border",
                    !checkIn && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-input border-border",
                    !checkOut && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Selector */}
          <div className="lg:col-span-2">
            <Label className="text-sm font-medium text-foreground mb-2 block">Guests & Rooms</Label>
            <Popover open={showGuestSelector} onOpenChange={setShowGuestSelector}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-input border-border"
                >
                  <UsersIcon className="mr-2 h-4 w-4" />
                  {guests.adults} adult{guests.adults !== 1 ? "s" : ""}
                  {guests.children > 0 && `, ${guests.children} child${guests.children !== 1 ? "ren" : ""}`},{" "}
                  {guests.rooms} room{guests.rooms !== 1 ? "s" : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-muted-foreground">Ages 13+</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("adults", false)}
                        disabled={guests.adults <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("adults", true)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-muted-foreground">Ages 0-12</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("children", false)}
                        disabled={guests.children <= 0}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("children", true)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rooms</div>
                      <div className="text-sm text-muted-foreground">Hotel rooms</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("rooms", false)}
                        disabled={guests.rooms <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.rooms}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateGuests("rooms", true)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              size="lg"
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
