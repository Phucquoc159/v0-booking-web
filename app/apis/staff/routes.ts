import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const nhanVien = await prisma.nhanVien.create({
      data: {
        idNv: data.idNv,
        ho: data.ho,
        ten: data.ten,
        phai: data.phai,
        ngaySinh: data.ngaySinh ? new Date(data.ngaySinh) : null,
        diaChi: data.diaChi,
        sdt: data.sdt,
        email: data.email,
        hinh: data.hinh,
        username: data.username,
        password: hashedPassword,
        idBp: data.idBp,
        idNq: data.idNq
      },
      include: {
        boPhan: true,
        nhomQuyen: true
      }
    })
    return NextResponse.json(nhanVien)
  } catch (error) {
    return NextResponse.json(
      { error: 'Cannot create staff' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const nhanViens = await prisma.nhanVien.findMany({
    include: {
      boPhan: true,
      nhomQuyen: true
    }
  })
  return NextResponse.json(nhanViens)
}
