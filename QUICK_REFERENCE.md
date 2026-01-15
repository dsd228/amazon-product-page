# 🎯 QUICK REFERENCE - Toda la Información en Un Lugar

## 📂 ESTRUCTURA DE ARCHIVOS

```
c:\Users\dsd22\neobook-product-page\
├── index.html                              ← ARCHIVO PRINCIPAL (3,254 líneas)
├── 
├── 📖 DOCUMENTACIÓN (4 archivos nuevos):
│   ├── MEJORAS_IMPLEMENTADAS_2026.md       ← Qué cambió técnicamente
│   ├── VISUAL_CHANGES_GUIDE.md            ← Qué VES diferente
│   ├── DEPLOYMENT_MONETIZACION_GUIDE.md   ← Cómo vender esto
│   └── RESUMEN_EJECUTIVO_FINAL.md         ← Overview completo
│
├── assets/
│   ├── css/
│   │   ├── index.css                      ← Estilos optimizados
│   │   ├── style.css
│   │   └── styles-mejorado.css
│   └── js/
│       ├── index.js                       ← JavaScript (FAQ, eventos)
│       ├── main.js
│       └── main-mejorado.js
│
└── [otros archivos originales]
```

---

## 🔍 DÓNDE ENCONTRAR CADA COSA

### Busco: VARIABLES CSS
📍 **Ubicación**: `index.html` línea 24-100  
**Contenido**: 62+ variables (colores, espaciado, sombras, tipografía)
```css
/* EJEMPLO */
--dorado-metalico: #D4AF37;
--space-md: 16px;
--shadow-md-up: 10px 10px 20px rgba(0,0,0,0.5)...
```

### Busco: HERO SECTION
📍 **Ubicación**: `index.html` línea 250-315  
**Lo que cambió**: Gradiente 135deg + pseudo-elements + text-shadow dorado
```css
background: linear-gradient(135deg, var(--negro-profundo), ...);
::after { /* Pseudo-element con glow */ }
h1 { text-shadow: 0 4px 24px rgba(212, 175, 55, 0.25); }
```

### Busco: BOTONES
📍 **Ubicación**: `index.html` línea 360-410  
**Clases**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-buy`, `.btn-view`, `.pricing-btn`
```css
.btn-primary {
  background: var(--dorado-metalico);
  box-shadow: var(--shadow-md-up);
  hover: { transform: -4px; box-shadow: var(--shadow-hover); }
  active: { transform: -2px; box-shadow: var(--shadow-active); }
}
```

### Busco: TARJETAS
📍 **Ubicación**: `index.html` línea 750-1335  
**Componentes**: `.sales-card`, `.testimonial`, `.template-card`, `.pricing-card`
```css
.sales-card {
  box-shadow: var(--shadow-md-up);
  hover: { transform: -8px; box-shadow: var(--shadow-hover); }
  border: 1px solid rgba(212, 175, 55, 0.15);
}
```

### Busco: FAQ ACCORDION
📍 **Ubicación**: `index.html` línea 1605-1648  
**Funcionalidad**: Smooth open/close con rotation icon
```css
.faq-item { box-shadow: var(--shadow-sm-up); }
.faq-question:hover { background: rgba(212,175,55,0.05); }
.faq-icon.active { transform: rotate(180deg); }
```

### Busco: RESPONSIVE DESIGN
📍 **Ubicación**: `index.html` línea 1787-1844  
**Breakpoints**: 768px (tablets), 480px (mobile)
```css
@media (max-width: 768px) {
  :root {
    --font-size-base: 15px;
    --space-lg: 20px;
  }
}
```

### Busco: ACCESIBILIDAD
📍 **Ubicación**: Distribuido en todo el archivo  
**Focus states**: Línea ~380 (outline 3px dorado)
```css
.btn:focus-visible {
  outline: 3px solid var(--dorado-metalico);
  outline-offset: 3px;
}
```

---

## 🎨 CSS VARIABLES COMPLETAS

### COLORES
```css
--negro-profundo: #0A0A0A;          /* Fondo primario */
--negro-muy-oscuro: #121212;        /* Variante */
--negro-oscuro: #1C1C1C;            /* Cards */
--gris-oscuro: #2E2E2E;             /* Borders, elementos */
--gris-claro: #4A4A4A;              /* Secondary text */
--gris-light: #7A7A7A;              /* Disabled states */
--granate-velvet: #6A0D25;          /* Accent (luxury) */
--dorado-metalico: #D4AF37;         /* Primary CTA */
--dorado-claro: #E8C750;            /* Hover states */
--blanco-marfil: #F8F8F8;           /* Primary text */
--blanco-puro: #FFFFFF;             /* Pure white edge cases */
```

### ESPACIADO (8px base)
```css
--space-xs: 4px;        /* Minimal */
--space-sm: 8px;        /* Small gap */
--space-md: 16px;       /* Default */
--space-lg: 24px;       /* Large */
--space-xl: 32px;       /* Extra large */
--space-2xl: 48px;      /* 2x */
--space-3xl: 64px;      /* 3x */
--space-4xl: 80px;      /* 4x */
--space-5xl: 96px;      /* Hero section */
```

### RADIOS
```css
--radius-sm: 8px;       /* Small buttons */
--radius-md: 12px;      /* Default */
--radius-lg: 16px;      /* Cards */
--radius-xl: 24px;      /* Large elements */
--radius-full: 999px;   /* Fully rounded */
```

### SOMBRAS (Neumorfismo 3 niveles)
```css
/* ELEVACIÓN PEQUEÑA */
--shadow-sm-up: 6px 6px 12px rgba(0,0,0,0.4), 
                -4px -4px 10px rgba(70,70,70,0.2);
