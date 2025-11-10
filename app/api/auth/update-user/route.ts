// app/api/user/[idNv]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest) {
    try {
      const body = await request.json()
      const { idNv, ho, ten, email, sdt, diaChi, ngaySinh, phai, hinh } = body
  
      if (!idNv) {
        return NextResponse.json(
          { success: false, message: 'Missing user ID (idNv)' },
          { status: 400 }
        )
      }
  
      // Tạo đối tượng data chỉ chứa các trường được cung cấp
      const updateData: Record<string, any> = {}
      if (ho !== undefined) updateData.ho = ho
      if (ten !== undefined) updateData.ten = ten
      if (email !== undefined) updateData.email = email
      if (sdt !== undefined) updateData.sdt = sdt || ''
      if (diaChi !== undefined) updateData.diaChi = diaChi
      if (ngaySinh !== undefined) updateData.ngaySinh = ngaySinh ? new Date(ngaySinh) : null // Xử lý Date
      if (phai !== undefined) updateData.phai = phai
      if (hinh !== undefined) updateData.hinh = hinh
  
      // **LƯU Ý:** Nếu bạn cho phép đổi email, bạn cần kiểm tra xem email mới đã tồn tại chưa (trừ email hiện tại của user này).
  
      // Cập nhật user
      const updatedUser = await prisma.nhanVien.update({
        where: { idNv },
        data: updateData,
      })
  
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser
  
      return NextResponse.json(
        {
          success: true,
          data: { user: userWithoutPassword },
          message: 'Profile updated successfully',
        },
        { status: 200 }
      )
    } catch (error) {
      console.error('Update User error:', error)
  
      // Xử lý lỗi cụ thể (ví dụ: Prisma Unique Constraint violation nếu đổi email)
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
          { success: false, message: 'Email đã được sử dụng bởi người khác.' },
          { status: 400 }
        )
      }
  
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
}

export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { username, oldPassword, newPassword } = body // Sử dụng username để tìm user
  
      // Validate required fields
      if (!username || !oldPassword || !newPassword) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields (username, oldPassword, newPassword)' },
          { status: 400 }
        )
      }
  
      if (newPassword.length < 6) {
          return NextResponse.json(
              { success: false, message: 'Mật khẩu mới phải tối thiểu 6 ký tự.' },
              { status: 400 }
          )
      }
  
      // 1. Tìm user bằng username
      const user = await prisma.nhanVien.findUnique({
        where: { username },
      })
  
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        )
      }
  
      // 2. So sánh mật khẩu cũ
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
  
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, message: 'Mật khẩu cũ không chính xác' },
          { status: 401 }
        )
      }
  
      // 3. Hash mật khẩu mới
      const newHashedPassword = await bcrypt.hash(newPassword, 10)
  
      // 4. Cập nhật mật khẩu mới
      await prisma.nhanVien.update({
        where: { username },
        data: { password: newHashedPassword },
      })
  
      return NextResponse.json(
        {
          success: true,
          message: 'Password changed successfully',
        },
        { status: 200 }
      )
    } catch (error) {
      console.error('Change Password error:', error)
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }