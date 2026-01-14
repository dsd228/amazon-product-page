# 🌐 Guía: Desplegar en GitHub Pages

## ¿Qué es GitHub Pages?

GitHub Pages es un servicio gratuito de GitHub que te permite publicar sitios web estáticos directamente desde un repositorio.

**Ventajas:**
- ✅ Hosting gratuito ilimitado
- ✅ Dominio gratis: `[usuario].github.io`
- ✅ SSL/HTTPS automático
- ✅ Sin configuración de servidor
- ✅ Control de versiones incluido

---

## 📋 Requisitos Previos

1. **Cuenta GitHub** (gratuita en https://github.com)
2. **Git instalado** en tu máquina
3. **Tu repositorio clonado** localmente

---

## 🚀 Pasos para Desplegar

### Paso 1: Preparar tu Repositorio Local

```bash
# Navega a tu carpeta de proyecto
cd c:\Users\Public

# Inicializa Git (si no lo has hecho)
git init

# Agrega el remoto de GitHub
git remote add origin https://github.com/[TU-USUARIO]/amazon-product-page.git

# O si ya tienes remoto, verifica:
git remote -v
```

### Paso 2: Crear la Rama `main` (si no existe)

```bash
# Ver ramas actuales
git branch -a

# Si no está 'main', créala
git checkout -b main

# O si tienes 'master', renómbrala
git branch -m master main
```

### Paso 3: Agregar Archivos y Hacer Commit

```bash
# Agregar todos los cambios
git add .

# Crear un commit con mensaje descriptivo
git commit -m "🎨 Component Book Neomórfico + Templates Clickeables"
```

### Paso 4: Push a GitHub

```bash
# Primera vez (establece upstream)
git push -u origin main

# Próximas veces
git push origin main
```

### Paso 5: Configurar GitHub Pages

1. **Ve a tu repositorio en GitHub.com**
2. Haz clic en **Settings** (Configuración)
3. En el menú izquierdo, busca **Pages**
4. En "Source", selecciona:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Haz clic en **Save**

### Paso 6: ¡Espera unos minutos!

GitHub Pages tardará 1-5 minutos en construir tu sitio.

Verás un mensaje verde: "Your site is published at: `https://[usuario].github.io/amazon-product-page`"

---

## 📁 Estructura Correcta para GitHub Pages

Para que GitHub Pages funcione correctamente, tu estructura debe ser:

```
amazon-product-page/
├── index.html                 ← Página principal
├── ejemplos/
│   ├── template-eco.html
│   ├── template-tech.html
│   ├── template-sport.html
│   └── template-premium.html
├── .nojekyll                  ← Archivo vacío (opcional pero recomendado)
├── README.md
└── .git/                      ← Carpeta de Git (se crea automáticamente)
```

---

## ✅ Verificar Despliegue

Después de 2-5 minutos:

1. Abre: `https://[TU-USUARIO].github.io/amazon-product-page`
2. Deberías ver tu Component Book
3. Prueba los botones "Ver Demo"
4. Verifica que los links funcionan correctamente

---

## 🔧 Troubleshooting

### ❌ "Site not found" o página en blanco

**Solución:**
- Verifica que `index.html` está en la raíz
- Espera 5 minutos más
- Ve a Settings → Pages y confirma que el deployment esté activo
- Revisa que la rama sea `main` (no `master`)

### ❌ Los links a ejemplos no funcionan

**Solución:**
- Verifica que la carpeta `ejemplos/` esté en GitHub
- Confirma que tienes:
  - `./index.html`
  - `./ejemplos/template-eco.html`
  - `./ejemplos/template-tech.html`
  - etc.
- Los paths en HTML deben ser relativos: `ejemplos/template-eco.html`

### ❌ Cambios no aparecen

**Solución:**
```bash
# Fuerza el refresco
git add .
git commit -m "Actualización"
git push origin main

# Luego limpia el caché del navegador (Ctrl+Shift+Delete)
```

---

## 🔐 Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio (ej: `www.mitudominio.com`):

1. Compra un dominio en GoDaddy, Namecheap, etc.
2. En GitHub Settings → Pages
3. En "Custom domain", ingresa tu dominio
4. Configura los DNS según tu proveedor

---

## 📊 Monitoreo

Para ver el estado de despliegue:

1. Ve a tu repositorio
2. Haz clic en **Deployments** (arriba)
3. O ve a **Actions** para ver el historial de builds

---

## 🎯 Próximos Pasos

Después de desplegar:

1. ✅ Comparte el link: `https://[usuario].github.io/amazon-product-page`
2. ✅ Envía a tus clientes potenciales
3. ✅ Usa en tu portafolio
4. ✅ Integra en tu sitio web principal

---

## 📚 Recursos Adicionales

- [Documentación GitHub Pages](https://docs.github.com/en/pages)
- [Documentación Git](https://git-scm.com/doc)
- [Tutorial Git en Español](https://git-scm.com/book/es/v2)

---

**¿Necesitas ayuda?**
- 📧 Email: david.diaz.uxdata@gmail.com
- 💬 WhatsApp: +54 9 3525 300076
- 🐛 Abre un issue en GitHub

---

**© 2026 Amazon Templates Pro** | Fácil, rápido y gratis
