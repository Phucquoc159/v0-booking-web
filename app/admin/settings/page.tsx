"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Hotel, DollarSign, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Cài Đặt Hệ Thống</h1>
        <p className="text-gray-400">Quản lý cấu hình và thiết lập hệ thống</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-600">
            <Hotel className="h-4 w-4 mr-2" />
            Chung
          </TabsTrigger>
          <TabsTrigger value="pricing" className="data-[state=active]:bg-blue-600">
            <DollarSign className="h-4 w-4 mr-2" />
            Giá & Khuyến Mãi
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
            <Bell className="h-4 w-4 mr-2" />
            Thông Báo
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
            <Shield className="h-4 w-4 mr-2" />
            Bảo Mật
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Thông Tin Khách Sạn</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tên Khách Sạn</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" defaultValue="QK Hotel" />
                </div>
                <div>
                  <Label>Số Điện Thoại</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" defaultValue="+84 123 456 789" />
                </div>
                <div className="col-span-2">
                  <Label>Email</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" defaultValue="info@qkhotel.com" />
                </div>
                <div className="col-span-2">
                  <Label>Địa Chỉ</Label>
                  <Input
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    defaultValue="123 Đường Nguyễn Huệ, Q1, TP.HCM"
                  />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Lưu Thay Đổi</Button>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cài Đặt Hoạt Động</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giờ Nhận Phòng</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="time" defaultValue="14:00" />
                </div>
                <div>
                  <Label>Giờ Trả Phòng</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="time" defaultValue="12:00" />
                </div>
                <div>
                  <Label>Phí Nhận Phòng Sớm (%)</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" defaultValue="20" />
                </div>
                <div>
                  <Label>Phí Trả Phòng Muộn (%)</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" defaultValue="30" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Lưu Thay Đổi</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Giảm Giá Theo Nhóm</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Từ 5-10 Phòng (%)</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label>Từ 11-20 Phòng (%)</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label>Trên 20 Phòng (%)</Label>
                  <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="number" defaultValue="15" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Lưu Thay Đổi</Button>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Khuyến Mãi Đặc Biệt</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Giảm giá cuối tuần</p>
                  <p className="text-sm text-gray-400">Giảm 15% cho đặt phòng T7-CN</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Ưu đãi đặt sớm</p>
                  <p className="text-sm text-gray-400">Giảm 10% khi đặt trước 30 ngày</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Khách hàng thân thiết</p>
                  <p className="text-sm text-gray-400">Giảm 5% cho khách đã ở 3 lần trở lên</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cài Đặt Thông Báo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Đặt phòng mới</p>
                  <p className="text-sm text-gray-400">Nhận thông báo khi có đặt phòng mới</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Nhận phòng hôm nay</p>
                  <p className="text-sm text-gray-400">Nhắc nhở các phòng cần nhận hôm nay</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Trả phòng hôm nay</p>
                  <p className="text-sm text-gray-400">Nhắc nhở các phòng cần trả hôm nay</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Phòng cần bảo trì</p>
                  <p className="text-sm text-gray-400">Thông báo khi phòng cần bảo trì</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Bảo Mật Tài Khoản</h2>
            <div className="space-y-4">
              <div>
                <Label>Mật khẩu hiện tại</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="password" />
              </div>
              <div>
                <Label>Mật khẩu mới</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="password" />
              </div>
              <div>
                <Label>Xác nhận mật khẩu mới</Label>
                <Input className="bg-[#0a0a0a] border-[#2a2a2a] text-white" type="password" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Đổi Mật Khẩu</Button>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Cài Đặt Bảo Mật</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Xác thực 2 yếu tố</p>
                  <p className="text-sm text-gray-400">Bảo vệ tài khoản với xác thực 2 lớp</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div>
                  <p className="text-white font-medium">Tự động đăng xuất</p>
                  <p className="text-sm text-gray-400">Đăng xuất sau 30 phút không hoạt động</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
