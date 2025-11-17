"use client"

import { useState, useEffect } from "react"
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
import { generateBookingId, useBookings, useCreateBooking, useCreateBookingDetail, useUpdateBookingStatus, useUpdateBookingDetail } from "@/lib/hooks/booking"
import { useRoomTypes } from "@/lib/hooks/roomTypes"
import { useRoomClasses } from "@/lib/hooks/roomClass"
import { useGetCustomerByCCCD, useCreateCustomer } from "@/lib/hooks/customer"
import { CTPhieuDat, PhieuDat } from "@/lib/generated/prisma"
import type { PhieuDatFull } from "@/lib/types/relations"
import { useToast } from "@/components/ui/toast"
import { useCreateInvoice, useCreatePhieuThue, useDeleteInvoice, useInvoices, generatePhieuThueId, generateInvoiceId, createCTPhieuThuesForBooking } from "@/lib/hooks/invoice"
import { getListPhieuThue } from "@/lib/services"

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
    soTienCoc: 50000,
    cccd: "",
    idNv: "NV1",
  })
  const toast = useToast()
  const [ctPhieuDat, setCTPhieuDat] = useState<Omit<CTPhieuDat, "idCtPd">>({
    idPd: "PD123",
    idHp: "HP123",
    soLuongPhongO: 1,
    //@ts-ignore
    donGia: 100000,
  })
  const [khachHang, setKhachHang] = useState({
    ho: "",
    ten: "",
    sdt: "",
    email: "",
    diaChi: "",
    maSoThue: "",
    matKhau: "",
  })
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<{
    idPd: string
    idHp: string
    soLuongPhongO: number
    donGia: number
  } | null>(null)

  const { bookings, isLoading: isLoadingBookings } = useBookings()
  const { roomTypes } = useRoomTypes()
  const { roomClasses } = useRoomClasses()

  const createBookingMutation = useCreateBooking()
  const createBookingDetailMutation = useCreateBookingDetail()
  const createCustomerMutation = useCreateCustomer()
  const updateBookingStatusMutation = useUpdateBookingStatus()
  const updateBookingDetailMutation = useUpdateBookingDetail()
  const createInvoiceMutation = useCreateInvoice()
  const createPhieuThueMutation = useCreatePhieuThue()
  const deleteInvoiceMutation = useDeleteInvoice()
  const { invoices } = useInvoices()
  
  // Query customer by CCCD when CCCD is entered
  const { data: customerData, isLoading: isLoadingCustomer } = useGetCustomerByCCCD(phieuDat.cccd)
  
  // Auto-fill customer info when found
  useEffect(() => {
    if (customerData?.success && customerData?.data) {
      const customer = customerData.data
      setKhachHang({
        ho: customer.ho || "",
        ten: customer.ten || "",
        sdt: customer.sdt || "",
        email: customer.email || "",
        diaChi: customer.diaChi || "",
        maSoThue: customer.maSoThue || "",
        matKhau: customer.matKhau || "",
      })
    } else if (customerData?.success === false && phieuDat.cccd.length >= 12) {
      // Customer not found, reset form to allow manual input
      // Don't reset if CCCD is still being typed
      setKhachHang({
        ho: "",
        ten: "",
        sdt: "",
        email: "",
        diaChi: "",
        maSoThue: "",
        matKhau: "",
      })
    }
  }, [customerData, phieuDat.cccd])

  const handleCreateBooking = () => {
    // Validate required fields
    if (!phieuDat.cccd) {
      toast.error("Vui lòng nhập CCCD hợp lệ (12 số)")
      return
    }
    
    if (!khachHang.ho || !khachHang.ten) {
      toast.error("Vui lòng nhập đầy đủ họ và tên")
      return
    }

    const idPd = generateBookingId(bookings)
    const customerExists = customerData?.success && customerData?.data

    // Create customer if not exists
    if (!customerExists) {
      createCustomerMutation.mutate({
        cccd: phieuDat.cccd,
        ho: khachHang.ho,
        ten: khachHang.ten,
        sdt: khachHang.sdt || null,
        email: khachHang.email || null,
        diaChi: khachHang.diaChi || null,
        maSoThue: khachHang.maSoThue || null,
        matKhau: khachHang.matKhau || null,
      }, {
        onSuccess: () => {
          // After creating customer, create booking
          createBooking(idPd)
        },
        onError: (error) => {
          console.log(error)
          toast.error("Tạo khách hàng thất bại")
        }
      })
    } else {
      // Customer exists, create booking directly
      createBooking(idPd)
    }
  }

  const createBooking = (idPd: string) => {
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
            setKhachHang({
              ho: "",
              ten: "",
              sdt: "",
              email: "",
              diaChi: "",
              maSoThue: "",
              matKhau: "",
            })
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

  const createInvoice = async (idPd: string) => {
    try {
      const booking = bookings?.find((b) => b.idPd === idPd)
      if (!booking) {
        toast.error("Không tìm thấy đơn đặt phòng")
        return
      }

      let phieuThueId = booking.phieuThues && booking.phieuThues.length > 0 ? booking.phieuThues[0].idPt : null

      if (!phieuThueId) {
        const phieuThueListResponse = await getListPhieuThue()
        const phieuThueList = phieuThueListResponse.data || []
        const newPhieuThueId = generatePhieuThueId(phieuThueList)

        try {
          const response = await createPhieuThueMutation.mutateAsync(
            {
              idPt: newPhieuThueId,
              ngayLap: new Date(),
              idNv: booking.idNv || "NV1",
              cccd: booking.cccd || "",
              idPd: booking.idPd || "",
            } as any
          )

          if (!response?.success) {
            toast.error("Tạo phiếu thuê thất bại")
            return
          }

          phieuThueId = response.data?.idPt || newPhieuThueId
        } catch (error) {
          console.error(error)
          toast.error("Tạo phiếu thuê thất bại")
          return
        }

        try {
          await createCTPhieuThuesForBooking(booking, phieuThueId)
          toast.success("Tạo phiếu thuê thành công")
        } catch (error) {
          console.error(error)
          toast.error(error instanceof Error ? error.message : "Tạo chi tiết phiếu thuê thất bại")
          return
        }
      }

      if (!phieuThueId) {
        toast.error("Không thể xác định phiếu thuê để tạo hóa đơn")
        return
      }

      await createHoaDonForBooking(booking as PhieuDatFull, phieuThueId)
    } catch (error) {
      console.error(error)
      toast.error("Đã xảy ra lỗi khi tạo hóa đơn")
    }
  }

  const deleteInvoice = async (booking: PhieuDatFull) => {
    const relatedInvoices = invoices.filter((invoice) => invoice.phieuThue?.idPd === booking.idPd)

    if (relatedInvoices.length === 0) {
      return
    }

    try {
      await Promise.all(
        relatedInvoices.map((invoice) => deleteInvoiceMutation.mutateAsync(invoice.idHd))
      )
      toast.success("Đã xoá hóa đơn của đơn đặt phòng này")
    } catch (error) {
      console.error(error)
      toast.error("Xoá hóa đơn thất bại")
    }
  }

  const createHoaDonForBooking = async (booking: PhieuDatFull, phieuThueId: string) => {
    const nights = Math.ceil(
      (booking.ngayDi.getTime() - booking.ngayBdThue.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    const totalAmount = booking.ctPhieuDats?.reduce((sum, ct) => {
      const donGia = typeof ct.donGia === 'string' ? parseFloat(ct.donGia) : Number(ct.donGia)
      return sum + donGia * ct.soLuongPhongO * nights
    }, 0) || Number(booking.soTienCoc)

    const invoiceId = generateInvoiceId(invoices)

    try {
      const response = await createInvoiceMutation.mutateAsync(
        {
          idHd: invoiceId,
          ngayLap: new Date(),
          idNv: booking.idNv || "NV1",
          idPt: phieuThueId,
          //@ts-ignore
          tongTien: totalAmount,
          trangThai: "pending",
          //@ts-ignore
          soTienGiam: 0,
        } as any
      )

      if (response?.success) {
        toast.success("Tạo hóa đơn thành công")
      } else {
        toast.error("Tạo hóa đơn thất bại")
      }
    } catch (error) {
      console.error(error)
      toast.error("Tạo hóa đơn thất bại")
    }
  }

  const handleUpdateStatus = (idPd: string, newStatus: string) => {
    const booking = bookings?.find((b) => b.idPd === idPd)
    if (!booking) {
      toast.error("Không tìm thấy đơn đặt phòng")
      return
    }

    if (newStatus === "cancelled" && booking.trangThai === "completed") {
      toast.error("Đơn đã hoàn thành không thể chuyển sang trạng thái hủy")
      return
    }

    updateBookingStatusMutation.mutate(
      { idPd, trangThai: newStatus },
      {
        onSuccess: () => {
          if (newStatus === "completed") {
            createInvoice(idPd)
          } else if (newStatus === "cancelled" && booking.trangThai !== "cancelled") {
            deleteInvoice(booking as PhieuDatFull)
          }
          toast.success("Cập nhật trạng thái thành công")
        },
        onError: (error) => {
          console.log(error)
          toast.error("Cập nhật trạng thái thất bại")
        },
      }
    )
  }

  const handleEditBookingDetail = (booking: PhieuDatFull) => {
    // Get first booking detail to edit
    const firstDetail = booking.ctPhieuDats?.[0]
    if (firstDetail) {
      setSelectedBookingDetail({
        idPd: firstDetail.idPd,
        idHp: firstDetail.idHp,
        soLuongPhongO: firstDetail.soLuongPhongO,
        donGia: Number(firstDetail.donGia),
      })
      setOpenEditDialog(true)
    }
  }

  const handleUpdateBookingDetail = () => {
    if (bookings?.find((b) => b.idPd === selectedBookingDetail?.idPd)?.trangThai === statusConfig.completed.label) {
      toast.error("Đơn đặt phòng đã được thanh toán, không thể cập nhật chi tiết")
      return
    }

    if (!selectedBookingDetail) return

    updateBookingDetailMutation.mutate(
      {
        idPd: selectedBookingDetail.idPd,
        idHp: selectedBookingDetail.idHp,
        data: {
          soLuongPhongO: selectedBookingDetail.soLuongPhongO,
          //@ts-ignore
          donGia: selectedBookingDetail.donGia,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cập nhật chi tiết đặt phòng thành công")
          setOpenEditDialog(false)
          setSelectedBookingDetail(null)
        },
        onError: (error) => {
          console.log(error)
          toast.error("Cập nhật chi tiết đặt phòng thất bại")
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Đặt Phòng</h1>
          <p className="text-gray-400">Quản lý và theo dõi các đơn đặt phòng</p>
        </div>
        <Dialog 
          open={openCreateDialog} 
          onOpenChange={(open) => {
            setOpenCreateDialog(open)
            if (!open) {
              // Reset form when dialog closes
              setPhieudat({
                ngayDat: new Date(),
                ngayBdThue: new Date(),
                ngayDi: new Date(),
                trangThai: "pending",
                //@ts-ignore
                soTienCoc: 50000,
                cccd: "",
                idNv: "NV1",
              })
              setKhachHang({
                ho: "",
                ten: "",
                sdt: "",
                email: "",
                diaChi: "",
                maSoThue: "",
                matKhau: "",
              })
              setCTPhieuDat({
                idPd: "PD123",
                idHp: "HP123",
                soLuongPhongO: 1,
                //@ts-ignore
                donGia: 100000,
              })
              setIdHp("")
            }
          }}
        >
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
              <div className="col-span-2">
                <Label>Cccd</Label>
                <div className="relative">
                  <Input
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    placeholder="CCCD (12 số)"
                    value={phieuDat.cccd}
                    onChange={(e) => setPhieudat({ ...phieuDat, cccd: e.target.value })}
                    maxLength={12}
                  />
                  {isLoadingCustomer && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      Đang tìm...
                    </span>
                  )}
                  {customerData?.success && customerData?.data && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-400">
                      Đã tìm thấy
                    </span>
                  )}
                  {customerData?.success === false && phieuDat.cccd.length >= 12 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-yellow-400">
                      Chưa có trong hệ thống
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label>Họ</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Họ"
                  value={khachHang.ho}
                  onChange={(e) => setKhachHang({ ...khachHang, ho: e.target.value })}
                />
              </div>
              <div>
                <Label>Tên</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Tên"
                  value={khachHang.ten}
                  onChange={(e) => setKhachHang({ ...khachHang, ten: e.target.value })}
                />
              </div>
              <div>
                <Label>Số Điện Thoại</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Số điện thoại"
                  value={khachHang.sdt}
                  onChange={(e) => setKhachHang({ ...khachHang, sdt: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  type="email"
                  placeholder="Email"
                  value={khachHang.email}
                  onChange={(e) => setKhachHang({ ...khachHang, email: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label>Địa Chỉ</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Địa chỉ"
                  value={khachHang.diaChi}
                  onChange={(e) => setKhachHang({ ...khachHang, diaChi: e.target.value })}
                />
              </div>
              <div>
                <Label>Mã Số Thuế</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Mã số thuế"
                  value={khachHang.maSoThue}
                  onChange={(e) => setKhachHang({ ...khachHang, maSoThue: e.target.value })}
                />
              </div>
              <div>
                <Label>Mật Khẩu</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  type="password"
                  placeholder="Mật khẩu"
                  value={khachHang.matKhau}
                  onChange={(e) => setKhachHang({ ...khachHang, matKhau: e.target.value })}
                />
              </div>
              <div className="col-span-2 border-t border-[#2a2a2a] pt-4 mt-2">
                <Label>Thông Tin Phòng</Label>
              </div>
              <div>
                <Label>Loại Phòng</Label>
                <Select onValueChange={(value) => setIdHp(roomClasses.find((roomClass) => roomClass.idLp === value)?.idHp || "HP1")}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {roomTypes?.map((roomType) => (
                      <SelectItem value={roomType.idLp}>{roomType.tenLp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Số Khách</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="2" onChange={(e) => setCTPhieuDat({ ...ctPhieuDat, soLuongPhongO: Number(e.target.value) })}/>
              </div>
              <div>
                <Label>Ngày Nhận Phòng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" onChange={(e) => setPhieudat({ ...phieuDat, ngayBdThue: new Date(e.target.value) })}/>
              </div>
              <div>
                <Label>Ngày Trả Phòng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" onChange={(e) => setPhieudat({ ...phieuDat, ngayDi: new Date(e.target.value) })}/>
              </div>
              <div className="col-span-2">
                <Label>Ghi Chú</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Ghi chú đặc biệt..." />
              </div>
              <div className="col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCreateBooking}>
                  Tạo Đặt Phòng
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = bookings?.filter((b) => b.trangThai === status).length || 0
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
                  {isLoadingBookings ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : bookings?.filter((booking) => filterStatus === "all" || booking.trangThai === filterStatus).length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400">
                        Không có dữ liệu đặt phòng
                      </td>
                    </tr>
                  ) : (
                    bookings?.filter((booking) => filterStatus === "all" || booking.trangThai === filterStatus).map((booking) => {
                      // Calculate total from booking details
                      const totalAmount = booking.ctPhieuDats?.reduce((sum, ct) => {
                        const nights = Math.ceil((booking.ngayDi.getTime() - booking.ngayBdThue.getTime()) / (1000 * 60 * 60 * 24))
                        return sum + (Number(ct.donGia) * ct.soLuongPhongO * nights)
                      }, 0) || Number(booking.soTienCoc)
                      
                      // Get room info from first booking detail
                      const firstDetail = booking.ctPhieuDats?.[0]
                      const roomTypeName = firstDetail?.hangPhong?.loaiPhong?.tenLp || "N/A"
                      const roomCount = booking.ctPhieuDats?.reduce((sum, ct) => sum + ct.soLuongPhongO, 0) || 0
                      
                      // Calculate nights
                      const nights = Math.ceil((booking.ngayDi.getTime() - booking.ngayBdThue.getTime()) / (1000 * 60 * 60 * 24))
                      
                      // Format customer name
                      const customerName = booking.khachHang ? `${booking.khachHang.ho} ${booking.khachHang.ten}`.trim() : "N/A"
                      
                      return (
                        <tr key={booking.idPd} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                          <td className="p-4 text-white font-semibold">{booking.idPd}</td>
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{customerName}</p>
                              <p className="text-sm text-gray-400">{booking.khachHang?.sdt || "N/A"}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white">{roomCount} phòng</p>
                              <p className="text-sm text-gray-400">{roomTypeName}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white text-sm">{new Date(booking.ngayBdThue).toLocaleDateString("vi-VN")}</p>
                              <p className="text-gray-400 text-sm">{new Date(booking.ngayDi).toLocaleDateString("vi-VN")}</p>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">{nights} đêm</td>
                          <td className="p-4 text-white font-semibold">{totalAmount.toLocaleString("vi-VN")}₫</td>
                          <td className="p-4">
                            <Badge className={statusConfig[booking.trangThai as keyof typeof statusConfig]?.color || statusConfig.pending.color}>
                              {statusConfig[booking.trangThai as keyof typeof statusConfig]?.label || booking.trangThai}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Select
                                value={booking.trangThai}
                                onValueChange={(value) => handleUpdateStatus(booking.idPd, value)}
                                disabled={updateBookingStatusMutation.isPending}
                              >
                                <SelectTrigger className="w-[160px] h-8 bg-[#0a0a0a] border-[#2a2a2a] text-white text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                                  <SelectItem value="pending">Chờ Xác Nhận</SelectItem>
                                  <SelectItem value="confirmed">Đã Xác Nhận</SelectItem>
                                  <SelectItem value="checked-in">Đã Nhận Phòng</SelectItem>
                                  <SelectItem value="completed">Hoàn Thành</SelectItem>
                                  <SelectItem value="cancelled">Đã Hủy</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-gray-400 hover:text-white"
                                onClick={() => handleEditBookingDetail(booking)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
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
                {isLoadingBookings ? (
                  <p className="text-gray-400 text-sm text-center py-4">Đang tải...</p>
                ) : bookings?.filter((booking) => {
                  if (!selectedDate) return false
                  const bookingDate = new Date(booking.ngayBdThue)
                  return bookingDate.toDateString() === selectedDate.toDateString()
                }).slice(0, 5).length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">Không có đặt phòng trong ngày này</p>
                ) : (
                  bookings?.filter((booking) => {
                    if (!selectedDate) return false
                    const bookingDate = new Date(booking.ngayBdThue)
                    return bookingDate.toDateString() === selectedDate.toDateString()
                  }).slice(0, 5).map((booking) => {
                    const firstDetail = booking.ctPhieuDats?.[0]
                    const roomTypeName = firstDetail?.hangPhong?.loaiPhong?.tenLp || "N/A"
                    const roomCount = booking.ctPhieuDats?.reduce((sum, ct) => sum + ct.soLuongPhongO, 0) || 0
                    const customerName = booking.khachHang ? `${booking.khachHang.ho} ${booking.khachHang.ten}`.trim() : "N/A"
                    
                    return (
                      <div key={booking.idPd} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white font-medium">{customerName}</p>
                          <Badge className={statusConfig[booking.trangThai as keyof typeof statusConfig]?.color || statusConfig.pending.color}>
                            {statusConfig[booking.trangThai as keyof typeof statusConfig]?.label || booking.trangThai}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          {roomCount} phòng - {roomTypeName}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(booking.ngayBdThue).toLocaleDateString("vi-VN")} - {new Date(booking.ngayDi).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    )
                  })
                )}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Booking Detail Dialog */}
      <Dialog 
        open={openEditDialog} 
        onOpenChange={(open) => {
          setOpenEditDialog(open)
          if (!open) {
            setSelectedBookingDetail(null)
          }
        }}
      >
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh Sửa Chi Tiết Đặt Phòng</DialogTitle>
            <DialogDescription className="text-gray-400">
              Cập nhật thông tin chi tiết đặt phòng
            </DialogDescription>
          </DialogHeader>
          {selectedBookingDetail && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Mã Đặt Phòng</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  value={selectedBookingDetail.idPd}
                  disabled
                />
              </div>
              <div className="col-span-2">
                <Label>Hạng Phòng</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  value={selectedBookingDetail.idHp}
                  disabled
                />
              </div>
              <div>
                <Label>Số Lượng Phòng Ở</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  type="number"
                  min="1"
                  value={selectedBookingDetail.soLuongPhongO}
                  onChange={(e) =>
                    setSelectedBookingDetail({
                      ...selectedBookingDetail,
                      soLuongPhongO: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div>
                <Label>Đơn Giá</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  type="number"
                  min="0"
                  value={selectedBookingDetail.donGia}
                  onChange={(e) =>
                    setSelectedBookingDetail({
                      ...selectedBookingDetail,
                      donGia: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="col-span-2 flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="border-[#2a2a2a] text-white hover:bg-[#2a2a2a]"
                  onClick={() => {
                    setOpenEditDialog(false)
                    setSelectedBookingDetail(null)
                  }}
                >
                  Hủy
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpdateBookingDetail}
                  disabled={updateBookingDetailMutation.isPending}
                >
                  {updateBookingDetailMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
