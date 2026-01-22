// ============================== HERO ZOOM OUT EFFECT ==============================
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Variables
    const header = document.getElementById('main-header');
    const zoomContainer = document.getElementById('zoomContainer');
    const heroGallery = document.getElementById('heroGallery');
    const scrollDownBtn = document.getElementById('scrollDown');
    const gallerySection = document.getElementById('galeria');
    
    // ============================== EFECTO ZOOM OUT AL SCROLL ==============================
    let ticking = false;
    let lastScale = 1;
    
    function updateZoomEffect() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.pb-hero-zoom').offsetHeight;
        const galleryTop = gallerySection ? gallerySection.offsetTop : heroHeight * 2;
        
        // Calcular el progreso del scroll (0 a 1)
        let scrollProgress = Math.min(scrollY / heroHeight, 1);
        
        // Si estamos en la sección de galería, mantener el zoom máximo
        if (scrollY > galleryTop - heroHeight) {
            scrollProgress = 1;
        }
        
        // Efecto ZOOM OUT: escala disminuye mientras bajas
        // Inicio: scale(1) -> Final: scale(0.8) (20% más pequeño)
        const minScale = 0.8;
        const maxScale = 1;
        const scale = maxScale - (scrollProgress * (maxScale - minScale));
        
        // Efecto de opacidad (se desvanece)
        const opacity = 1 - (scrollProgress * 0.7);
        
        // Efecto de blur (se desenfoca)
        const blur = Math.min(scrollProgress * 10, 5);
        
        // Solo actualizar si hay cambios significativos
        if (Math.abs(scale - lastScale) > 0.001) {
            // Aplicar transformaciones al contenedor
            if (zoomContainer) {
                zoomContainer.style.transform = `scale(${scale})`;
                zoomContainer.style.opacity = opacity;
                zoomContainer.style.filter = `blur(${blur}px)`;
            }
            
            // Efecto parallax en los items de la galería
            const galleryItems = heroGallery.querySelectorAll('.pb-gallery-item');
            galleryItems.forEach((item, index) => {
                const parallaxSpeed = 0.3 + (index * 0.05);
                const yPos = scrollY * parallaxSpeed;
                item.style.transform = `translateY(${yPos}px) scale(${scale})`;
            });
            
            lastScale = scale;
        }
        
        // Botón scroll down fade
        if (scrollDownBtn) {
            scrollDownBtn.style.opacity = 1 - (scrollProgress * 3);
            if (scrollProgress > 0.3) {
                scrollDownBtn.style.visibility = 'hidden';
            } else {
                scrollDownBtn.style.visibility = 'visible';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateZoomEffect);
            ticking = true;
        }
    });
    
    // ============================== HEADER SCROLL ==============================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ============================== SMOOTH SCROLL ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                let targetPosition = target.offsetTop - headerHeight;
                
                // Si es la galería, ajustar para que quede bien con el zoom
                if (href === '#galeria') {
                    targetPosition += 50; // Pequeño ajuste
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================== BOTÓN "DESPLÁZATE HACIA ABAJO" ==============================
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            if (gallerySection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = gallerySection.offsetTop - headerHeight + 50;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Feedback visual
                this.style.opacity = '0.5';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 1000);
            }
        });
        
        // Hacerlo focusable y accesible
        scrollDownBtn.setAttribute('role', 'button');
        scrollDownBtn.setAttribute('tabindex', '0');
        scrollDownBtn.setAttribute('aria-label', 'Desplázate hacia abajo para ver la galería');
        
        // Funcionar con Enter/Space
        scrollDownBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ============================== COUNTERS ANIMATION ==============================
    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const suffix = element.textContent.replace(/[0-9]/g, '');
        let current = 0;
        
        if (isNaN(target)) return;
        
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
    
    const counters = document.querySelectorAll('.pb-stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    // ============================== FORM SUBMISSION ==============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado! Te contactaré en 24 horas.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
    
    // ============================== MOBILE MENU ==============================
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navCenter = document.querySelector('.pb-nav-center');
            if (window.getComputedStyle(navCenter).display === 'flex') {
                navCenter.style.display = 'none';
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.setAttribute('aria-expanded', 'false');
            } else {
                navCenter.style.display = 'flex';
                navCenter.style.flexDirection = 'column';
                navCenter.style.position = 'absolute';
                navCenter.style.top = '100%';
                navCenter.style.left = '0';
                navCenter.style.width = '100%';
                navCenter.style.background = 'rgba(255, 255, 255, 0.98)';
                navCenter.style.backdropFilter = 'blur(20px)';
                navCenter.style.padding = '2rem';
                navCenter.style.boxShadow = 'var(--pb-shadow-lg)';
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    }
    
    // ============================== EFECTO HOVER EN GALERÍA DEL HERO ==============================
    const heroGalleryItems = heroGallery.querySelectorAll('.pb-gallery-item');
    heroGalleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.05)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.05)', '');
        });
    });
    
    // ============================== EFECTO HOVER EN GALERÍA DE FOTOS ==============================
    const galleryPhotos = document.querySelectorAll('.pb-gallery-photo');
    galleryPhotos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.pb-photo-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        photo.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.pb-photo-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
    
    // ============================== MEJORA DE ACCESIBILIDAD ==============================
    // Agregar labels ARIA a botones
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.textContent.trim() && !button.querySelector('[aria-label]')) {
            const icon = button.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('fa-bars')) {
                    button.setAttribute('aria-label', 'Menú de navegación');
                } else if (iconClass.includes('fa-times')) {
                    button.setAttribute('aria-label', 'Cerrar menú');
                }
            }
        }
    });
    
    // Navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    console.log('🚀 NeoProdUx Portfolio con Hero Zoom Out iniciado');
    
    // Efecto inicial
    updateZoomEffect();
});
