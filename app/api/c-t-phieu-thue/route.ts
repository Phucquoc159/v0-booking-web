import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTPhieuThue
export async function GET(request: NextRequest) {
  try {
    const ctPhieuThues = await prisma.ctPhieuThue.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctPhieuThues,
    })
  } catch (error) {
    console.error('Error fetching ctPhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTPhieuThue
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTPhieuThue = await prisma.CTPhieuThue.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctPhieuThue },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTPhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
