import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CtPhuThu
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

// POST - Create new CtPhuThu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCtPhuThu = await prisma.CtPhuThu.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newCtPhuThu },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CtPhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
