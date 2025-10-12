"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Users, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function HotelHero() {
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [showDestinations, setShowDestinations] = useState(false)

  const popularDestinations = [
    "Hồ Chí Minh, Việt Nam",
    "Hà Nội, Việt Nam",
    "Đà Nẵng, Việt Nam",
    "Nha Trang, Việt Nam",
    "Phú Quốc, Việt Nam",
  ]

  const handleSearch = () => {
    console.log("[v0] Search:", { destination, checkIn, checkOut, adults, children, rooms })
  }

  return (
    <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/luxury-hotel-building-with-blue-sky-and-trees.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold">PULLMAN SAIGON CENTRE</div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-primary transition-colors">
            KHÁCH SẠN
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            PHÒNG NGHỈ
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            NHÀ HÀNG & BAR
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            MEET/PLAY
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            ƯU ĐÃI
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            LIÊN HỆ
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Booking Form */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-secondary/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Destination */}
              <div className="md:col-span-3">
                <Label htmlFor="destination" className="text-white text-sm mb-2 block">
                  ĐIỂM ĐẾN
                </Label>
                <Popover open={showDestinations} onOpenChange={setShowDestinations}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="Thành phố, khách sạn..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onFocus={() => setShowDestinations(true)}
                        className="pl-10 bg-white border-0 h-12"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2" align="start">
                    <div className="space-y-1">
                      {popularDestinations
                        .filter((dest) => dest.toLowerCase().includes(destination.toLowerCase()))
                        .map((dest) => (
                          <button
                            key={dest}
                            onClick={() => {
                              setDestination(dest)
                              setShowDestinations(false)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted rounded-sm text-sm transition-colors"
                          >
                            {dest}
                          </button>
                        ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-in Date */}
              <div className="md:col-span-2">
                <Label htmlFor="check-in" className="text-white text-sm mb-2 block">
                  NHẬN PHÒNG
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-10 bg-white border-0 h-12"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="md:col-span-2">
                <Label htmlFor="check-out" className="text-white text-sm mb-2 block">
                  TRẢ PHÒNG
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-10 bg-white border-0 h-12"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-3">
                <Label htmlFor="guests" className="text-white text-sm mb-2 block">
                  KHÁCH & PHÒNG
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-12 px-4 bg-white rounded-md flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {adults + children} Khách, {rooms} Phòng
                        </span>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Người lớn</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setAdults(adults + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Trẻ em</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setChildren(Math.max(0, children - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setChildren(children + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Phòng</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{rooms}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => setRooms(rooms + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button
                  onClick={handleSearch}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium text-sm"
                >
                  ĐẶT PHÒNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
