// Mock data for hotel customer dashboard

export interface User {
    id: string
    name: string
    email: string
    phone: string
    avatar: string
    membershipTier: "Gold" | "Silver" | "Platinum"
    loyaltyPoints: number
    dateOfBirth?: string
    gender?: string
    nationality?: string
    address?: string
    city?: string
    country?: string
    postalCode?: string
    passportNumber?: string
    idNumber?: string
    citizenId?: string
    citizenIdIssueDate?: string
    citizenIdIssuePlace?: string
    emergencyContact?: {
      name: string
      relationship: string
      phone: string
    }
    preferences?: {
      roomType?: string
      bedType?: string
      floorPreference?: string
      smokingRoom?: boolean
      pillowType?: string
    }
    communicationPreferences?: {
      emailNotifications: boolean
      smsNotifications: boolean
      promotionalEmails: boolean
    }
    twoFactorEnabled?: boolean
  }
  
  export interface Booking {
    id: string
    roomType: string
    roomNumber?: string
    checkInDate: string
    checkOutDate: string
    guests: number
    status: "confirmed" | "pending" | "checked-in" | "completed" | "cancelled"
    totalPrice: number
    specialRequests?: string
    image: string
  }
  
  export interface Invoice {
    id: string
    bookingId: string
    date: string
    amount: number
    status: "paid" | "unpaid"
    items: {
      description: string
      amount: number
    }[]
  }
  
  export interface Service {
    id: string
    name: string
    category: "room-service" | "spa" | "restaurant" | "transportation"
    description: string
    price: number
    image: string
    available: boolean
  }
  
  export interface Notification {
    id: string
    title: string
    message: string
    date: string
    read: boolean
    type: "booking" | "promotion" | "service" | "payment"
  }
  
  // Mock user data
  export const mockUser: User = {
    id: "user-001",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "+84 912 345 678",
    avatar: "/professional-asian-man.png",
    membershipTier: "Gold",
    loyaltyPoints: 2450,
    dateOfBirth: "1990-05-15",
    gender: "male",
    nationality: "Vietnamese",
    address: "123 Nguyễn Huệ",
    city: "Hồ Chí Minh",
    country: "Việt Nam",
    postalCode: "700000",
    passportNumber: "N1234567",
    idNumber: "079090001234",
    citizenId: "079090001234",
    citizenIdIssueDate: "2016-01-15",
    citizenIdIssuePlace: "Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư",
    emergencyContact: {
      name: "Nguyễn Thị Bình",
      relationship: "Vợ",
      phone: "+84 913 456 789",
    },
    preferences: {
      roomType: "Deluxe",
      bedType: "King",
      floorPreference: "High Floor",
      smokingRoom: false,
      pillowType: "Soft",
    },
    communicationPreferences: {
      emailNotifications: true,
      smsNotifications: true,
      promotionalEmails: false,
    },
    twoFactorEnabled: true,
  }
  
  // Mock bookings data
  export const mockBookings: Booking[] = [
    {
      id: "BK-2024-001",
      roomType: "Deluxe Ocean View",
      roomNumber: "1205",
      checkInDate: "2024-01-25",
      checkOutDate: "2024-01-28",
      guests: 2,
      status: "checked-in",
      totalPrice: 4500000,
      specialRequests: "Late check-out, extra pillows",
      image: "/luxury-hotel-ocean-view-room.jpg",
    },
    {
      id: "BK-2024-002",
      roomType: "Executive Suite",
      checkInDate: "2024-02-15",
      checkOutDate: "2024-02-18",
      guests: 2,
      status: "confirmed",
      totalPrice: 7200000,
      specialRequests: "King bed, high floor",
      image: "/luxury-hotel-executive-suite.jpg",
    },
    {
      id: "BK-2023-089",
      roomType: "Superior Room",
      roomNumber: "805",
      checkInDate: "2023-12-20",
      checkOutDate: "2023-12-23",
      guests: 1,
      status: "completed",
      totalPrice: 2700000,
      image: "/modern-hotel-room.png",
    },
  ]
  
  // Mock invoices data
  export const mockInvoices: Invoice[] = [
    {
      id: "INV-2024-001",
      bookingId: "BK-2024-001",
      date: "2024-01-25",
      amount: 4500000,
      status: "unpaid",
      items: [
        { description: "Deluxe Ocean View - 3 nights", amount: 4200000 },
        { description: "Room Service", amount: 150000 },
        { description: "Minibar", amount: 100000 },
        { description: "Service Charge (10%)", amount: 50000 },
      ],
    },
    {
      id: "INV-2023-089",
      bookingId: "BK-2023-089",
      date: "2023-12-23",
      amount: 2700000,
      status: "paid",
      items: [
        { description: "Superior Room - 3 nights", amount: 2400000 },
        { description: "Breakfast", amount: 270000 },
        { description: "Service Charge (10%)", amount: 30000 },
      ],
    },
  ]
  
  // Mock services data
  export const mockServices: Service[] = [
    {
      id: "SRV-001",
      name: "Room Service - Breakfast",
      category: "room-service",
      description: "Continental or Vietnamese breakfast delivered to your room",
      price: 250000,
      image: "/hotel-breakfast-tray.jpg",
      available: true,
    },
    {
      id: "SRV-002",
      name: "Spa & Massage",
      category: "spa",
      description: "Relaxing 60-minute full body massage",
      price: 800000,
      image: "/luxury-spa-massage.png",
      available: true,
    },
    {
      id: "SRV-003",
      name: "Fine Dining Restaurant",
      category: "restaurant",
      description: "Reserve a table at our signature restaurant",
      price: 1500000,
      image: "/fine-dining-restaurant.png",
      available: true,
    },
    {
      id: "SRV-004",
      name: "Airport Transfer",
      category: "transportation",
      description: "Private car service to/from airport",
      price: 500000,
      image: "/luxury-car-service.png",
      available: true,
    },
  ]
  
  // Mock notifications
  export const mockNotifications: Notification[] = [
    {
      id: "NOT-001",
      title: "Check-in Available",
      message: "Your room is ready! You can now check-in online for booking BK-2024-001",
      date: "2024-01-25T10:30:00",
      read: false,
      type: "booking",
    },
    {
      id: "NOT-002",
      title: "Special Promotion",
      message: "Get 20% off on spa services this weekend!",
      date: "2024-01-24T09:00:00",
      read: false,
      type: "promotion",
    },
    {
      id: "NOT-003",
      title: "Booking Confirmed",
      message: "Your booking BK-2024-002 has been confirmed",
      date: "2024-01-20T14:15:00",
      read: true,
      type: "booking",
    },
  ]
  
  // Mock vouchers
  export const mockVouchers = [
    {
      id: "VCH-001",
      code: "WELCOME20",
      discount: "20%",
      description: "Welcome discount for new members",
      expiryDate: "2024-03-31",
      used: false,
    },
    {
      id: "VCH-002",
      code: "SPA50",
      discount: "50%",
      description: "Half price spa treatment",
      expiryDate: "2024-02-28",
      used: false,
    },
  ]
  
  // Hotel support contact information
  export const hotelSupportContact = {
    reception: "+84 28 3822 5678",
    concierge: "+84 28 3822 5679",
    roomService: "+84 28 3822 5680",
    spa: "+84 28 3822 5681",
    restaurant: "+84 28 3822 5682",
    emergency: "113",
    email: "support@grandhotel.vn",
    address: "123 Đường Đồng Khởi, Quận 1, TP. Hồ Chí Minh",
  }
  