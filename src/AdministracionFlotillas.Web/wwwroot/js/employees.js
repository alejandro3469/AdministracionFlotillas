// Esperar a que jQuery esté completamente cargado antes de ejecutar código
(function() {
    'use strict';
    
    // Función para verificar si jQuery está listo
    function EsperarJQuery(callback) {
        if (typeof $ !== 'undefined' && typeof jQuery !== 'undefined') {
            callback();
        } else {
            setTimeout(function() {
                EsperarJQuery(callback);
            }, 50);
        }
    }
    
    // Esperar a que jQuery esté disponible
    EsperarJQuery(function() {
        // Función para mostrar mensajes usando Bootstrap Toast
        window.mostrarMensaje = function(tipo, mensaje, titulo) {
            var tituloMensaje = titulo || (tipo === 'success' ? 'Éxito' : tipo === 'error' ? 'Error' : 'Información');
            
            // Crear toast dinámicamente
            var idToast = 'toast-' + Date.now();
            var claseFondo = tipo === 'success' ? 'bg-success' : tipo === 'error' ? 'bg-danger' : 'bg-info';
            var iconoMensaje = tipo === 'success' ? 'bi-check-circle' : tipo === 'error' ? 'bi-exclamation-triangle' : 'bi-info-circle';
            
            var htmlToast = `
                <div id="${idToast}" class="toast align-items-center text-white ${claseFondo} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <i class="bi ${iconoMensaje} me-2"></i>
                            <strong>${tituloMensaje}:</strong> ${mensaje}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;
            
            // Agregar contenedor de toasts si no existe (solo si body existe)
            if (typeof document !== 'undefined' && document.body) {
                if ($('#toastContainer').length === 0) {
                    $('body').append('<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11"></div>');
                }
                
                $('#toastContainer').append(htmlToast);
                var elementoToast = document.getElementById(idToast);
                if (elementoToast && typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                    var instanciaToast = new bootstrap.Toast(elementoToast, { delay: 5000 });
                    instanciaToast.show();
                    
                    // Remover el toast del DOM después de que se oculte
                    $(elementoToast).on('hidden.bs.toast', function() {
                        $(this).remove();
                    });
                }
            }
        };

        // Función para actualizar tabla DataTables
        window.actualizarTabla = function() {
            if (window.tablaEmpleados) {
                window.tablaEmpleados.ajax.reload(null, false);
            }
        };

        // Manejo de errores global AJAX (solo cuando document esté disponible)
        if (typeof document !== 'undefined') {
            // Esperar a que document esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    RegistrarErrorAjax();
                });
            } else {
                RegistrarErrorAjax();
            }
        }
        
        function RegistrarErrorAjax() {
            if (typeof $ !== 'undefined') {
                $(document).ajaxError(function(evento, xhr, configuracion, mensajeError) {
                    if (xhr.status === 0) {
                        mostrarMensaje('error', 'No se pudo conectar con el servidor. Verifique su conexión.');
                    } else if (xhr.status === 500) {
                        mostrarMensaje('error', 'Error interno del servidor. Por favor, contacte al administrador.');
                    } else if (xhr.status === 404) {
                        mostrarMensaje('error', 'Recurso no encontrado.');
                    } else {
                        mostrarMensaje('error', 'Error al procesar la solicitud: ' + mensajeError);
                    }
                });
            }
        }
    });
})();

