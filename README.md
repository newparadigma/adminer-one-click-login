# Adminer with one click login plugin

<!-- [![Build Status](https://travis-ci.com/newparadigma/adminer-one-click-login.svg?branch=master)](https://travis-ci.com/newparadigma/adminer-one-click-login) -->
[![Docker Pulls](https://img.shields.io/docker/pulls/newparadigma/adminer-one-click-login.svg)](https://hub.docker.com/r/newparadigma/adminer-one-click-login)


## General

- Weight: ~10 MB
- Based on Alpine Linux 3.17
- Adminer version: 4.8.1
- Adminer plugins: One click login
- PHP version: 8

### Example adminer ui

![Adminer UI](https://raw.githubusercontent.com/newparadigma/adminer-one-click-login/main/adminer-ui.png)

## Versions

| Image                                      | Technologies       |
|--------------------------------------------|--------------------|
| newparadigma/adminer-one-click-login       | MySQL / PostgreSQL |
| newparadigma/adminer-one-click-login:mysql | MySQL              |
| newparadigma/adminer-one-click-login:pgsql | PostgreSQL         |

## Usage

### adminer-servers.php

Create adminer-servers.php in a project directory and define your database details with the following structure

```php
<?php
return [
    '{host}' => [ // IP address or domain name
        // Required parameters
        'username'  => '{username}',
        'pass'      => '{password}',
        // Optional parameters
        'driver'    => '{driver_type}', // db driver, if omitted, defaults to 'server' (mysql driver)
        'label'     => '{label}', // custom name of service, replace {host} IP address or domain in UI
        'databases' => [
            '{database_1_name}' => '{Database label 1}',
            '{database_2_name}' => '{Database label 2}'
        ]
    ],
];
```

### List of available drivers

| DB         | driver |
|------------|--------|
| MySQL      | server |
| PostgreSQL | pgsql  |

### Example

```php
<?php
return [
    '192.168.0.1' => [
        // Required parameters
        'username'  => 'userA',
        'pass'      => 'passwordA',
        // Optional parameters
        'driver'    => 'server',
        'label'     => 'MySQL1',
        'databases' => [
            'films' => 'Films',
            'serials' => 'Serials'
        ]
    ],
    '192.168.0.1:3309' => [
        // Required parameters
        'username'  => 'userA',
        'pass'      => 'passwordA',
        // Optional parameters
        'label'     => 'MySQLTest',
    ],
    'production.com' => [
        // Required parameters
        'username'  => 'userA',
        'pass'      => 'passwordA',
        // Optional parameters
        'driver'    => 'pgsql',
    ],
];
```

### docker-compose.yml

Mount the adminer-servers.php file to the container

```yaml
adminer:
  image: newparadigma/adminer-one-click-login
  volumes:
    - ./adminer-servers.php/:/var/www/html/adminer-servers.php
  ports:
    - 80:80
```

## Credits

### This project is based on the following projects

- [Alpine linux](https://www.alpinelinux.org)
- [Adminer](https://www.adminer.org/en/)

### Inspired by

- [dockette/adminer](https://github.com/dockette/adminer)
- [edyan/docker-adminer](https://github.com/edyan/docker-adminer)