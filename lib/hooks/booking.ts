'use client'

import { useQuery } from '@tanstack/react-query'
import { getListPhieuDat } from '@/lib/services'
import type { PhieuDatFull } from '@/lib/types/relations'

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


