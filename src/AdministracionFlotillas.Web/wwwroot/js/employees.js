// Función para mostrar mensajes usando Bootstrap Toast
function mostrarMensaje(tipo, mensaje, titulo) {
    titulo = titulo || (tipo === 'success' ? 'Éxito' : tipo === 'error' ? 'Error' : 'Información');
    
    // Crear toast dinámicamente
    var toastId = 'toast-' + Date.now();
    var bgClass = tipo === 'success' ? 'bg-success' : tipo === 'error' ? 'bg-danger' : 'bg-info';
    var icon = tipo === 'success' ? 'bi-check-circle' : tipo === 'error' ? 'bi-exclamation-triangle' : 'bi-info-circle';
    
    var toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi ${icon} me-2"></i>
                    <strong>${titulo}:</strong> ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Agregar contenedor de toasts si no existe
    if ($('#toastContainer').length === 0) {
        $('body').append('<div id="toastContainer" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11"></div>');
    }
    
    $('#toastContainer').append(toastHtml);
    var toastElement = document.getElementById(toastId);
    var toast = new bootstrap.Toast(toastElement, { delay: 5000 });
    toast.show();
    
    // Remover el toast del DOM después de que se oculte
    $(toastElement).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// Función para actualizar tabla DataTables
function actualizarTabla() {
    if (window.employeesTable) {
        window.employeesTable.ajax.reload(null, false);
    }
}

// Manejo de errores global AJAX
$(document).ajaxError(function(event, xhr, settings, error) {
    if (xhr.status === 0) {
        mostrarMensaje('error', 'No se pudo conectar con el servidor. Verifique su conexión.');
    } else if (xhr.status === 500) {
        mostrarMensaje('error', 'Error interno del servidor. Por favor, contacte al administrador.');
    } else if (xhr.status === 404) {
        mostrarMensaje('error', 'Recurso no encontrado.');
    } else {
        mostrarMensaje('error', 'Error al procesar la solicitud: ' + error);
    }
});

