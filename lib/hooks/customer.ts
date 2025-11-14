import { useMutation, useQuery } from "@tanstack/react-query"
import { createKhachHang, getKhachHang } from "../services"
import { KhachHang } from "../generated/prisma"

export const useGetCustomerByCCCD = (cccd: string) => {
  return useQuery({
    queryKey: ["get-customer-by-cccd", cccd],
    queryFn: () => getKhachHang(cccd),
    enabled: !!cccd && cccd.length >= 12, // Only query when CCCD is valid (12 digits)
  })
}

export const useCreateCustomer = () => {
  return useMutation({
    mutationKey: ["create-customer"],
    mutationFn: (khachHang: Omit<KhachHang, "cccd"> & { cccd: string }) => {
      // Service type expects Omit<KhachHang, 'cccd'>, but API actually accepts full KhachHang including cccd
      // So we pass the full object including cccd
      return createKhachHang(khachHang as any)
    },
  })
}
