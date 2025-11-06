import { useQuery } from "@tanstack/react-query"
import { getListLoaiPhong } from "../services"
import { LoaiPhongWithRelations } from "../types/relations"

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
