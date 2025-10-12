"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Download, Printer } from "lucide-react"

const invoices = [
  {
    id: "INV001",
    customer: "Nguyễn Văn A",
    room: "101",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    roomCharge: 3600000,
    serviceCharge: 500000,
    discount: 200000,
    total: 3900000,
    status: "paid",
    paymentMethod: "Tiền mặt",
    date: "2025-01-18",
  },
  {
    id: "INV002",
    customer: "Trần Thị B",
    room: "201",
    checkIn: "2025-01-16",
    checkOut: "2025-01-20",
    roomCharge: 11200000,
    serviceCharge: 800000,
    discount: 0,
    total: 12000000,
    status: "pending",
    paymentMethod: "-",
    date: "2025-01-16",
  },
  {
    id: "INV003",
    customer: "Lê Minh C",
    room: "302",
    checkIn: "2025-01-14",
    checkOut: "2025-01-16",
    roomCharge: 7000000,
    serviceCharge: 350000,
    discount: 500000,
    total: 6850000,
    status: "paid",
    paymentMethod: "Thẻ",
    date: "2025-01-16",
  },
]

const statusConfig = {
  paid: { label: "Đã Thanh Toán", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  pending: { label: "Chưa Thanh Toán", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
}

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Hóa Đơn</h1>
        <p className="text-gray-400">Quản lý và theo dõi hóa đơn thanh toán</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Tổng Hóa Đơn</p>
          <p className="text-2xl font-bold text-white">{invoices.length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Đã Thanh Toán</p>
          <p className="text-2xl font-bold text-green-500">{invoices.filter((i) => i.status === "paid").length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Chưa Thanh Toán</p>
          <p className="text-2xl font-bold text-yellow-500">{invoices.filter((i) => i.status === "pending").length}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Tổng Doanh Thu</p>
          <p className="text-2xl font-bold text-white">
            {invoices
              .filter((i) => i.status === "paid")
              .reduce((sum, i) => sum + i.total, 0)
              .toLocaleString()}
            ₫
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn, khách hàng..."
            className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
          />
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#2a2a2a]">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Mã HĐ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Khách Hàng</th>
                <th className="text-left p-4 text-gray-400 font-medium">Phòng</th>
                <th className="text-left p-4 text-gray-400 font-medium">Tiền Phòng</th>
                <th className="text-left p-4 text-gray-400 font-medium">Dịch Vụ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Giảm Giá</th>
                <th className="text-left p-4 text-gray-400 font-medium">Tổng Tiền</th>
                <th className="text-left p-4 text-gray-400 font-medium">Trạng Thái</th>
                <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                  <td className="p-4 text-white font-semibold">{invoice.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{invoice.customer}</p>
                      <p className="text-sm text-gray-400">{invoice.date}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{invoice.room}</td>
                  <td className="p-4 text-white">{invoice.roomCharge.toLocaleString()}₫</td>
                  <td className="p-4 text-white">{invoice.serviceCharge.toLocaleString()}₫</td>
                  <td className="p-4 text-green-500">-{invoice.discount.toLocaleString()}₫</td>
                  <td className="p-4 text-white font-bold">{invoice.total.toLocaleString()}₫</td>
                  <td className="p-4">
                    <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                      {statusConfig[invoice.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
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
