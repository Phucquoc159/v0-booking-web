#!/bin/bash

# Chạy migrate trong container
docker-compose exec nextjs npx prisma migrate dev --name init

# Generate Prisma Client
docker-compose exec nextjs npx prisma generate
