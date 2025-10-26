import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTKhuyenMai
export async function GET(request: NextRequest) {
  try {
    const ctKhuyenMais = await prisma.ctKhuyenMai.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctKhuyenMais,
    })
  } catch (error) {
    console.error('Error fetching ctKhuyenMai:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTKhuyenMai
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTKhuyenMai = await prisma.CTKhuyenMai.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctKhuyenMai },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTKhuyenMai:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
