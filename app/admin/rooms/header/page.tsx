"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import type { Phong, TrangThai } from "@/lib/generated/prisma"
import { HangPhongWithRelations } from "@/lib/types/relations"


export default function RoomHeader(
  { roomClasses, trangThais, phong, createRoom, setPhong, open, setOpen }: { roomClasses: HangPhongWithRelations[], trangThais: TrangThai[], phong: Phong, createRoom: () => void, setPhong: (phong: Phong) => void, open: boolean, setOpen: (open: boolean  ) => void }
) {
  return (
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Phòng</h1>
          <p className="text-gray-400">Quản lý trạng thái và thông tin phòng khách sạn</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
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
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="P1" value={phong.soPhong} onChange={(e) => setPhong({ ...phong, soPhong: e.target.value })} />
              </div>
              <div>
                <Label>Tầng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="1" value={phong.tang} onChange={(e) => setPhong({ ...phong, tang: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Loại Phòng</Label>
                <Select value={phong.idHp} onValueChange={(value) => setPhong({ ...phong, idHp: value })}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {roomClasses?.map((type) => (
                      <SelectItem key={type.idHp} value={type.idHp}>
                        {type.loaiPhong.tenLp} - {type.kieuPhong.tenKp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Trạng Thái</Label>
                <Select value={phong.idTt} onValueChange={(value) => setPhong({ ...phong, idTt: value })}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {trangThais?.map((trangThai) => (
                      <SelectItem key={trangThai.idTt} value={trangThai.idTt}>
                        {trangThai.tenTrangThai}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => createRoom()}>Thêm Phòng</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}
