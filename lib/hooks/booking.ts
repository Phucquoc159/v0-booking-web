'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { createCTPhieuDat, createPhieuDat, getListPhieuDat } from '@/lib/services'
import type { PhieuDatFull } from '@/lib/types/relations'
import type { CTPhieuDat, PhieuDat } from '@/lib/generated/prisma'

export function useBookings() {
  const { data } =  useQuery({
    queryKey: ["bookings"],
    queryFn: getListPhieuDat,
  })

  return {
    ...data,
    bookings: data?.data as PhieuDatFull[] || [] as PhieuDatFull[],
  }
}

export function useCreateBooking() {
  return useMutation({
    mutationKey: ["create-booking"],
    mutationFn: (phieuDat: Omit<PhieuDat, "idPd">) => createPhieuDat(phieuDat),
  })
}

export function useCreateBookingDetail() {
  return useMutation({
    mutationKey: ["create-booking-detail"],
    mutationFn: (bookingDetail: Omit<CTPhieuDat, "idCtPd">) => createCTPhieuDat(bookingDetail),
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
