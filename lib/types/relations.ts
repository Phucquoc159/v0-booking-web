// lib/types/relations.ts
import type {
  PhieuDat,
  KhachHang,
  NhanVien,
  CTPhieuDat,
  HangPhong,
  KieuPhong,
  LoaiPhong,
  PhieuThue,
  Phong,
  TrangThai
} from '@/lib/generated/prisma'

export type WithRelations<T, Relations> = T & Relations

export type PhieuDatFull = WithRelations<PhieuDat, {
  khachHang: KhachHang
  nhanVien: NhanVien | null
  ctPhieuDats: CTPhieuDatWithRelations[]
  phieuThues: PhieuThue[]
}>

export type CTPhieuDatWithRelations = WithRelations<CTPhieuDat, {
  hangPhong: HangPhongWithRelations
}>

export type HangPhongWithRelations = WithRelations<HangPhong, {
  kieuPhong: KieuPhong
  loaiPhong: LoaiPhong
}>

export type PhongWithRelations = WithRelations<Phong, {
  hangPhong: HangPhongWithRelations
  trangThai: TrangThai
}>

export type NhanVienFull = WithRelations<NhanVien, {
  boPhan: {
    idBp: string
    tenBp: string
  }
  nhomQuyen: {
    idNq: string
    tenNc: string
  }
}>
