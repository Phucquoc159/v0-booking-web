"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Shield } from "lucide-react"

const employees = [
  {
    id: "EMP001",
    name: "Nguyễn Văn Admin",
    email: "admin@qkhotel.com",
    phone: "0901111111",
    department: "admin",
    role: "Quản Trị Viên",
    status: "active",
    joinDate: "2020-01-01",
  },
  {
    id: "EMP002",
    name: "Trần Thị Lễ Tân",
    email: "letan@qkhotel.com",
    phone: "0902222222",
    department: "reception",
    role: "Nhân Viên Lễ Tân",
    status: "active",
    joinDate: "2021-03-15",
  },
  {
    id: "EMP003",
    name: "Lê Văn Buồng",
    email: "buong@qkhotel.com",
    phone: "0903333333",
    department: "housekeeping",
    role: "Nhân Viên Buồng",
    status: "active",
    joinDate: "2021-06-20",
  },
  {
    id: "EMP004",
    name: "Phạm Thị Bếp",
    email: "bep@qkhotel.com",
    phone: "0904444444",
    department: "restaurant",
    role: "Nhân Viên Nhà Hàng",
    status: "active",
    joinDate: "2022-01-10",
  },
]

const departmentConfig = {
  admin: { label: "Quản Trị", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  reception: { label: "Lễ Tân", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  housekeeping: { label: "Buồng Phòng", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  restaurant: { label: "Nhà Hàng", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
}

const statusConfig = {
  active: { label: "Đang Làm", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  inactive: { label: "Nghỉ Việc", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
}

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Nhân Viên</h1>
          <p className="text-gray-400">Quản lý nhân viên và phân quyền hệ thống</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Nhân Viên
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
              <DialogTitle>Thêm Nhân Viên Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Họ Tên</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="email@qkhotel.com" />
              </div>
              <div>
                <Label>Số Điện Thoại</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" placeholder="0901234567" />
              </div>
              <div>
                <Label>Bộ Phận</Label>
                <Select>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="admin">Quản Trị</SelectItem>
                    <SelectItem value="reception">Lễ Tân</SelectItem>
                    <SelectItem value="housekeeping">Buồng Phòng</SelectItem>
                    <SelectItem value="restaurant">Nhà Hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mật Khẩu</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Thêm Nhân Viên</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(departmentConfig).map(([dept, config]) => {
          const count = employees.filter((e) => e.department === dept).length
          return (
            <Card key={dept} className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
              <p className="text-gray-400 text-sm mb-1">{config.label}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </Card>
          )
        })}
      </div>

      {/* Search */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm nhân viên..." className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white" />
        </div>
      </Card>

      {/* Employees Table */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#2a2a2a]">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Mã NV</th>
                <th className="text-left p-4 text-gray-400 font-medium">Họ Tên</th>
                <th className="text-left p-4 text-gray-400 font-medium">Liên Hệ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Bộ Phận</th>
                <th className="text-left p-4 text-gray-400 font-medium">Chức Vụ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                <th className="text-left p-4 text-gray-400 font-medium">Ngày Vào</th>
                <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                  <td className="p-4 text-white font-semibold">{employee.id}</td>
                  <td className="p-4 text-white font-medium">{employee.name}</td>
                  <td className="p-4">
                    <div>
                      <p className="text-white text-sm">{employee.email}</p>
                      <p className="text-gray-400 text-sm">{employee.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={departmentConfig[employee.department as keyof typeof departmentConfig].color}>
                      {departmentConfig[employee.department as keyof typeof departmentConfig].label}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-400">{employee.role}</td>
                  <td className="p-4">
                    <Badge className={statusConfig[employee.status as keyof typeof statusConfig].color}>
                      {statusConfig[employee.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-400">{employee.joinDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Shield className="h-4 w-4" />
                      </Button>
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
    </div>
  )
}
