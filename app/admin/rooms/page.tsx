"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, Grid3x3, List } from "lucide-react"

// Mock data
const rooms = [
  { id: "101", floor: 1, type: "Standard", status: "available", price: 1200000 },
  { id: "102", floor: 1, type: "Standard", status: "occupied", price: 1200000 },
  { id: "103", floor: 1, type: "Deluxe", status: "dirty", price: 1500000 },
  { id: "104", floor: 1, type: "Deluxe", status: "available", price: 1500000 },
  { id: "201", floor: 2, type: "Suite", status: "reserved", price: 2800000 },
  { id: "202", floor: 2, type: "Suite", status: "occupied", price: 2800000 },
  { id: "203", floor: 2, type: "Executive", status: "available", price: 2200000 },
  { id: "204", floor: 2, type: "Executive", status: "maintenance", price: 2200000 },
  { id: "301", floor: 3, type: "VIP", status: "available", price: 3500000 },
  { id: "302", floor: 3, type: "VIP", status: "occupied", price: 3500000 },
]

const roomTypes = [
  { id: 1, name: "Standard", beds: "1 King", capacity: 2, price: 1200000 },
  { id: 2, name: "Deluxe", beds: "1 King", capacity: 2, price: 1500000 },
  { id: 3, name: "Suite", beds: "1 King + 1 Sofa", capacity: 4, price: 2800000 },
  { id: 4, name: "Executive", beds: "1 King", capacity: 2, price: 2200000 },
  { id: 5, name: "VIP", beds: "2 King", capacity: 4, price: 3500000 },
]

const statusConfig = {
  available: { label: "Trống", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  occupied: { label: "Đã Đặt", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  dirty: { label: "Đang Dọn", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  reserved: { label: "Đã Giữ", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  maintenance: { label: "Bảo Trì", color: "bg-red-500/10 text-red-500 border-red-500/20" },
}

export default function RoomsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterFloor, setFilterFloor] = useState<string>("all")

  const filteredRooms = rooms.filter((room) => {
    if (filterStatus !== "all" && room.status !== filterStatus) return false
    if (filterFloor !== "all" && room.floor.toString() !== filterFloor) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Phòng</h1>
          <p className="text-gray-400">Quản lý trạng thái và thông tin phòng khách sạn</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Phòng
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
              <DialogTitle>Thêm Phòng Mới</DialogTitle>
              <DialogDescription className="text-gray-400">Nhập thông tin phòng mới</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Số Phòng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="101" />
              </div>
              <div>
                <Label>Tầng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="1" />
              </div>
              <div>
                <Label>Loại Phòng</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {roomTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Thêm Phòng</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = rooms.filter((r) => r.status === status).length
          return (
            <Card key={status} className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
              <p className="text-gray-400 text-sm mb-1">{config.label}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="rooms" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="rooms" className="data-[state=active]:bg-blue-600">
            Sơ Đồ Phòng
          </TabsTrigger>
          <TabsTrigger value="types" className="data-[state=active]:bg-blue-600">
            Loại Phòng
          </TabsTrigger>
        </TabsList>

        {/* Room Diagram Tab */}
        <TabsContent value="rooms" className="space-y-4">
          {/* Filters */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Tìm kiếm phòng..." className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white" />
                </div>
              </div>
              <Select value={filterFloor} onValueChange={setFilterFloor}>
                <SelectTrigger className="w-[150px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Tầng" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="all">Tất cả tầng</SelectItem>
                  <SelectItem value="1">Tầng 1</SelectItem>
                  <SelectItem value="2">Tầng 2</SelectItem>
                  <SelectItem value="3">Tầng 3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="available">Trống</SelectItem>
                  <SelectItem value="occupied">Đã Đặt</SelectItem>
                  <SelectItem value="dirty">Đang Dọn</SelectItem>
                  <SelectItem value="reserved">Đã Giữ</SelectItem>
                  <SelectItem value="maintenance">Bảo Trì</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600" : "border-[#2a2a2a]"}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600" : "border-[#2a2a2a]"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Room Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="bg-[#1a1a1a] border-[#2a2a2a] p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">{room.id}</p>
                        <p className="text-sm text-gray-400">{room.type}</p>
                      </div>
                      <Badge className={statusConfig[room.status as keyof typeof statusConfig].color}>
                        {statusConfig[room.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <div className="pt-3 border-t border-[#2a2a2a]">
                      <p className="text-sm text-gray-400">Giá/đêm</p>
                      <p className="text-lg font-semibold text-white">{room.price.toLocaleString()}₫</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#2a2a2a]">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-medium">Số Phòng</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Tầng</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Loại</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Giá</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((room) => (
                      <tr key={room.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                        <td className="p-4 text-white font-semibold">{room.id}</td>
                        <td className="p-4 text-gray-400">Tầng {room.floor}</td>
                        <td className="p-4 text-gray-400">{room.type}</td>
                        <td className="p-4">
                          <Badge className={statusConfig[room.status as keyof typeof statusConfig].color}>
                            {statusConfig[room.status as keyof typeof statusConfig].label}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{room.price.toLocaleString()}₫</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Room Types Tab */}
        <TabsContent value="types">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Danh Sách Loại Phòng</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Thêm Loại Phòng
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2a]">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Tên Loại</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Loại Giường</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Sức Chứa</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Giá/Đêm</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Số Phòng</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypes.map((type) => {
                    const roomCount = rooms.filter((r) => r.type === type.name).length
                    return (
                      <tr key={type.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                        <td className="p-4 text-white font-semibold">{type.name}</td>
                        <td className="p-4 text-gray-400">{type.beds}</td>
                        <td className="p-4 text-gray-400">{type.capacity} người</td>
                        <td className="p-4 text-white">{type.price.toLocaleString()}₫</td>
                        <td className="p-4 text-gray-400">{roomCount} phòng</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
