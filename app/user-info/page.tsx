"use client"

import type React from "react"
import { useState, useEffect } from "react"
// Giả định các components này đã được import từ Shadcn UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Lock, User, ArrowLeft, Loader2, AlertCircle, MapPin, Calendar, Image } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { 
    fetchUserInfoById, 
    updateUserInfo, 
    changePassword, 
    logout // Thêm logout để dùng
} from "@/lib/services/auth.service" 


interface UserProfileData {
  ho: string
  ten: string
  email: string
  sdt: string
  diaChi?: string | null
  ngaySinh?: string | null // Dùng string dạng YYYY-MM-DD
  phai?: string | null
  hinh?: string | null // URL ảnh
  username: string
  idNv: string 
}


export default function UserUpdatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // State khởi tạo
  const [userData, setUserData] = useState<UserProfileData>({
    idNv: "",
    ho: "",
    ten: "",
    email: "",
    sdt: "",
    diaChi: null,
    ngaySinh: null,
    phai: null,
    hinh: null,
    username: ""
  })

  // Đã thêm oldPassword
  const [passwordData, setPasswordData] = useState({
    oldPassword: "", 
    newPassword: "",
    confirmNewPassword: ""
  })

  // 3. LOGIC LẤY DỮ LIỆU TỪ API DỰA TRÊN ID TỪ LOCAL STORAGE
  useEffect(() => {
    const loadUserData = async () => {
        setIsFetching(true)
        setError("")

        let userId: string | undefined;
        
        try {
            const localDataString = localStorage.getItem("userData") || "{}"; 
            userId = JSON.parse(localDataString)?.idNv;
        } catch (e) {
            console.error("Lỗi khi đọc LocalStorage:", e);
        }

        if (!userId) {
            setError("Lỗi: Không tìm thấy ID người dùng để tải dữ liệu. Vui lòng đăng nhập lại.")
            setIsFetching(false)
            return;
        }

        try {
            // GỌI API THỰC TẾ
            const response = await fetchUserInfoById(userId);
            console.log(fetchUserInfoById)
            if (response.success && response.data?.user) {
                const user = response.data.user;
                setUserData({
                    idNv: user.idNv,
                    ho: user.ho,
                    ten: user.ten,
                    email: user.email,
                    sdt: user.sdt,
                    username: user.username,
                    diaChi: user.diaChi || null,
                    // Chuyển Date hoặc null sang string định dạng YYYY-MM-DD
                    ngaySinh: user.ngaySinh ? new Date(user.ngaySinh).toISOString().split('T')[0] : null,
                    phai: user.phai || null,
                    hinh: user.hinh || null,
                })
            } else {
                setError(response.message || "Lấy thông tin người dùng thất bại.")
            }
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi kết nối khi tải dữ liệu.")
        } finally {
            setIsFetching(false)
        }
    }

    loadUserData()
  }, []) // Chỉ chạy 1 lần khi mount


  // 4. Xử lý cập nhật thông tin chung -> Dùng updateUserInfo
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")
    setIsLoading(true)
    
    // Payload khớp với UserUpdateRequest (chỉ gửi các trường có giá trị)
    const payload = {
      idNv: userData.idNv,
      ho: userData.ho,
      ten: userData.ten,
      email: userData.email,
      sdt: userData.sdt,
      diaChi: userData.diaChi || null,
      ngaySinh: userData.ngaySinh || null, // API Route sẽ xử lý chuyển string sang Date
      phai: userData.phai || null,
      hinh: userData.hinh || null
    }
    
    try {
      // GỌI API THỰC TẾ
      const response = await updateUserInfo(payload)
      
      if (response.success) {
        setSuccessMessage(response.message || "Cập nhật thông tin cá nhân thành công!")
      } else {
        setError(response.message || "Cập nhật thất bại. Vui lòng thử lại.")
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau!")
    } finally {
      setIsLoading(false)
    }
  }

  // 5. Xử lý đổi mật khẩu -> Dùng changePassword
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")

    if (!passwordData.oldPassword) {
        setError("Vui lòng nhập mật khẩu cũ.")
        return
    }

    if (passwordData.newPassword.length < 6) {
        setError("Mật khẩu mới phải tối thiểu 6 ký tự.")
        return
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!")
      return
    }

    setIsLoading(true)
    
    // Payload khớp với PasswordChangeRequest
    const payload = {
        username: userData.username, 
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
    }

    try {
        // GỌI API THỰC TẾ
        const response = await changePassword(payload)
        
        if (response.success) {
            setSuccessMessage(response.message || "Đổi mật khẩu thành công!")
            // Xóa trường mật khẩu sau khi thành công
            setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" }) 
        } else {
            setError(response.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.")
        }
    } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi đổi mật khẩu.")
    } finally {
        setIsLoading(false)
    }
  }
  
  // 6. Xử lý đăng xuất
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
        localStorage.removeItem('userData'); // Dọn dẹp cục bộ
        router.push('/login');
    } else {
        alert(response.message || "Đăng xuất thất bại!");
        router.push('/login');
    }
  }


  if (isFetching) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-lg text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
    )
  }

  // Giao diện (Không thay đổi)
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <CardTitle className="text-2xl font-bold">Cập Nhật Thông Tin</CardTitle>
            <CardDescription>Quản lý thông tin cá nhân và tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Hiển thị thông báo Lỗi/Thành công */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm text-green-500">{successMessage}</p>
              </div>
            )}
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="profile" className="gap-2" disabled={isLoading}>
                  <User className="h-4 w-4" />
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger value="password" className="gap-2" disabled={isLoading}>
                  <Lock className="h-4 w-4" />
                  Đổi mật khẩu
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Cập nhật Thông tin cá nhân */}
              <TabsContent value="profile" className="space-y-4">
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    {/* ID và Username (Chỉ đọc) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="idNv">Mã NV</Label>
                            <Input
                                id="idNv"
                                type="text"
                                value={userData.idNv}
                                className="pl-3 bg-muted/50"
                                disabled
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Tên đăng nhập</Label>
                            <Input
                                id="username"
                                type="text"
                                value={userData.username}
                                className="pl-3 bg-muted/50"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Họ và Tên */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ho">Họ</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="ho"
                                    type="text"
                                    value={userData.ho || ""}
                                    onChange={(e) => setUserData({ ...userData, ho: e.target.value })}
                                    className="pl-10"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ten">Tên</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="ten"
                                    type="text"
                                    value={userData.ten || ""}
                                    onChange={(e) => setUserData({ ...userData, ten: e.target.value })}
                                    className="pl-10"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                value={userData.email || ""}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="pl-10"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="space-y-2">
                        <Label htmlFor="sdt">Số điện thoại</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="sdt"
                                type="tel"
                                value={userData.sdt || ""}
                                onChange={(e) => setUserData({ ...userData, sdt: e.target.value })}
                                className="pl-10"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Ngày sinh & Giới tính */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ngaySinh">Ngày sinh</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="ngaySinh"
                                    type="date"
                                    // Lưu ý: Input type="date" cần format YYYY-MM-DD
                                    value={userData.ngaySinh || ""}
                                    onChange={(e) => setUserData({ ...userData, ngaySinh: e.target.value })}
                                    className="pl-10"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phai">Giới tính</Label>
                            <div className="relative">
                                <Select
                                    value={userData.phai || ""}
                                    onValueChange={(value) => setUserData({ ...userData, phai: value })}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full pl-10">
                                        <SelectValue placeholder="Chọn giới tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Nam">Nam</SelectItem>
                                        <SelectItem value="Nữ">Nữ</SelectItem>
                                        <SelectItem value="Khác">Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="space-y-2">
                        <Label htmlFor="diaChi">Địa chỉ</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="diaChi"
                                type="text"
                                placeholder="Địa chỉ hiện tại"
                                value={userData.diaChi || ""}
                                onChange={(e) => setUserData({ ...userData, diaChi: e.target.value })}
                                className="pl-10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    

                    <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                        disabled={isLoading || isFetching}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang cập nhật...
                            </>
                        ) : (
                            "LƯU THÔNG TIN CÁ NHÂN"
                        )}
                    </Button>
                </form>
              </TabsContent>

              {/* Tab 2: Đổi Mật khẩu */}
              <TabsContent value="password">
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    {/* Mật khẩu cũ */}
                    <div className="space-y-2">
                        <Label htmlFor="old-password">Mật khẩu cũ</Label>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="old-password"
                            type="password"
                            placeholder="••••••••"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            className="pl-10"
                            disabled={isLoading}
                            required
                        />
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="pl-10"
                        disabled={isLoading}
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
                  </div>

                  {/* Xác nhận mật khẩu mới */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-new-password"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.confirmNewPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                        className="pl-10"
                        disabled={isLoading}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang đổi mật khẩu...
                      </>
                    ) : (
                      "ĐỔI MẬT KHẨU"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}