build:
	@docker-compose build

up:
	@docker-compose up -d

init: build up

docker-hub-push:
	@docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t newparadigma/adminer-one-click-login:full ./full --push
	@docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t newparadigma/adminer-one-click-login:latest ./full --push
	@docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t newparadigma/adminer-one-click-login:mysql ./mysql --push
	@docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t newparadigma/adminer-one-click-login:mongo ./mongo --push
	@docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t newparadigma/adminer-one-click-login:postgre ./postgre --push