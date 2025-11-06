'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { createPhieuDat, getListPhieuDat } from '@/lib/services'
import type { PhieuDatFull } from '@/lib/types/relations'
import { PhieuDat } from '@prisma/client'

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

