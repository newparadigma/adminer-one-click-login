build:
	@docker compose build

up:
	@docker compose up -d

init: build up

test:
	@docker compose exec node node tests/test.js

test-mysql:
	@docker compose exec node node tests/test.js mysql

test-mongo:
	@docker compose exec node node tests/test.js mongo

test-postgre:
	@docker compose exec node node tests/test.js postgre

docker-hub-push:
	@docker buildx build --platform linux/amd64, linux/i386,linux/arm/v5, linux/arm/v6, linux/arm/v7, linux/arm64 -t newparadigma/adminer-one-click-login:full ./full --push
	@docker buildx build --platform linux/amd64, linux/i386,linux/arm/v5, linux/arm/v6, linux/arm/v7, linux/arm64 -t newparadigma/adminer-one-click-login:latest ./full --push
	@docker buildx build --platform linux/amd64, linux/i386,linux/arm/v5, linux/arm/v6, linux/arm/v7, linux/arm64 -t newparadigma/adminer-one-click-login:mysql ./mysql --push
	@docker buildx build --platform linux/amd64, linux/i386,linux/arm/v5, linux/arm/v6, linux/arm/v7, linux/arm64 -t newparadigma/adminer-one-click-login:mongo ./mongo --push
	@docker buildx build --platform linux/amd64, linux/i386,linux/arm/v5, linux/arm/v6, linux/arm/v7, linux/arm64 -t newparadigma/adminer-one-click-login:postgre ./postgre --push