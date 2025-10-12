"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Utensils, Shirt, Phone } from "lucide-react"

const services = [
  { id: 1, name: "Bữa Sáng Buffet", category: "food", price: 150000, unit: "suất", icon: Utensils },
  { id: 2, name: "Bữa Trưa Set Menu", category: "food", price: 250000, unit: "suất", icon: Utensils },
  { id: 3, name: "Bữa Tối À La Carte", category: "food", price: 350000, unit: "suất", icon: Utensils },
  { id: 4, name: "Giặt Quần Áo", category: "laundry", price: 30000, unit: "kg", icon: Shirt },
  { id: 5, name: "Ủi Quần Áo", category: "laundry", price: 20000, unit: "bộ", icon: Shirt },
  { id: 6, name: "Giặt Hấp", category: "laundry", price: 50000, unit: "kg", icon: Shirt },
  { id: 7, name: "Gọi Điện Nội Địa", category: "phone", price: 5000, unit: "phút", icon: Phone },
  { id: 8, name: "Gọi Điện Quốc Tế", category: "phone", price: 20000, unit: "phút", icon: Phone },
]

const serviceUsage = [
  {
    id: 1,
    room: "101",
    customer: "Nguyễn Văn A",
    service: "Bữa Sáng Buffet",
    quantity: 2,
    price: 150000,
    total: 300000,
    date: "2025-01-15",
    status: "completed",
  },
  {
    id: 2,
    room: "201",
    customer: "Trần Thị B",
    service: "Giặt Quần Áo",
    quantity: 3,
    price: 30000,
    total: 90000,
    date: "2025-01-15",
    status: "pending",
  },
  {
    id: 3,
    room: "302",
    customer: "Lê Minh C",
    service: "Bữa Tối À La Carte",
    quantity: 1,
    price: 350000,
    total: 350000,
    date: "2025-01-14",
    status: "completed",
  },
]

const categoryConfig = {
  food: { label: "Ăn Uống", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  laundry: { label: "Giặt Ủi", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  phone: { label: "Điện Thoại", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
}

const statusConfig = {
  pending: { label: "Chờ Xử Lý", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  completed: { label: "Hoàn Thành", color: "bg-green-500/10 text-green-500 border-green-500/20" },
}

export default function ServicesPage() {
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredServices = services.filter((service) => {
    if (filterCategory !== "all" && service.category !== filterCategory) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Dịch Vụ</h1>
          <p className="text-gray-400">Quản lý dịch vụ và theo dõi sử dụng</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Dịch Vụ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
              <DialogTitle>Thêm Dịch Vụ Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tên Dịch Vụ</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Bữa sáng buffet" />
              </div>
              <div>
                <Label>Danh Mục</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="food">Ăn Uống</SelectItem>
                    <SelectItem value="laundry">Giặt Ủi</SelectItem>
                    <SelectItem value="phone">Điện Thoại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="150000" />
                </div>
                <div>
                  <Label>Đơn Vị</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="suất" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Thêm Dịch Vụ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Tổng Dịch Vụ</p>
          <p className="text-2xl font-bold text-white">{services.length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Đang Sử Dụng</p>
          <p className="text-2xl font-bold text-white">{serviceUsage.filter((s) => s.status === "pending").length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Hoàn Thành Hôm Nay</p>
          <p className="text-2xl font-bold text-white">{serviceUsage.filter((s) => s.status === "completed").length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Doanh Thu Hôm Nay</p>
          <p className="text-2xl font-bold text-white">
            {serviceUsage.reduce((sum, s) => sum + s.total, 0).toLocaleString()}₫
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="catalog" className="data-[state=active]:bg-blue-600">
            Danh Mục Dịch Vụ
          </TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-blue-600">
            Sử Dụng Dịch Vụ
          </TabsTrigger>
        </TabsList>

        {/* Catalog Tab */}
        <TabsContent value="catalog" className="space-y-4">
          {/* Filters */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm dịch vụ..." className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="food">Ăn Uống</SelectItem>
                  <SelectItem value="laundry">Giặt Ủi</SelectItem>
                  <SelectItem value="phone">Điện Thoại</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.id}
                  className="bg-[#1a1a1a] border-[#2a2a2a] p-6 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <Badge className={categoryConfig[service.category as keyof typeof categoryConfig].color}>
                      {categoryConfig[service.category as keyof typeof categoryConfig].label}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-white">{service.price.toLocaleString()}₫</span>
                    <span className="text-gray-400">/ {service.unit}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#2a2a2a] text-white hover:bg-[#2a2a2a] bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#2a2a2a] text-red-500 hover:bg-red-500/10 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-4">
          <div className="flex items-center justify-between">
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo phòng, khách hàng..."
                  className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                />
              </div>
            </Card>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Sử Dụng
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <DialogHeader>
                  <DialogTitle>Thêm Sử Dụng Dịch Vụ</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Số Phòng</Label>
                    <Select>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Chọn phòng" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectItem value="101">101 - Nguyễn Văn A</SelectItem>
                        <SelectItem value="201">201 - Trần Thị B</SelectItem>
                        <SelectItem value="302">302 - Lê Minh C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Dịch Vụ</Label>
                    <Select>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Chọn dịch vụ" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name} - {service.price.toLocaleString()}₫
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Số Lượng</Label>
                    <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="1" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Thêm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2a]">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Phòng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Khách Hàng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Dịch Vụ</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Số Lượng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Đơn Giá</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Thành Tiền</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Ngày</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceUsage.map((usage) => (
                    <tr key={usage.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                      <td className="p-4 text-white font-semibold">{usage.room}</td>
                      <td className="p-4 text-gray-400">{usage.customer}</td>
                      <td className="p-4 text-white">{usage.service}</td>
                      <td className="p-4 text-gray-400">{usage.quantity}</td>
                      <td className="p-4 text-gray-400">{usage.price.toLocaleString()}₫</td>
                      <td className="p-4 text-white font-semibold">{usage.total.toLocaleString()}₫</td>
                      <td className="p-4 text-gray-400">{usage.date}</td>
                      <td className="p-4">
                        <Badge className={statusConfig[usage.status as keyof typeof statusConfig].color}>
                          {statusConfig[usage.status as keyof typeof statusConfig].label}
                        </Badge>
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
