// Funciones de eventos del Grid (scope global)
window.productsGridCreated = function(args) {
    console.log('Grid de productos creado, cargando datos...');
    if (window.Products && window.Products.Grid) {
        window.Products.Grid.CargarDatos();
    }
};

window.productsGridRowSelected = function(args) {
    console.log('Producto seleccionado:', args.data);
};

window.productsGridActionComplete = function(args) {
    if (args.requestType === 'filtering') {
        if (window.Products && window.Products.Dashboard) {
            window.Products.Dashboard.ActualizarMetricas();
        }
    }
};

window.productsGridDataBound = function(args) {
    // Implementar event delegation para los botones de acciones
    var gridElement = document.getElementById('productsGrid');
    if (gridElement) {
        gridElement.removeEventListener('click', handleProductActionButtonsClick);
        gridElement.addEventListener('click', handleProductActionButtonsClick);
    }
};

function handleProductActionButtonsClick(event) {
    var target = event.target.closest('.btn-ver-producto, .btn-editar-producto');
    if (target) {
        var idProducto = target.getAttribute('data-id-producto');
        
        if (idProducto && idProducto !== 'undefined' && idProducto !== 'null') {
            idProducto = parseInt(idProducto, 10);
            
            if (idProducto && !isNaN(idProducto) && idProducto > 0) {
                if (target.classList.contains('btn-ver-producto')) {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.Abrir(idProducto, 'ver');
                    } else {
                        console.error('Products.Modal no está disponible');
                    }
                } else if (target.classList.contains('btn-editar-producto')) {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.Abrir(idProducto, 'editar');
                    } else {
                        console.error('Products.Modal no está disponible');
                    }
                }
            } else {
                console.error('ID de producto no válido:', idProducto);
            }
        } else {
            console.error('No se pudo obtener ID de producto del botón. data-id-producto:', idProducto);
        }
    }
}

// Evento para manejar clicks en el toolbar
window.productsGridToolbarClick = function(args) {
    var gridElement = document.getElementById('productsGrid');
    if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
        console.warn('Grid no encontrado para exportación');
        return;
    }
    
    var grid = gridElement.ej2_instances[0];
    
    var exportPromise;
    var fileNamePrefix = 'Productos_' + new Date().toISOString().split('T')[0];

    if (args.item.text === 'Excel Export' || args.item.id && args.item.id.includes('excelexport')) {
        exportPromise = grid.excelExport({
            fileName: fileNamePrefix + '.xlsx'
        });
    } else if (args.item.text === 'Pdf Export' || args.item.id && args.item.id.includes('pdfexport')) {
        exportPromise = grid.pdfExport({
            fileName: fileNamePrefix + '.pdf'
        });
    } else {
        return; // No es un botón de exportación manejado aquí
    }

    if (exportPromise) {
        exportPromise.then(function() {
            window.Products.Utilidades.MostrarExito('Exportación Exitosa', 'El archivo se ha descargado correctamente.');
        }).catch(function(error) {
            window.Products.Utilidades.MostrarError('Error de Exportación', 'No se pudo exportar. Por favor, intenta nuevamente.');
            console.error('Error al exportar:', error);
        });
    }
};

// Funciones de eventos para filtros
window.filtroCategoriaChange = function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
};

window.filtroEstadoChange = function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
};

window.filtroPrecioMinChange = function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
};

window.filtroPrecioMaxChange = function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
};

// Namespace principal
window.Products = window.Products || {};

// Variables globales para el modal (fuera del IIFE para evitar problemas con minificación)
var modalProductoId = null;
var modalProductoModo = 'ver';

