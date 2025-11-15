"use client"

import { useState } from "react"
import { BookingCard } from "@/components/booking-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockBookings } from "@/lib/mock-data"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = statusFilter === "all" ? mockBookings : mockBookings.filter((b) => b.status === statusFilter)

  return (
    <div className="min-h-screen bg-background">

      <main className="p-6">
        <div className="container mx-auto p-4 md:p-6 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại trang chủ
        </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Đặt phòng của tôi</h1>
            <p className="text-muted-foreground mt-1">Quản lý tất cả các đặt phòng của bạn</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm theo mã đặt phòng..." className="pl-9 bg-card border-border" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="checked-in">Đang ở</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy đặt phòng nào</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
