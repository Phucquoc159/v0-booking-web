import { useQuery } from "@tanstack/react-query"
import { getListHangPhong } from "../services"
import { HangPhongWithRelations } from "../types/relations"

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
