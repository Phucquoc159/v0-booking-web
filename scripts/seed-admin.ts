import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin seed...')

    // Check if admin already exists
    const existingAdmin = await prisma.nhanVien.findUnique({
      where: { username: 'admin' },
    })

    if (existingAdmin) {
      console.log('✅ Admin user already exists with username: admin')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin', 10)
    console.log('🔐 Password hashed successfully')

    // Check if required departments and roles exist
    const boPhan = await prisma.boPhan.findUnique({
      where: { idBp: 'BP1' },
    })

    if (!boPhan) {
      console.log('⚠️  BoPhan BP1 does not exist. Creating...')
      await prisma.boPhan.create({
        data: {
          idBp: 'BP1',
          tenBp: 'Le tan',
        },
      })
    }

    const nhomQuyen = await prisma.nhomQuyen.findUnique({
      where: { idNq: 'NQ1' },
    })

    if (!nhomQuyen) {
      console.log('⚠️  NhomQuyen NQ1 does not exist. Creating...')
      await prisma.nhomQuyen.create({
        data: {
          idNq: 'NQ1',
          tenNc: 'NhanVien',
        },
      })
    }

    // Generate ID
    const idNv = 'NV' + Date.now().toString().slice(-8)

    // Create admin user
    const adminUser = await prisma.nhanVien.create({
      data: {
        idNv,
        username: 'admin',
        password: hashedPassword,
        email: 'admin@hotel.com',
        ho: 'Admin',
        ten: 'User',
        sdt: '0900000000',
        idBp: 'BP1',
        idNq: 'NQ1',
      },
      include: {
        boPhan: true,
        nhomQuyen: true,
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('📋 Admin details:')
    console.log(`   ID: ${adminUser.idNv}`)
    console.log(`   Username: ${adminUser.username}`)
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Name: ${adminUser.ho} ${adminUser.ten}`)
    console.log(`   Department: ${adminUser.boPhan.tenBp}`)
    console.log(`   Role: ${adminUser.nhomQuyen.tenNc}`)
  } catch (error) {
    console.error('❌ Error seeding admin:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedAdmin()
  .then(() => {
    console.log('🎉 Seed completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error)
    process.exit(1)
  })

