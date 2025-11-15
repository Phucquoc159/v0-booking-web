# Makefile for the project

# Use .PHONY to declare targets that are not actual files.
# This prevents make from getting confused if a file with the same name as a target exists.
.PHONY: init up down build migrate seed

# Default command to run when no target is specified
default:
	@echo "Please specify a target. Available targets: init, up, down, build, migrate, seed"

## --------------------------------------
## Service Management
## --------------------------------------

# Start all services in the background
up:
	@echo "Starting all services in the background..."
	docker compose up -d

# Stop and remove all services
down:
	@echo "Stopping and removing all services..."
	docker compose down

# Build or rebuild services
build:
	@echo "Building or rebuilding services..."
	docker compose build

## --------------------------------------
## Project Initialization
## --------------------------------------

# Initialize the project (build, start, migrate, seed)
init: build up
	@echo "Initializing the project..."
	@echo "Waiting for the database to be ready..."
	sleep 5
	@make migrate
	sleep 3
	@make seed
	@echo "Project initialization complete!"

# Run database migrations and generate Prisma client
migrate:
	@echo "Running database migrations..."
	docker compose exec -T nextjs npx prisma migrate dev --name init_hotel_schema
	@echo "Generating Prisma client..."
	docker compose exec -it nextjs npx prisma generate

# Seed the database with initial data
seed:
	@echo "Seeding database..."
	cat testdata/nextjs_db.sql | docker compose exec -T postgres psql -U postgres -d nextjs_db

seed-admin:
	@echo "Seeding admin..."
	docker compose exec nextjs npm run seed:admin
