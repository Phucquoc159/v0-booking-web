import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of NhanVien
export async function GET(request: NextRequest) {
  try {
    const nhanViens = await prisma.nhanVien.findMany()
    
    return NextResponse.json({
      success: true,
      data: nhanViens,
    })
  } catch (error) {
    console.error('Error fetching nhanVien:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new NhanVien
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newNhanVien = await prisma.NhanVien.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newNhanVien },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating NhanVien:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
