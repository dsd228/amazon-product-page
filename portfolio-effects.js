// ==============================
// PORTFOLIOBOX EFFECTS PARA TU PORTAFOLIO
// ==============================

class PortfolioEffects {
    constructor() {
        this.header = document.querySelector('.pb-header');
        this.heroSection = document.querySelector('.pb-hero-parallax');
        this.scrollHint = document.querySelector('.pb-scroll-hint');
        this.revealElements = document.querySelectorAll('.pb-reveal, .pb-portfoliobox-card, .pb-animated-stat');
        
        this.lastScrollY = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        // Configurar estado inicial
        this.setInitialHeader();
        
        // Event listeners
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Configurar scroll hint
        if (this.scrollHint) {
            this.scrollHint.addEventListener('click', () => this.scrollToProjects());
        }
        
        // Inicializar observador de elementos
        this.initIntersectionObserver();
        
        // Configurar parallax
        this.initParallax();
    }
    
    setInitialHeader() {
        if (window.scrollY === 0 && this.heroSection) {
            this.header.classList.add('hero-mode');
        }
    }
    
    handleScroll() {
        this.lastScrollY = window.scrollY;
        
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                this.updateHeader();
                this.updateParallax();
                this.checkReveals();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    updateHeader() {
        const scrollY = this.lastScrollY;
        
        if (scrollY > 100) {
            this.header.classList.remove('hero-mode');
            this.header.classList.add('scrolled');
            
            // Efecto de opacidad mientras sales del hero
            if (scrollY < 500 && this.heroSection) {
                const opacity = 1 - (scrollY / 500);
                this.header.style.opacity = Math.max(opacity, 0.3);
            } else {
                this.header.style.opacity = '1';
            }
        } else {
            this.header.classList.add('hero-mode');
            this.header.classList.remove('scrolled');
            this.header.style.opacity = '1';
        }
    }
    
    initParallax() {
        const heroBg = document.querySelector('.pb-hero-bg');
        if (!heroBg) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
    
    initIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animación específica para stats
                    if (entry.target.classList.contains('pb-stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        this.revealElements.forEach(el => observer.observe(el));
    }
    
    checkReveals() {
        this.revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight * 0.85) &&
                rect.bottom >= (window.innerHeight * 0.15)
            );
            
            if (isVisible) {
                el.classList.add('visible');
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const suffix = element.textContent.replace(/[0-9]/g, '');
        
        if (isNaN(target) || element.dataset.animated) return;
        
        element.dataset.animated = 'true';
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / (target / increment)));
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
    
    scrollToProjects() {
        const projectsSection = document.querySelector('#proyectos');
        if (projectsSection) {
            const headerHeight = this.header.offsetHeight;
            const projectsPosition = projectsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: projectsPosition,
                behavior: 'smooth'
            });
        }
    }
    
    handleResize() {
        // Resetear efectos en resize
        this.header.style.opacity = '1';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEffects();
    
    // Añadir año actual
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
