"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Lock, Mail, Hotel, AlertCircle, Loader2 } from "lucide-react"
import { login } from "@/lib/services/auth.service"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await login({ username, password })

      if (response.success && response.data) {
        // Check if user has admin privileges
        const isAdmin = response.data.user.nhomQuyen?.tenNc?.toLowerCase().includes('admin')

        if (isAdmin) {
          // Store user info
          localStorage.setItem("adminAuth", "true")
          localStorage.setItem("adminUser", username)
          localStorage.setItem("adminUserData", JSON.stringify(response.data.user))

          // Redirect to admin dashboard
          router.push("/admin/dashboard")
        } else {
          setError("Tài khoản không có quyền truy cập vào trang quản trị!")
        }
      } else {
        setError(response.message || "Tên đăng nhập hoặc mật khẩu không đúng!")
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1a1a1a] border-[#2a2a2a] p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Hotel className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">QK Hotel</h1>
            <p className="text-sm text-gray-400">Hệ Thống Quản Lý</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">
              Tên đăng nhập
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">
              Mật khẩu
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đăng Nhập"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Quên mật khẩu?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-400">
              Khôi phục tài khoản
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
