import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTKhachO
export async function GET(request: NextRequest) {
  try {
    const ctKhachOs = await prisma.ctKhachO.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctKhachOs,
    })
  } catch (error) {
    console.error('Error fetching ctKhachO:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTKhachO
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTKhachO = await prisma.CTKhachO.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctKhachO },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTKhachO:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
