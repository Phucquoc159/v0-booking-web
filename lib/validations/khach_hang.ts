import { z } from 'zod'

export const createKhachHangSchema = z.object({
  cccd: z.string().length(12, 'CCCD phải có 12 số'),
  ho: z.string().min(1, 'Họ không được để trống'),
  ten: z.string().min(1, 'Tên không được để trống'),
  sdt: z.string().regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ').optional(),
  email: z.string().email('Email không hợp lệ').optional(),
  diaChi: z.string().optional(),
  maSoThue: z.string().optional(),
  matKhau: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').optional(),
})

export const updateKhachHangSchema = createKhachHangSchema.partial()
