'use client'

import { useQuery } from '@tanstack/react-query'
import { getHangPhong, getListPhong, getPhong } from '@/lib/services'
import type { HangPhongWithRelations, PhongWithRelations } from '@/lib/types/relations'
import { Room, RoomAmenity, RoomPromotion } from '../types/room'

export function useRooms() {
  const { data, isLoading, isError, error } =  useQuery({
    queryKey: ["rooms"],
    queryFn: getListPhong,
  })

  return {
    ...data,
    isLoading,
    isError,
    error,
    rooms: data?.data as PhongWithRelations[] || [] as PhongWithRelations[],
  }
}

export function useRoom(id: string) {
  const { data, isLoading, isError, error } =  useQuery({
    queryKey: ["room", id],
    queryFn: () => getPhong(id),
  })

  const room = data?.data as PhongWithRelations || {} as PhongWithRelations

  const { data: hangPhong } = useQuery({
    queryKey: ["hangPhong", room.idHp],
    queryFn: () => getHangPhong(room.idHp),
  })

  const hp = hangPhong?.data as HangPhongWithRelations || {} as HangPhongWithRelations

  const roomAmenities: RoomAmenity[] = []

  const roomPromotions: RoomPromotion[] = []

  const res: Room = {
    id: room.idHp,
    name: room.hangPhong.loaiPhong.tenLp || '',
    description: room.hangPhong.loaiPhong.moTa || '',
    price: hp?.giaHangPhongs[0].gia?.toString() || '0',
    rating: 5,
    reviews: 0,
    capacity: room.hangPhong.kieuPhong.soLuongKhach || 0,
    size: room.hangPhong.kieuPhong.soLuongKhach?.toString() || '0',
    bedType: room.hangPhong.loaiPhong.tenLp || '',
    images: hp.anhHangPhongs.map((item) => item.urlAnh || ''),
    availability: room.trangThai.tenTrangThai || '',
    amenities: roomAmenities,
    promotions: roomPromotions,
  }

  return {
    ...data,
    isLoading,
    isError,
    error,
    room: res,
  }
}
