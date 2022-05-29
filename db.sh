#!/usr/bin/env bash

cd db
sudo rm -rf cockroach-data
docker-compose down --volumes && docker-compose build && docker-compose up -d
