import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of KhuyenMai
export async function GET(request: NextRequest) {
  try {
    const khuyenMais = await prisma.khuyenMai.findMany()
    
    return NextResponse.json({
      success: true,
      data: khuyenMais,
    })
  } catch (error) {
    console.error('Error fetching khuyenMai:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new KhuyenMai
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newKhuyenMai = await prisma.KhuyenMai.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newkhuyenMai },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating KhuyenMai:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
