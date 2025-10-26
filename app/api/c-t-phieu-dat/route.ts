import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of CTPhieuDat
export async function GET(request: NextRequest) {
  try {
    const ctPhieuDats = await prisma.ctPhieuDat.findMany()
    
    return NextResponse.json({
      success: true,
      data: ctPhieuDats,
    })
  } catch (error) {
    console.error('Error fetching ctPhieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new CTPhieuDat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCTPhieuDat = await prisma.CTPhieuDat.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newctPhieuDat },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating CTPhieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
