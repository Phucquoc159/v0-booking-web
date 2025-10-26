import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of QuanLy
export async function GET(request: NextRequest) {
  try {
    const quanLys = await prisma.quanLy.findMany()
    
    return NextResponse.json({
      success: true,
      data: quanLys,
    })
  } catch (error) {
    console.error('Error fetching quanLy:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new QuanLy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newQuanLy = await prisma.QuanLy.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newquanLy },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating QuanLy:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
