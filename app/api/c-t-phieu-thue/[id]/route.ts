import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single CTPhieuThue by idCtPt
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const ctPhieuThue = await prisma.ctPhieuThue.findUnique({
      where: { idCtPt },
    })
    
    if (!ctPhieuThue) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: ctPhieuThue,
    })
  } catch (error) {
    console.error('Error fetching ctPhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update CTPhieuThue by idCtPt
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const updatedCTPhieuThue = await prisma.ctPhieuThue.update({
      where: { idCtPt },
      data: body,
    })
    
    return NextResponse.json({
      success: true,
      data: updatedCTPhieuThue,
    })
  } catch (error) {
    console.error('Error updating CTPhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete CTPhieuThue by idCtPt
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    await prisma.ctPhieuThue.delete({
      where: { idCtPt },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting ctPhieuThue:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
