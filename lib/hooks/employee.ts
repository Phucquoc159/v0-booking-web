'use client'

import { useQuery } from '@tanstack/react-query'
import { getListNhanVien } from '@/lib/services'
import type { NhanVienFull } from '@/lib/types/relations'

export function useEmployees() {
  const { data, isLoading, isError, error } =  useQuery({
    queryKey: ["employees"],
    queryFn: getListNhanVien,
  })

  return {
    ...data,
    isLoading,
    isError,
    error,
    employees: data?.data as NhanVienFull[] || [] as NhanVienFull[],
  }
}
