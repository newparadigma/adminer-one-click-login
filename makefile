build:
	@docker compose build

up:
	@docker compose --profile test up -d

stop:
	@docker compose  --profile test stop

init: build up

npm-install:
	@docker compose exec node npm install

test:
	@docker compose exec node node tests/test.js

test-mysql:
	@docker compose exec node node tests/test.js mysql

test-mongo:
	@docker compose exec node node tests/test.js mongo

test-postgre:
	@docker compose exec node node tests/test.js postgre

docker-build-and-push:
	@docker buildx build --platform linux/amd64,linux/i386,linux/arm/v6,linux/arm/v7,linux/arm/v8 -t newparadigma/adminer-one-click-login:full ./full --push
	@docker buildx build --platform linux/amd64,linux/i386,linux/arm/v6,linux/arm/v7,linux/arm/v8 -t newparadigma/adminer-one-click-login:latest ./full --push
	@docker buildx build --platform linux/amd64,linux/i386,linux/arm/v6,linux/arm/v7,linux/arm/v8 -t newparadigma/adminer-one-click-login:mysql ./mysql --push
	@docker buildx build --platform linux/amd64,linux/i386,linux/arm/v6,linux/arm/v7,linux/arm/v8 -t newparadigma/adminer-one-click-login:mongo ./mongo --push
	@docker buildx build --platform linux/amd64,linux/i386,linux/arm/v6,linux/arm/v7,linux/arm/v8 -t newparadigma/adminer-one-click-login:postgre ./postgre --push