import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTTienNghi
export async function GET(request: NextRequest) {
  try {
    const ctTienNghis = await prisma.ctTienNghi.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctTienNghis,
    })
  } catch (error) {
    console.error('Error fetching ctTienNghi:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTTienNghi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTTienNghi = await prisma.CTTienNghi.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctTienNghi },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTTienNghi:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
