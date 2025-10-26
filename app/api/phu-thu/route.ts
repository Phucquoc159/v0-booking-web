import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of PhuThu
export async function GET(request: NextRequest) {
  try {
    const phuThus = await prisma.phuThu.findMany()
    
    return NextResponse.json({
      success: true,
      data: phuThus,
    })
  } catch (error) {
    console.error('Error fetching phuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new PhuThu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newPhuThu = await prisma.PhuThu.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newPhuThu },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating PhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
