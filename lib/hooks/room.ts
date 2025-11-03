'use client'

import { useQuery } from '@tanstack/react-query'
import { getListPhong } from '@/lib/services'
import type { PhongWithRelations } from '@/lib/types/relations'

export function useRooms() {
  const { data, isLoading, isError, error } =  useQuery({
    queryKey: ["rooms"],
    queryFn: getListPhong,
  })

  return {
    ...data,
    isLoading,
    isError,
    error,
    rooms: data?.data as PhongWithRelations[] || [] as PhongWithRelations[],
  }
}
