import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get available rooms from date to date
export async function GET(request: NextRequest) {
  try {
    // Lấy tham số từ URL
    const searchParams = request.nextUrl.searchParams
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')
    
    // Kiểm tra tham số
    if (!fromDate || !toDate) {
      return NextResponse.json(
        { error: 'Thiếu tham số fromDate hoặc toDate' },
        { status: 400 }
      )
    }

    // Parse ngày
    const fromDateObj = new Date(fromDate)
    const toDateObj = new Date(toDate)

    // Kiểm tra ngày hợp lệ
    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
      return NextResponse.json(
        { error: 'Định dạng ngày không hợp lệ' },
        { status: 400 }
      )
    }

    // Kiểm tra fromDate <= toDate
    if (fromDateObj > toDateObj) {
      return NextResponse.json(
        { error: 'fromDate phải nhỏ hơn hoặc bằng toDate' },
        { status: 400 }
      )
    }

    // Định nghĩa kiểu dữ liệu cho phòng đã đặt
    type BookedRoom = {
      SOPHONG: string;
    };

    // Tìm các phòng đã được đặt trong khoảng thời gian này
    const bookedRooms = await prisma.$queryRaw<BookedRoom[]>`
      SELECT DISTINCT p."SOPHONG" 
      FROM phong p
      WHERE EXISTS (
        SELECT 1 
        FROM ct_phieu_thue ct
        WHERE ct."SO_PHONG" = p."SOPHONG"
        AND (
          (ct."NGAY_DEN" <= ${toDateObj} AND (ct."NGAY_DI" IS NULL OR ct."NGAY_DI" >= ${fromDateObj}))
        )
      )
      OR EXISTS (
        SELECT 1
        FROM doiphong dp
        JOIN ct_phieu_thue ct ON dp."ID_CT_PT" = ct."ID_CT_PT"
        WHERE dp."SOPHONGMOI" = p."SOPHONG"
        AND (
          (dp."NGAY_DEN" <= ${toDateObj} AND (dp."NGAY_DI" IS NULL OR dp."NGAY_DI" >= ${fromDateObj}))
        )
      )
    `

    // Lấy danh sách các phòng đã đặt
    const bookedRoomIds = bookedRooms.map((room) => room.SOPHONG)

    // Tìm tất cả các phòng còn trống (không nằm trong danh sách phòng đã đặt)
    const availableRooms = await prisma.phong.findMany({
      where: {
        soPhong: {
          notIn: bookedRoomIds
        },
        // Chỉ lấy phòng có trạng thái sẵn sàng (giả sử idTt = 'TT001' là trạng thái sẵn sàng)
        idTt: 'TT001'
      },
      include: {
        hangPhong: {
          include: {
            kieuPhong: true,
            loaiPhong: true,
            anhHangPhongs: true,
            giaHangPhongs: {
              where: {
                ngayApDung: {
                  lte: new Date()
                }
              },
              orderBy: {
                ngayApDung: 'desc'
              },
              take: 1
            },
            ctTienNghis: {
              include: {
                tienNghi: true
              }
            }
          }
        },
        trangThai: true
      }
    })

    // Trả về kết quả
    return NextResponse.json({
      success: true,
      data: availableRooms,
      count: availableRooms.length
    })
  } catch (error) {
    console.error('Lỗi khi tìm phòng trống:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tìm phòng trống' },
      { status: 500 }
    )
  }
}

