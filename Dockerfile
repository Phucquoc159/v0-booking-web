FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Expose port
EXPOSE 3000

# Start development server
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]
