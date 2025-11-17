'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getListHoaDon, getHoaDon, createHoaDon, updateHoaDon, deleteHoaDon, createPhieuThue, getListPhieuThue, createCTPhieuThue } from '@/lib/services'
import type { HoaDon, NhanVien, PhieuThue, CTPhieuThue, CTDichVu, CTPhuThu, KhachHang, Phong, DichVu, PhuThu } from '@/lib/generated/prisma'
import type { PhieuDatFull } from '@/lib/types/relations'

export type HoaDonFull = HoaDon & {
  nhanVien: NhanVien
  phieuThue: PhieuThue & {
    khachHang: KhachHang
  }
  cTPhieuThues: (CTPhieuThue & {
    phong: Phong
  })[]
  cTDichVus: (CTDichVu & {
    dichVu: DichVu
  })[]
  cTPhuThus: (CTPhuThu & {
    phuThu: PhuThu
  })[]
}

export type HoaDonTransformed = Omit<HoaDonFull, 'tongTien' | 'soTienGiam' | 'ngayLap'> & {
  ngayLap: Date
  tongTien: number
  soTienGiam: number
}

export function useInvoices() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: getListHoaDon,
  })

  // Transform dates from strings to Date objects
  const invoices = (data?.data as HoaDonFull[]) || ([] as HoaDonFull[])
  const transformedInvoices: HoaDonTransformed[] = invoices.map((invoice) => ({
    ...invoice,
    ngayLap: invoice.ngayLap ? new Date(invoice.ngayLap) : new Date(),
    tongTien: typeof invoice.tongTien === 'string' ? parseFloat(invoice.tongTien) : Number(invoice.tongTien),
    soTienGiam: invoice.soTienGiam 
      ? (typeof invoice.soTienGiam === 'string' ? parseFloat(invoice.soTienGiam) : Number(invoice.soTienGiam))
      : 0,
  }))

  return {
    invoices: transformedInvoices,
    isLoading,
    isError,
    error,
    success: data?.success,
  }
}

export function useInvoice(id: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getHoaDon(id),
    enabled: !!id,
  })

  const invoice = data?.data as HoaDonFull | undefined
  const transformedInvoice = invoice
    ? {
        ...invoice,
        ngayLap: invoice.ngayLap ? new Date(invoice.ngayLap) : new Date(),
        tongTien: typeof invoice.tongTien === 'string' ? parseFloat(invoice.tongTien) : Number(invoice.tongTien),
        soTienGiam: invoice.soTienGiam
          ? (typeof invoice.soTienGiam === 'string' ? parseFloat(invoice.soTienGiam) : Number(invoice.soTienGiam))
          : 0,
      }
    : undefined

  return {
    invoice: transformedInvoice,
    isLoading,
    isError,
    error,
    success: data?.success,
  }
}

export function useCreateInvoice() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-invoice'],
    mutationFn: (hoaDon: Omit<HoaDon, 'idHd'>) => createHoaDon(hoaDon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-invoice'],
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<HoaDon, 'idHd'>> }) =>
      updateHoaDon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      queryClient.invalidateQueries({ queryKey: ['invoice'] })
    },
  })
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-invoice'],
    mutationFn: (id: string) => deleteHoaDon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })
}

// Helper function to generate PhieuThue ID
export function generatePhieuThueId(phieuThues: PhieuThue[] | undefined): string {
  const list = phieuThues ?? []
  if (list.length === 0) return 'PT1'
  const lastPhieuThue = list[list.length - 1]
  if (!lastPhieuThue?.idPt) return 'PT1'
  const lastNumber = parseInt(lastPhieuThue.idPt.slice(2))
  return `PT${Number.isFinite(lastNumber) ? lastNumber + 1 : 1}`
}

// Helper function to generate Invoice ID
export function generateInvoiceId(invoices: (HoaDonFull | HoaDonTransformed)[] | undefined): string {
  const list = invoices ?? []
  if (list.length === 0) return 'HD1'
  const lastInvoice = list[list.length - 1]
  if (!lastInvoice?.idHd) return 'HD1'
  const lastNumber = parseInt(lastInvoice.idHd.slice(2))
  return `HD${Number.isFinite(lastNumber) ? lastNumber + 1 : 1}`
}

