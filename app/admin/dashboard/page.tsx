"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Hotel, Users, Calendar, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

export default function DashboardPage() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth")
    if (!isAuthenticated) {
      window.location.href = "/admin/login"
    }
  }, [])

  const stats = [
    {
      title: "Tổng Phòng",
      value: "120",
      change: "+2.5%",
      trend: "up",
      icon: Hotel,
      color: "blue",
    },
    {
      title: "Phòng Đã Đặt",
      value: "87",
      change: "+12.3%",
      trend: "up",
      icon: Calendar,
      color: "green",
    },
    {
      title: "Khách Hàng",
      value: "1,234",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      title: "Doanh Thu Tháng",
      value: "2.4B VNĐ",
      change: "-3.2%",
      trend: "down",
      icon: DollarSign,
      color: "amber",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Tổng quan hệ thống quản lý khách sạn</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.title} className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <TrendIcon className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Đặt Phòng Gần Đây</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-0">
                <div>
                  <p className="text-white font-medium">Nguyễn Văn A</p>
                  <p className="text-sm text-gray-400">Phòng Deluxe - #301</p>
                </div>
                <div className="text-right">
                  <p className="text-white">1,500,000₫</p>
                  <p className="text-sm text-gray-400">2 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Trạng Thái Phòng</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Phòng Trống</span>
              <span className="text-green-500 font-semibold">33 phòng</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Đã Đặt</span>
              <span className="text-blue-500 font-semibold">87 phòng</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Đang Dọn</span>
              <span className="text-yellow-500 font-semibold">12 phòng</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bảo Trì</span>
              <span className="text-red-500 font-semibold">3 phòng</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
