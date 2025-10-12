import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "QK Hotel - Hệ Thống Quản Lý",
  description: "Hệ thống quản lý khách sạn QK Hotel",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
