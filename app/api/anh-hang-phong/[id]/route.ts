import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single AnhHangPhong by idAnhHangPhong
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const anhHangPhong = await prisma.anhHangPhong.findUnique({
      where: { idAnhHangPhong },
    })
    
    if (!anhHangPhong) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: anhHangPhong,
    })
  } catch (error) {
    console.error('Error fetching anhHangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update AnhHangPhong by idAnhHangPhong
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const updatedAnhHangPhong = await prisma.anhHangPhong.update({
      where: { idAnhHangPhong },
      data: body,
    })
    
    return NextResponse.json({
      success: true,
      data: updatedAnhHangPhong,
    })
  } catch (error) {
    console.error('Error updating AnhHangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete AnhHangPhong by idAnhHangPhong
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    await prisma.anhHangPhong.delete({
      where: { idAnhHangPhong },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting anhHangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
