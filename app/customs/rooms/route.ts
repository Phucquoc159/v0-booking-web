import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fromDateStr = searchParams.get("fromDate")
  const toDateStr = searchParams.get("toDate")
  const guestCountStr = searchParams.get("guestCount")

  if (!fromDateStr || !toDateStr || !guestCountStr) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const fromDate = new Date(fromDateStr)
  const toDate = new Date(toDateStr)
  const guestCount = parseInt(guestCountStr, 10)

  try {
    // 1. Tìm tất cả các phòng đã được đặt trong khoảng thời gian yêu cầu.
    const occupiedRooms = await prisma.cTPhieuThue.findMany({
      where: {
        ngayDen: {
          lt: toDate,
        },
        ngayDi: {
          gt: fromDate,
        },
      },
      select: {
        soPhong: true,
      },
    })

    const occupiedRoomNumbers = occupiedRooms.map((r) => r.soPhong)

    // 2. Tìm tất cả các phòng đáp ứng số lượng khách và không nằm trong danh sách đã đặt.
    const availableRooms = await prisma.phong.findMany({
      where: {
        hangPhong: {
          kieuPhong: {
            soLuongKhach: {
              gte: guestCount,
            },
          },
        },
        soPhong: {
          notIn: occupiedRoomNumbers,
        },
      },
      include: {
        hangPhong: {
          include: {
            loaiPhong: true,
            kieuPhong: true,
            giaHangPhongs: {
              orderBy: {
                ngayApDung: "desc",
              },
              take: 1,
            },
            anhHangPhongs: true,
          },
        },
        trangThai: true,
      },
    })

    return NextResponse.json({ success: true, data: availableRooms })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
