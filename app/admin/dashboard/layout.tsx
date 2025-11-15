"use client"

import type React from "react"

// import { AdminSidebar } from "@/components/admin/admin-sidebar"
// import { AdminHeader } from "@/components/admin/admin-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
