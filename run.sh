#!/usr/bin/env bash

docker-compose up -d --build database && docker-compose up -d --build app && docker exec laravel_app php artisan key:generate &&
    docker exec laravel_app php artisan config:cache && docker exec laravel_app php artisan migrate:fresh && docker exec laravel_app php artisan l5-swagger:generate &&
    docker-compose up -d --build web && docker-compose up -d --build client
