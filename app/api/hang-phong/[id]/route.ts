import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single HangPhong by idHangPhong
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const hangPhong = await prisma.hangPhong.findUnique({
      where: { idHangPhong },
    })
    
    if (!hangPhong) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: hangPhong,
    })
  } catch (error) {
    console.error('Error fetching hangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update HangPhong by idHangPhong
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const updatedHangPhong = await prisma.hangPhong.update({
      where: { idHangPhong },
      data: body,
    })
    
    return NextResponse.json({
      success: true,
      data: updatedHangPhong,
    })
  } catch (error) {
    console.error('Error updating HangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete HangPhong by idHangPhong
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    await prisma.hangPhong.delete({
      where: { idHangPhong },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting hangPhong:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