// Hook to create PhieuThue
export function useCreatePhieuThue() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-phieu-thue'],
    mutationFn: (phieuThue: Omit<PhieuThue, 'idPt'>) => createPhieuThue(phieuThue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phieu-thue'] })
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

export type CreateCTPhieuThuePayload = Omit<CTPhieuThue, 'idCtpt'>

export function buildCTPhieuThuePayloadsFromBooking(booking: PhieuDatFull, phieuThueId: string): CreateCTPhieuThuePayload[] {
  const bookingDetails = booking.ctPhieuDats ?? []
  const checkIn = booking.ngayBdThue ? new Date(booking.ngayBdThue) : new Date()
  const checkOut = booking.ngayDi ? new Date(booking.ngayDi) : new Date(checkIn.getTime() + 24 * 60 * 60 * 1000)
  const diffTime = Math.max(checkOut.getTime() - checkIn.getTime(), 0)
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

  const payloads: CreateCTPhieuThuePayload[] = []

  bookingDetails.forEach((detail) => {
    const rooms = detail.hangPhong?.phongs ?? []
    if (rooms.length < detail.soLuongPhongO) {
      throw new Error(`Không đủ phòng khả dụng cho hạng phòng ${detail.hangPhong?.idHp || ''}`)
    }

    const unitPrice = typeof detail.donGia === 'string' ? parseFloat(detail.donGia) : Number(detail.donGia)
    const totalRoomPrice = unitPrice * nights

    rooms.slice(0, detail.soLuongPhongO).forEach((room) => {
      if (!room?.soPhong) {
        throw new Error('Không thể xác định số phòng để tạo chi tiết phiếu thuê')
      }

      payloads.push({
        ngayDen: checkIn,
        gioDen: checkIn,
        ngayDi: checkOut,
        //@ts-ignore
        donGia: totalRoomPrice,
        ttThanhToan: 'pending',
        idPt: phieuThueId,
        soPhong: room.soPhong,
        idHd: null,
      })
    })
  })

  return payloads
}

export async function createCTPhieuThuesForBooking(booking: PhieuDatFull, phieuThueId: string) {
  const payloads = buildCTPhieuThuePayloadsFromBooking(booking, phieuThueId)

  if (payloads.length === 0) {
    throw new Error('Không tìm thấy phòng phù hợp để tạo chi tiết phiếu thuê')
  }

  const responses = await Promise.all(payloads.map((payload) => createCTPhieuThue(payload)))
  const failedResponse = responses.find((response) => !response?.success)

  if (failedResponse) {
    throw new Error(failedResponse.message || 'Tạo chi tiết phiếu thuê thất bại')
  }

  return responses
}

// Helper function to calculate invoice totals
export function calculateInvoiceTotals(invoice: HoaDonFull | HoaDonTransformed) {
  // Room charges from cTPhieuThues
  const roomCharge = invoice.cTPhieuThues.reduce((sum, ct) => {
    const donGia = typeof ct.donGia === 'string' ? parseFloat(ct.donGia) : Number(ct.donGia)
    return sum + donGia
  }, 0)

  // Service charges from cTDichVus
  const serviceCharge = invoice.cTDichVus.reduce((sum, ct) => {
    const donGia = typeof ct.donGia === 'string' ? parseFloat(ct.donGia) : Number(ct.donGia)
    const soLuong = ct.soLuong || 1
    return sum + donGia * soLuong
  }, 0)

  // Surcharges from cTPhuThus
  const surcharge = invoice.cTPhuThus.reduce((sum, ct) => {
    const donGia = typeof ct.donGia === 'string' ? parseFloat(ct.donGia) : Number(ct.donGia)
    const soLuong = ct.soLuong || 1
    return sum + donGia * soLuong
  }, 0)

  // Discount
  const discount = invoice.soTienGiam
    ? (typeof invoice.soTienGiam === 'string' ? parseFloat(invoice.soTienGiam) : Number(invoice.soTienGiam))
    : 0

  // Total
  const total = typeof invoice.tongTien === 'string' ? parseFloat(invoice.tongTien) : Number(invoice.tongTien)

  return {
    roomCharge,
    serviceCharge,
    surcharge,
    discount,
    total,
  }
}

