# Adminer for MySQL with one click login plugin.

## Adminer Docker Image
[![Build Status](https://travis-ci.com/newparadigma/adminer-mysql-ocl.svg?branch=master)](https://travis-ci.com/newparadigma/adminer-mysql-ocl)
[![Docker Pulls](https://img.shields.io/docker/pulls/newparadigma/adminer-mysql-ocl.svg)](https://hub.docker.com/r/newparadigma/adminer-mysql-ocl)

Docker Hub: https://hub.docker.com/r/newparadigma/adminer-mysql-ocl

## General
- Weight: ~20 MB
- Based on Alpine Linux 3.17
- Adminer version: 4.8.1
- Adminer plugins: One click login
- PHP version: 8
- Only for MySQL

## Usage
Create adminer-servers.php in a project directory and define your database details with the following structure

```php
<?php
return [
    '{host}' => [
		// Required parameters
        'username'  => '{username}',
        'pass'      => '{password}',
        // Optional parameters
        'label'     => '{MySQL}',
        'databases' => [
            '{database_1_name}' => '{Database 1}',
            '{database_2_name}' => '{Database 2}'
        ]
    ],
];
```

Add the following structure to your docker-compose.yml file:
```yaml
adminer:
    image: newparadigma/adminer-mysql-ocl
    volumes:
      - ./adminer-servers.php/:/var/www/html/adminer-servers.php
    ports:
      - 80:80
```

## Credits
### This project is based on the following projects:
- [Alpine linux](https://www.alpinelinux.org)
- [Adminer](https://www.adminer.org/en/)

### Inspired by 
- [dockette/adminer](https://github.com/dockette/adminer)
- [edyan/docker-adminer](https://github.com/edyan/docker-adminer)