--shadow-sm-in: inset 2px 2px 5px rgba(255,255,255,0.1),
                inset -2px -2px 5px rgba(0,0,0,0.5);

/* ELEVACIÓN MEDIA (default) */
--shadow-md-up: 10px 10px 20px rgba(0,0,0,0.5),
                -6px -6px 16px rgba(80,80,80,0.3);
--shadow-md-in: inset 4px 4px 8px rgba(0,0,0,0.4),
                inset -4px -4px 8px rgba(80,80,80,0.2);

/* ELEVACIÓN GRANDE */
--shadow-lg-up: 14px 14px 28px rgba(0,0,0,0.6),
                -8px -8px 20px rgba(90,90,90,0.3);
--shadow-lg-in: inset 6px 6px 12px rgba(0,0,0,0.5),
                inset -6px -6px 12px rgba(90,90,90,0.2);

/* INTERACTIVO */
--shadow-hover: 0 12px 32px rgba(212, 175, 55, 0.25);
--shadow-active: inset 0 2px 8px rgba(0,0,0,0.3),
                 0 4px 12px rgba(212, 175, 55, 0.15);
```

### TIPOGRAFÍA (Escala 1.15x)
```css
--font-family-serif: 'Playfair Display', serif;        /* Luxury */
--font-family-sans: 'Inter', sans-serif;               /* Moderno */

--font-size-xs: 12px;       /* 12px */
--font-size-sm: 14px;       /* 12 × 1.15 */
--font-size-base: 16px;     /* 14 × 1.15 */
--font-size-md: 18px;       /* 16 × 1.15 */
--font-size-lg: 21px;       /* 18 × 1.15 */
--font-size-xl: 24px;       /* 21 × 1.15 */
--font-size-2xl: 28px;      /* 24 × 1.15 */
--font-size-3xl: 32px;      /* 28 × 1.15 */
--font-size-4xl: 37px;      /* 32 × 1.15 */
--font-size-5xl: 42px;      /* 37 × 1.15 */
--font-size-6xl: 49px;      /* 42 × 1.15 */
--font-size-7xl: 56px;      /* 49 × 1.15 */

--line-height-tight: 1.2;       /* Títulos */
--line-height-normal: 1.5;      /* Default */
--line-height-relaxed: 1.75;    /* Body text */
```

### TRANSICIONES
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);    /* Quick */
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);     /* Default */
--transition-slow: 0.4s cubic-bezier(0.23, 1, 0.32, 1);   /* Smooth */
```

### Z-INDEX HIERARCHY
```css
--z-base: 0;        /* Elementos normales */
--z-drop: 1;        /* Dropdowns, modals bajo */
--z-sticky: 100;    /* Header sticky */
--z-fixed: 1000;    /* Fixed elements */
--z-modal: 1200;    /* Modals, popovers */
```

---

## 🔧 CÓMO CAMBIAR COSAS

