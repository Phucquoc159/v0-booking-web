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
import { useRemoveRoomById, useRooms, useUpdateRoom } from "@/lib/hooks/room"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPhong } from "@/lib/services"
import type { Phong, LoaiPhong } from "@/lib/generated/prisma"
import type { PhongWithRelations, LoaiPhongWithRelations } from "@/lib/types/relations"
import RoomHeader from "./header/page"
import RoomStatsPage from "./stats/page"
import { generateRoomClassId, useCreateRoomClass, useRoomClasses } from "@/lib/hooks/roomClass"
import { generateRoomTypeId, useCreateRoomType, useRemoveRoomTypeById, useRoomTypes, useUpdateRoomType } from "@/lib/hooks/roomTypes"
import { useTrangThai } from "@/lib/hooks/trangThai"
import { useToast } from "@/components/ui/toast"
import { RoomTypeForm } from "@/lib/types/room"

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
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Pick<Phong, "soPhong" | "tang" | "idHp" | "idTt"> | null>(null)
  const [editTypeDialogOpen, setEditTypeDialogOpen] = useState(false)
  const [editingRoomType, setEditingRoomType] = useState<Pick<LoaiPhong, "idLp" | "tenLp" | "moTa"> | null>(null)

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
  const updateRoomMutation = useUpdateRoom()
  const updateRoomTypeMutation = useUpdateRoomType()
  const removeRoomMutation = useRemoveRoomById()
  const removeRoomTypeMutation = useRemoveRoomTypeById()
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

  const handleEditRoomTypeFieldChange = (field: keyof Pick<LoaiPhong, "tenLp" | "moTa">) => (event: ChangeEvent<HTMLInputElement>) => {
    if (!editingRoomType) return

    const newValue = event.target.value
    setEditingRoomType((prev) => (prev ? { ...prev, [field]: newValue } : prev))
  }

  const handleEditRoomFieldChange = (
    field: keyof Pick<Phong, "tang" | "idHp" | "idTt">
  ) => (value: string | ChangeEvent<HTMLInputElement>) => {
    if (!editingRoom) return

    const newValue = typeof value === "string" ? value : value.target.value

    setEditingRoom((prev) =>
      prev
        ? {
            ...prev,
            [field]: field === "tang" ? Number(newValue) : newValue,
          }
        : prev,
    )
  }

  const openEditRoomTypeDialog = (roomType: LoaiPhongWithRelations) => {
    setEditingRoomType({
      idLp: roomType.idLp,
      tenLp: roomType.tenLp,
      moTa: roomType.moTa ?? "",
    })
    setEditTypeDialogOpen(true)
  }

  const closeEditRoomTypeDialog = (open: boolean) => {
    setEditTypeDialogOpen(open)
    if (!open) {
      setEditingRoomType(null)
    }
  }

  const openEditDialog = (room: PhongWithRelations) => {
    setEditingRoom({
      soPhong: room.soPhong,
      tang: room.tang,
      idHp: room.idHp,
      idTt: room.idTt,
    })
    setEditDialogOpen(true)
  }

  const closeEditDialog = (open: boolean) => {
    setEditDialogOpen(open)
    if (!open) {
      setEditingRoom(null)
    }
  }

  const updateRoom = () => {
    if (!editingRoom) return

    if (!editingRoom.soPhong || !editingRoom.tang || !editingRoom.idHp || !editingRoom.idTt) {
      toast.error("Vui lòng điền đầy đủ thông tin phòng")
      return
    }

    updateRoomMutation.mutate(
      {
        soPhong: editingRoom.soPhong,
        data: {
          tang: editingRoom.tang,
          idHp: editingRoom.idHp,
          idTt: editingRoom.idTt,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cập nhật phòng thành công")
          queryClient.invalidateQueries({ queryKey: ["rooms"] })
          setEditDialogOpen(false)
          setEditingRoom(null)
        },
        onError: (error) => {
          toast.error("Cập nhật phòng thất bại")
          console.log(error)
        },
      },
    )
  }

  const updateRoomType = () => {
    if (!editingRoomType) return

    if (!editingRoomType.tenLp.trim()) {
      toast.error("Vui lòng nhập tên loại phòng")
      return
    }

    updateRoomTypeMutation.mutate(
      {
        idLp: editingRoomType.idLp,
        data: {
          tenLp: editingRoomType.tenLp,
          moTa: editingRoomType.moTa ?? null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cập nhật loại phòng thành công")
          queryClient.invalidateQueries({ queryKey: ["room-types"] })
          queryClient.invalidateQueries({ queryKey: ["room-classes"] })
          setEditTypeDialogOpen(false)
          setEditingRoomType(null)
        },
        onError: (error) => {
          toast.error("Cập nhật loại phòng thất bại")
          console.log(error)
        },
      },
    )
  }

  const removeRoomById = (id: string) => {
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

  const removeRoomType = (id: string) => {
    removeRoomTypeMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Xóa loại phòng thành công")
        queryClient.invalidateQueries({ queryKey: ["room-types"] })
        queryClient.invalidateQueries({ queryKey: ["room-classes"] })
      },
      onError: (error) => {
        toast.error("Xóa loại phòng thất bại")
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
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() => openEditDialog(room)}
                        >
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
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => openEditDialog(room)}
                            >
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
                    <th className="text-left p-4 text-gray-400 font-medium">Mô tả</th>
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
                        <td className="p-4 text-gray-400">Update this</td>
                        <td className="p-4 text-white">{type.moTa}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => openEditRoomTypeDialog(type)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => removeRoomType(type.idLp)}
                              disabled={removeRoomTypeMutation.isPending}
                            >
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
      <Dialog open={editDialogOpen} onOpenChange={closeEditDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Cập nhật phòng</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin phòng và lưu thay đổi.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-so-phong" className="text-gray-300">
                Số phòng
              </Label>
              <Input
                id="edit-so-phong"
                value={editingRoom?.soPhong ?? ""}
                disabled
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tang" className="text-gray-300">
                Tầng
              </Label>
              <Input
                id="edit-tang"
                type="number"
                min={1}
                value={editingRoom?.tang ?? ""}
                onChange={handleEditRoomFieldChange("tang")}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Hạng phòng</Label>
              <Select
                value={editingRoom?.idHp ?? ""}
                onValueChange={(value) => handleEditRoomFieldChange("idHp")(value)}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Chọn hạng phòng" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  {rc.roomClasses.map((roomClass) => (
                    <SelectItem key={roomClass.idHp} value={roomClass.idHp}>
                      {roomClass.loaiPhong.tenLp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Trạng thái</Label>
              <Select
                value={editingRoom?.idTt ?? ""}
                onValueChange={(value) => handleEditRoomFieldChange("idTt")(value)}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  {tt.trangThais.map((status) => (
                    <SelectItem key={status.idTt} value={status.idTt}>
                      {status.tenTrangThai}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              className="border-[#2a2a2a] text-gray-300"
              onClick={() => closeEditDialog(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={updateRoom}
              disabled={updateRoomMutation.isPending}
            >
              {updateRoomMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editTypeDialogOpen} onOpenChange={closeEditRoomTypeDialog}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Cập nhật loại phòng</DialogTitle>
            <DialogDescription>Điều chỉnh thông tin loại phòng và lưu thay đổi.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-ten-loai" className="text-gray-300">
                Tên loại phòng
              </Label>
              <Input
                id="edit-ten-loai"
                value={editingRoomType?.tenLp ?? ""}
                onChange={handleEditRoomTypeFieldChange("tenLp")}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-mo-ta" className="text-gray-300">
                Mô tả
              </Label>
              <Input
                id="edit-mo-ta"
                value={editingRoomType?.moTa ?? ""}
                onChange={handleEditRoomTypeFieldChange("moTa")}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              className="border-[#2a2a2a] text-gray-300"
              onClick={() => closeEditRoomTypeDialog(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={updateRoomType}
              disabled={updateRoomTypeMutation.isPending}
            >
              {updateRoomTypeMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
