# Vào trong container Next.js
docker compose exec nextjs sh

# Chạy migrate
npx prisma migrate dev --name init

# Hoặc generate Prisma Client
npx prisma generate

# Thoát container
exit
