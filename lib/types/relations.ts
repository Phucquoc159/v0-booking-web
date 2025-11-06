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
  TrangThai,
  TienNghi
} from '@/lib/generated/prisma'
import { AnhHangPhong, CTKhuyenMai, CTTienNghi, GiaHangPhong } from '@prisma/client'

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
  giaHangPhongs: GiaHangPhong[]
  anhHangPhongs: AnhHangPhong[]
  phongs: PhongWithRelations[]
  ctTienNghis: CTTienNghiWithRelations[]
  ctKhuyenMais: CTKhuyenMaiWithRelations[]
  ctPhieuDats: CTPhieuDat[]
}>

export type CTKhuyenMaiWithRelations = WithRelations<CTKhuyenMai, {
  hangPhong: HangPhongWithRelations
}>

export type TienNghiWithRelations = WithRelations<TienNghi, {
  ctTienNghis: CTTienNghiWithRelations[]
}>

export type CTTienNghiWithRelations = WithRelations<CTTienNghi, {
  tienNghi: TienNghiWithRelations
  hangPhong: HangPhongWithRelations
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

export type LoaiPhongWithRelations = WithRelations<LoaiPhong, {
  hangPhongs: HangPhongWithRelations[]
}>
