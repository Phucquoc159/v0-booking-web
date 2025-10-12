"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Hotel,
  Calendar,
  Users,
  Utensils,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Hotel, label: "Quản Lý Phòng", href: "/admin/rooms" },
  { icon: Calendar, label: "Đặt Phòng", href: "/admin/bookings" },
  { icon: Users, label: "Khách Hàng", href: "/admin/customers" },
  { icon: Utensils, label: "Dịch Vụ", href: "/admin/services" },
  { icon: DollarSign, label: "Hóa Đơn", href: "/admin/invoices" },
  { icon: Users, label: "Nhân Viên", href: "/admin/employees" },
  { icon: Settings, label: "Cài Đặt", href: "/admin/settings" },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#141414] border-r border-[#2a2a2a] transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#2a2a2a]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Hotel className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white">QK Hotel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors w-full"
          onClick={() => (window.location.href = "/admin/login")}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Đăng Xuất</span>}
        </button>
      </div>
    </aside>
  )
}
