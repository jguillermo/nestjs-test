.DEFAULT_GOAL := test
## GENERAL ##

export BACKEND_RUN=docker compose run backend

install-backend:
	@${BACKEND_RUN} npm install

build:
	docker build -t backend-app:prod-3 --target production ./backend

lint:
	@${BACKEND_RUN} npm run lint

lint-check:
	@${BACKEND_RUN} npx eslint "{src,apps,libs,test}/**/*.ts"

format:
	@${BACKEND_RUN} npm run format

format-check:
	@${BACKEND_RUN} npx prettier --check "src/**/*.ts" "test/**/*.ts"

test-unit:
	@${BACKEND_RUN} npm run test

test-integration:
	@${BACKEND_RUN} firebase emulators:exec "npm run test:e2e" --only firestore

test-bdd:
	@${BACKEND_RUN} firebase emulators:exec "npm run bdd" --only firestore

sh:
	@${BACKEND_RUN} bash

install:
	@make install-backend

.PHONY: test
test:
	@make format
	@make lint
	@make format-check
	@make lint-check
	@make test-unit
	@make test-integration
	@make test-bdd

up:
	@docker compose up -d

down:
	@docker compose down

ps:
	@docker compose ps

log-backend:
	@docker compose logs -f backend

log-frontend:
	@docker compose logs -f frontend

docker-prune:
	@make down
	@docker rm -f $$(docker ps -a -q) || true
	@docker volume prune -f
	@docker network prune -f



help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'