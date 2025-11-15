import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT - Update CTPhieuDat by composite key (idPd, idHp)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { idPd, idHp, ...updateData } = body

    if (!idPd || !idHp) {
      return NextResponse.json(
        { success: false, message: 'idPd and idHp are required' },
        { status: 400 }
      )
    }

    const updatedCTPhieuDat = await prisma.cTPhieuDat.update({
      where: {
        idPd_idHp: {
          idPd,
          idHp,
        },
      },
      data: updateData,
      include: {
        phieuDat: true,
        hangPhong: {
          include: {
            loaiPhong: true,
            kieuPhong: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedCTPhieuDat,
    })
  } catch (error) {
    console.error('Error updating CTPhieuDat:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

