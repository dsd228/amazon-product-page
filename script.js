// ============================== TECH SELECT IMPLEMENTATION ==============================
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Variables principales
    const header = document.getElementById('main-header');
    const zoomableInner = document.getElementById('zoomableInner');
    const heroOverlay = document.getElementById('heroOverlay');
    const heroContent = document.querySelector('.ts-hero-content');
    const scrollDownBtn = document.getElementById('scrollDown');
    const menuToggle = document.getElementById('menuToggle');
    
    // ============================== ZOOM EFFECT (PORTFOLIOBOX STYLE) ==============================
    function initTechZoom() {
        if (!zoomableInner) return;
        
        // 1. Obtener valor de zoom
        const zoomContainer = zoomableInner.parentElement;
        const zoomValue = parseInt(zoomContainer.getAttribute('data-zoom')) || 25;
        
        // 2. Estado inicial (inline como Portfoliobox)
        zoomableInner.style.transform = `scale(${zoomValue}) translateX(25px) translateY(-45px)`;
        zoomableInner.style.opacity = '0';
        
        // 3. Overlay inicial
        if (heroOverlay) {
            heroOverlay.style.opacity = '1';
        }
        
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
        
        // 4. Forzar reflow
        zoomableInner.getBoundingClientRect();
        
        // 5. Animación con requestAnimationFrame
        requestAnimationFrame(() => {
            // Transformación final
            zoomableInner.style.transition = 'transform 1.1s cubic-bezier(0.33, 1, 0.68, 1), opacity 1.1s cubic-bezier(0.33, 1, 0.68, 1)';
            zoomableInner.style.transform = 'scale(1) translateX(0) translateY(0)';
            zoomableInner.style.opacity = '1';
            
            // Overlay fade out
            if (heroOverlay) {
                heroOverlay.style.transition = 'opacity 1.1s cubic-bezier(0.33, 1, 0.68, 1)';
                heroOverlay.style.opacity = '0.4';
            }
            
            // Content fade in
            if (heroContent) {
                heroContent.style.transition = 'opacity 1.1s cubic-bezier(0.33, 1, 0.68, 1)';
                heroContent.style.opacity = '1';
            }
            
            console.log('🚀 Efecto TechSelect Zoom ejecutado (scale:', zoomValue, ')');
        });
    }
    
    // Inicializar zoom al cargar
    setTimeout(initTechZoom, 100);
    
    // ============================== MENÚ MÓVIL ==============================
    function initMobileMenu() {
        if (!menuToggle) return;
        
        menuToggle.addEventListener('click', function() {
            const isOpen = document.body.classList.contains('mobile-menu-open');
            
            if (!isOpen) {
                // Crear menú móvil
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'ts-mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="ts-mobile-menu-content">
                        <button class="ts-mobile-close" aria-label="Cerrar menú">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="ts-mobile-nav">
                            <a href="#productos" class="ts-nav-link">Productos</a>
                            <a href="#categorias" class="ts-nav-link">Categorías</a>
                            <a href="#testimonios" class="ts-nav-link">Testimonios</a>
                            <a href="#garantia" class="ts-nav-link">Garantía</a>
                            <a href="#contacto" class="ts-nav-link">Contacto</a>
                        </div>
                        <div class="ts-mobile-actions">
                            <a href="#productos" class="ts-btn ts-btn-primary">Comprar Ahora</a>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(mobileMenu);
                document.body.classList.add('mobile-menu-open');
                
                // Cerrar menú
                const closeBtn = mobileMenu.querySelector('.ts-mobile-close');
                closeBtn.addEventListener('click', closeMobileMenu);
                
                // Cerrar al hacer clic en enlaces
                mobileMenu.querySelectorAll('.ts-nav-link').forEach(link => {
                    link.addEventListener('click', closeMobileMenu);
                });
                
                // Cerrar con ESC
                document.addEventListener('keydown', function closeMenuOnEsc(e) {
                    if (e.key === 'Escape') {
                        closeMobileMenu();
                        document.removeEventListener('keydown', closeMenuOnEsc);
                    }
                });
            } else {
                closeMobileMenu();
            }
        });
    }
    
    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.ts-mobile-menu');
        if (mobileMenu) {
            mobileMenu.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                mobileMenu.remove();
                document.body.classList.remove('mobile-menu-open');
            }, 300);
        }
    }
    
    initMobileMenu();
    
    // ============================== HEADER SCROLL ==============================
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    
    // ============================== SCROLL DOWN BUTTON ==============================
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPosition = document.querySelector('#productos').offsetTop;
            
            window.scrollTo({
                top: targetPosition - 80,
                behavior: 'smooth'
            });
            
            // Feedback visual
            this.style.opacity = '0.5';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
        
        // Accesibilidad
        scrollDownBtn.setAttribute('role', 'button');
        scrollDownBtn.setAttribute('tabindex', '0');
        
        scrollDownBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ============================== SMOOTH SCROLL ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#hero') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil
                closeMobileMenu();
            }
        });
    });
    
    // ============================== PRODUCT GALLERY INTERACTION ==============================
    const galleryThumbs = document.querySelectorAll('.ts-gallery-thumb');
    const mainImage = document.querySelector('.ts-product-main-image');
    
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remover clase active de todos
            galleryThumbs.forEach(t => t.classList.remove('active'));
            
            // Agregar active al thumb clickeado
            this.classList.add('active');
            
            // Cambiar imagen principal
            if (mainImage) {
                const thumbImg = this.querySelector('img');
                mainImage.src = thumbImg.src.replace('q=80', 'q=90');
                
                // Efecto de transición
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.transition = 'opacity 0.3s ease';
                    mainImage.style.opacity = '1';
                }, 50);
            }
        });
    });
    
    // ============================== COLOR SELECTOR ==============================
    const colorOptions = document.querySelectorAll('.ts-color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todos
            colorOptions.forEach(c => c.classList.remove('active'));
            
            // Agregar active al color seleccionado
            this.classList.add('active');
            
            // Actualizar precio según color (simulado)
            const priceElement = document.querySelector('.ts-price');
            const color = this.dataset.color;
            
            // Pequeña animación en el precio
            if (priceElement) {
                priceElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    priceElement.style.transition = 'transform 0.3s ease';
                    priceElement.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // ============================== ADD TO CART SIMULATION ==============================
    const addToCartBtn = document.querySelector('.ts-btn-xl');
    const cartCount = document.querySelector('.ts-cart-count');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            const originalWidth = this.offsetWidth;
            
            // Efecto de agregar al carrito
            this.style.width = originalWidth + 'px';
            this.innerHTML = '<i class="fas fa-check"></i> AGREGADO';
            this.disabled = true;
            
            // Actualizar contador del carrito
            if (cartCount) {
                let currentCount = parseInt(cartCount.textContent);
                cartCount.textContent = currentCount + 1;
                
                // Animación del contador
                cartCount.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    cartCount.style.transition = 'transform 0.3s ease';
                    cartCount.style.transform = 'scale(1)';
                }, 300);
            }
            
            // Restaurar botón después de 2 segundos
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
    
    // ============================== PRODUCT FEATURES HOVER ==============================
    const features = document.querySelectorAll('.ts-feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================== TESTIMONIAL CAROUSEL ==============================
    function initTestimonials() {
        const testimonials = document.querySelectorAll('.ts-testimonial-card');
        let currentIndex = 0;
        
        function rotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                if (index === currentIndex) {
                    testimonial.style.opacity = '1';
                    testimonial.style.transform = 'translateY(0)';
                } else {
                    testimonial.style.opacity = '0.6';
                    testimonial.style.transform = 'translateY(10px)';
                }
            });
            
            currentIndex = (currentIndex + 1) % testimonials.length;
        }
        
        // Rotar testimonials cada 5 segundos
        setInterval(rotateTestimonials, 5000);
        
        // Inicializar
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transition = 'all 0.5s ease';
            if (index === 0) {
                testimonial.style.opacity = '1';
            } else {
                testimonial.style.opacity = '0.6';
            }
        });
    }
    
    initTestimonials();
    
    // ============================== NEWSLETTER FORM ==============================
    const newsletterForm = document.querySelector('.ts-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Validar email
            const email = input.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                input.style.borderColor = '#ef4444';
                input.focus();
                return;
            }
            
            // Deshabilitar y mostrar estado de carga
            input.disabled = true;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Simular envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'ts-form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>¡Suscripción exitosa!</h4>
                        <p>Te hemos enviado un email de confirmación.</p>
                    </div>
                `;
                
                // Estilos para el mensaje
                successMessage.style.cssText = `
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    animation: fadeIn 0.4s ease;
                `;
                
                this.parentNode.appendChild(successMessage);
                
                // Restaurar formulario
                setTimeout(() => {
                    input.value = '';
                    input.disabled = false;
                    button.disabled = false;
                    button.innerHTML = originalText;
                    
                    // Eliminar mensaje después de 5 segundos
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    }, 5000);
                }, 1500);
            }, 2000);
        });
    }
    
    // ============================== PARALLAX EFFECT ON SCROLL ==============================
    let ticking = false;
    let lastScrollY = 0;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.ts-grid-item');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.01);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // ============================== LAZY LOADING ==============================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    initLazyLoading();
    
    // ============================== INITIALIZE ==============================
    console.log('🚀 TechSelect implementado correctamente');
    
    // AOS (Animate on Scroll) simulation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.ts-category-card, .ts-testimonial-card, .ts-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
