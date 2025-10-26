import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single PhieuDat by idPd
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const phieuDat = await prisma.phieuDat.findUnique({
      where: { idPd },
    })
    
    if (!phieuDat) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: phieuDat,
    })
  } catch (error) {
    console.error('Error fetching phieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update PhieuDat by idPd
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const updatedPhieuDat = await prisma.phieuDat.update({
      where: { idPd },
      data: body,
    })
    
    return NextResponse.json({
      success: true,
      data: updatedPhieuDat,
    })
  } catch (error) {
    console.error('Error updating PhieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete PhieuDat by idPd
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    await prisma.phieuDat.delete({
      where: { idPd },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting phieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
