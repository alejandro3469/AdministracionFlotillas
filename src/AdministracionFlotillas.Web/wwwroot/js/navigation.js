/* ============================================================================
   JavaScript de Navegación Mejorada - AdministracionFlotillas
   Basado en filosofía: Modular, Syncfusion, Bootstrap, UX Moderna
   ============================================================================ */

(function() {
    'use strict';

    // Namespace para navegación
    window.Navigation = window.Navigation || {};

    // ============================================================================
    // 1. INICIALIZACIÓN
    // ============================================================================
    window.Navigation.Init = function() {
        this.InicializarNavbar();
        this.InicializarBreadcrumbs();
        this.InicializarTooltips();
        this.InicializarScroll();
        this.InicializarAccesibilidad();
    };

    // ============================================================================
    // 2. NAVBAR MEJORADO
    // ============================================================================
    window.Navigation.InicializarNavbar = function() {
        // Agregar clase sticky-top si no existe
        var navbar = document.querySelector('.navbar');
        if (navbar && !navbar.classList.contains('sticky-top')) {
            navbar.classList.add('sticky-top');
        }

        // Cerrar dropdowns al hacer clic fuera
        document.addEventListener('click', function(event) {
            var dropdowns = document.querySelectorAll('.dropdown-menu.show');
            dropdowns.forEach(function(dropdown) {
                if (!dropdown.parentElement.contains(event.target)) {
                    var bsDropdown = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    }
                }
            });
        });

        // Agregar animación al toggle del navbar en móvil
        var navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function() {
                var navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse) {
                    navbarCollapse.classList.toggle('show');
                }
            });
        }
    };

    // ============================================================================
    // 3. BREADCRUMBS MEJORADOS
    // ============================================================================
    window.Navigation.InicializarBreadcrumbs = function() {
        // Actualizar contadores dinámicamente
        var badges = document.querySelectorAll('[id^="breadcrumb-contador-"]');
        badges.forEach(function(badge) {
            var valorInicial = badge.getAttribute('data-inicial');
            if (valorInicial) {
                // El contador se actualizará cuando se carguen los datos
                // Esta función puede ser llamada desde otros módulos
            }
        });

        // Agregar animación al hover
        var breadcrumbLinks = document.querySelectorAll('.breadcrumb-item a');
        breadcrumbLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(2px)';
            });
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    };

    // Función para actualizar contador en breadcrumb
    window.Navigation.ActualizarContadorBreadcrumb = function(valor) {
        var badge = document.querySelector('[id^="breadcrumb-contador-"]');
        if (badge) {
            badge.textContent = valor;
            badge.style.animation = 'none';
            setTimeout(function() {
                badge.style.animation = 'fadeIn 0.3s ease';
            }, 10);
        }
    };

    // ============================================================================
    // 4. TOOLTIPS
    // ============================================================================
    window.Navigation.InicializarTooltips = function() {
        // Inicializar tooltips de Bootstrap si están disponibles
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    };

    // ============================================================================
    // 5. SCROLL SUAVE
    // ============================================================================
    window.Navigation.InicializarScroll = function() {
        // Scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Agregar sombra al navbar al hacer scroll
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 10) {
                    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
                }
            });
        }
    };

    // ============================================================================
    // 6. ACCESIBILIDAD
    // ============================================================================
    window.Navigation.InicializarAccesibilidad = function() {
        // Agregar aria-labels a elementos sin texto visible
        var iconos = document.querySelectorAll('.nav-link i, .dropdown-item i');
        iconos.forEach(function(icono) {
            var parent = icono.parentElement;
            if (parent && !parent.getAttribute('aria-label') && !parent.textContent.trim()) {
                var title = parent.getAttribute('title');
                if (title) {
                    parent.setAttribute('aria-label', title);
                }
            }
        });

        // Manejar navegación por teclado en dropdowns
        var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    };

    // ============================================================================
    // 7. INDICADORES DE NAVEGACIÓN ACTIVA
    // ============================================================================
    window.Navigation.MarcarActivo = function(controllerName) {
        // Remover active de todos los nav-links
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
        });

        // Agregar active al link correspondiente
        var activeLink = document.querySelector('.nav-link[href*="' + controllerName + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // ============================================================================
    // 8. UTILIDADES
    // ============================================================================
    window.Navigation.Utilidades = {
        // Obtener controlador actual
        ObtenerControladorActual: function() {
            var path = window.location.pathname;
            var match = path.match(/\/([^\/]+)/);
            return match ? match[1] : 'Home';
        },

        // Navegar a una ruta
        Navegar: function(controller, action) {
            var url = '/' + controller + (action ? '/' + action : '');
            window.location.href = url;
        },

        // Mostrar indicador de carga en navegación
        MostrarCarga: function() {
            var navbar = document.querySelector('.navbar');
            if (navbar) {
                var loader = document.createElement('div');
                loader.className = 'nav-loader';
                loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                loader.style.cssText = 'position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);';
                navbar.appendChild(loader);
            }
        },

        // Ocultar indicador de carga
        OcultarCarga: function() {
            var loader = document.querySelector('.nav-loader');
            if (loader) {
                loader.remove();
            }
        }
    };

    // ============================================================================
    // 9. INICIALIZACIÓN AUTOMÁTICA
    // ============================================================================
    document.addEventListener('DOMContentLoaded', function() {
        window.Navigation.Init();
    });

    // Reinicializar después de cargar contenido dinámico
    if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('load', function() {
            window.Navigation.InicializarTooltips();
        });
    }

})();
