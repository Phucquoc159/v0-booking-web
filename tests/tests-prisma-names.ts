// File này để test xem Prisma sinh ra tên model như thế nào
import { prisma } from '@/lib/prisma'

async function testPrismaNames() {
  console.log('Testing Prisma model names...\n')
  
  // Kiểm tra tên models
  const models = [
    'khachHang',
    'ctPhuThu',
    'ctKhachO',
    'ctTienNghi',
    'ctKhuyenMai',
    'ctPhieuDat',
    'ctPhieuThue',
    'ctDichVu',
  ]
  
  for (const modelName of models) {
    if (modelName in prisma) {
      console.log(`✓ prisma.${modelName} exists`)
    } else {
      console.log(`✗ prisma.${modelName} NOT FOUND`)
    }
  }
  
  // Test thử query
  try {
    const count = await prisma.ctPhuThu.count()
    console.log(`\n✓ prisma.ctPhuThu.count() works: ${count} records`)
  } catch (error) {
    console.log(`\n✗ prisma.ctPhuThu query failed:`, error)
  }
}

testPrismaNames()
