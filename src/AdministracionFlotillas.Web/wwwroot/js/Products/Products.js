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
            $.ajax({
                url: '/Products/ObtenerProducts',
                method: 'POST',
                contentType: 'application/json',
                success: function(respuesta) {
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
                },
                error: function(xhr, status, error) {
                    window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                    console.error('Error al cargar productos:', error);
                }
            });
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
            $.ajax({
                url: '/Products/BuscarProducts',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(filtros),
                success: function(respuesta) {
                    if (respuesta.exito) {
                        grid.dataSource = respuesta.datos;
                        grid.refresh();
                    } else {
                        window.Products.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                    }
                },
                error: function() {
                    window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                }
            });
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
            $.ajax({
                url: '/Products/ObtenerMetricas',
                method: 'POST',
                success: function(respuesta) {
                    if (respuesta.exito && respuesta.datos) {
                        var datos = respuesta.datos;
                        var total = datos.totalProductos || 0;
                        $('#totalProductos').text(total);
                        $('#productosActivos').text(datos.productosActivos || 0);
                        $('#stockBajo').text(datos.stockBajo || 0);
                        $('#valorInventario').text('$' + parseFloat(datos.valorInventario || 0).toFixed(2));
                        
                        // Actualizar contador en breadcrumb si existe
                        var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                        if (breadcrumbContador) {
                            breadcrumbContador.textContent = total.toString();
                        }
                    }
                },
                error: function() {
                    console.error('Error al actualizar métricas de productos');
                }
            });
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
            $.ajax({
                url: '/Products/ObtenerProductPorId',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(idProducto),
                success: function(respuesta) {
                    if (respuesta.exito && respuesta.datos) {
                        window.Products.Modal.MostrarDatos(respuesta.datos);
                        window.Products.Modal.AbrirDialog();
                    } else {
                        window.Products.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar el producto.');
                    }
                },
                error: function(xhr, status, error) {
                    window.Products.Utilidades.MostrarError('Error de Conexión', 'Error al cargar el producto.');
                    console.error('Error al cargar producto:', error);
                }
            });
        },
        
        MostrarDatos: function(producto) {
            $('#modalProductoTitulo').text(producto.IdProducto);
            $('#modalIdProducto').text(producto.IdProducto);
            $('#modalNombreProducto').text(producto.NombreProducto || '-');
            $('#modalCategoria').text(producto.Categoria || '-');
            
            // Estado con badge y tooltip
            var estadoHtml = '';
            if (producto.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-producto" data-field="Estado" data-tooltip="Producto activo y disponible para venta">' + producto.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-producto" data-field="Estado" data-tooltip="Producto inactivo, no disponible para venta">' + (producto.Estado || 'INACTIVE') + '</span>';
            }
            $('#modalEstadoProducto').html(estadoHtml);
            
            $('#modalCodigoBarras').text(producto.CodigoBarras || '-');
            $('#modalPrecioUnitario').text('$' + (producto.PrecioUnitario || 0).toFixed(2));
            $('#modalPrecioCosto').text('$' + (producto.PrecioCosto || 0).toFixed(2));
            $('#modalMargenGanancia').text('$' + (producto.MargenGanancia || 0).toFixed(2));
            
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
            $('#modalCantidadStock').html(stockHtml);
            
            $('#modalDescripcion').text(producto.Descripcion || '-');
        },
        
        AbrirDialog: function() {
            var dialogElement = document.getElementById('modalProducto');
            if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                dialogElement.ej2_instances[0].show();
                
                // Reinicializar tooltip después de abrir el modal
                setTimeout(function() {
                    var tooltipElement = document.getElementById('tooltipModalProducto');
                    if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                        tooltipModalProductoObj = tooltipElement.ej2_instances[0];
                    }
                }, 100);
            }
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
