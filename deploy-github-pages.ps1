# Script PowerShell para desplegar en GitHub Pages

Write-Host "🚀 Preparando despliegue en GitHub Pages..." -ForegroundColor Cyan

# 1. Verificar que Git está inicializado
if (!(Test-Path ".git")) {
    Write-Host "❌ Error: No es un repositorio git" -ForegroundColor Red
    Write-Host "Ejecuta: git init" -ForegroundColor Yellow
    exit 1
}

# 2. Agregar todos los cambios
Write-Host "📝 Agregando archivos..." -ForegroundColor Green
git add .

# 3. Crear commit
Write-Host "💾 Creando commit..." -ForegroundColor Green
$TIMESTAMP = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
git commit -m "🎨 Component Book v2 - Neomorfismo + Templates Clickeables - $TIMESTAMP"

# 4. Push a la rama main
Write-Host "🌐 Subiendo a GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Ve a tu repositorio en GitHub" -ForegroundColor White
Write-Host "2. Settings → Pages" -ForegroundColor White
Write-Host "3. Selecciona 'Deploy from a branch'" -ForegroundColor White
Write-Host "4. Rama: main | Carpeta: / (root)" -ForegroundColor White
Write-Host "5. ¡Listo! Tu sitio estará disponible en unos minutos" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Tu sitio estará en: https://[usuario].github.io/amazon-product-page" -ForegroundColor Cyan
