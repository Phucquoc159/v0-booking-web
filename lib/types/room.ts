import type { LucideIcon } from 'lucide-react'

export interface RoomAmenity {
  icon: LucideIcon
  name: string
  description: string
}

export interface RoomPromotion {
  title: string
  description: string
  discount: string
  color: string
}

export interface Room {
  id: string
  name: string
  description: string
  price: string
  rating: number
  reviews: number
  capacity: number
  size: string
  bedType: string
  images: string[]
  availability: string
  amenities: RoomAmenity[]
  promotions: RoomPromotion[]
}

// Nếu muốn tách riêng
export type RoomAmenities = RoomAmenity[]
export type RoomPromotions = RoomPromotion[]

// Utility types
export type RoomId = Room['id']
export type RoomWithoutPromotions = Omit<Room, 'promotions'>
export type RoomBasicInfo = Pick<Room, 'id' | 'name' | 'price' | 'rating' | 'availability'>

export type RoomTypeForm = {
  tenLoai: string
  loaiGiuong: string
  sucChua: string
  gia: string
}
