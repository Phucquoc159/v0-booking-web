import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of HoaDon
export async function GET(request: NextRequest) {
  try {
    const hoaDons = await prisma.hoaDon.findMany()
    
    return NextResponse.json({
      success: true,
      data: hoaDons,
    })
  } catch (error) {
    console.error('Error fetching hoaDon:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new HoaDon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newHoaDon = await prisma.HoaDon.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newhoaDon },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating HoaDon:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
