import { useQuery } from "@tanstack/react-query"
import { getListTrangThai } from "../services"
import type { TrangThai } from "@/lib/generated/prisma"

export const useTrangThai = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trang-thai"],
    queryFn: getListTrangThai,
  })

  return {
    ...data,
    isLoading,
    isError,
    trangThais: data?.data as TrangThai[] || [] as TrangThai[],
  }
}

