'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCTPhieuDat, createPhieuDat, getListPhieuDat, updatePhieuDat, updateCTPhieuDat } from '@/lib/services'
import type { PhieuDatFull } from '@/lib/types/relations'
import type { CTPhieuDat, PhieuDat } from '@/lib/generated/prisma'

export function useBookings() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getListPhieuDat,
  })

  // Transform dates from strings to Date objects
  const bookings = (data?.data as PhieuDatFull[]) || ([] as PhieuDatFull[])
  const transformedBookings = bookings.map((booking) => ({
    ...booking,
    ngayDat: booking.ngayDat ? new Date(booking.ngayDat) : new Date(),
    ngayBdThue: booking.ngayBdThue ? new Date(booking.ngayBdThue) : new Date(),
    ngayDi: booking.ngayDi ? new Date(booking.ngayDi) : new Date(),
  }))

  return {
    bookings: transformedBookings,
    isLoading,
    isError,
    error,
    success: data?.success,
  }
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-booking"],
    mutationFn: (phieuDat: Omit<PhieuDat, "idPd">) => createPhieuDat(phieuDat),
    onSuccess: () => {
      // Invalidate and refetch bookings after creating
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}

export function useCreateBookingDetail() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-booking-detail"],
    mutationFn: (bookingDetail: Omit<CTPhieuDat, "idCtPd">) => createCTPhieuDat(bookingDetail),
    onSuccess: () => {
      // Invalidate and refetch bookings after creating detail
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}
export function generateBookingId(bookings: PhieuDatFull[] | undefined) {
  // should be like PD1, PD2, PD3, ...
  const list = bookings ?? []
  const lastBooking = list[list.length - 1]
  if (!lastBooking?.idPd) return 'PD1'
  const lastNumber = parseInt(lastBooking.idPd.slice(2))
  return `PD${Number.isFinite(lastNumber) ? lastNumber + 1 : 1}`
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-booking-status"],
    mutationFn: ({ idPd, trangThai }: { idPd: string; trangThai: string }) => 
      updatePhieuDat(idPd, { trangThai }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}

export function useUpdateBookingDetail() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-booking-detail"],
    mutationFn: ({ idPd, idHp, data }: { idPd: string; idHp: string; data: Partial<Omit<CTPhieuDat, 'idPd' | 'idHp'>> }) => 
      updateCTPhieuDat(idPd, idHp, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}
