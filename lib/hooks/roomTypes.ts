import { useMutation, useQuery } from "@tanstack/react-query"
import { createLoaiPhong, getListLoaiPhong } from "../services"
import { LoaiPhongWithRelations } from "../types/relations"
import { LoaiPhong } from '@/lib/generated/prisma'

export const useRoomTypes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["room-types"],
    queryFn: () => getListLoaiPhong(),
  })

  return {
    roomTypes: data?.data as LoaiPhongWithRelations[],
    isLoading,
    isError,
  }
}

export function generateRoomTypeId(roomTypes: LoaiPhongWithRelations[] | undefined) {
  // should be like LP1, LP2, LP3, ...
  const list = roomTypes ?? []
  const lastBooking = list[list.length - 1]
  if (!lastBooking?.idLp) return 'LP1'
  const lastNumber = parseInt(lastBooking.idLp.slice(2))
  return `PD${Number.isFinite(lastNumber) ? lastNumber + 1 : 1}`
}


export function useCreateRoomType() {
  return useMutation({
    mutationKey: ["create-room-type"],
    mutationFn: (loaiPhong: Omit<LoaiPhong, "idPd">) => createLoaiPhong(loaiPhong),
  })
}
