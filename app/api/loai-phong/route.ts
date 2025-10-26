import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of LoaiPhong
export async function GET(request: NextRequest) {
  try {
    const loaiPhongs = await prisma.loaiPhong.findMany()
    
    return NextResponse.json({
      success: true,
      data: loaiPhongs,
    })
  } catch (error) {
    console.error('Error fetching loaiPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new LoaiPhong
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newLoaiPhong = await prisma.LoaiPhong.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newLoaiPhong },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating LoaiPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