(function() {
    'use strict';
    
    // Utilidades - Spinner removido, ahora usamos Shimmer del Grid
    window.Products.Utilidades = {
        // Funciones de spinner removidas - el Grid usa Shimmer automáticamente
        // Funciones de spinner removidas - el Grid maneja el loading con Shimmer
        
        MostrarError: function(titulo, mensaje) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: titulo || 'Error',
                    text: mensaje || 'Ha ocurrido un error.',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                alert(titulo + ': ' + mensaje);
            }
        },
        
        MostrarExito: function(titulo, mensaje) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: titulo || 'Éxito',
                    text: mensaje || 'Operación completada.',
                    confirmButtonText: 'Aceptar',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                alert(titulo + ': ' + mensaje);
            }
        }
    };
    
    // Sub-namespace para Grid
    window.Products.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('productsGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Products.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            // El Grid maneja el loading automáticamente con Shimmer
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ObtenerProducts', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Productos cargados:', respuesta.datos.length);
                            } else {
                                window.Products.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar los productos.'
                                );
                            }
                        } catch (e) {
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                        console.error('Error al cargar productos:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    // Sub-namespace para Filtros
    window.Products.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('productsGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var precioMin = this.ObtenerPrecioMin();
            var precioMax = this.ObtenerPrecioMax();
            
            if (precioMin && precioMax && precioMin > precioMax) {
                window.Products.Utilidades.MostrarError('Error de Validación', 'El precio mínimo no puede ser mayor al precio máximo.');
                return;
            }
            
            var filtros = {
                Categoria: this.ObtenerCategoria(),
                Estado: this.ObtenerEstado(),
                PrecioMinimo: precioMin,
                PrecioMaximo: precioMax
            };
            
            // El Grid maneja el loading automáticamente con Shimmer
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/BuscarProducts', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                            } else {
                                window.Products.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                        console.error('Error al aplicar filtros:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroCategoria = document.getElementById('filtroCategoria');
            if (filtroCategoria && filtroCategoria.ej2_instances && filtroCategoria.ej2_instances[0]) {
                filtroCategoria.ej2_instances[0].value = null;
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            var filtroPrecioMin = document.getElementById('filtroPrecioMin');
            if (filtroPrecioMin && filtroPrecioMin.ej2_instances && filtroPrecioMin.ej2_instances[0]) {
                filtroPrecioMin.ej2_instances[0].value = null;
            }
            
            var filtroPrecioMax = document.getElementById('filtroPrecioMax');
            if (filtroPrecioMax && filtroPrecioMax.ej2_instances && filtroPrecioMax.ej2_instances[0]) {
                filtroPrecioMax.ej2_instances[0].value = null;
            }
            
            if (window.Products && window.Products.Grid) {
                window.Products.Grid.CargarDatos();
            }
        },
        
        ObtenerCategoria: function() {
            var dropdown = document.getElementById('filtroCategoria');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        },
        
        ObtenerPrecioMin: function() {
            var numeric = document.getElementById('filtroPrecioMin');
            if (!numeric || !numeric.ej2_instances) return null;
            return numeric.ej2_instances[0] ? numeric.ej2_instances[0].value : null;
        },
        
        ObtenerPrecioMax: function() {
            var numeric = document.getElementById('filtroPrecioMax');
            if (!numeric || !numeric.ej2_instances) return null;
            return numeric.ej2_instances[0] ? numeric.ej2_instances[0].value : null;
        }
    };
    
    // Sub-namespace para Dashboard
    window.Products.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                var total = datos.totalProductos || 0;
                                
                                // Helper function para obtener elemento y establecer texto
                                function setText(id, text) {
                                    var el = document.getElementById(id);
                                    if (el) el.textContent = text;
                                }
                                
                                setText('totalProductos', total);
                                setText('productosActivos', datos.productosActivos || 0);
                                setText('stockBajo', datos.stockBajo || 0);
                                setText('valorInventario', '$' + parseFloat(datos.valorInventario || 0).toFixed(2));
                                
                                // Actualizar contador en breadcrumb si existe
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = total.toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear métricas:', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de productos:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    // Sub-namespace para Modal
    window.Products.Modal = {
        Abrir: function(idProducto, modo) {
            var id = parseInt(idProducto, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'ID de producto no válido.');
                return;
            }
            
            modalProductoId = id;
            modalProductoModo = modo || 'ver';
            
            this.CargarDatosProducto(id);
        },
        
        CargarDatosProducto: function(idProducto) {
            var self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ObtenerProductPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                self.MostrarDatos(respuesta.datos);
                                self.AbrirDialog();
                            } else {
                                window.Products.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar el producto.');
                            }
                        } catch (e) {
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al cargar el producto.');
                        console.error('Error al cargar producto:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(JSON.stringify(idProducto));
        },
        
        MostrarDatos: function(producto) {
            // Helper functions para obtener elementos y establecer valores
            function getElement(id) {
                return document.getElementById(id);
            }
            function setText(id, text) {
                var el = getElement(id);
                if (el) el.textContent = text;
            }
            function setHtml(id, html) {
                var el = getElement(id);
                if (el) el.innerHTML = html;
            }
            
            setText('modalProductoTitulo', producto.IdProducto);
            setText('modalIdProducto', producto.IdProducto);
            setText('modalNombreProducto', producto.NombreProducto || '-');
            setText('modalCategoria', producto.Categoria || '-');
            
            // Estado con badge y tooltip
            var estadoHtml = '';
            if (producto.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-producto" data-field="Estado" data-tooltip="Producto activo y disponible para venta">' + producto.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-producto" data-field="Estado" data-tooltip="Producto inactivo, no disponible para venta">' + (producto.Estado || 'INACTIVE') + '</span>';
            }
            setHtml('modalEstadoProducto', estadoHtml);
            
            setText('modalCodigoBarras', producto.CodigoBarras || '-');
            setText('modalPrecioUnitario', '$' + (producto.PrecioUnitario || 0).toFixed(2));
            setText('modalPrecioCosto', '$' + (producto.PrecioCosto || 0).toFixed(2));
            setText('modalMargenGanancia', '$' + (producto.MargenGanancia || 0).toFixed(2));
            
            // Stock con indicador visual
            var stock = producto.CantidadStock || 0;
            var stockHtml = '';
            if (stock < 20) {
                stockHtml = '<span class="text-danger fw-bold">' + stock + '</span>';
            } else if (stock < 50) {
                stockHtml = '<span class="text-warning">' + stock + '</span>';
            } else {
                stockHtml = '<span class="text-success">' + stock + '</span>';
            }
            setHtml('modalCantidadStock', stockHtml);
            
            setText('modalDescripcion', producto.Descripcion || '-');
        },
        
        AbrirDialog: function() {
            // Prevenir múltiples llamadas simultáneas
            if (this._abriendoModal) {
                console.log('⏳ Modal ya se está abriendo, esperando...');
                return;
            }
            this._abriendoModal = true;
            
            var self = this;
            
            // Función para limpiar el flag
            function limpiarFlag() {
                self._abriendoModal = false;
            }
            
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalProducto === 'function') {
                if (window.mostrarModalProducto()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalProducto');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalProductoObj !== 'undefined') {
                                tooltipModalProductoObj = tooltipElement.ej2_instances[0];
                            }
                        }
                        limpiarFlag();
                    }, 100);
                    return;
                }
            }
            
            // Si la función helper no está disponible o falló, usar el método robusto anterior
            var intentos = 0;
            var maxIntentos = 50; // 5 segundos
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                // Prioridad 1: Instancia guardada en window.modalProductoInstance
                if (typeof window.modalProductoInstance !== 'undefined' && window.modalProductoInstance !== null) {
                    return window.modalProductoInstance;
                }
                
                // Prioridad 2: Instancia del DOM usando ej2_instances
                var dialogElement = document.getElementById('modalProducto');
                if (dialogElement) {
                    // Método 1: ej2_instances directo
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                        var instancia = dialogElement.ej2_instances[0];
                        if (instancia && typeof instancia.show === 'function') {
                            window.modalProductoInstance = instancia; // Guardar para futuro uso
                            return instancia;
                        }
                    }
                    
                    // Método 2: Buscar en todos los ej2_instances
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances.length > 0) {
                        for (var i = 0; i < dialogElement.ej2_instances.length; i++) {
                            var inst = dialogElement.ej2_instances[i];
                            if (inst && typeof inst.show === 'function') {
                                window.modalProductoInstance = inst; // Guardar para futuro uso
                                return inst;
                            }
                        }
                    }
                    
                    // Método 3: Intentar obtener usando el método de Syncfusion
                    try {
                        if (typeof ej !== 'undefined' && ej.base && typeof ej.base.getComponent === 'function') {
                            var dialogInstance = ej.base.getComponent(dialogElement, 'dialog');
                            if (dialogInstance && typeof dialogInstance.show === 'function') {
                                window.modalProductoInstance = dialogInstance; // Guardar para futuro uso
                                return dialogInstance;
                            }
                        }
                    } catch (e) {
                        // Ignorar error
                    }
                    
                    // Método 4: Buscar en el objeto del elemento directamente
                    if (dialogElement.ej2_instances) {
                        for (var key in dialogElement.ej2_instances) {
                            if (dialogElement.ej2_instances.hasOwnProperty(key)) {
                                var inst = dialogElement.ej2_instances[key];
                                if (inst && typeof inst.show === 'function') {
                                    window.modalProductoInstance = inst; // Guardar para futuro uso
                                    return inst;
                                }
                            }
                        }
                    }
                }
                
                return null;
            }
            
            function intentarAbrir() {
                intentos++;
                var dialogInstance = obtenerInstancia();
                
                if (dialogInstance) {
                    try {
                        dialogInstance.show();
                        console.log('✅ Modal abierto correctamente después de ' + intentos + ' intentos');
                        
                        // Guardar instancia para uso futuro
                        window.modalProductoInstance = dialogInstance;
                        
                        // Reinicializar tooltip después de abrir el modal
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalProducto');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                if (typeof tooltipModalProductoObj !== 'undefined') {
                                    tooltipModalProductoObj = tooltipElement.ej2_instances[0];
                                }
                            }
                            limpiarFlag();
                        }, 100);
                        return; // Éxito, salir
                    } catch (error) {
                        console.error('❌ Error al abrir modal:', error);
                        window.Products.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        limpiarFlag();
                        return; // Error, salir
                    }
                }
                
                // Si no hay instancia disponible, seguir intentando
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal no inicializado después de ' + maxIntentos + ' intentos');
                    window.Products.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                    limpiarFlag();
                }
            }
            
            intentarAbrir();
        },
        
        CambiarAModoEdicion: function(idProducto) {
            // TODO: Implementar modo edición
            window.Products.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    // Sub-namespace para Detalles
    window.Products.Detalles = {
        Ver: function(idProducto) {
            window.Products.Modal.Abrir(idProducto, 'ver');
        }
    };
    
    // Sub-namespace para Edición
    window.Products.Edicion = {
        Editar: function(idProducto) {
            window.Products.Modal.Abrir(idProducto, 'editar');
        }
    };
    
})();
