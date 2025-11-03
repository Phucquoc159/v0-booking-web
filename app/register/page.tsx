"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/lib/services/auth.service"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
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

  const handleRegister = async (data: { name: string; password: string; email?: string; phone?: string }) => {
    setIsLoading(true)
    setError("")
    
    try {
      const parts = data.name.trim().split(" ")
      const ten = parts.pop() || ""
      const ho = parts.join(" ")
      
      const registerData = {
        username: data.email || data.phone || "",
        password: data.password,
        email: data.email || "",
        ho,
        ten,
        sdt: data.phone || undefined,
        idBp: undefined,
        idNq: undefined
      }
      
      const response = await register(registerData)
      
      if (response.success) {
        alert("Đăng ký thành công!")
        router.push("/login")
      } else {
        setError(response.message || "Đăng ký thất bại. Vui lòng thử lại.")
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailData.password !== emailData.confirmPassword) {
      setError("Mật khẩu không khớp!")
      return
    }
    handleRegister({ ...emailData })
  }

  const handlePhoneRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneData.password !== phoneData.confirmPassword) {
      setError("Mật khẩu không khớp!")
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
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="gap-2" disabled={isLoading}>
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2" disabled={isLoading}>
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      "Đăng Ký"
                    )}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      "Đăng Ký"
                    )}
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
