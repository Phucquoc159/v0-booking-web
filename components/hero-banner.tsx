"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Users, Search } from "lucide-react"

export function HeroBanner() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/luxury-hotel-exterior-modern-architecture.jpg"
          alt="QK Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/40 to-secondary/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance">
          Chào Mừng Đến Với QK Hotel
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-balance">
          Trải nghiệm dịch vụ khách sạn 5 sao với không gian sang trọng và tiện nghi hiện đại
        </p>

        {/* Booking Form */}
        <div className="w-full max-w-4xl bg-card rounded-xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Check-in */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Ngày Nhận Phòng</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Check-out */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Ngày Trả Phòng</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Guests */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">Số Khách</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Search className="h-4 w-4 mr-2" />
                Tìm Phòng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
