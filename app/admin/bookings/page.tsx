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
import { useBookings } from "@/lib/hooks/booking"

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

  const { bookings } = useBookings()

  const filteredBookings = bookings?.filter((booking) => {
    if (filterStatus !== "all" && booking.trangThai !== filterStatus) return false
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
          const count = bookings?.filter((b) => b.trangThai === status).length
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
                  {filteredBookings?.map((booking) => (
                    <tr key={booking.idPd} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                      <td className="p-4 text-white font-semibold">{booking.idPd}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{booking.khachHang?.ho}</p>
                          <p className="text-sm text-gray-400">{booking.khachHang?.sdt}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white">{5}</p> //TODO: get số phòng
                          <p className="text-sm text-gray-400">{5 + " VIP"}</p> //TODO: get tên loại phòng
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white text-sm">{booking.ngayDat.toDateString()}</p>
                          <p className="text-gray-400 text-sm">{booking.ngayDi.toDateString()}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{Math.abs(booking.ngayDi.getTime() - booking.ngayDat.getTime()) / (1000 * 60 * 60 * 24)} đêm</td>
                      <td className="p-4 text-white font-semibold">{booking.soTienCoc.toString()}₫</td>
                      <td className="p-4">
                        <Badge className={statusConfig[booking.trangThai as keyof typeof statusConfig].color}>
                          {statusConfig[booking.trangThai as keyof typeof statusConfig].label}
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
                {bookings?.slice(0, 3).map((booking) => (
                  <div key={booking.idPd} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white font-medium">{booking.khachHang?.ho}</p>
                      <Badge className={statusConfig[booking.trangThai as keyof typeof statusConfig].color}>
                        {statusConfig[booking.trangThai as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Phòng {5} - {5 + " VIP"} //TODO: get số phòng và tên loại phòng
                    </p>
                    <p className="text-sm text-gray-400">{booking.ngayBdThue.toLocaleDateString("vi-VN")} - {booking.ngayDi.toLocaleDateString("vi-VN")}</p>
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
