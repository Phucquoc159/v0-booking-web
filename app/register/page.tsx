"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation } from "@tanstack/react-query"
import { Mail, Phone, Lock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createKhachHang } from "@/lib/services"

export default function RegisterPage() {
  const router = useRouter()
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [phoneData, setPhoneData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const createKhachHangMutation = useMutation({
    mutationFn: createKhachHang,
    onSuccess: () => {
      alert("Đăng ký thành công!")
      router.push("/login")
    },
    onError: (error: any) => {
      alert(`Đăng ký thất bại: ${error.response?.data?.message || error.message}`)
    },
  })

  const handleRegister = (data: { name: string; password: string; email?: string; phone?: string }) => {
    const parts = data.name.trim().split(" ")
    const ten = parts.pop() || ""
    const ho = parts.join(" ")

    // CCCD is required as ID, using a random string or phone/email for now.
    // This should be handled properly based on business logic.
    const cccd = data.phone || data.email || `KH${Date.now()}`

    createKhachHangMutation.mutate({
      //@ts-ignore
      cccd,
      ho,
      ten,
      email: data.email || null,
      sdt: data.phone || null,
      matKhau: data.password,
    })
  }

  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailData.password !== emailData.confirmPassword) {
      alert("Mật khẩu không khớp!")
      return
    }
    handleRegister({ ...emailData })
  }

  const handlePhoneRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneData.password !== phoneData.confirmPassword) {
      alert("Mật khẩu không khớp!")
      return
    }
    handleRegister({ ...phoneData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại trang chủ
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-3xl font-bold text-primary">QK</div>
              <div className="text-2xl font-semibold text-foreground">Hotel</div>
            </div>
            <CardTitle className="text-2xl font-bold">Đăng Ký</CardTitle>
            <CardDescription>Tạo tài khoản để đặt phòng dễ dàng hơn</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Số điện thoại
                </TabsTrigger>
              </TabsList>

              {/* Email Registration */}
              <TabsContent value="email">
                <form onSubmit={handleEmailRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={emailData.name}
                        onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={emailData.email}
                        onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={emailData.password}
                        onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={emailData.confirmPassword}
                        onChange={(e) => setEmailData({ ...emailData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Đăng Ký
                  </Button>
                </form>
              </TabsContent>

              {/* Phone Registration */}
              <TabsContent value="phone">
                <form onSubmit={handlePhoneRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-name">Họ và tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone-name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={phoneData.name}
                        onChange={(e) => setPhoneData({ ...phoneData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0123 456 789"
                        value={phoneData.phone}
                        onChange={(e) => setPhoneData({ ...phoneData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone-password"
                        type="password"
                        placeholder="••••••••"
                        value={phoneData.password}
                        onChange={(e) => setPhoneData({ ...phoneData, password: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-confirm-password">Xác nhận mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={phoneData.confirmPassword}
                        onChange={(e) => setPhoneData({ ...phoneData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Đăng Ký
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Đã có tài khoản? </span>
              <Link href="/login" className="text-primary font-medium hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
