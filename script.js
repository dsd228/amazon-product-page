// ==============================
// SCROLL EFFECT PARA HERO Y MENÚ
// ==============================
let lastScrollY = 0;
let ticking = false;
let isHeroScrolled = false;

function updateHeroOnScroll() {
  const currentScrollY = window.pageYOffset;
  const heroContainer = document.querySelector('.hero-container');
  const mainNav = document.querySelector('.main-nav');
  const unicornContainer = document.querySelector('.unicorn-studio-container');
  const heroOverlay = document.querySelector('.hero-overlay');
  
  if (currentScrollY > 100) {
    if (!isHeroScrolled) {
      heroContainer.classList.add('scrolled');
      mainNav.classList.add('scrolled');
      isHeroScrolled = true;
      
      // Ajustar altura del contenedor de Unicorn Studio
      if (unicornContainer) {
        unicornContainer.style.height = '400px';
      }
      if (heroOverlay) {
        heroOverlay.style.height = '400px';
      }
    }
  } else {
    if (isHeroScrolled) {
      heroContainer.classList.remove('scrolled');
      mainNav.classList.remove('scrolled');
      isHeroScrolled = false;
      
      // Restaurar altura completa de Unicorn Studio
      if (unicornContainer) {
        unicornContainer.style.height = '100%';
      }
      if (heroOverlay) {
        heroOverlay.style.height = '100%';
      }
    }
  }
  
  lastScrollY = currentScrollY;
  
  // Actualizar menú "Tap Here" según scroll
  updateTapMenuActive();
  updateCaseAnchors();
}

// Optimización de scroll con requestAnimationFrame
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      updateHeroOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==============================
// MENÚ "TAP HERE" - FUNCIONALIDAD MEJORADA
// ==============================
function initTapMenu() {
  const tapMenuToggle = document.getElementById('tapMenuToggle');
  const tapMenuItems = document.getElementById('tapMenuItems');
  const tapMenuItemsList = document.querySelectorAll('.tap-menu-item');
  
  if (!tapMenuToggle || !tapMenuItems) return;
  
  // Toggle del menú
  tapMenuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    tapMenuItems.classList.toggle('active');
    
    // Agregar efecto sonido (opcional)
    playMenuSound();
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    const isClickInside = tapMenuToggle.contains(e.target) || tapMenuItems.contains(e.target);
    if (!isClickInside && tapMenuItems.classList.contains('active')) {
      tapMenuToggle.classList.remove('active');
      tapMenuItems.classList.remove('active');
    }
  });
  
  // Efecto sonido (opcional)
  function playMenuSound() {
    // Puedes añadir sonidos aquí si quieres
    console.log('Menu sound effect');
  }
  
  // Navegación suave para elementos del menú
  tapMenuItemsList.forEach(item => {
    item.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Si es un enlace interno
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Actualizar elemento activo
          tapMenuItemsList.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
          
          // Cerrar menú en móvil
          if (window.innerWidth <= 768) {
            tapMenuToggle.classList.remove('active');
            tapMenuItems.classList.remove('active');
          }
        }
      }
      // Para enlaces externos, no hacer nada especial
    });
  });
  
  // Efectos de hover mejorados
  tapMenuItemsList.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(-10px) scale(1.1)';
      this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.7)';
    });
    
    item.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateX(0) scale(1)';
        this.style.boxShadow = '';
      }
    });
  });
  
  // Añadir vibración en móvil (opcional)
  if ('vibrate' in navigator) {
    tapMenuToggle.addEventListener('click', function() {
      navigator.vibrate(50);
    });
  }
}

// Actualizar elemento activo del menú según scroll
function updateTapMenuActive() {
  const sections = document.querySelectorAll('section[id], div[id].case-study');
  const tapMenuItems = document.querySelectorAll('.tap-menu-item');
  const scrollPosition = window.scrollY + 150;
  let currentActive = null;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentActive = sectionId;
    }
  });
  
  tapMenuItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href === `#${currentActive}` || 
        (currentActive === null && href === '#inicio')) {
      item.classList.add('active');
    }
  });
}

