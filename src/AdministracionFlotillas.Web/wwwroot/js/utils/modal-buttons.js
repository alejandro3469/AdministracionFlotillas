/**
 * Utilidades para manejo de botones en modales durante peticiones
 * Deshabilita todos los botones cuando se inicia una petición
 * y los re-habilita después de que el usuario confirme el mensaje de éxito/error
 */

window.ModalButtons = {
    /**
     * Deshabilita todos los botones del modal y del grid relacionado
     * @param {string} modalId - ID del elemento modal
     * @param {string} gridButtonClass - Clase CSS de los botones del grid (opcional)
     */
    Deshabilitar: function(modalId, gridButtonClass) {
        // Deshabilitar botones del modal
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
            // Buscar todos los botones dentro del modal (Syncfusion renderiza botones como elementos con clase e-btn)
            var buttons = modalElement.querySelectorAll('button.e-btn, .e-dialog-buttons button, [id^="btnModal"]');
            buttons.forEach(function(btn) {
                btn.disabled = true;
                btn.classList.add('disabled');
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            });
        }
        
        // Deshabilitar botones del grid si se especifica la clase
        if (gridButtonClass) {
            var gridButtons = document.querySelectorAll(gridButtonClass);
            gridButtons.forEach(function(btn) {
                btn.disabled = true;
                btn.classList.add('disabled');
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            });
        }
    },
    
    /**
     * Habilita todos los botones del modal y del grid relacionado
     * @param {string} modalId - ID del elemento modal
     * @param {string} gridButtonClass - Clase CSS de los botones del grid (opcional)
     */
    Habilitar: function(modalId, gridButtonClass) {
        // Habilitar botones del modal
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
            // Buscar todos los botones dentro del modal
            var buttons = modalElement.querySelectorAll('button.e-btn, .e-dialog-buttons button, [id^="btnModal"]');
            buttons.forEach(function(btn) {
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.style.opacity = '';
                btn.style.cursor = '';
            });
        }
        
        // Habilitar botones del grid si se especifica la clase
        if (gridButtonClass) {
            var gridButtons = document.querySelectorAll(gridButtonClass);
            gridButtons.forEach(function(btn) {
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.style.opacity = '';
                btn.style.cursor = '';
            });
        }
    }
};
