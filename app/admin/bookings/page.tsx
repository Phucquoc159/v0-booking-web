"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Edit, X } from "lucide-react"

const bookings = [
  {
    id: "BK001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@email.com",
    room: "101",
    roomType: "Standard",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    nights: 3,
    guests: 2,
    total: 3600000,
    status: "confirmed",
    createdAt: "2025-01-10",
  },
  {
    id: "BK002",
    customer: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@email.com",
    room: "201",
    roomType: "Suite",
    checkIn: "2025-01-16",
    checkOut: "2025-01-20",
    nights: 4,
    guests: 3,
    total: 11200000,
    status: "pending",
    createdAt: "2025-01-11",
  },
  {
    id: "BK003",
    customer: "Lê Minh C",
    phone: "0923456789",
    email: "leminhc@email.com",
    room: "302",
    roomType: "VIP",
    checkIn: "2025-01-14",
    checkOut: "2025-01-16",
    nights: 2,
    guests: 2,
    total: 7000000,
    status: "checked-in",
    createdAt: "2025-01-09",
  },
  {
    id: "BK004",
    customer: "Phạm Thu D",
    phone: "0934567890",
    email: "phamthud@email.com",
    room: "203",
    roomType: "Executive",
    checkIn: "2025-01-12",
    checkOut: "2025-01-14",
    nights: 2,
    guests: 1,
    total: 4400000,
    status: "completed",
    createdAt: "2025-01-08",
  },
  {
    id: "BK005",
    customer: "Hoàng Văn E",
    phone: "0945678901",
    email: "hoangvane@email.com",
    room: "104",
    roomType: "Deluxe",
    checkIn: "2025-01-20",
    checkOut: "2025-01-22",
    nights: 2,
    guests: 2,
    total: 3000000,
    status: "cancelled",
    createdAt: "2025-01-12",
  },
]

const statusConfig = {
  pending: { label: "Chờ Xác Nhận", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  confirmed: { label: "Đã Xác Nhận", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  "checked-in": { label: "Đã Nhận Phòng", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  completed: { label: "Hoàn Thành", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  cancelled: { label: "Đã Hủy", color: "bg-red-500/10 text-red-500 border-red-500/20" },
}

export default function BookingsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus !== "all" && booking.status !== filterStatus) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Đặt Phòng</h1>
          <p className="text-gray-400">Quản lý và theo dõi các đơn đặt phòng</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Đặt Phòng
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo Đặt Phòng Mới</DialogTitle>
              <DialogDescription className="text-gray-400">Nhập thông tin đặt phòng</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Thông Tin Khách Hàng</Label>
              </div>
              <div>
                <Label>Họ Tên</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <Label>Số Điện Thoại</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="0901234567" />
              </div>
              <div className="col-span-2">
                <Label>Email</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="email@example.com" />
              </div>
              <div className="col-span-2 border-t border-[#2a2a2a] pt-4 mt-2">
                <Label>Thông Tin Phòng</Label>
              </div>
              <div>
                <Label>Loại Phòng</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Số Khách</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="2" />
              </div>
              <div>
                <Label>Ngày Nhận Phòng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" />
              </div>
              <div>
                <Label>Ngày Trả Phòng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" />
              </div>
              <div className="col-span-2">
                <Label>Ghi Chú</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Ghi chú đặc biệt..." />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Tạo Đặt Phòng</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = bookings.filter((b) => b.status === status).length
          return (
            <Card key={status} className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
              <p className="text-gray-400 text-sm mb-1">{config.label}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-600">
            Danh Sách
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-600">
            Lịch Đặt Phòng
          </TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm theo tên, mã đặt phòng..."
                    className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ Xác Nhận</SelectItem>
                  <SelectItem value="confirmed">Đã Xác Nhận</SelectItem>
                  <SelectItem value="checked-in">Đã Nhận Phòng</SelectItem>
                  <SelectItem value="completed">Hoàn Thành</SelectItem>
                  <SelectItem value="cancelled">Đã Hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Bookings Table */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2a]">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Mã ĐP</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Khách Hàng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Phòng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Nhận/Trả</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Số Đêm</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Tổng Tiền</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                      <td className="p-4 text-white font-semibold">{booking.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-400">{booking.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white">{booking.room}</p>
                          <p className="text-sm text-gray-400">{booking.roomType}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white text-sm">{booking.checkIn}</p>
                          <p className="text-gray-400 text-sm">{booking.checkOut}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{booking.nights} đêm</td>
                      <td className="p-4 text-white font-semibold">{booking.total.toLocaleString()}₫</td>
                      <td className="p-4">
                        <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
                          {statusConfig[booking.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Lịch Đặt Phòng</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-[#2a2a2a]"
              />
            </Card>
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Đặt Phòng Ngày {selectedDate?.toLocaleDateString("vi-VN")}
              </h2>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white font-medium">{booking.customer}</p>
                      <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
                        {statusConfig[booking.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Phòng {booking.room} - {booking.roomType}
                    </p>
                    <p className="text-sm text-gray-400">{booking.nights} đêm</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
