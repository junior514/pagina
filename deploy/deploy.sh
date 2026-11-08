#!/usr/bin/env bash
# Despliegue en el VPS (Ubuntu). Ejecutar desde /var/www/electrind
set -euo pipefail

npm ci
npm run build

# El modo standalone necesita copiar los estáticos junto al servidor
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

pm2 startOrReload ecosystem.config.js
pm2 save
echo "✅ Electrind desplegado"
