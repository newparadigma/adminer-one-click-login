FROM alpine:3.17

LABEL maintainer="Ivan Iashin <newparadigma1@gmail.com>"

ENV ADMINER_VERSION=4.8.1
ENV MEMORY=256M
ENV UPLOAD=2048M
ENV WORKERS=4
ENV PHP_CLI_SERVER_WORKERS=${WORKERS}
ENV WORKDIR=/var/www/html

RUN echo '@community http://nl.alpinelinux.org/alpine/v3.14/community' >> /etc/apk/repositories && \
    apk update && \
    apk upgrade && \
    apk add \
        wget \
        ca-certificates \
        php8@community \
        php8-session@community \
        php8-mysqli@community \
        tini && \
    mkdir -p $WORKDIR && \
    wget https://github.com/vrana/adminer/releases/download/v$ADMINER_VERSION/adminer-$ADMINER_VERSION.php -O $WORKDIR/adminer.php && \
    mkdir $WORKDIR/plugins && \
    wget https://raw.githubusercontent.com/vrana/adminer/master/plugins/plugin.php -O $WORKDIR/plugins/plugin.php && \
    wget https://raw.githubusercontent.com/giofreitas/one-click-login/master/oneclick-login.php -O $WORKDIR/plugins/oneclick-login.php && \
    ln -s /usr/bin/php8 /usr/bin/php && \
    apk del wget ca-certificates && \
    rm -rf /var/cache/apk/*

COPY adminer-with-plugins.php $WORKDIR/index.php 

WORKDIR $WORKDIR
EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]

CMD /usr/bin/php \
    -d memory_limit=$MEMORY \
    -d upload_max_filesize=$UPLOAD \
    -d post_max_size=$UPLOAD \
    -S 0.0.0.0:80