// Actualizar anclas de casos
function updateCaseAnchors() {
  const caseStudies = document.querySelectorAll('.case-study');
  const caseAnchors = document.querySelectorAll('.case-anchor');
  const scrollPosition = window.scrollY + 200;
  
  caseStudies.forEach((study, index) => {
    const studyTop = study.offsetTop;
    const studyHeight = study.clientHeight;
    
    if (scrollPosition >= studyTop && scrollPosition < studyTop + studyHeight) {
      caseAnchors.forEach(anchor => anchor.classList.remove('active'));
      if (caseAnchors[index]) {
        caseAnchors[index].classList.add('active');
      }
    }
  });
}
// ==============================
// SISTEMA DE TEMA CLARO/OSCURO
// ==============================
function initThemeSwitcher() {
  const themeSwitch = document.getElementById('themeSwitch');
  const themeToggleTap = document.querySelector('.theme-toggle-tap');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Establecer tema inicial
  setTheme(savedTheme);
  
  // Interruptor en navegación principal
  if (themeSwitch) {
    themeSwitch.addEventListener('click', toggleTheme);
  }
  
  // Interruptor en menú Tap Here
  if (themeToggleTap) {
    themeToggleTap.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
      
      // Cerrar menú Tap en móvil
      if (window.innerWidth <= 768) {
        const tapMenuToggle = document.getElementById('tapMenuToggle');
        const tapMenuItems = document.getElementById('tapMenuItems');
        if (tapMenuToggle && tapMenuItems) {
          tapMenuToggle.classList.remove('active');
          tapMenuItems.classList.remove('active');
        }
      }
    });
  }
  
  // Atajo de teclado (Ctrl+Shift+L)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Actualizar ícono del botón en Tap Menu
  const themeIcon = document.querySelector('.theme-toggle-tap i');
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  // Actualizar título del tooltip
  const themeTooltip = document.querySelector('.theme-toggle-tap .tap-menu-tooltip');
  if (themeTooltip) {
    themeTooltip.textContent = theme === 'light' ? 'Tema Oscuro' : 'Tema Claro';
  }
  
  // Disparar evento para componentes que necesiten actualizarse
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  setTheme(newTheme);
  
  // Efecto visual de transición
  playThemeTransitionEffect();
}

function playThemeTransitionEffect() {
  // Crear efecto de transición
  const transitionOverlay = document.createElement('div');
  transitionOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    z-index: 10001;
    opacity: 0;
    pointer-events: none;
    animation: themeTransition 0.6s ease;
  `;
  
  // Añadir CSS para animación
  if (!document.querySelector('#theme-transition-animation')) {
    const style = document.createElement('style');
    style.id = 'theme-transition-animation';
    style.textContent = `
      @keyframes themeTransition {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        50% {
          opacity: 0.1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(transitionOverlay);
  
  // Remover después de la animación
  setTimeout(() => {
    if (transitionOverlay.parentNode) {
      transitionOverlay.remove();
    }
  }, 600);
}

// Detectar preferencia del sistema
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      setTheme('light');
    }
  }
}

// Actualizar imágenes según el tema
function updateImagesForTheme(theme) {
  // Aquí puedes agregar lógica para cambiar imágenes según el tema
  // Por ejemplo, cambiar logos, fondos, etc.
  console.log('Tema cambiado a:', theme);
}

// Escuchar cambios en el tema del sistema
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  mediaQuery.addEventListener('change', (e) => {
    // Solo cambiar si el usuario no ha establecido una preferencia manual
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });
}

// Escuchar evento de cambio de tema
window.addEventListener('themechange', (e) => {
  updateImagesForTheme(e.detail);
});

// ==============================
// INITIALIZATION - ACTUALIZAR
// ==============================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar estado inicial
  updateHeroOnScroll();
  
  // Inicializar componentes
  initThemeSwitcher();
  detectSystemTheme();
  initTapMenu();
  initMobileMenu();
  initFloatingCTA();
  initAnimations();
  initContactForm();
  initAdditionalEffects();
  
  // Asegurar que Unicorn Studio se cargue correctamente
  setTimeout(() => {
    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
      UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, 1000);
  
  // Keyboard shortcuts para el menú tap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const tapMenu = document.getElementById('tapMenuItems');
      const tapToggle = document.getElementById('tapMenuToggle');
      if (tapMenu && tapMenu.classList.contains('active')) {
        tapMenu.classList.remove('active');
        tapToggle.classList.remove('active');
      }
    }
  });
});
// ==============================
// TOGGLE MOBILE MENU
// ==============================
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  
  if (!mobileToggle) return;
  
  // Toggle menu móvil
  mobileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    this.innerHTML = navMenu.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
    
    // Bloquear scroll del body cuando el menú está abierto
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Toggle dropdowns en móvil
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle('expanded');
      }
    });
  });
  
  // Cerrar menú al hacer clic en enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isClickInside = navMenu.contains(e.target) || mobileToggle.contains(e.target);
      if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }
    }
  });
}

// ==============================
// CTA FLOTANTE
// ==============================
function initFloatingCTA() {
  const floatingCTA = document.querySelector('.floating-cta');
  
  if (!floatingCTA) return;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 300) {
      floatingCTA.classList.add('visible');
    } else {
      floatingCTA.classList.remove('visible');
    }
  });
  
  // Abrir Calendly
  const floatingCTAButton = document.querySelector('.floating-cta-btn');
  if (floatingCTAButton) {
    floatingCTAButton.addEventListener('click', openCalendly);
  }
}

function openCalendly() {
  window.open('https://calendly.com/dsd228-dd', '_blank');
}