### Cambiar Color Principal (Dorado → Otro)
```css
/* Línea ~45 en index.html */
--dorado-metalico: #D4AF37;  ← Cambiar este valor

/* Resultado: Se actualiza en 30+ lugares automáticamente */
```

### Cambiar Espaciado Global
```css
/* Línea ~57 en index.html */
--space-md: 16px;  ← Cambiar este valor

/* Resultado: Cards, buttons, padding se ajustan automáticamente */
```

### Cambiar Velocidad de Transiciones
```css
/* Línea ~92 en index.html */
--transition-base: 0.3s ...;  ← Cambiar 0.3s a 0.5s para más lento

/* Resultado: Todo se vuelve más lento/rápido */
```

### Agregar Nuevo Color
```css
/* En :root, agregar línea nueva */
--verde-novo: #00FF00;

/* Usar en elemento */
.elemento-nuevo {
  color: var(--verde-novo);
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (No cambios)
```css
1200px+: Estilos normales
```

### Tablet (768px)
```css
@media (max-width: 768px) {
  :root {
    --font-size-base: 15px;
    --space-lg: 20px;
    --space-5xl: 80px;
  }
}
```

### Mobile (480px)
```css
@media (max-width: 480px) {
  :root {
    --font-size-base: 14px;
    --font-size-7xl: 28px;
    --space-xl: 24px;
    --space-5xl: 64px;
  }
}
```

---

## ✅ VALIDACIÓN ANTES DE ENVIAR A PRODUCCIÓN

### Checklist:
- [ ] Abre en Chrome, Firefox, Safari, Edge
- [ ] Testea responsive: DevTools device emulation
- [ ] Click en botones: verifica hover/active
- [ ] Scroll: observa cards elevation
- [ ] FAQ: abre/cierra items
- [ ] WhatsApp: clickable y accesible
- [ ] Google Analytics: evento tracking
- [ ] Lighthouse: Score > 90/100
- [ ] WAVE tool: Sin errores accesibilidad

### Command para validar:
```bash
# Si tienes Python:
python -m http.server 8000

# Luego abre:
localhost:8000

# DevTools → Lighthouse → Generate report
```

---

## 🚀 DEPLOYMENT EN 3 PASOS

### 1. GitHub Pages
```bash
git init
git add .
git commit -m "v2.0 - Professional Design"
git push origin main
# Settings → Pages → Source: main
# URL: https://usuario.github.io/repo
```

### 2. Dominio Personalizado
```bash
# Registrar en Namecheap/GoDaddy
# Apuntar DNS a GitHub Pages
# Esperar 24-48 horas propagación
```

### 3. SSL (Automático)
```bash
# GitHub Pages = HTTPS automático
# No requiere configuración
```

---

## 📞 CONTACTO PARA SOPORTE

Si hay problemas técnicos:

1. **HTML Errors** → Revisar sintaxis `<>`
2. **CSS not working** → Verificar variable nombre `var(--nombre-correcto)`
3. **Responsive broken** → Check media queries en línea 1787-1844
4. **Colors wrong** → Variables CSS línea 24-100
5. **Animations slow** → Cambiar transiciones línea 92-96

---

## 📊 DOCUMENTACIÓN RÁPIDA

| Archivo | Uso |
|---------|-----|
| MEJORAS_IMPLEMENTADAS_2026.md | Qué cambió técnicamente |
| VISUAL_CHANGES_GUIDE.md | Qué VES visualmente |
| DEPLOYMENT_MONETIZACION_GUIDE.md | Cómo vender/deployar |
| RESUMEN_EJECUTIVO_FINAL.md | Overview completo |
| Este archivo (QUICK_REFERENCE.md) | Dónde encontrar todo |

---

## 🎁 ÚLTIMO CONSEJO

**En 30 días:**
1. Deploy a GitHub Pages (15 min)
2. Compartir en LinkedIn (1 hora)
3. Escribir 1 blog post (2 horas)
4. Cerrar 1 cliente (outcome)

**En 90 días:**
- 3-4 blog posts
- 60+ social posts
- 10+ leads
- 2-3 proyectos cerrados

**En 1 año:**
- Referrals automáticos
- Marca reconocida
- 5-10 clientes recurrentes
- Revenue mensual consistente

---

**¡LISTO PARA GANAR!** 🚀

