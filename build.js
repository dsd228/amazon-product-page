const fs = require('fs');
const path = require('path');

// Configuración
const config = {
    components: {
        header: 'components/header.html',
        footer: 'components/footer.html',
        cta: 'components/cta-contacto.html'
    },
    templates: {
        blog: 'templates/template-blog.html',
        case: 'templates/template-case.html',
        service: 'templates/template-servicio.html'
    },
    output: {
        blog: 'blog/',
        cases: 'cases/',
        services: 'servicios/',
        quotes: 'cotizaciones/'
    }
};

// Datos de las páginas
const pages = {
    blog: [
        { 
            slug: 'blog-canva-vs-figma-2025',
            title: 'Canva vs Figma 2025: ¿Cuál Elegir Para Tu Proyecto?',
            description: 'Análisis completo de Canva vs Figma para diseño en 2025. Pros, contras y casos de uso específicos.',
            category: 'Herramientas',
            date: '2025-01-15'
        },
        {
            slug: 'blog-dashboard-design-examples-2024',
            title: '15 Ejemplos de Dashboard que Convierten (2024)',
            description: 'Ejemplos reales de dashboards que mejoraron métricas de negocio. Patrones y mejores prácticas.',
            category: 'UI Design',
            date: '2024-11-20'
        }
        // Agregar más páginas...
    ],
    cases: [
        {
            slug: 'case-app-onboarding',
            title: 'Optimización de Onboarding: +78% Retención',
            description: 'Rediseño completo del flujo de onboarding para app FinTech. Resultados: +78% retención.',
            category: 'FinTech',
            duration: '8 semanas'
        }
        // Agregar más casos...
    ]
};

// Función para leer componentes
function readComponent(componentPath) {
    try {
        return fs.readFileSync(componentPath, 'utf8');
    } catch (error) {
        console.error(`Error reading component ${componentPath}:`, error);
        return '';
    }
}

// Función para generar páginas
function generatePages() {
    console.log('🚀 Generando páginas...');
    
    // Generar páginas de blog
    pages.blog.forEach(blog => {
        const template = readComponent(config.templates.blog);
        
        // Reemplazar variables
        let html = template
            .replace(/<!-- TÍTULO DEL ARTÍCULO -->/g, blog.title)
            .replace(/<!-- DESCRIPCIÓN META -->/g, blog.description)
            .replace(/<!-- TÍTULO OG -->/g, blog.title)
            .replace(/<!-- DESCRIPCIÓN OG -->/g, blog.description);
        
        // Añadir componentes
        const header = readComponent(config.components.header);
        const footer = readComponent(config.components.footer);
        
        html = html
            .replace('<!-- #include virtual="../components/header.html" -->', header)
            .replace('<!-- #include virtual="../components/footer.html" -->', footer);
        
        // Guardar archivo
        const outputPath = path.join(config.output.blog, `${blog.slug}.html`);
        fs.writeFileSync(outputPath, html, 'utf8');
        console.log(`✅ Generado: ${outputPath}`);
    });
    
    console.log('🎉 ¡Todas las páginas generadas!');
}

// Ejecutar
if (require.main === module) {
    generatePages();
}

module.exports = { generatePages };
