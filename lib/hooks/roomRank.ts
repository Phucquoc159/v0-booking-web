'use client'

import { useQuery } from '@tanstack/react-query'
import { getListHangPhong } from '@/lib/services'
import type { HangPhongWithRelations } from '@/lib/types/relations'

export function useRoomRanks() {
  const { data } =  useQuery({
    queryKey: ["room-ranks"],
    queryFn: getListHangPhong,
  })

  return {
    ...data,
    roomRanks: data?.data as HangPhongWithRelations[] || [] as HangPhongWithRelations[],
  }
}
