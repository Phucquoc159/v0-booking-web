'use client'

import { useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deletePhong, getHangPhong, getListPhong, getPhong, updatePhong } from '@/lib/services'
import type { HangPhongWithRelations, PhongWithRelations } from '@/lib/types/relations'
import { Room, RoomAmenity, RoomPromotion } from '../types/room'
import { Phong } from '../generated/prisma'

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

  const roomAmenities: RoomAmenity[] = room.hangPhong.phongs.map((phong) => {
    const item: RoomAmenity = {
      name: phong.soPhong,
      description: phong.tang.toString(),
    } as RoomAmenity

    return item
  })

  const roomPromotions: RoomPromotion[] = room.hangPhong.phongs.map((phong) => {
    const item: RoomPromotion = {
      color: "#FF0000",
      title: phong.soPhong,
      description: phong.tang.toString(),
      discount: "10%",
    } as RoomPromotion

    return item
  })

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

export const useUpdateRoom = () => {
  return useMutation({
    mutationKey: ["update-room"],
    mutationFn: ({ soPhong, data }: { soPhong: string; data: Partial<Omit<Phong, "soPhong">> }) =>
      updatePhong(soPhong, data),
  })
}

export const useRemoveRoomById = () => {
  return useMutation({
    mutationKey: ["remove-room"],
    mutationFn: (id: string) => deletePhong(id),
  })
}

type StatusKey = "available" | "occupied" | "dirty" | "reserved" | "maintenance"

export interface RoomStats {
  totalRooms: number
  countsByStatus: Record<StatusKey, number>
  inUseCount: number
  availableCount: number
  availableRate: number
  occupancyRate: number
  floorDistribution: Array<{ floor: string; count: number }>
}

export const useRoomStats = (rooms: PhongWithRelations[] | undefined): RoomStats => {
  return useMemo(() => {
    const normalizedRooms = rooms ?? []

    const initialStatusCounts: Record<StatusKey, number> = {
      available: 0,
      occupied: 0,
      dirty: 0,
      reserved: 0,
      maintenance: 0,
    }

    const countsByStatus = normalizedRooms.reduce((acc, room) => {
      const status = room.trangThai.tenTrangThai.toLowerCase() as StatusKey
      if (status in acc) {
        acc[status] += 1
      }
      return acc
    }, initialStatusCounts)

    const totalRooms = normalizedRooms.length
    const inUseCount = countsByStatus.occupied + countsByStatus.reserved
    const availableCount = countsByStatus.available
    const occupancyRate = totalRooms > 0 ? (inUseCount / totalRooms) * 100 : 0
    const availableRate = totalRooms > 0 ? (availableCount / totalRooms) * 100 : 0

    const floorDistributionMap = normalizedRooms.reduce<Record<string, number>>((acc, room) => {
      const floorKey = room.tang.toString()
      acc[floorKey] = (acc[floorKey] ?? 0) + 1
      return acc
    }, {})

    const floorDistribution = Object.entries(floorDistributionMap)
      .map(([floor, count]) => ({ floor, count }))
      .sort((a, b) => Number(a.floor) - Number(b.floor))

    return {
      totalRooms,
      countsByStatus,
      inUseCount,
      availableCount,
      availableRate,
      occupancyRate,
      floorDistribution,
    }
  }, [rooms])
}
