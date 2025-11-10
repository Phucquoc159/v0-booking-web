
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET handler để lấy thông tin user dựa trên idNv
export async function GET(
  request: NextRequest,
  { params }: { params: { idNv: string } }
) {
  try {
    const { idNv } = params
    console.log(params)
    if (!idNv) {
      return NextResponse.json(
        { success: false, message: 'Missing user ID' },
        { status: 400 }
      )
    }

    // Tìm user bằng idNv
    const user = await prisma.nhanVien.findUnique({
      where: { idNv },
      include: {
        boPhan: true,
        nhomQuyen: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Xóa mật khẩu khỏi response trước khi gửi
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        success: true,
        data: { user: userWithoutPassword },
        message: 'User info fetched successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fetch User by ID error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}