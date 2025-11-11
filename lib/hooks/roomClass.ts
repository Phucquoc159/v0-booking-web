import { useMutation, useQuery } from "@tanstack/react-query"
import { createHangPhong, getListHangPhong } from "../services"
import { HangPhongWithRelations } from "../types/relations"
import { HangPhong } from '@/lib/generated/prisma'

export const useRoomClasses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["room-classes"],
    queryFn: getListHangPhong,
  })

  return {
    ...data,
    isLoading,
    isError,
    roomClasses: data?.data as HangPhongWithRelations[] || [] as HangPhongWithRelations[],
  }
}

export const useCreateRoomClass = () => {
  return useMutation({
    mutationKey: ["create-room-class"],
    mutationFn: (hangPhong: Omit<HangPhong, "idHp">) => createHangPhong(hangPhong),
  })
}

export const generateRoomClassId = (roomClasses: HangPhongWithRelations[]) => {
    // should be like HP1, HP2, HP3, ...
    const list = roomClasses ?? []
    const lastBooking = list[list.length - 1]
    if (!lastBooking?.idLp) return 'HP1'
    const lastNumber = parseInt(lastBooking.idLp.slice(2))
    return `PD${Number.isFinite(lastNumber) ? lastNumber + 1 : 1}`
}
