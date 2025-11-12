"use client"

import { useState, type ChangeEvent } from "react"
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
import { useRemoveRoomById, useRooms } from "@/lib/hooks/room"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPhong } from "@/lib/services"
import type { Phong } from "@/lib/generated/prisma"
import RoomHeader from "./header/page"
import RoomStatsPage from "./stats/page"
import { generateRoomClassId, useCreateRoomClass, useRoomClasses } from "@/lib/hooks/roomClass"
import { generateRoomTypeId, useCreateRoomType, useRoomTypes } from "@/lib/hooks/roomTypes"
import { useTrangThai } from "@/lib/hooks/trangThai"
import { useToast } from "@/components/ui/toast"
import { RoomTypeForm } from "@/lib/types/room"
import { id } from "date-fns/locale"

// Mock data
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
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [roomId, setRoomId] = useState<string>("")

  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [newRoomType, setNewRoomType] = useState<RoomTypeForm>({
    tenLoai: "",
    loaiGiuong: "",
    sucChua: "",
    gia: "",
  })
  const [phong, setPhong] = useState<Phong>({
    soPhong: "",
    tang: 0,
    idHp: "",
    idTt: "",
  })
  
  const createRoomTypeMutation = useCreateRoomType()
  const createRoomClassMutation = useCreateRoomClass()
  const { rooms, isLoading, isError } = useRooms()
  const removeRoomMutation = useRemoveRoomById()
  const queryClient = useQueryClient()
  const createRoomMutation = useMutation({
    mutationFn: createPhong,
  })

  const toast = useToast()
  const rc = useRoomClasses()
  const rt = useRoomTypes()
  const tt = useTrangThai()

  const filteredRooms = rooms?.filter((room) => {
    if (filterStatus !== "all" && room.trangThai.tenTrangThai.toLowerCase() !== filterStatus) return false
    if (filterFloor !== "all" && room.tang.toString() !== filterFloor) return false
    return true
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading rooms</div>

  const handleRoomTypeFieldChange = (field: keyof RoomTypeForm) => (event: ChangeEvent<HTMLInputElement>) => {
    setNewRoomType((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const removeRoomById = (id: string) => {
    console.log("remove room by id")
    removeRoomMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Xóa phòng thành công")
        queryClient.invalidateQueries({ queryKey: ["rooms"] })
      },
      onError: (error) => {
        toast.error("Xóa phòng thất bại")
        console.log(error)
      },
    })
  }


  const createRoomType = () => {
    if (!newRoomType.tenLoai || !newRoomType.loaiGiuong || !newRoomType.sucChua || !newRoomType.gia) {
      toast.error("Vui lòng điền đầy đủ thông tin loại phòng")
      return
    }

    const idLp = generateRoomTypeId(rt.roomTypes)
    createRoomTypeMutation.mutate({
      idLp: idLp,
      tenLp: newRoomType.tenLoai,
      moTa: null
    }, {
      onSuccess: () => {
        createRoomClassMutation.mutate({
          //@ts-ignore
          idHp: generateRoomClassId(rc.roomClasses),
          idLp: idLp,
        }, {
          onSuccess: () => {
            toast.success("Tạo loại phòng thành công")
            queryClient.invalidateQueries({ queryKey: ["room-types"] })
            setTypeDialogOpen(false)
            setNewRoomType({
              tenLoai: "",
              loaiGiuong: "",
              sucChua: "",
              gia: "",
            })
          },
          onError: (error) => {
            toast.error("Tạo loại giuong thất bại")
            console.log(error)
          }
        })
      },
    })
    }

  const createRoom = () => {
    // Validate required fields
    if (!phong.soPhong || !phong.tang || !phong.idHp || !phong.idTt) {
      toast.error("Vui lòng điền đầy đủ thông tin phòng")
      return
    }

    createRoomMutation.mutate(phong, {
      onSuccess: () => {
        setOpenDialog(false)
        toast.success("Tạo phòng thành công")
        queryClient.invalidateQueries({ queryKey: ["rooms"] })
        // Reset form
        setPhong({
          soPhong: "",
          tang: 0,
          idHp: "",
          idTt: "",
        })
      },
      onError: (error) => {
        toast.error("Tạo phòng thất bại")
        console.log(error)
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <RoomHeader roomClasses={rc.roomClasses} trangThais={tt.trangThais} phong={phong} createRoom={createRoom} setPhong={setPhong} open={openDialog} setOpen={setOpenDialog} />

      {/* Stats */}
      <RoomStatsPage rooms={rooms} />

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
              {filteredRooms?.map((room) => (
                <Card
                  key={room.idHp}
                  className="bg-[#1a1a1a] border-[#2a2a2a] p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">{room.soPhong}</p>
                        <p className="text-sm text-gray-400">{rt.roomTypes?.find(rt => rt.idLp === room.hangPhong.idLp)?.tenLp}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusConfig[room.trangThai.tenTrangThai.toLowerCase() as keyof typeof statusConfig]?.color}>
                          {statusConfig[room.trangThai.tenTrangThai.toLowerCase() as keyof typeof statusConfig]?.label}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => removeRoomById(room.soPhong)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#2a2a2a]">
                      <p className="text-sm text-gray-400">Giá/đêm</p>
                      <p className="text-lg font-semibold text-white">{room.tang.toLocaleString()}₫</p>
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
                    {filteredRooms?.map((room) => (
                      <tr key={room.idHp} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                        <td className="p-4 text-white font-semibold">{room.soPhong}</td>
                        <td className="p-4 text-gray-400">Tầng {room.tang}</td>
                        <td className="p-4 text-gray-400">{room?.hangPhong?.loaiPhong.tenLp}</td>
                        <td className="p-4">
                          <Badge className={statusConfig[room.trangThai.tenTrangThai.toLowerCase() as keyof typeof statusConfig]?.color}>
                            {statusConfig[room.trangThai.tenTrangThai.toLowerCase() as keyof typeof statusConfig]?.label}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{room.tang.toLocaleString()}₫</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => removeRoomById(room.soPhong)}
                            >
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
              <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Loại Phòng
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <DialogHeader>
                    <DialogTitle>Thêm Loại Phòng</DialogTitle>
                    <DialogDescription>Nhập thông tin loại phòng mới.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ten-loai" className="text-gray-300">
                        Tên loại
                      </Label>
                      <Input
                        id="ten-loai"
                        placeholder="Nhập tên loại"
                        value={newRoomType.tenLoai}
                        onChange={handleRoomTypeFieldChange("tenLoai")}
                        className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loai-giuong" className="text-gray-300">
                        Loại giường
                      </Label>
                      <Input
                        id="loai-giuong"
                        placeholder="Nhập loại giường"
                        value={newRoomType.loaiGiuong}
                        onChange={handleRoomTypeFieldChange("loaiGiuong")}
                        className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="suc-chua" className="text-gray-300">
                        Sức chứa
                      </Label>
                      <Input
                        id="suc-chua"
                        type="number"
                        min={1}
                        placeholder="Nhập sức chứa"
                        value={newRoomType.sucChua}
                        onChange={handleRoomTypeFieldChange("sucChua")}
                        className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gia" className="text-gray-300">
                        Giá/đêm
                      </Label>
                      <Input
                        id="gia"
                        type="number"
                        min={0}
                        placeholder="Nhập giá/đêm"
                        value={newRoomType.gia}
                        onChange={handleRoomTypeFieldChange("gia")}
                        className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" className="border-[#2a2a2a] text-gray-300" onClick={() => setTypeDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={createRoomType}>
                      Tạo loại phòng
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                  {rt.roomTypes?.map((type) => {
                    const roomCount = rooms?.filter((r) => r.hangPhong.idLp === type.idLp).length
                    return (
                      <tr key={type.idLp} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                        <td className="p-4 text-white font-semibold">{type.tenLp}</td>
                        <td className="p-4 text-gray-400">{rc.roomClasses.find(rc => rc.idLp === type.idLp)?.kieuPhong.tenKp}</td>
                        <td className="p-4 text-gray-400">{rc.roomClasses.find(rc => rc.idLp === type.idLp)?.kieuPhong.soLuongKhach} người</td>
                        <td className="p-4 text-white">{5}₫</td> //TODO: get price from database
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
