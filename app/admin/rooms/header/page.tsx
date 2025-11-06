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
import { useRooms } from "@/lib/hooks/room"
import { useMutation } from "@tanstack/react-query"
import { createPhong } from "@/lib/services"
import { Phong } from "@prisma/client"
import { HangPhongWithRelations } from "@/lib/types/relations"


export default function RoomHeader(
  { roomClasses, phong, createRoom, setPhong }: { roomClasses: HangPhongWithRelations[], phong: Phong, createRoom: () => void, setPhong: (phong: Phong) => void }
) {
  return (
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
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="101" value={phong.soPhong} onChange={(e) => setPhong({ ...phong, soPhong: e.target.value })} />
              </div>
              <div>
                <Label>Tầng</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" placeholder="1" value={phong.tang} onChange={(e) => setPhong({ ...phong, tang: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Loại Phòng</Label>
                <Select>
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => createRoom()}>Thêm Phòng</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}
