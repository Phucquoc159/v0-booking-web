import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of PhieuThue
export async function GET(request: NextRequest) {
  try {
    const phieuThues = await prisma.phieuThue.findMany()
    
    return NextResponse.json({
      success: true,
      data: phieuThues,
    })
  } catch (error) {
    console.error('Error fetching phieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new PhieuThue
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newPhieuThue = await prisma.PhieuThue.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newphieuThue },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating PhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
