import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of GiaPhuThu
export async function GET(request: NextRequest) {
  try {
    const giaPhuThus = await prisma.giaPhuThu.findMany()
    
    return NextResponse.json({
      success: true,
      data: giaPhuThus,
    })
  } catch (error) {
    console.error('Error fetching giaPhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new GiaPhuThu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newGiaPhuThu = await prisma.GiaPhuThu.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newGiaPhuThu },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating GiaPhuThu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
