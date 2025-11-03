import { prisma } from '@/lib/prisma'

// Định nghĩa kiểu dữ liệu cho phòng đã đặt
type BookedRoom = {
  SOPHONG: string;
};

// Định nghĩa kiểu dữ liệu cho tham số đầu vào
export interface FindAvailableRoomsParams {
  fromDate: string | Date;
  toDate: string | Date;
}

/**
 * Tìm các phòng trống trong khoảng thời gian
 * @param params Tham số tìm kiếm (fromDate, toDate)
 * @returns Danh sách các phòng trống
 */
export async function findAvailableRooms(params: FindAvailableRoomsParams) {
  try {
    // Parse ngày
    const fromDateObj = params.fromDate instanceof Date ? params.fromDate : new Date(params.fromDate);
    const toDateObj = params.toDate instanceof Date ? params.toDate : new Date(params.toDate);

    // Kiểm tra ngày hợp lệ
    if (isNaN(fromDateObj.getTime()) || isNaN(toDateObj.getTime())) {
      throw new Error('Định dạng ngày không hợp lệ');
    }

    // Kiểm tra fromDate <= toDate
    if (fromDateObj > toDateObj) {
      throw new Error('fromDate phải nhỏ hơn hoặc bằng toDate');
    }

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
    `;

    // Lấy danh sách các phòng đã đặt
    const bookedRoomIds = bookedRooms.map((room) => room.SOPHONG);

    // Tìm tất cả các phòng còn trống (không nằm trong danh sách phòng đã đặt)
    const availableRooms = await prisma.phong.findMany({
      where: {
        soPhong: {
          notIn: bookedRoomIds
        },
        // Chỉ lấy phòng có trạng thái sẵn sàng (TT001 là trạng thái sẵn sàng)
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
    });

    return {
      success: true,
      data: availableRooms,
      count: availableRooms.length
    };
  } catch (error) {
    console.error('Lỗi khi tìm phòng trống:', error);
    throw error;
  }
}

/**
 * Lấy thông tin chi tiết của một phòng
 * @param roomId Mã phòng
 * @returns Thông tin chi tiết của phòng
 */
export async function getRoomDetail(roomId: string) {
  try {
    const room = await prisma.phong.findUnique({
      where: {
        soPhong: roomId
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
    });

    if (!room) {
      throw new Error('Không tìm thấy phòng');
    }

    return {
      success: true,
      data: room
    };
  } catch (error) {
    console.error('Lỗi khi lấy thông tin phòng:', error);
    throw error;
  }
}
