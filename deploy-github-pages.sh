#!/bin/bash

# Script para desplegar en GitHub Pages

echo "🚀 Preparando despliegue en GitHub Pages..."

# 1. Verificar que Git está inicializado
if [ ! -d ".git" ]; then
    echo "❌ Error: No es un repositorio git"
    echo "Ejecuta: git init"
    exit 1
fi

# 2. Agregar todos los cambios
echo "📝 Agregando archivos..."
git add .

# 3. Crear commit
echo "💾 Creando commit..."
TIMESTAMP=$(date '+%d/%m/%Y %H:%M:%S')
git commit -m "🎨 Component Book v2 - Neomorfismo + Templates Clickeables - $TIMESTAMP"

# 4. Push a la rama main
echo "🌐 Subiendo a GitHub..."
git push origin main

echo "✅ ¡Despliegue completado!"
echo ""
echo "📊 Próximos pasos:"
echo "1. Ve a tu repositorio en GitHub"
echo "2. Settings → Pages"
echo "3. Selecciona 'Deploy from a branch'"
echo "4. Rama: main | Carpeta: / (root)"
echo "5. ¡Listo! Tu sitio estará disponible en unos minutos"
echo ""
echo "🔗 Tu sitio estará en: https://[usuario].github.io/amazon-product-page"
