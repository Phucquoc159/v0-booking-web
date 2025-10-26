import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTPhuThu
export async function GET(request: NextRequest) {
  try {
    const ctPhuThus = await prisma.ctPhuThu.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctPhuThus,
    })
  } catch (error) {
    console.error('Error fetching ctPhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTPhuThu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTPhuThu = await prisma.CTPhuThu.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctPhuThu },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTPhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
