"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getListKhachHang, createKhachHang } from "@/lib/services/khach-hang.service"
import { KhachHang } from "@/lib/generated/prisma"
import { Search, Plus, Eye, LogIn, LogOut } from "lucide-react"
import { PHAI } from "@/lib/constants/constants"


const statusConfig = {
  "checked-in": { label: "Đang Lưu Trú", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  guest: { label: "Khách Hàng", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<KhachHang[]>([])
    const [activeTab, setActiveTab] = useState("check-in")
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    ho: "",
    ten: "",
    sdt: "",
    email: "",
    diaChi: "",
    gioiTinh: "Nam",
  })

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await getListKhachHang()
      if (response.success && response.data) {
        setCustomers(response.data)
      } else {
        console.error(response.error)
      }
    }

    fetchCustomers()
  }, [])

  const handleCreateCustomer = async () => {
    const response = await createKhachHang({
      ho: newCustomer.ho,
      ten: newCustomer.ten,
      sdt: newCustomer.sdt,
      email: newCustomer.email,
      diaChi: newCustomer.diaChi,
      maSoThue: null,
      matKhau: null,
    })
    if (response.success && response.data) {
      setCustomers([response.data, ...customers])
      setDialogOpen(false)
      setNewCustomer({
        ho: "",
        ten: "",
        sdt: "",
        email: "",
        diaChi: "",
        gioiTinh: "Nam",
      })
    } else {
      console.error(response.error)
      alert(`Lỗi: ${response.message}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCustomer((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setNewCustomer((prev) => ({ ...prev, gioiTinh: value }))
  }

  return (
    <div className="space-y-6 bg-[#1a1a1a]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Nhận & Trả Phòng</h1>
        <p className="text-gray-400">Quản lý check-in và check-out khách hàng</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="check-in" className="data-[state=active]:bg-blue-600">
            <LogIn className="h-4 w-4 mr-2" />
            Nhận Phòng
          </TabsTrigger>
          <TabsTrigger value="check-out" className="data-[state=active]:bg-blue-600">
            <LogOut className="h-4 w-4 mr-2" />
            Trả Phòng
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-blue-600">
            Khách Hàng
          </TabsTrigger>
        </TabsList>

        {/* Check-in Tab */}
        <TabsContent value="check-in" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Thông Tin Nhận Phòng</h2>
              <div className="space-y-4">
                <div>
                  <Label>Tìm Đặt Phòng</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Nhập mã đặt phòng hoặc số điện thoại..."
                      className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <h3 className="text-white font-medium mb-3">Thông Tin Khách Hàng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Họ Tên</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <Label>Giới Tính</Label>
                      <Select value={newCustomer.gioiTinh} onValueChange={handleSelectChange}>
                        <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                          <SelectItem value={PHAI.NAM}>Nam</SelectItem>
                          <SelectItem value={PHAI.NU}>Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Số Điện Thoại</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="0901234567" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="email@example.com" />
                    </div>
                    <div>
                      <Label>CMND/CCCD</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="001234567890" />
                    </div>
                    <div>
                      <Label>Số Khách</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="2" />
                    </div>
                    <div className="col-span-2">
                      <Label>Địa Chỉ</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Địa chỉ đầy đủ" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <h3 className="text-white font-medium mb-3">Thông Tin Phòng</h3>
                  <div className="grid grid-cols-2 gap-4">
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Số Phòng</Label>
                      <Select>
                        <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                          <SelectValue placeholder="Chọn phòng" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                          <SelectItem value="101">101</SelectItem>
                          <SelectItem value="102">102</SelectItem>
                          <SelectItem value="103">103</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Ngày Nhận</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" />
                    </div>
                    <div>
                      <Label>Ngày Trả</Label>
                      <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="date" />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11">
                  <LogIn className="h-4 w-4 mr-2" />
                  Xác Nhận Nhận Phòng
                </Button>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Đặt Phòng Hôm Nay</h2>
              <div className="space-y-3">
                {/* TODO: Replace with actual check-in data */}
                {/* {customers
                  .filter((c) => c.status === "checked-in")
                  .map((customer) => (
                    <div key={customer.id} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                      <p className="text-white font-medium mb-1">{customer.name}</p>
                      <p className="text-sm text-gray-400">Phòng {customer.room}</p>
                      <p className="text-sm text-gray-400">{customer.phone}</p>
                    </div>
                  ))} */}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Check-out Tab */}
        <TabsContent value="check-out" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Thông Tin Trả Phòng</h2>
              <div className="space-y-4">
                <div>
                  <Label>Tìm Khách Hàng</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Nhập số phòng hoặc tên khách hàng..."
                      className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <h3 className="text-white font-medium mb-3">Thông Tin Lưu Trú</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 bg-[#0a0a0a] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Khách Hàng:</span>
                        <span className="text-white font-medium">Nguyễn Văn A</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Phòng:</span>
                        <span className="text-white font-medium">101 - Standard</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Nhận phòng:</span>
                        <span className="text-white">15/01/2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Trả phòng:</span>
                        <span className="text-white">18/01/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <h3 className="text-white font-medium mb-3">Chi Tiết Hóa Đơn</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                      <span className="text-gray-400">Tiền phòng (3 đêm)</span>
                      <span className="text-white">3,600,000₫</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                      <span className="text-gray-400">Dịch vụ</span>
                      <span className="text-white">500,000₫</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                      <span className="text-gray-400">Giảm giá</span>
                      <span className="text-green-500">-200,000₫</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <span className="text-white font-semibold">Tổng Cộng</span>
                      <span className="text-blue-500 font-bold text-xl">3,900,000₫</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-[#2a2a2a] text-white hover:bg-[#2a2a2a] bg-transparent">
                    In Hóa Đơn
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <LogOut className="h-4 w-4 mr-2" />
                    Xác Nhận Trả Phòng
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Trả Phòng Hôm Nay</h2>
              <div className="space-y-3">
                {/* TODO: Replace with actual check-out data */}
                {/* {customers
                  .filter((c) => c.status === "checked-in")
                  .slice(0, 2)
                  .map((customer) => (
                    <div key={customer.id} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a]">
                      <p className="text-white font-medium mb-1">{customer.name}</p>
                      <p className="text-sm text-gray-400">Phòng {customer.room}</p>
                      <p className="text-sm text-yellow-500">Trả phòng: {customer.checkOut}</p>
                    </div>
                  ))} */}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Khách Hàng
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <DialogHeader>
                    <DialogTitle>Thêm Khách Hàng Mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Họ</Label>
                        <Input name="ho" value={newCustomer.ho} onChange={handleInputChange} className="bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                      </div>
                      <div>
                        <Label>Tên</Label>
                        <Input name="ten" value={newCustomer.ten} onChange={handleInputChange} className="bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                      </div>
                    </div>
                    <div>
                      <Label>Số Điện Thoại</Label>
                      <Input name="sdt" value={newCustomer.sdt} onChange={handleInputChange} className="bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input name="email" value={newCustomer.email} onChange={handleInputChange} type="email" className="bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                    </div>
                    <div>
                      <Label>Địa chỉ</Label>
                      <Input name="diaChi" value={newCustomer.diaChi} onChange={handleInputChange} className="bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                    </div>
                    <Button onClick={handleCreateCustomer} className="w-full bg-blue-600 hover:bg-blue-700">Thêm</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2a]">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Mã KH</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Họ Tên</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Liên Hệ</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Phòng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Tổng Chi</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Lượt Ở</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.cccd} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                      <td className="p-4 text-white font-semibold">{customer.cccd}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{customer.ho + ' ' + customer.ten}</p>
                          <p className="text-sm text-gray-400">{customer.diaChi}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-white text-sm">{customer.sdt}</p>
                          <p className="text-gray-400 text-sm">{customer.email}</p>
                        </div>
                      </td>
                      {/* TODO: Get room info */}
                      <td className="p-4 text-gray-400">{"-"}</td>
                      <td className="p-4">
                        {/* TODO: Get customer status */}
                        <Badge className={statusConfig["guest"].color}>
                          {statusConfig["guest"].label}
                        </Badge>
                      </td>
                      {/* TODO: Get total spent */}
                      <td className="p-4 text-white">{0}₫</td>
                      {/* TODO: Get visits */}
                      <td className="p-4 text-gray-400">{0} lần</td>
                      <td className="p-4">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
