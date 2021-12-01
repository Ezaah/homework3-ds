.DEFAULT_GOAL := help

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: up
up: ## run the project 
	@echo "Checking if inventory dependencies exists..."
	@if [ ! -d "./inventory/node_modules" ]; then $(MAKE) install; fi
	@echo "Running project..."
	@docker-compose up

.PHONY: stop
stop: ## stop Docker containers without removing them
	@docker-compose stop

.PHONY: down
down: ## stop and remove Docker containers without wiping volumes
	@docker-compose down --remove-orphans

.PHONY: reset
reset:	## wipe volumes, then pull
	@docker-compose down --volumes --remove-orphans
reset: pull

.PHONY: pull
pull: ## update Docker images
	@docker-compose pull postgres nginx inventory

.PHONY: rebuild
rebuild: ## rebuild backend Docker image
	@docker-compose stop
	@docker-compose build --no-cache

.PHONY: rebuild-full
rebuild-full: ## rebuild backend Docker image and wipes volumes
	@docker-compose down --remove-orphans
	@docker-compose build --no-cache


.PHONY: install
install: ## Installs node dependencies for inventory
	@echo "Installing dependencies..."
	@docker-compose run --rm --no-deps inventory npm install