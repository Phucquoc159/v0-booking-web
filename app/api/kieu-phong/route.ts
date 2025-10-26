import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of KieuPhong
export async function GET(request: NextRequest) {
  try {
    const kieuPhongs = await prisma.kieuPhong.findMany()
    
    return NextResponse.json({
      success: true,
      data: kieuPhongs,
    })
  } catch (error) {
    console.error('Error fetching kieuPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new KieuPhong
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newKieuPhong = await prisma.KieuPhong.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: newkieuPhong },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating KieuPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
