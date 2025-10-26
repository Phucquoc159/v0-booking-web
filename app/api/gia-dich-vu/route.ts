import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of GiaDichVu
export async function GET(request: NextRequest) {
  try {
    const giaDichVus = await prisma.giaDichVu.findMany()
    
    return NextResponse.json({
      success: true,
      data: giaDichVus,
    })
  } catch (error) {
    console.error('Error fetching giaDichVu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new GiaDichVu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newGiaDichVu = await prisma.GiaDichVu.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newgiaDichVu },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating GiaDichVu:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
