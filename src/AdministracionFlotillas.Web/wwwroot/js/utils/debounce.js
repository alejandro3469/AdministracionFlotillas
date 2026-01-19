/**
 * Utilidad de Debounce para mejorar rendimiento
 * Evita ejecutar funciones demasiado frecuentemente
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en milisegundos
 * @param {boolean} immediate - Si es true, ejecuta inmediatamente en el primer call
 * @returns {Function} Función debounced
 */
window.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

/**
 * Utilidad de Throttle para mejorar rendimiento
 * Limita la frecuencia de ejecución de una función
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Tiempo límite en milisegundos
 * @returns {Function} Función throttled
 */
window.throttle = function(func, limit) {
    var inThrottle;
    return function() {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
};
