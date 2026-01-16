import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Star, Users, Zap, Globe, Award, TrendingUp, Palette, Code, Smartphone, Monitor, ChevronDown, CheckCircle, Target, Rocket, Heart } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus.message) setFormStatus({ type: '', message: '' });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Por favor ingresa tu nombre' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setFormStatus({ type: 'error', message: 'Por favor ingresa un email válido' });
      return;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Por favor ingresa un mensaje' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Formulario enviado:', formData);
      setFormStatus({ 
        type: 'success', 
        message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Hubo un error al enviar el mensaje. Intenta nuevamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const caseStudies = [
    {
      id: 'paseo',
      title: 'PASEO App',
      subtitle: 'Wellness App • 2024',
      tag: '⭐ Favorito del equipo',
      icon: '🐕',
      gradient: 'from-blue-500 to-cyan-500',
      challenge: '55% abandono en onboarding, gamificación no motivaba, retención semanal 28%.',
      solution: [
        'Research profundo: 6 entrevistas + 30 surveys',
        'Diseño de onboarding progresivo con micro-interacciones',
        'Rediseño de gamificación con psychology hooks',
        'Prototipo funcional + 4 rondas de testing'
      ],
      results: {
        metrics: ['↑78% Completitud Onboarding', '↑89% Retención W1', '+3.2x Engagement'],
        impact: '+45K usuarios retención en 3 meses.'
      }
    },
    {
      id: 'wellness',
      title: 'Wellness App',
      subtitle: 'Health & Fitness • 2024',
      tag: 'Alto impacto',
      icon: '❤️',
      gradient: 'from-pink-500 to-rose-500',
      challenge: 'Baja retención de usuarios y falta de engagement con las rutinas diarias.',
      solution: [
        'Investigación con 12 usuarios activos',
        'Sistema de recompensas personalizado',
        'Dashboard intuitivo con métricas de progreso',
        'Integración con dispositivos wearables'
      ],
      results: {
        metrics: ['↑65% Retención Mensual', '↑120% Tiempo en App', '+4.5★ Rating'],
        impact: '10K+ usuarios activos en primer trimestre.'
      }
    },
    {
      id: 'fintech',
      title: 'FinTech Dashboard',
      subtitle: 'Banking Platform • 2023',
      tag: 'Enterprise',
      icon: '💰',
      gradient: 'from-purple-500 to-indigo-500',
      challenge: 'Interface compleja que generaba 40% de errores en transacciones críticas.',
      solution: [
        'Análisis de user flows y pain points',
        'Simplificación de procesos de transferencia',
        'Sistema de validación en tiempo real',
        'Diseño accesible WCAG 2.1 AA'
      ],
      results: {
        metrics: ['↓85% Errores de Usuario', '↑92% Satisfacción', '↓40% Tiempo de tarea'],
        impact: 'Procesamiento de $50M+ mensuales.'
      }
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Redesign',
      subtitle: 'Retail Platform • 2023',
      tag: 'Conversión',
      icon: '🛍️',
      gradient: 'from-orange-500 to-yellow-500',
      challenge: 'Tasa de conversión del 1.2% y abandono del carrito del 78%.',
      solution: [
        'A/B testing en checkout flow',
        'Optimización mobile-first',
        'Sistema de recomendaciones IA',
        'One-click purchase implementation'
      ],
      results: {
        metrics: ['↑340% Conversión', '↓45% Abandono Carrito', '+$2.1M Revenue'],
        impact: 'ROI de 580% en 6 meses.'
      }
    }
  ];

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UX Research & Strategy",
      description: "Entendemos a tus usuarios a profundidad para crear experiencias que realmente resuelven problemas."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Interfaces hermosas y funcionales que convierten visitantes en usuarios fieles."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Product Design",
      description: "De la idea al producto final con diseño centrado en el usuario y métricas de negocio."
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Design Systems",
      description: "Sistemas de diseño escalables que mantienen consistencia y aceleran el desarrollo."
    }
  ];

  const stats = [
    { value: "150+", label: "Proyectos Exitosos", icon: <Award className="w-6 h-6" /> },
    { value: "85+", label: "Clientes Felices", icon: <Users className="w-6 h-6" /> },
    { value: "4.9/5", label: "Rating Promedio", icon: <Star className="w-6 h-6" /> },
    { value: "98%", label: "Retención de Clientes", icon: <Heart className="w-6 h-6" /> }
  ];

  const process = [
    {
      step: "01",
      title: "Descubrimiento",
      description: "Entendemos tu negocio, usuarios y objetivos.",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Research & Estrategia",
      description: "Investigación profunda y definición de estrategia UX.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Diseño & Prototipo",
      description: "Creamos prototipos iterativos testeados con usuarios.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Desarrollo & Launch",
      description: "Implementación pixel-perfect y lanzamiento exitoso.",
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeoProdUx
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="hover:text-purple-400 transition-colors">Servicios</button>
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-purple-400 transition-colors">Portafolio</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">Sobre Nosotros</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contacto</button>
              <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105">
                Iniciar Proyecto
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('services')} className="block py-2 hover:text-purple-400 transition-colors w-full text-left">Servicios</button>
              <button onClick={() => scrollToSection('portfolio')} className="block py-2 hover:text-purple-400 transition-colors w-full text-left">Portafolio</button>
              <button onClick={() => scrollToSection('about')} className="block py-2 hover:text-purple-400 transition-colors w-full text-left">Sobre Nosotros</button>
              <button onClick={() => scrollToSection('contact')} className="block py-2 hover:text-purple-400 transition-colors w-full text-left">Contacto</button>
              <button onClick={() => scrollToSection('contact')} className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full font-medium transition-all">
                Iniciar Proyecto
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm mb-4">
              ✨ Diseño UX/UI que convierte
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Diseñamos experiencias que
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                impulsan tu negocio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Somos un estudio de diseño UX/UI especializado en crear productos digitales que los usuarios aman y los negocios necesitan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('portfolio')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-medium text-lg transition-all transform hover:scale-105 flex items-center justify-center">
                Ver Proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="border-2 border-purple-500 hover:bg-purple-500/10 px-8 py-4 rounded-full font-medium text-lg transition-all">
                Hablemos
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="text-purple-400">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Servicios</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Soluciones end-to-end para llevar tu producto digital al siguiente nivel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="text-purple-400 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Proceso</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Metodología probada que garantiza resultados excepcionales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div 
                key={index}
                className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div className="text-purple-400 mb-4 mt-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Casos de Estudio */}
      <section id="portfolio" className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Casos de <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Éxito</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Proyectos que transformaron negocios y mejoraron la vida de miles de usuarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((project) => (
              <div 
                key={project.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-4xl mb-3">{project.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.subtitle}</p>
                    </div>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      {project.tag}
                    </span>
                  </div>

                  {/* El Desafío */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wider">El Desafío</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
                  </div>

                  {/* Qué Hicimos */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Qué Hicimos</h4>
                    <ul className="space-y-2">
                      {project.solution.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resultados */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Resultados</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.results.metrics.map((metric, idx) => (
                        <span key={idx} className="bg-gray-700/50 px-3 py-1 rounded-lg text-xs font-medium text-white">
                          {metric}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-green-400">
                      Impacto: {project.results.impact}
                    </p>
                  </div>

                  {/* CTA */}
                  <button 
                    onClick={() => setActiveProject(project.id)}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 rounded-lg font-medium text-sm transition-all group-hover:border-purple-500/50 flex items-center justify-center"
                  >
                    Ver detalles completos
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nosotros</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Somos un equipo multidisciplinario de diseñadores UX/UI, researchers y estrategas digitales apasionados por crear productos que importan.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Combinamos design thinking, metodologías ágiles y tecnología de punta para entregar soluciones que no solo se ven bien, sino que generan resultados medibles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Research-Driven</h4>
                    <p className="text-sm text-gray-400">Decisiones basadas en datos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">User-Centric</h4>
                    <p className="text-sm text-gray-400">El usuario es primero</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Business Impact</h4>
                    <p className="text-sm text-gray-400">ROI comprobado</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Agile & Fast</h4>
                    <p className="text-sm text-gray-400">Entregas rápidas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold">Equipo Experto</h3>
                  <p className="text-gray-400 mt-2">10+ años de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Listo para <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Comenzar?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Contáctanos hoy mismo y comencemos a transformar tu visión en realidad.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                formStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-300'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  disabled={isSubmitting}
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Asunto"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                disabled={isSubmitting}
              />
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mensaje"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
                disabled={isSubmitting}
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">NeoProdUx</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2026 NeoProdUx. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
