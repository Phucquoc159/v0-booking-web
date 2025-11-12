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
import { generateBookingId, useBookings, useCreateBooking, useCreateBookingDetail } from "@/lib/hooks/booking"
import { useRoomTypes } from "@/lib/hooks/roomTypes"
import { useRoomClasses } from "@/lib/hooks/roomClass"
import { useEmployees } from "@/lib/hooks/employee"
import { CTPhieuDat, PhieuDat } from "@/lib/generated/prisma"
import { useToast } from "@/components/ui/toast"

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
  const [idHp, setIdHp] = useState<string>("")
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)
  const [phieuDat, setPhieudat] = useState<Omit<PhieuDat, "idPd">>({
    ngayDat: new Date(),
    ngayBdThue: new Date(),
    ngayDi: new Date(),
    trangThai: "pending",
    //@ts-ignore
    soTienCoc: 0,
    cccd: "",
    idNv: null,
  })
  const toast = useToast()
  const [ctPhieuDat, setCTPhieuDat] = useState<Omit<CTPhieuDat, "idCtPd">>({
    idPd: "",
    idHp: "",
    soLuongPhongO: 1,
    //@ts-ignore
    donGia: 0,
  })

  const { bookings } = useBookings()
  const { roomTypes } = useRoomTypes()
  const { roomClasses } = useRoomClasses()
  const { employees } = useEmployees()

  const createBookingMutation = useCreateBooking()
  const createBookingDetailMutation = useCreateBookingDetail()

  // Tính đơn giá tự động khi chọn hạng phòng
  const handleRoomClassChange = (idHp: string) => {
    setIdHp(idHp)
    const selectedRoomClass = roomClasses.find((rc) => rc.idHp === idHp)
    if (selectedRoomClass && selectedRoomClass.giaHangPhongs && selectedRoomClass.giaHangPhongs.length > 0) {
      const latestPrice = selectedRoomClass.giaHangPhongs[0]?.gia
      if (latestPrice) {
        //@ts-ignore
        setCTPhieuDat({ ...ctPhieuDat, idHp, donGia: Number(latestPrice) })
      }
    } else {
      //@ts-ignore
      setCTPhieuDat({ ...ctPhieuDat, idHp, donGia: 0 })
    }
  }

  const handleCreateBooking = () => {
    // Validation
    if (!phieuDat.cccd) {
      toast.error("Vui lòng nhập CCCD khách hàng")
      return
    }
    if (!idHp) {
      toast.error("Vui lòng chọn loại phòng")
      return
    }
    //@ts-ignore
    if (!ctPhieuDat.donGia || ctPhieuDat.donGia <= 0) {
      toast.error("Vui lòng nhập đơn giá")
      return
    }
    //@ts-ignore
    if (!phieuDat.soTienCoc || phieuDat.soTienCoc <= 0) {
      toast.error("Vui lòng nhập số tiền cọc")
      return
    }
    if (phieuDat.ngayBdThue >= phieuDat.ngayDi) {
      toast.error("Ngày trả phòng phải sau ngày nhận phòng")
      return
    }

    const idPd = generateBookingId(bookings)

    createBookingMutation.mutate({
      //@ts-ignore
      idPd: idPd,
      ...phieuDat,
    }, {
      onSuccess: (data) => {
        console.log({ data })
        createBookingDetailMutation.mutate({
          idPd: idPd,
          idHp: idHp,
          soLuongPhongO: ctPhieuDat.soLuongPhongO,
          donGia: ctPhieuDat.donGia,
        }, {
          onSuccess: () => {
            toast.success("Tạo đơn đặt phòng thành công")
            setOpenCreateDialog(false)
            // Reset form
            setPhieudat({
              ngayDat: new Date(),
              ngayBdThue: new Date(),
              ngayDi: new Date(),
              trangThai: "pending",
              //@ts-ignore
              soTienCoc: 0,
              cccd: "",
              idNv: null,
            })
            setCTPhieuDat({
              idPd: "",
              idHp: "",
              soLuongPhongO: 1,
              //@ts-ignore
              donGia: 0,
            })
            setIdHp("")
          },
          onError: (error) => {
            console.log(error)
            toast.error("Tạo chi tiết đơn đặt phòng thất bại")
          }
        })
      },
      onError: (error) => {
        console.log(error)
        toast.error("Tạo đơn đặt phòng thất bại")
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Đặt Phòng</h1>
          <p className="text-gray-400">Quản lý và theo dõi các đơn đặt phòng</p>
        </div>
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Đặt Phòng
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
              <DialogTitle>Tạo Đặt Phòng Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Thông Tin Khách Hàng */}
              <div>
                <Label>CCCD Khách Hàng</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Nhập số CCCD"
                  value={phieuDat.cccd}
                  onChange={(e) => setPhieudat({ ...phieuDat, cccd: e.target.value })}
                />
              </div>

              {/* Thông Tin Đặt Phòng */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <h3 className="text-white font-medium mb-3">Thông Tin Đặt Phòng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Ngày Đặt</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="date" 
                      value={phieuDat.ngayDat ? new Date(phieuDat.ngayDat).toISOString().split('T')[0] : ''}
                      onChange={(e) => setPhieudat({ ...phieuDat, ngayDat: new Date(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Trạng Thái</Label>
                    <Select 
                      value={phieuDat.trangThai} 
                      onValueChange={(value) => setPhieudat({ ...phieuDat, trangThai: value as any })}
                    >
                      <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <SelectItem key={status} value={status}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nhân Viên</Label>
                    <Select 
                      value={phieuDat.idNv || ""} 
                      onValueChange={(value) => setPhieudat({ ...phieuDat, idNv: value || null })}
                    >
                      <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Chọn nhân viên" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectItem value="">Không chọn</SelectItem>
                        {employees?.map((employee) => (
                          <SelectItem key={employee.idNv} value={employee.idNv}>
                            {employee.ho} {employee.ten}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Thông Tin Phòng */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <h3 className="text-white font-medium mb-3">Thông Tin Phòng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Hạng Phòng</Label>
                    <Select value={idHp} onValueChange={handleRoomClassChange}>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Chọn hạng phòng" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        {roomClasses?.map((roomClass) => (
                          <SelectItem key={roomClass.idHp} value={roomClass.idHp}>
                            {roomClass.loaiPhong.tenLp} - {roomClass.kieuPhong.tenKp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Số Lượng Phòng</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="number" 
                      min="1"
                      placeholder="1" 
                      value={ctPhieuDat.soLuongPhongO}
                      onChange={(e) => setCTPhieuDat({ ...ctPhieuDat, soLuongPhongO: Number(e.target.value) || 1 })}
                    />
                  </div>
                  <div>
                    <Label>Ngày Nhận Phòng</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="date" 
                      value={phieuDat.ngayBdThue ? new Date(phieuDat.ngayBdThue).toISOString().split('T')[0] : ''}
                      onChange={(e) => setPhieudat({ ...phieuDat, ngayBdThue: new Date(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Ngày Trả Phòng</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="date" 
                      value={phieuDat.ngayDi ? new Date(phieuDat.ngayDi).toISOString().split('T')[0] : ''}
                      onChange={(e) => setPhieudat({ ...phieuDat, ngayDi: new Date(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Đơn Giá (₫)</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="number" 
                      min="0"
                      placeholder="0" 
                      //@ts-ignore
                      value={ctPhieuDat.donGia}
                      //@ts-ignore
                      onChange={(e) => setCTPhieuDat({ ...ctPhieuDat, donGia: Number(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Số Tiền Cọc (₫)</Label>
                    <Input 
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white" 
                      type="number" 
                      min="0"
                      placeholder="0" 
                      //@ts-ignore
                      value={phieuDat.soTienCoc}
                      //@ts-ignore
                      onChange={(e) => setPhieudat({ ...phieuDat, soTienCoc: Number(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                onClick={handleCreateBooking}
                disabled={createBookingMutation.isPending || createBookingDetailMutation.isPending}
              >
                {createBookingMutation.isPending || createBookingDetailMutation.isPending ? 'Đang tạo...' : 'Tạo Đặt Phòng'}
              </Button>
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
                  {bookings?.filter((booking) => filterStatus === "all" || booking.trangThai === filterStatus).map((booking) => (
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
                    <p className="text-sm text-gray-400">{booking?.ngayBdThue?.toString()} - {booking?.ngayDi?.toString()}</p>
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