// ==============================
// ANIMACIONES DE ENTRADA
// ==============================
function initAnimations() {
  const animateElements = document.querySelectorAll('.animate-fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(el => observer.observe(el));
  
  // Animación para certificaciones
  const certItems = document.querySelectorAll('.cert-list li');
  certItems.forEach((item, index) => {
    item.style.setProperty('--item-index', index);
    observer.observe(item);
  });
}

// ==============================
// FORMULARIO DE CONTACTO
// ==============================
function initContactForm() {
  const leadForm = document.getElementById('leadForm');
  if (!leadForm) return;
  
  leadForm.addEventListener('submit', submitForm);
  
  // Mejorar validación de campos
  const formFields = leadForm.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('blur', validateField);
    field.addEventListener('input', clearFieldError);
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldType = field.type;
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'Este campo es obligatorio');
    return false;
  }
  
  if (fieldType === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Por favor ingresa un email válido');
      return false;
    }
  }
  
  clearFieldError({ target: field });
  return true;
}

function showFieldError(field, message) {
  clearFieldError({ target: field });
  
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.cssText = `
    color: #ff4757;
    font-size: 0.8rem;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  `;
  errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  
  field.parentNode.appendChild(errorElement);
  field.style.borderColor = '#ff4757';
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
  field.style.borderColor = '';
}

function submitForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('leadForm');
  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  // Validar todos los campos antes de enviar
  let isValid = true;
  const formFields = form.querySelectorAll('input[required], textarea[required], select[required]');
  
  formFields.forEach(field => {
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    shakeForm();
    return;
  }
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;
  
  // Simular envío (en producción aquí iría la petición AJAX)
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    
    // Aquí normalmente enviarías los datos al servidor
    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));
    
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
      
      showThankYouModal();
    }, 3000);
  }, 1500);
}

function shakeForm() {
  const form = document.getElementById('leadForm');
  form.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    form.style.animation = '';
  }, 500);
}

function showThankYouModal() {
  const modal = document.createElement('div');
  modal.id = 'thankYouModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
  `;
  
  modal.innerHTML = `
    <div class="modal-content" style="
      background: linear-gradient(135deg, rgba(20,20,20,0.98), rgba(25,25,25,0.98));
      padding: 60px 40px;
      border-radius: 30px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 40px 100px rgba(0,0,0,0.7);
      border: 1px solid rgba(14,165,233,0.3);
      animation: slideUp 0.5s ease;
    ">
      <div style="
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 30px;
        font-size: 2.5rem;
        color: white;
        animation: scaleIn 0.5s ease 0.2s both;
      ">
        <i class="fas fa-check"></i>
      </div>
      <h2 style="color: white; margin-bottom: 20px; font-size: 2rem; font-family: 'Sora', sans-serif;">
        ¡Gracias por contactarnos!
      </h2>
      <p style="color: rgba(255,255,255,0.8); margin-bottom: 30px; line-height: 1.6; font-size: 1.1rem;">
        Hemos recibido tu mensaje. Te contactaremos en menos de 24 horas para discutir tu proyecto.
      </p>
      <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <i class="fas fa-envelope"></i> 
        <span>También hemos enviado un email de confirmación.</span>
      </p>
      <button id="closeModal" style="
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
      ">
        Continuar navegando
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Cerrar modal
  document.getElementById('closeModal').addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  });
  
  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    }
  });
}

// ==============================
// EFECTOS ADICIONALES
// ==============================
function initAdditionalEffects() {
  // Efecto ripple en botones
  document.querySelectorAll('.hero-btn, .cta-link, .btn-submit, .case-cta, .tap-menu-item').forEach(button => {
    button.addEventListener('click', createRippleEffect);
  });
  
  // Lazy loading de imágenes
  initLazyLoading();
  
  // Smooth scroll para anclas internas
  initSmoothScroll();
  
  // Añadir CSS para animaciones
  addAnimationStyles();
}

function createRippleEffect(e) {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple 0.6s linear;
    width: ${size}px;
    height: ${size}px;
    top: ${y}px;
    left: ${x}px;
    pointer-events: none;
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
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
    images.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function addAnimationStyles() {
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          transform: scale(0);
        }
        to {
          transform: scale(1);
        }
      }
      
      .field-error {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    `;
    document.head.appendChild(style);
  }
}

// ==============================
// INITIALIZATION
// ==============================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar estado inicial
  updateHeroOnScroll();
  
  // Inicializar componentes
  initTapMenu();
  initMobileMenu();
  initFloatingCTA();
  initAnimations();
  initContactForm();
  initAdditionalEffects();
  
  // Asegurar que Unicorn Studio se cargue correctamente
  setTimeout(() => {
    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
      UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, 1000);
  
  // Keyboard shortcuts para el menú tap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const tapMenu = document.getElementById('tapMenuItems');
      const tapToggle = document.getElementById('tapMenuToggle');
      if (tapMenu && tapMenu.classList.contains('active')) {
        tapMenu.classList.remove('active');
        tapToggle.classList.remove('active');
      }
    }
  });
});

// ==============================
// PERFORMANCE OPTIMIZATIONS
// ==============================
// Debounce para eventos scroll/resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimizar redimensionamiento
window.addEventListener('resize', debounce(() => {
  // Actualizar cualquier lógica que dependa del tamaño de pantalla
}, 250));
