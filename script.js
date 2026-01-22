// ============================== DAVID DÍAZ PORTFOLIO ==============================
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Variables principales
    const header = document.getElementById('main-header');
    const zoomableInner = document.getElementById('zoomableInner');
    const heroOverlay = document.getElementById('heroOverlay');
    const heroContent = document.querySelector('.dd-hero-content');
    const scrollDownBtn = document.getElementById('scrollDown');
    const menuToggle = document.getElementById('menuToggle');
    
    // ============================== ZOOM EFFECT (PORTFOLIOBOX STYLE) ==============================
    function initPortfolioZoom() {
        if (!zoomableInner) return;
        
        // 1. Obtener valor de zoom
        const zoomContainer = zoomableInner.parentElement;
        const zoomValue = parseInt(zoomContainer.getAttribute('data-zoom')) || 28;
        
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
            
            console.log('🚀 Efecto Portfoliobox ejecutado (scale:', zoomValue, ')');
        });
    }
    
    // Inicializar zoom al cargar
    setTimeout(initPortfolioZoom, 100);
    
    // ============================== MENÚ MÓVIL ==============================
    function initMobileMenu() {
        if (!menuToggle) return;
        
        menuToggle.addEventListener('click', function() {
            const isOpen = document.body.classList.contains('mobile-menu-open');
            
            if (!isOpen) {
                // Crear menú móvil
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'dd-mobile-menu';
                mobileMenu.innerHTML = `
                    <div class="dd-mobile-menu-content">
                        <button class="dd-mobile-close" aria-label="Cerrar menú">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="dd-mobile-nav">
                            <a href="#proyectos" class="dd-nav-link">Proyectos</a>
                            <a href="#servicios" class="dd-nav-link">Servicios</a>
                            <a href="#certificaciones" class="dd-nav-link">Certificaciones</a>
                            <a href="#proceso" class="dd-nav-link">Proceso</a>
                            <a href="#testimonios" class="dd-nav-link">Testimonios</a>
                            <a href="#contacto" class="dd-nav-link">Contacto</a>
                        </div>
                        <div class="dd-mobile-actions">
                            <a href="#contacto" class="dd-btn dd-btn-primary">Empezar Proyecto</a>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(mobileMenu);
                document.body.classList.add('mobile-menu-open');
                
                // Cerrar menú
                const closeBtn = mobileMenu.querySelector('.dd-mobile-close');
                closeBtn.addEventListener('click', closeMobileMenu);
                
                // Cerrar al hacer clic en enlaces
                mobileMenu.querySelectorAll('.dd-nav-link').forEach(link => {
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
        const mobileMenu = document.querySelector('.dd-mobile-menu');
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
            
            const targetPosition = document.querySelector('#proyectos').offsetTop;
            
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
    
    // ============================== PROJECT GALLERY INTERACTION ==============================
    const galleryThumbs = document.querySelectorAll('.dd-gallery-thumb');
    
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remover clase active de todos
            galleryThumbs.forEach(t => t.classList.remove('active'));
            
            // Agregar active al thumb clickeado
            this.classList.add('active');
            
            // Cambiar imagen principal del proyecto
            const projectShowcase = this.closest('.dd-project-showcase');
            if (projectShowcase) {
                const mainImage = projectShowcase.querySelector('.dd-project-main-image');
                if (mainImage) {
                    const thumbImg = this.querySelector('img');
                    // Efecto de transición
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.style.transition = 'opacity 0.3s ease';
                        mainImage.style.opacity = '1';
                    }, 50);
                }
            }
        });
    });
    
    // ============================== CERTIFICACIONES CARRUSEL ==============================
    function initCertificationsCarousel() {
        const track = document.getElementById('certificationsTrack');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        const cards = track.querySelectorAll('.dd-certification-card');
        const cardWidth = cards[0].offsetWidth + 32; // Ancho + gap
        let currentPosition = 0;
        let currentIndex = 0;
        
        // Calcular cuántas cards caben por vista
        function getVisibleCards() {
            const containerWidth = track.parentElement.offsetWidth;
            return Math.floor(containerWidth / cardWidth);
        }
        
        // Crear dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const visibleCards = getVisibleCards();
            const totalDots = Math.max(1, cards.length - visibleCards + 1);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.className = 'dd-carousel-dot';
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Ir a slide específico
        function goToSlide(index) {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            currentPosition = -currentIndex * cardWidth;
            
            track.style.transform = `translateX(${currentPosition}px)`;
            
            // Actualizar dots
            updateDots();
        }
        
        // Actualizar dots
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dd-carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
        
        // Siguiente
        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0); // Volver al inicio
            }
        });
        
        // Anterior
        prevBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(maxIndex); // Ir al final
            }
        });
        
        // Swipe para móviles
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Umbral mínimo para swipe
                if (diffX > 0) {
                    // Swipe izquierda = siguiente
                    nextBtn.click();
                } else {
                    // Swipe derecha = anterior
                    prevBtn.click();
                }
            }
            
            isDragging = false;
        });
        
        // Inicializar
        createDots();
        
        // Recalcular en resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createDots();
                goToSlide(0);
            }, 250);
        });
    }
    
    initCertificationsCarousel();
    
    // ============================== CERTIFICATE MODAL ==============================
    window.openCertificateModal = function(certId) {
        const modal = document.getElementById('certificateModal');
        const modalBody = document.getElementById('modalBody');
        const modalClose = document.getElementById('modalClose');
        
        // Contenido basado en el certificado
        let content = '';
        
        switch(certId) {
            case 'cert-academico':
                content = `
                    <div class="dd-modal-certificate">
                        <h3>Certificado Académico</h3>
                        <p>Validación oficial de conocimientos en diseño UX/UI y desarrollo frontend avanzado.</p>
                        
                        <div class="dd-certificate-details">
                            <div class="dd-certificate-detail">
                                <h4>Institución</h4>
                                <p>Institución Certificadora</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Año</h4>
                                <p>2024</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Duración</h4>
                                <p>6 meses</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Estado</h4>
                                <p>Completado</p>
                            </div>
                        </div>
                        
                        <p><strong>Habilidades validadas:</strong> User Research, Wireframing, Prototipado, UI Design, Frontend Development</p>
                    </div>
                `;
                break;
                
            case 'cert-validacion':
                content = `
                    <div class="dd-modal-certificate">
                        <h3>Certificado de Validación</h3>
                        <p>Validación profesional de competencias en diseño de interfaces y experiencia de usuario.</p>
                        
                        <div class="dd-certificate-details">
                            <div class="dd-certificate-detail">
                                <h4>Organismo</h4>
                                <p>Organismo Validación</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Año</h4>
                                <p>2023</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Modalidad</h4>
                                <p>Online</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Puntuación</h4>
                                <p>98/100</p>
                            </div>
                        </div>
                        
                        <p><strong>Competencias validadas:</strong> Diseño de Interacción, Arquitectura de Información, Testing de Usabilidad</p>
                    </div>
                `;
                break;
                
            case 'cert-datathon':
                content = `
                    <div class="dd-modal-certificate">
                        <h3>Datathon</h3>
                        <p>Participación y reconocimiento en competencia internacional de análisis de datos y UX.</p>
                        
                        <div class="dd-certificate-details">
                            <div class="dd-certificate-detail">
                                <h4>Competencia</h4>
                                <p>Datathon Internacional</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Año</h4>
                                <p>2023</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Posición</h4>
                                <p>Top 20%</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Participantes</h4>
                                <p>500+</p>
                            </div>
                        </div>
                        
                        <p><strong>Logros:</strong> Análisis de datos de usuarios, Optimización de conversión, Propuestas de mejora UX</p>
                    </div>
                `;
                break;
                
            default:
                content = `
                    <div class="dd-modal-certificate">
                        <h3>Certificado UX Design</h3>
                        <p>Especialización en diseño de experiencia de usuario e investigación.</p>
                        
                        <div class="dd-certificate-details">
                            <div class="dd-certificate-detail">
                                <h4>Plataforma</h4>
                                <p>Coursera</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Estado</h4>
                                <p>En Progreso</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Progreso</h4>
                                <p>75%</p>
                            </div>
                            <div class="dd-certificate-detail">
                                <h4>Especialización</h4>
                                <p>UX Design</p>
                            </div>
                        </div>
                        
                        <p><strong>Temas cubiertos:</strong> Design Thinking, User Research, Prototyping, Usability Testing</p>
                    </div>
                `;
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Cerrar modal
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.animation = '';
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    // ============================== PROJECT FEATURES HOVER ==============================
    const features = document.querySelectorAll('.dd-feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================== SERVICE CARDS INTERACTION ==============================
    const serviceCards = document.querySelectorAll('.dd-service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================== TESTIMONIAL CAROUSEL ==============================
    function initTestimonials() {
        const testimonials = document.querySelectorAll('.dd-testimonial-card');
        
        // Inicializar con animación
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transition = 'all 0.5s ease';
        });
    }
    
    initTestimonials();
    
    // ============================== CONTACT FORM ==============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Deshabilitar y mostrar estado de carga
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            
            // Simular envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'dd-form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>¡Mensaje enviado!</h4>
                        <p>Te responderé en menos de 24 horas.</p>
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
                    button.disabled = false;
                    button.innerHTML = originalText;
                    
                    // Limpiar formulario
                    this.reset();
                    
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
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.dd-grid-item');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.01);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // ============================== ANIMATE ON SCROLL ==============================
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
    document.querySelectorAll('.dd-project-showcase, .dd-service-card, .dd-testimonial-card, .dd-process-step, .dd-certification-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================== STATS COUNTER ==============================
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.dd-stat-number');
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const isPercentage = originalText.includes('%');
            const isPlus = originalText.includes('+');
            
            // Extraer número
            const number = parseFloat(originalText.replace(/[^0-9.]/g, ''));
            
            let current = 0;
            const increment = number / 30; // 30 frames
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = originalText;
                    clearInterval(timer);
                } else {
                    let displayNumber = Math.floor(current);
                    if (isPercentage) {
                        stat.textContent = displayNumber + '%';
                    } else if (isPlus) {
                        stat.textContent = displayNumber + '+';
                    } else {
                        stat.textContent = displayNumber;
                    }
                }
            }, 30);
        });
    }
    
    // Iniciar contadores cuando el hero está en vista
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(initStatsCounter, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.dd-hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ============================== INITIALIZE ==============================
    console.log('🚀 Portfolio David Díaz implementado correctamente');
    
    // Touch optimization
    document.addEventListener('touchstart', function() {}, {passive: true});
});
