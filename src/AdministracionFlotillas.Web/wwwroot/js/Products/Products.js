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
    var target = event.target.closest('.btn-cabecera-producto, .btn-comercial-producto, .btn-detalles-producto');
    if (target) {
        var idProducto = target.getAttribute('data-id-producto');
        
        if (idProducto && idProducto !== 'undefined' && idProducto !== 'null') {
            idProducto = parseInt(idProducto, 10);
            
            if (idProducto && !isNaN(idProducto) && idProducto > 0) {
                if (target.classList.contains('btn-cabecera-producto')) {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.AbrirCabecera(idProducto);
                    }
                } else if (target.classList.contains('btn-comercial-producto')) {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.AbrirComercial(idProducto);
                    }
                } else if (target.classList.contains('btn-detalles-producto')) {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.AbrirDetalles(idProducto);
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

// Funciones de eventos para filtros con debouncing (300ms) para mejorar rendimiento
// El debouncing evita múltiples peticiones HTTP mientras el usuario está escribiendo
window.filtroCategoriaChange = window.debounce(function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
}, 300);

window.filtroEstadoChange = window.debounce(function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
}, 300);

window.filtroPrecioMinChange = window.debounce(function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
}, 300);

window.filtroPrecioMaxChange = window.debounce(function(args) {
    if (window.Products && window.Products.Filtros) {
        window.Products.Filtros.Aplicar();
    }
}, 300);

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
            return new Promise((resolve) => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: titulo || 'Error',
                        text: mensaje || 'Ha ocurrido un error.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => resolve()); // Resuelve la promesa cuando el SweetAlert se cierra
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve(); // Resuelve inmediatamente si no hay SweetAlert
                }
            });
        },
        
        MostrarExito: function(titulo, mensaje) {
            return new Promise((resolve) => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: titulo || 'Éxito',
                        text: mensaje || 'Operación completada.',
                        confirmButtonText: 'Aceptar',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => resolve()); // Resuelve la promesa cuando el SweetAlert se cierra
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve(); // Resuelve inmediatamente si no hay SweetAlert
                }
            });
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
        AbrirCabecera: function(idProducto) {
            var id = parseInt(idProducto, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'ID de producto no válido.');
                return;
            }
            window.modalCabeceraProductoId = id;
            this.CargarDatosProducto(id, 'cabecera');
        },
        
        AbrirComercial: function(idProducto) {
            var id = parseInt(idProducto, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'ID de producto no válido.');
                return;
            }
            window.modalComercialProductoId = id;
            this.CargarDatosProducto(id, 'comercial');
        },
        
        AbrirDetalles: function(idProducto) {
            var id = parseInt(idProducto, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'ID de producto no válido.');
                return;
            }
            window.modalDetallesProductoId = id;
            this.CargarDatosProducto(id, 'detalles');
        },
        
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
        
        CargarDatosProducto: function(idProducto, tipo) {
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
                                if (tipo === 'cabecera') {
                                    self.MostrarDatosCabecera(respuesta.datos);
                                    self.AbrirDialogCabecera();
                                } else if (tipo === 'comercial') {
                                    self.MostrarDatosComercial(respuesta.datos);
                                    self.AbrirDialogComercial();
                                } else if (tipo === 'detalles') {
                                    self.MostrarDatosDetalles(respuesta.datos);
                                    self.AbrirDialogDetalles();
                                } else {
                                    self.MostrarDatos(respuesta.datos);
                                    self.AbrirDialog();
                                }
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
            
            // Actualizar ChipList de categoría
            this.ActualizarChipCategoria(producto.Categoria || '-');
            
            // Estado con badge y tooltip mejorado
            var estadoHtml = '';
            if (producto.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-producto fs-6 px-3 py-2" data-field="Estado" data-tooltip="Producto activo y disponible para venta">' +
                    '<i class="fas fa-check-circle me-2"></i>' + producto.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-producto fs-6 px-3 py-2" data-field="Estado" data-tooltip="Producto inactivo, no disponible para venta">' +
                    '<i class="fas fa-times-circle me-2"></i>' + (producto.Estado || 'INACTIVE') + '</span>';
            }
            setHtml('modalEstadoProducto', estadoHtml);
            
            // Actualizar gauge circular de estado
            this.ActualizarGaugeEstado(producto.Estado === 'ACTIVE' ? 100 : 0);
            
            setText('modalCodigoBarras', producto.CodigoBarras || '-');
            
            // Precios con iconos mejorados
            var precioUnitario = producto.PrecioUnitario || 0;
            var precioCosto = producto.PrecioCosto || 0;
            var margenGanancia = producto.MargenGanancia || 0;
            
            setHtml('modalPrecioUnitario', '<i class="fas fa-dollar-sign me-1"></i>$' + precioUnitario.toFixed(2));
            setHtml('modalPrecioCosto', '<i class="fas fa-coins me-1"></i>$' + precioCosto.toFixed(2));
            setHtml('modalMargenGanancia', '<i class="fas fa-chart-line me-1"></i>$' + margenGanancia.toFixed(2));
            
            // Actualizar Sparkline de margen
            this.ActualizarSparklineMargen(producto);
            
            // Stock con indicador visual mejorado
            var stock = producto.CantidadStock || 0;
            var stockHtml = '';
            var stockClass = '';
            var stockIcon = '';
            if (stock < 20) {
                stockHtml = '<span class="text-danger fw-bold">' + stock + '</span>';
                stockClass = 'text-danger';
                stockIcon = 'fas fa-exclamation-triangle';
            } else if (stock < 50) {
                stockHtml = '<span class="text-warning fw-bold">' + stock + '</span>';
                stockClass = 'text-warning';
                stockIcon = 'fas fa-exclamation-circle';
            } else {
                stockHtml = '<span class="text-success fw-bold">' + stock + '</span>';
                stockClass = 'text-success';
                stockIcon = 'fas fa-check-circle';
            }
            setHtml('modalCantidadStock', '<i class="' + stockIcon + ' me-1"></i>' + stock);
            
            // Actualizar LinearGauge de stock
            this.ActualizarGaugeStock(stock);
            
            // Actualizar Rating de calidad (basado en margen de ganancia)
            this.ActualizarRatingCalidad(margenGanancia);
            
            setText('modalDescripcion', producto.Descripcion || '-');
            
            // Actualizar gráfica de precios y otros componentes visuales
            setTimeout(function() {
                window.Products.Modal.ActualizarGraficaPrecios(producto);
            }, 300);
        },
        
        MostrarDatosCabecera: function(producto) {
            document.getElementById('modalCabeceraProductoTitulo').textContent = producto.IdProducto;
            document.getElementById('modalCabeceraIdProducto').value = producto.IdProducto;
            document.getElementById('modalCabeceraNombreProducto').value = producto.NombreProducto || '';
            document.getElementById('modalCabeceraCategoria').value = producto.Categoria || '';
            document.getElementById('modalCabeceraEstado').value = producto.Estado || 'ACTIVE';
            document.getElementById('modalCabeceraCodigoBarras').value = producto.CodigoBarras || '';
        },
        
        MostrarDatosComercial: function(producto) {
            document.getElementById('modalComercialProductoTitulo').textContent = producto.IdProducto;
            document.getElementById('modalComercialPrecioUnitario').value = producto.PrecioUnitario || 0;
            document.getElementById('modalComercialPrecioCosto').value = producto.PrecioCosto || 0;
            
            var margen = (producto.PrecioUnitario || 0) - (producto.PrecioCosto || 0);
            document.getElementById('modalComercialMargenGanancia').value = '$' + margen.toFixed(2);
            document.getElementById('modalComercialCantidadStock').value = producto.CantidadStock || 0;
            
            // Actualizar Sparkline y Gauge
            setTimeout(function() {
                if (window.Products && window.Products.Modal) {
                    window.Products.Modal.ActualizarSparklineMargenComercial(margen);
                    window.Products.Modal.ActualizarGaugeStockComercial(producto.CantidadStock || 0);
                    window.Products.Modal.ActualizarGraficaPreciosComercial(producto);
                }
            }, 300);
        },
        
        MostrarDatosDetalles: function(producto) {
            document.getElementById('modalDetallesProductoTitulo').textContent = producto.IdProducto;
            document.getElementById('modalDetallesDescripcion').value = producto.Descripcion || '';
            document.getElementById('modalDetallesEspecificaciones').value = producto.Especificaciones || '';
            document.getElementById('modalDetallesNotas').value = producto.Notas || '';
            
            // Actualizar Rating
            setTimeout(function() {
                var ratingElement = document.getElementById('ratingCalidadDetalles');
                if (ratingElement && ratingElement.ej2_instances && ratingElement.ej2_instances[0]) {
                    var calidad = producto.Calidad || 0;
                    ratingElement.ej2_instances[0].value = calidad;
                    ratingElement.ej2_instances[0].dataBind();
                } else if (typeof ej !== 'undefined' && ej.inputs) {
                    var rating = new ej.inputs.Rating({
                        value: producto.Calidad || 0,
                        precision: 'Half',
                        showLabel: true,
                        labelTemplate: '<span>Calidad: ${value}/5</span>'
                    });
                    rating.appendTo('#ratingCalidadDetalles');
                }
            }, 100);
        },
        
        AbrirDialogCabecera: function() {
            if (typeof window.mostrarModalCabeceraProducto === 'function') {
                window.mostrarModalCabeceraProducto();
            }
        },
        
        AbrirDialogComercial: function() {
            if (typeof window.mostrarModalComercialProducto === 'function') {
                window.mostrarModalComercialProducto();
            }
        },
        
        AbrirDialogDetalles: function() {
            if (typeof window.mostrarModalDetallesProducto === 'function') {
                window.mostrarModalDetallesProducto();
            }
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
            if (!idProducto || idProducto <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'ID de producto no válido.');
                return;
            }
            
            modalProductoId = idProducto;
            modalProductoModo = 'editar';
            
            // Cambiar modo del modal
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            // Cambiar campos de solo lectura a editables
            this.ConvertirCamposAEditables();
            
            // Cambiar botones del modal
            this.ActualizarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalProductoTitulo');
            if (titulo) {
                titulo.textContent = modalProductoId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            // Restaurar campos a solo lectura
            this.ConvertirCamposASoloLectura();
            
            // Restaurar botones del modal
            this.RestaurarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalProductoTitulo');
            if (titulo) {
                titulo.textContent = modalProductoId;
            }
            
            modalProductoModo = 'ver';
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoProducto');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoProducto" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="INACTIVE"' + (estadoActual === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option>' +
                    '</select>';
            }
            
            // Precio Unitario - convertir a input numérico
            var precioContainer = document.getElementById('modalPrecioUnitario');
            if (precioContainer) {
                var precioActual = precioContainer.textContent.replace('$', '').replace(',', '').trim();
                precioContainer.innerHTML = '<input type="number" id="editPrecioUnitario" class="form-control form-control-sm" step="0.01" min="0" value="' + precioActual + '">';
            }
            
            // Cantidad Stock - convertir a input numérico
            var stockContainer = document.getElementById('modalCantidadStock');
            if (stockContainer) {
                var stockActual = stockContainer.textContent.trim();
                // Extraer solo el número (puede tener span con clases)
                var stockMatch = stockActual.match(/\d+/);
                var stockValue = stockMatch ? stockMatch[0] : '0';
                stockContainer.innerHTML = '<input type="number" id="editCantidadStock" class="form-control form-control-sm" min="0" value="' + stockValue + '">';
            }
            
            // Categoría - convertir a input de texto
            var categoriaContainer = document.getElementById('modalCategoria');
            if (categoriaContainer) {
                var categoriaActual = categoriaContainer.textContent.trim();
                categoriaContainer.innerHTML = '<input type="text" id="editCategoria" class="form-control form-control-sm" value="' + categoriaActual + '">';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoProducto');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoProducto');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-producto" data-field="Estado" data-tooltip="Producto activo y disponible para venta">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-producto" data-field="Estado" data-tooltip="Producto inactivo, no disponible para venta">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Precio Unitario - restaurar formato
            var precioContainer = document.getElementById('modalPrecioUnitario');
            if (precioContainer) {
                var inputPrecio = document.getElementById('editPrecioUnitario');
                if (inputPrecio) {
                    var precioValue = parseFloat(inputPrecio.value) || 0;
                    precioContainer.textContent = '$' + precioValue.toFixed(2);
                }
            }
            
            // Cantidad Stock - restaurar con indicador visual
            var stockContainer = document.getElementById('modalCantidadStock');
            if (stockContainer) {
                var inputStock = document.getElementById('editCantidadStock');
                if (inputStock) {
                    var stockValue = parseInt(inputStock.value) || 0;
                    var stockHtml = '';
                    if (stockValue < 20) {
                        stockHtml = '<span class="text-danger fw-bold">' + stockValue + '</span>';
                    } else if (stockValue < 50) {
                        stockHtml = '<span class="text-warning">' + stockValue + '</span>';
                    } else {
                        stockHtml = '<span class="text-success">' + stockValue + '</span>';
                    }
                    stockContainer.innerHTML = stockHtml;
                }
            }
            
            // Categoría - restaurar texto
            var categoriaContainer = document.getElementById('modalCategoria');
            if (categoriaContainer) {
                var inputCategoria = document.getElementById('editCategoria');
                if (inputCategoria) {
                    categoriaContainer.textContent = inputCategoria.value || '-';
                }
            }
        },
        
        ActualizarBotonesModal: function() {
            // Ocultar botones de modo ver
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnEditar) btnEditar.classList.add('d-none');
            if (btnCerrar) btnCerrar.classList.add('d-none');
            
            // Mostrar botones de modo edición
            var btnGuardar = document.getElementById('btnModalGuardar');
            var btnCancelar = document.getElementById('btnModalCancelar');
            
            if (btnGuardar) btnGuardar.classList.remove('d-none');
            if (btnCancelar) btnCancelar.classList.remove('d-none');
        },
        
        RestaurarBotonesModal: function() {
            // Ocultar botones de modo edición
            var btnGuardar = document.getElementById('btnModalGuardar');
            var btnCancelar = document.getElementById('btnModalCancelar');
            
            if (btnGuardar) btnGuardar.classList.add('d-none');
            if (btnCancelar) btnCancelar.classList.add('d-none');
            
            // Mostrar botones de modo ver
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnEditar) btnEditar.classList.remove('d-none');
            if (btnCerrar) btnCerrar.classList.remove('d-none');
        },
        
        GuardarCambios: function() {
            if (!modalProductoId || modalProductoId <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'No hay producto seleccionado para guardar.');
                return;
            }
            
            // Obtener valores editados
            var selectEstado = document.getElementById('editEstadoProducto');
            var inputPrecio = document.getElementById('editPrecioUnitario');
            var inputStock = document.getElementById('editCantidadStock');
            var inputCategoria = document.getElementById('editCategoria');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoPrecio = inputPrecio ? parseFloat(inputPrecio.value) : null;
            var nuevoStock = inputStock ? parseInt(inputStock.value) : null;
            var nuevaCategoria = inputCategoria ? inputCategoria.value.trim() : null;
            
            // Validaciones
            if (nuevoPrecio !== null && nuevoPrecio < 0) {
                window.Products.Utilidades.MostrarError('Error', 'El precio unitario no puede ser negativo.');
                return;
            }
            
            if (nuevoStock !== null && nuevoStock < 0) {
                window.Products.Utilidades.MostrarError('Error', 'La cantidad en stock no puede ser negativa.');
                return;
            }
            
            // Deshabilitar botones antes de enviar
            window.ModalButtons.Deshabilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
            
            // Preparar datos para enviar
            var datosActualizacion = {
                IdProducto: modalProductoId,
                Estado: nuevoEstado,
                PrecioUnitario: nuevoPrecio,
                CantidadStock: nuevoStock,
                Categoria: nuevaCategoria
            };
            
            // Enviar al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ActualizarProduct', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                // Mostrar mensaje de éxito y esperar confirmación
                                window.Products.Utilidades.MostrarExito(
                                    'Producto actualizado',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    // Desactivar modo edición
                                    if (window.Products && window.Products.Modal) {
                                        window.Products.Modal.DesactivarModoEdicion();
                                        
                                        // Recargar datos del producto
                                        window.Products.Modal.CargarDatosProducto(modalProductoId);
                                        
                                        // Recargar grid
                                        if (window.Products && window.Products.Grid) {
                                            window.Products.Grid.Recargar();
                                        }
                                    }
                                    
                                    // Re-habilitar botones después de confirmar éxito
                                    window.ModalButtons.Habilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Products.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Products.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar producto:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Products.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            // Recargar datos originales
            if (modalProductoId) {
                this.CargarDatosProducto(modalProductoId);
            }
            
            // Desactivar modo edición
            this.DesactivarModoEdicion();
        },
        
        GuardarCabecera: function() {
            var id = (typeof window.modalCabeceraProductoId !== 'undefined' && window.modalCabeceraProductoId) 
                ? window.modalCabeceraProductoId 
                : (typeof modalCabeceraProductoId !== 'undefined' ? modalCabeceraProductoId : null);
            if (!id || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'No hay producto seleccionado.');
                return;
            }
            
            var datos = {
                IdProducto: id,
                NombreProducto: document.getElementById('modalCabeceraNombreProducto').value.trim(),
                Categoria: document.getElementById('modalCabeceraCategoria').value,
                Estado: document.getElementById('modalCabeceraEstado').value,
                CodigoBarras: document.getElementById('modalCabeceraCodigoBarras').value.trim()
            };
            
            if (!datos.NombreProducto) {
                window.Products.Utilidades.MostrarError('Error', 'El nombre del producto es requerido.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalCabeceraProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ActualizarProduct', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Products.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalCabeceraProducto();
                                    if (window.Products && window.Products.Grid) {
                                        window.Products.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalCabeceraProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Products.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalCabeceraProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalCabeceraProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalCabeceraProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarComercial: function() {
            var id = (typeof window.modalComercialProductoId !== 'undefined' && window.modalComercialProductoId) 
                ? window.modalComercialProductoId 
                : (typeof modalComercialProductoId !== 'undefined' ? modalComercialProductoId : null);
            if (!id || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'No hay producto seleccionado.');
                return;
            }
            
            var precioUnitario = parseFloat(document.getElementById('modalComercialPrecioUnitario').value);
            var precioCosto = parseFloat(document.getElementById('modalComercialPrecioCosto').value);
            var cantidadStock = parseInt(document.getElementById('modalComercialCantidadStock').value, 10);
            
            if (isNaN(precioUnitario) || precioUnitario < 0) {
                window.Products.Utilidades.MostrarError('Error', 'El precio unitario debe ser un número válido mayor o igual a 0.');
                return;
            }
            
            if (isNaN(precioCosto) || precioCosto < 0) {
                window.Products.Utilidades.MostrarError('Error', 'El precio de costo debe ser un número válido mayor o igual a 0.');
                return;
            }
            
            if (isNaN(cantidadStock) || cantidadStock < 0) {
                window.Products.Utilidades.MostrarError('Error', 'La cantidad en stock debe ser un número válido mayor o igual a 0.');
                return;
            }
            
            var datos = {
                IdProducto: id,
                PrecioUnitario: precioUnitario,
                PrecioCosto: precioCosto,
                CantidadStock: cantidadStock
            };
            
            window.ModalButtons.Deshabilitar('modalComercialProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ActualizarProduct', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Products.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalComercialProducto();
                                    if (window.Products && window.Products.Grid) {
                                        window.Products.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalComercialProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Products.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalComercialProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalComercialProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalComercialProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarDetalles: function() {
            var id = (typeof window.modalDetallesProductoId !== 'undefined' && window.modalDetallesProductoId) 
                ? window.modalDetallesProductoId 
                : (typeof modalDetallesProductoId !== 'undefined' ? modalDetallesProductoId : null);
            if (!id || id <= 0) {
                window.Products.Utilidades.MostrarError('Error', 'No hay producto seleccionado.');
                return;
            }
            
            var calidad = 0;
            var ratingElement = document.getElementById('ratingCalidadDetalles');
            if (ratingElement && ratingElement.ej2_instances && ratingElement.ej2_instances[0]) {
                calidad = ratingElement.ej2_instances[0].value || 0;
            }
            
            var datos = {
                IdProducto: id,
                Descripcion: document.getElementById('modalDetallesDescripcion').value.trim(),
                Especificaciones: document.getElementById('modalDetallesEspecificaciones').value.trim(),
                Notas: document.getElementById('modalDetallesNotas').value.trim(),
                Calidad: calidad
            };
            
            window.ModalButtons.Deshabilitar('modalDetallesProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Products/ActualizarProduct', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Products.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalDetallesProducto();
                                    if (window.Products && window.Products.Grid) {
                                        window.Products.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalDetallesProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Products.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalDetallesProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Products.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalDetallesProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Products.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalDetallesProducto', '#productsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        ActualizarGraficaPrecios: function(producto) {
            var chartContainer = document.getElementById('chartPrecios');
            if (!chartContainer) return;
            
            // Verificar que ej esté disponible
            if (typeof ej === 'undefined' || !ej.charts || !ej.charts.Chart) {
                console.warn('Syncfusion Charts no está disponible aún, reintentando...');
                setTimeout(function() {
                    window.Products.Modal.ActualizarGraficaPrecios(producto);
                }, 500);
                return;
            }
            
            var precioUnitario = producto.PrecioUnitario || 0;
            var precioCosto = producto.PrecioCosto || 0;
            var margenGanancia = producto.MargenGanancia || 0;
            
            // Destruir gráfica anterior si existe
            if (chartContainer.ej2_instances && chartContainer.ej2_instances[0]) {
                chartContainer.ej2_instances[0].destroy();
            }
            
            // Crear nueva gráfica de barras
            var chart = new ej.charts.Chart({
                primaryXAxis: {
                    valueType: 'Category',
                    title: 'Concepto'
                },
                primaryYAxis: {
                    title: 'Monto ($)',
                    labelFormat: 'C2'
                },
                series: [{
                    type: 'Column',
                    dataSource: [
                        { concepto: 'Precio Unitario', valor: precioUnitario },
                        { concepto: 'Precio Costo', valor: precioCosto },
                        { concepto: 'Margen', valor: margenGanancia }
                    ],
                    xName: 'concepto',
                    yName: 'valor',
                    name: 'Monto',
                    marker: {
                        dataLabel: {
                            visible: true,
                            position: 'Top',
                            format: 'C2'
                        }
                    }
                }],
                tooltip: {
                    enable: true,
                    format: '${point.x}: ${point.y}'
                },
                legendSettings: {
                    visible: false
                },
                height: '200px',
                width: '100%'
            });
            
            chart.appendTo('#chartPrecios');
        },
        
        ActualizarSparklineMargen: function(producto) {
            if (typeof ej === 'undefined' || !ej.charts) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarSparklineMargen(producto);
                    }
                }, 500);
                return;
            }
            
            var sparklineElement = document.getElementById('sparklineMargen');
            if (!sparklineElement) return;
            
            // Datos simulados de tendencia (en producción vendrían del backend)
            var margen = parseFloat(producto.PrecioUnitario || 0) - parseFloat(producto.PrecioCosto || 0);
            var datosTendencia = [
                margen * 0.85, margen * 0.90, margen * 0.95, margen, margen * 1.05, margen * 1.02, margen
            ];
            
            // Destruir instancia anterior si existe
            if (sparklineElement.ej2_instances && sparklineElement.ej2_instances[0]) {
                sparklineElement.ej2_instances[0].destroy();
            }
            
            var sparkline = new ej.charts.Sparkline({
                height: '60px',
                width: '100%',
                lineWidth: 2,
                dataSource: datosTendencia,
                type: 'Line',
                fill: '#007bff',
                valueType: 'Numeric',
                xName: 'xval',
                yName: 'yval',
                tooltipSettings: {
                    visible: true,
                    format: '${xval}: $${yval}'
                }
            });
            sparkline.appendTo('#sparklineMargen');
        },
        
        ActualizarGaugeStock: function(cantidadStock) {
            if (typeof ej === 'undefined' || !ej.lineargauge) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarGaugeStock(cantidadStock);
                    }
                }, 500);
                return;
            }
            
            var gaugeElement = document.getElementById('gaugeStock');
            if (!gaugeElement) return;
            
            // Calcular porcentaje (asumiendo máximo de 100 unidades para visualización)
            var maxStock = 100;
            var porcentaje = Math.min((cantidadStock / maxStock) * 100, 100);
            
            // Determinar color según nivel de stock
            var color = '#28a745'; // Verde
            if (cantidadStock < 20) {
                color = '#dc3545'; // Rojo
            } else if (cantidadStock < 50) {
                color = '#ffc107'; // Amarillo
            }
            
            // Destruir instancia anterior si existe
            if (gaugeElement.ej2_instances && gaugeElement.ej2_instances[0]) {
                gaugeElement.ej2_instances[0].destroy();
            }
            
            var linearGauge = new ej.lineargauge.LinearGauge({
                width: '100%',
                height: '60px',
                axes: [{
                    minimum: 0,
                    maximum: 100,
                    line: {
                        width: 0
                    },
                    pointers: [{
                        value: porcentaje,
                        height: 15,
                        width: 15,
                        color: color,
                        type: 'Bar',
                        offset: 0
                    }],
                    ranges: [{
                        start: 0,
                        end: porcentaje,
                        startWidth: 10,
                        endWidth: 10,
                        color: color,
                        offset: 0
                    }],
                    majorTicks: {
                        interval: 25,
                        height: 0
                    },
                    minorTicks: {
                        height: 0
                    },
                    labelStyle: {
                        font: {
                            size: '0px'
                        }
                    }
                }]
            });
            linearGauge.appendTo('#gaugeStock');
        },
        
        ActualizarRatingCalidad: function(calidad) {
            if (typeof ej === 'undefined' || !ej.inputs) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarRatingCalidad(calidad);
                    }
                }, 500);
                return;
            }
            
            var ratingElement = document.getElementById('ratingCalidad');
            if (!ratingElement) return;
            
            // Calcular calidad basada en margen de ganancia (0-5 estrellas)
            var margen = parseFloat(calidad || 0);
            var ratingValue = Math.min(Math.max(margen / 20, 0), 5); // Normalizar a 0-5
            
            if (ratingElement.ej2_instances && ratingElement.ej2_instances[0]) {
                ratingElement.ej2_instances[0].value = ratingValue;
            } else {
                var rating = new ej.inputs.Rating({
                    value: ratingValue,
                    precision: 'Half',
                    showLabel: true,
                    labelTemplate: '<span>Calidad: ${value}/5</span>'
                });
                rating.appendTo('#ratingCalidad');
            }
        },
        
        ActualizarChipCategoria: function(categoria) {
            if (typeof ej === 'undefined' || !ej.buttons) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarChipCategoria(categoria);
                    }
                }, 500);
                return;
            }
            
            var chipElement = document.getElementById('chipCategoria');
            if (!chipElement) return;
            
            var chips = categoria ? [categoria] : [];
            
            if (chipElement.ej2_instances && chipElement.ej2_instances[0]) {
                chipElement.ej2_instances[0].chips = chips;
            } else {
                var chipList = new ej.buttons.ChipList({
                    chips: chips,
                    selection: 'Single',
                    cssClass: 'e-outline'
                });
                chipList.appendTo('#chipCategoria');
            }
        },
        
        ActualizarGaugeEstado: function(valor) {
            var gaugeContainer = document.getElementById('gaugeEstado');
            if (!gaugeContainer) return;
            
            // Verificar que ej esté disponible
            if (typeof ej === 'undefined' || !ej.circulargauge || !ej.circulargauge.CircularGauge) {
                console.warn('Syncfusion CircularGauge no está disponible aún, reintentando...');
                setTimeout(function() {
                    window.Products.Modal.ActualizarGaugeEstado(valor);
                }, 500);
                return;
            }
            
            // Destruir gauge anterior si existe
            if (gaugeContainer.ej2_instances && gaugeContainer.ej2_instances[0]) {
                gaugeContainer.ej2_instances[0].destroy();
            }
            
            // Crear nuevo gauge circular
            var gauge = new ej.circulargauge.CircularGauge({
                axes: [{
                    startAngle: 200,
                    endAngle: 160,
                    minimum: 0,
                    maximum: 100,
                    radius: '80%',
                    lineStyle: { width: 0 },
                    labelStyle: {
                        position: 'Inside',
                        font: { size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular' }
                    },
                    majorTicks: { height: 10, offset: 5 },
                    minorTicks: { height: 0 },
                    pointers: [{
                        value: valor,
                        radius: '60%',
                        pointerWidth: 8,
                        cap: {
                            radius: 7,
                            border: { width: 0 }
                        },
                        needleTail: {
                            length: '0%'
                        }
                    }],
                    ranges: [{
                        start: 0,
                        end: 50,
                        startWidth: 10,
                        endWidth: 10,
                        color: '#dc3545'
                    }, {
                        start: 50,
                        end: 100,
                        startWidth: 10,
                        endWidth: 10,
                        color: '#28a745'
                    }]
                }],
                height: '80px',
                width: '100%'
            });
            
            gauge.appendTo('#gaugeEstado');
        },
        
        ActualizarSparklineMargenComercial: function(margen) {
            if (typeof ej === 'undefined' || !ej.charts) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarSparklineMargenComercial(margen);
                    }
                }, 500);
                return;
            }
            
            var sparklineElement = document.getElementById('sparklineMargenComercial');
            if (!sparklineElement) return;
            
            // Datos simulados de tendencia
            var datosTendencia = [
                margen * 0.85, margen * 0.90, margen * 0.95, margen, margen * 1.05, margen * 1.02, margen
            ];
            
            // Destruir instancia anterior si existe
            if (sparklineElement.ej2_instances && sparklineElement.ej2_instances[0]) {
                sparklineElement.ej2_instances[0].destroy();
            }
            
            var sparkline = new ej.charts.Sparkline({
                height: '60px',
                width: '100%',
                lineWidth: 2,
                dataSource: datosTendencia,
                type: 'Line',
                fill: '#007bff',
                valueType: 'Numeric',
                xName: 'xval',
                yName: 'yval',
                tooltipSettings: {
                    visible: true,
                    format: '${xval}: $${yval}'
                }
            });
            sparkline.appendTo('#sparklineMargenComercial');
        },
        
        ActualizarGaugeStockComercial: function(cantidadStock) {
            if (typeof ej === 'undefined' || !ej.lineargauge) {
                setTimeout(function() {
                    if (window.Products && window.Products.Modal) {
                        window.Products.Modal.ActualizarGaugeStockComercial(cantidadStock);
                    }
                }, 500);
                return;
            }
            
            var gaugeElement = document.getElementById('gaugeStockComercial');
            if (!gaugeElement) return;
            
            // Calcular porcentaje (asumiendo máximo de 100 unidades para visualización)
            var maxStock = 100;
            var porcentaje = Math.min((cantidadStock / maxStock) * 100, 100);
            
            // Determinar color según nivel de stock
            var color = '#28a745'; // Verde
            if (cantidadStock < 20) {
                color = '#dc3545'; // Rojo
            } else if (cantidadStock < 50) {
                color = '#ffc107'; // Amarillo
            }
            
            // Destruir instancia anterior si existe
            if (gaugeElement.ej2_instances && gaugeElement.ej2_instances[0]) {
                gaugeElement.ej2_instances[0].destroy();
            }
            
            var linearGauge = new ej.lineargauge.LinearGauge({
                width: '100%',
                height: '60px',
                axes: [{
                    minimum: 0,
                    maximum: 100,
                    line: {
                        width: 0
                    },
                    pointers: [{
                        value: porcentaje,
                        height: 15,
                        width: 15,
                        color: color,
                        type: 'Bar',
                        offset: 0
                    }],
                    ranges: [{
                        start: 0,
                        end: porcentaje,
                        startWidth: 10,
                        endWidth: 10,
                        color: color,
                        offset: 0
                    }],
                    majorTicks: {
                        interval: 25,
                        height: 0
                    },
                    minorTicks: {
                        height: 0
                    },
                    labelStyle: {
                        font: {
                            size: '0px'
                        }
                    }
                }]
            });
            linearGauge.appendTo('#gaugeStockComercial');
        },
        
        ActualizarGraficaPreciosComercial: function(producto) {
            var chartContainer = document.getElementById('chartPreciosComercial');
            if (!chartContainer) return;
            
            // Verificar que ej esté disponible
            if (typeof ej === 'undefined' || !ej.charts || !ej.charts.Chart) {
                console.warn('Syncfusion Charts no está disponible aún, reintentando...');
                setTimeout(function() {
                    window.Products.Modal.ActualizarGraficaPreciosComercial(producto);
                }, 500);
                return;
            }
            
            var precioUnitario = producto.PrecioUnitario || 0;
            var precioCosto = producto.PrecioCosto || 0;
            var margenGanancia = (precioUnitario - precioCosto) || 0;
            
            // Destruir gráfica anterior si existe
            if (chartContainer.ej2_instances && chartContainer.ej2_instances[0]) {
                chartContainer.ej2_instances[0].destroy();
            }
            
            // Crear nueva gráfica de barras
            var chart = new ej.charts.Chart({
                primaryXAxis: {
                    valueType: 'Category',
                    title: 'Concepto'
                },
                primaryYAxis: {
                    title: 'Monto ($)',
                    labelFormat: 'C2'
                },
                series: [{
                    type: 'Column',
                    dataSource: [
                        { concepto: 'Precio Unitario', valor: precioUnitario },
                        { concepto: 'Precio Costo', valor: precioCosto },
                        { concepto: 'Margen', valor: margenGanancia }
                    ],
                    xName: 'concepto',
                    yName: 'valor',
                    name: 'Monto',
                    marker: {
                        dataLabel: {
                            visible: true,
                            position: 'Top',
                            format: 'C2'
                        }
                    }
                }],
                tooltip: {
                    enable: true,
                    format: '${point.x}: ${point.y}'
                },
                legendSettings: {
                    visible: false
                },
                height: '200px',
                width: '100%'
            });
            
            chart.appendTo('#chartPreciosComercial');
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
