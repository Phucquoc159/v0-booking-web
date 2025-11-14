"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Download, Printer } from "lucide-react"
import { useInvoices, calculateInvoiceTotals, type HoaDonTransformed } from "@/lib/hooks/invoice"

const statusConfig: Record<string, { label: string; color: string }> = {
  "Đã thanh toán": { label: "Đã Thanh Toán", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  "Chưa thanh toán": { label: "Chưa Thanh Toán", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  paid: { label: "Đã Thanh Toán", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  pending: { label: "Chưa Thanh Toán", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
}

export default function InvoicesPage() {
  const { invoices, isLoading, isError } = useInvoices()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const customerName = `${invoice.phieuThue.khachHang.ho} ${invoice.phieuThue.khachHang.ten}`.toLowerCase()
    return (
      invoice.idHd.toLowerCase().includes(query) ||
      customerName.includes(query)
    )
  })

  // Calculate stats
  const totalInvoices = filteredInvoices.length
  const paidInvoices = filteredInvoices.filter(
    (i) => i.trangThai === "Đã thanh toán" || i.trangThai === "paid"
  ).length
  const pendingInvoices = filteredInvoices.filter(
    (i) => i.trangThai === "Chưa thanh toán" || i.trangThai === "pending"
  ).length
  const totalRevenue = filteredInvoices
    .filter((i) => i.trangThai === "Đã thanh toán" || i.trangThai === "paid")
    .reduce((sum, i) => sum + i.tongTien, 0)

  // Format date helper
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("vi-VN")
  }

  // Get room numbers from cTPhieuThues
  const getRoomNumbers = (invoice: HoaDonTransformed) => {
    return invoice.cTPhieuThues.map((ct) => ct.phong.soPhong).join(", ")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Hóa Đơn</h1>
          <p className="text-gray-400">Quản lý và theo dõi hóa đơn thanh toán</p>
        </div>
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Hóa Đơn</h1>
          <p className="text-gray-400">Quản lý và theo dõi hóa đơn thanh toán</p>
        </div>
        <div className="flex items-center justify-center p-8">
          <p className="text-red-400">Có lỗi xảy ra khi tải dữ liệu</p>
        </div>
      </div>
    )
  }

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
          <p className="text-2xl font-bold text-white">{totalInvoices}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Đã Thanh Toán</p>
          <p className="text-2xl font-bold text-green-500">{paidInvoices}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Chưa Thanh Toán</p>
          <p className="text-2xl font-bold text-yellow-500">{pendingInvoices}</p>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
          <p className="text-gray-400 text-sm mb-1">Tổng Doanh Thu</p>
          <p className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()}₫</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn, khách hàng..."
            className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-400">
                    Không có hóa đơn nào
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => {
                  const totals = calculateInvoiceTotals(invoice)
                  const customerName = `${invoice.phieuThue.khachHang.ho} ${invoice.phieuThue.khachHang.ten}`
                  const statusKey = invoice.trangThai || "pending"
                  const status = statusConfig[statusKey] || statusConfig.pending

                  return (
                    <tr key={invoice.idHd} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                      <td className="p-4 text-white font-semibold">{invoice.idHd}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{customerName}</p>
                          <p className="text-sm text-gray-400">{formatDate(invoice.ngayLap)}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{getRoomNumbers(invoice)}</td>
                      <td className="p-4 text-white">{totals.roomCharge.toLocaleString()}₫</td>
                      <td className="p-4 text-white">{totals.serviceCharge.toLocaleString()}₫</td>
                      <td className="p-4 text-green-500">
                        {totals.discount > 0 ? `-${totals.discount.toLocaleString()}₫` : "0₫"}
                      </td>
                      <td className="p-4 text-white font-bold">{totals.total.toLocaleString()}₫</td>
                      <td className="p-4">
                        <Badge className={status.color}>{status.label}</Badge>
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
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
