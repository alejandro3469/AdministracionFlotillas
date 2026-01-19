// Namespace principal para Dashboard
window.Dashboard = window.Dashboard || {};

(function() {
    'use strict';
    
    // Sub-namespace para Métricas
    window.Dashboard.Metricas = {
        Cargar: function() {
            $.ajax({
                url: '/Home/ObtenerMetricas',
                method: 'POST',
                success: function(respuesta) {
                    if (respuesta.exito && respuesta.datos) {
                        var datos = respuesta.datos;
                        $('#totalVentas').text('$' + parseFloat(datos.totalVentas || 0).toFixed(2));
                        $('#ordenesHoy').text(datos.ordenesHoy || 0);
                        $('#clientesActivos').text(datos.clientesActivos || 0);
                        $('#totalProductos').text(datos.totalProductos || 0);
                    }
                },
                error: function() {
                    console.error('Error al cargar métricas del dashboard');
                }
            });
        }
    };
    
    // Sub-namespace para Filtros
    window.Dashboard.Filtros = {
        Aplicar: function() {
            var filtros = {
                idCliente: null,
                idTienda: null,
                estado: null,
                fechaInicio: null,
                fechaFin: null
            };
            
            var clienteId = document.getElementById('filtroClienteId');
            if (clienteId && clienteId.ej2_instances && clienteId.ej2_instances[0] && clienteId.ej2_instances[0].value) {
                filtros.idCliente = clienteId.ej2_instances[0].value;
            }
            
            var tiendaId = document.getElementById('filtroTiendaId');
            if (tiendaId && tiendaId.ej2_instances && tiendaId.ej2_instances[0] && tiendaId.ej2_instances[0].value) {
                filtros.idTienda = tiendaId.ej2_instances[0].value;
            }
            
            var estado = document.getElementById('filtroEstado');
            if (estado && estado.ej2_instances && estado.ej2_instances[0] && estado.ej2_instances[0].value) {
                filtros.estado = estado.ej2_instances[0].value;
            }
            
            var fechaInicio = document.getElementById('filtroFechaInicio');
            if (fechaInicio && fechaInicio.ej2_instances && fechaInicio.ej2_instances[0] && fechaInicio.ej2_instances[0].value) {
                filtros.fechaInicio = fechaInicio.ej2_instances[0].value;
            }
            
            var fechaFin = document.getElementById('filtroFechaFin');
            if (fechaFin && fechaFin.ej2_instances && fechaFin.ej2_instances[0] && fechaFin.ej2_instances[0].value) {
                filtros.fechaFin = fechaFin.ej2_instances[0].value;
            }
            
            window.Dashboard.Grid.CargarDatos(filtros);
        },
        
        Limpiar: function() {
            var clienteId = document.getElementById('filtroClienteId');
            if (clienteId && clienteId.ej2_instances && clienteId.ej2_instances[0]) {
                clienteId.ej2_instances[0].value = null;
                clienteId.ej2_instances[0].dataBind();
            }
            
            var tiendaId = document.getElementById('filtroTiendaId');
            if (tiendaId && tiendaId.ej2_instances && tiendaId.ej2_instances[0]) {
                tiendaId.ej2_instances[0].value = null;
                tiendaId.ej2_instances[0].dataBind();
            }
            
            var estado = document.getElementById('filtroEstado');
            if (estado && estado.ej2_instances && estado.ej2_instances[0]) {
                estado.ej2_instances[0].value = null;
                estado.ej2_instances[0].dataBind();
            }
            
            var fechaInicio = document.getElementById('filtroFechaInicio');
            if (fechaInicio && fechaInicio.ej2_instances && fechaInicio.ej2_instances[0]) {
                fechaInicio.ej2_instances[0].value = null;
                fechaInicio.ej2_instances[0].dataBind();
            }
            
            var fechaFin = document.getElementById('filtroFechaFin');
            if (fechaFin && fechaFin.ej2_instances && fechaFin.ej2_instances[0]) {
                fechaFin.ej2_instances[0].value = null;
                fechaFin.ej2_instances[0].dataBind();
            }
            
            window.Dashboard.Grid.CargarDatos({});
        }
    };
    
    // Sub-namespace para Grid
    window.Dashboard.Grid = {
        CargarDatos: function(filtros) {
            // El Grid maneja el loading automáticamente con Shimmer
            // Convertir filtros al formato esperado por el controlador (SolicitudBuscarOrdenes)
            var solicitud = {
                IdCliente: filtros && filtros.idCliente ? filtros.idCliente : null,
                IdTienda: filtros && filtros.idTienda ? filtros.idTienda : null,
                Estado: filtros && filtros.estado ? filtros.estado : null,
                FechaInicio: filtros && filtros.fechaInicio ? (filtros.fechaInicio instanceof Date ? filtros.fechaInicio.toISOString() : filtros.fechaInicio) : null,
                FechaFin: filtros && filtros.fechaFin ? (filtros.fechaFin instanceof Date ? filtros.fechaFin.toISOString() : filtros.fechaFin) : null
            };
            
            $.ajax({
                url: '/Orders/BuscarOrders',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(solicitud),
                success: function(respuesta) {
                    if (respuesta.exito && respuesta.datos) {
                        var gridElement = document.getElementById('dashboardOrdersGrid');
                        if (gridElement && gridElement.ej2_instances && gridElement.ej2_instances[0]) {
                            gridElement.ej2_instances[0].dataSource = respuesta.datos;
                            gridElement.ej2_instances[0].refresh();
                        }
                    } else {
                        window.Dashboard.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron cargar las órdenes.');
                    }
                },
                error: function(xhr, status, error) {
                    window.Dashboard.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar al servidor.');
                    console.error('Error al cargar órdenes:', error);
                }
            });
        },
        
        Recargar: function() {
            window.Dashboard.Filtros.Limpiar();
        }
    };
    
    // Sub-namespace para Detalles
    window.Dashboard.Detalles = {
        Ver: function(idOrden) {
            // Usar el modal de Orders si está disponible
            if (window.Orders && window.Orders.Modal) {
                window.Orders.Modal.Abrir(idOrden, 'ver');
            } else {
                // Fallback: redirigir a Index
                window.location.href = '/Orders';
            }
        }
    };
    
    // Sub-namespace para Utilidades
    window.Dashboard.Utilidades = {
        // Funciones de spinner removidas - el Grid usa Shimmer automáticamente
        // Funciones de spinner removidas - el Grid maneja el loading con Shimmer
        
        MostrarError: function(titulo, mensaje) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: titulo,
                    text: mensaje,
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
                    title: titulo,
                    text: mensaje,
                    confirmButtonText: 'Aceptar'
                });
            } else {
                alert(titulo + ': ' + mensaje);
            }
        }
    };
    
    // Funciones principales
    window.Dashboard.CargarMetricas = function() {
        window.Dashboard.Metricas.Cargar();
    };
    
    // Eventos globales para filtros
    window.filtroClienteIdChange = function(args) {
        window.Dashboard.Filtros.Aplicar();
    };
    
    window.filtroTiendaIdChange = function(args) {
        window.Dashboard.Filtros.Aplicar();
    };
    
    window.filtroEstadoChange = function(args) {
        window.Dashboard.Filtros.Aplicar();
    };
    
    window.filtroFechaInicioChange = function(args) {
        window.Dashboard.Filtros.Aplicar();
    };
    
    window.filtroFechaFinChange = function(args) {
        window.Dashboard.Filtros.Aplicar();
    };
    
    // Eventos del grid
    window.dashboardOrdersGridCreated = function(args) {
        window.Dashboard.Grid.CargarDatos({});
    };
    
    window.dashboardOrdersGridRowSelected = function(args) {
        // Implementar si es necesario
    };
    
    window.dashboardOrdersGridActionComplete = function(args) {
        // Implementar si es necesario
    };
    
    window.dashboardOrdersGridToolbarClick = function(args) {
        var gridElement = document.getElementById('dashboardOrdersGrid');
        if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
            console.warn('Grid no encontrado para exportación');
            return;
        }
        
        var grid = gridElement.ej2_instances[0];
        
        var exportPromise;
        var fileNamePrefix = 'Ordenes_Dashboard_' + new Date().toISOString().split('T')[0];

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
                window.Dashboard.Utilidades.MostrarExito('Exportación Exitosa', 'El archivo se ha descargado correctamente.');
            }).catch(function(error) {
                window.Dashboard.Utilidades.MostrarError('Error de Exportación', 'No se pudo exportar. Por favor, intenta nuevamente.');
                console.error('Error al exportar:', error);
            });
        }
    };
    
})();
