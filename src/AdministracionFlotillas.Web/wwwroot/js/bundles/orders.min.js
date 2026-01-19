// Funciones de eventos del Grid (deben estar en scope global ANTES del IIFE)
window.ordersGridCreated = function(args) {
    // Evento que se dispara cuando el grid se crea
    console.log('Grid creado, cargando datos...');
    if (window.Orders && window.Orders.Grid) {
        window.Orders.Grid.CargarDatos();
    }
};

window.ordersGridRowSelected = function(args) {
    console.log('Fila seleccionada:', args.data);
    // Actualizar contador de selección múltiple
    if (window.Orders && window.Orders.Batch) {
        window.Orders.Batch.ActualizarContador();
    }
};

window.ordersGridRowDeselected = function(args) {
    console.log('Fila deseleccionada:', args.data);
    // Actualizar contador de selección múltiple
    if (window.Orders && window.Orders.Batch) {
        window.Orders.Batch.ActualizarContador();
    }
};

window.ordersGridActionBegin = function(args) {
    // Manejar inicio de acciones (edición, etc.)
    if (args.requestType === 'save') {
        // Validar antes de guardar
        if (args.data && args.data.EstadoOrden) {
            // Validar transición de estado según reglas de negocio
            var estadoAnterior = args.previousData ? args.previousData.EstadoOrden : null;
            var estadoNuevo = args.data.EstadoOrden;
            
            // Validar transiciones permitidas (RN-ORD-007)
            if (estadoAnterior === 'CANCELLED' || estadoAnterior === 'REFUNDED') {
                args.cancel = true;
                if (window.Orders && window.Orders.Utilidades) {
                    window.Orders.Utilidades.MostrarError(
                        'Error de Validación',
                        'No se puede cambiar el estado de una orden ' + estadoAnterior + '.'
                    );
                }
                return;
            }
        }
    }
};

// Event delegation handler para botones de acciones (simplificado)
if (!window.ordersGridActionButtonHandler) {
    window.ordersGridActionButtonHandler = function(event) {
        var target = event.target;
        var button = target.closest('.btn-ver-detalle, .btn-editar-orden');
        
        if (button) {
            // Obtener ID directamente del atributo data
            var idOrden = button.getAttribute('data-id-orden');
            
            // Si no está en el atributo, intentar obtenerlo de la fila del grid
            if (!idOrden || idOrden === 'undefined' || idOrden === 'null' || idOrden === '') {
                var gridElement = document.getElementById('ordersGrid');
                if (gridElement && gridElement.ej2_instances && gridElement.ej2_instances[0]) {
                    var grid = gridElement.ej2_instances[0];
                    var row = button.closest('.e-row');
                    if (row) {
                        try {
                            var rowInfo = grid.getRowInfo(row);
                            var rowData = rowInfo ? rowInfo.rowData : null;
                            
                            if (rowData) {
                                idOrden = rowData.IdOrden || rowData.idOrden || rowData.ORDER_ID || rowData.order_id;
                            }
                        } catch (e) {
                            console.warn('Error al obtener datos de la fila:', e);
                        }
                    }
                }
            }
            
            if (idOrden && idOrden !== 'undefined' && idOrden !== 'null' && idOrden !== '') {
                idOrden = parseInt(idOrden, 10);
                
                if (idOrden && !isNaN(idOrden) && idOrden > 0) {
                    console.log('Abriendo modal para orden ID:', idOrden);
                    if (button.classList.contains('btn-ver-detalle')) {
                        if (window.Orders && window.Orders.Modal) {
                            window.Orders.Modal.Abrir(idOrden, 'ver');
                        } else if (window.Orders && window.Orders.Detalles) {
                            window.Orders.Detalles.Ver(idOrden);
                        } else {
                            console.error('Orders.Modal y Orders.Detalles no están disponibles');
                        }
                    } else if (button.classList.contains('btn-editar-orden')) {
                        if (window.Orders && window.Orders.Modal) {
                            window.Orders.Modal.Abrir(idOrden, 'editar');
                        } else if (window.Orders && window.Orders.Edicion) {
                            window.Orders.Edicion.Editar(idOrden);
                        } else {
                            console.error('Orders.Modal y Orders.Edicion no están disponibles');
                        }
                    }
                } else {
                    console.error('ID de orden no válido después de parsear:', idOrden);
                }
            } else {
                console.error('No se pudo obtener ID de orden del botón. data-id-orden:', button.getAttribute('data-id-orden'), 'button:', button);
            }
        }
    };
}

window.ordersGridDataBound = function(args) {
    // Actualizar contador después de que los datos se carguen
    if (window.Orders && window.Orders.Batch) {
        window.Orders.Batch.ActualizarContador();
    }
    
    // Configurar event delegation para botones de acciones
    var gridElement = document.getElementById('ordersGrid');
    if (gridElement && !gridElement.hasAttribute('data-action-handler-attached')) {
        gridElement.addEventListener('click', window.ordersGridActionButtonHandler);
        gridElement.setAttribute('data-action-handler-attached', 'true');
    }
};

// Formato Condicional: Aplicar estilos según valores de las celdas
window.ordersGridQueryCellInfo = function(args) {
    // Aplicar formato condicional a la columna EstadoOrden
    if (args.column.field === 'EstadoOrden') {
        var estado = args.data.EstadoOrden;
        if (estado) {
            // Agregar clase CSS según el estado
            switch (estado.toUpperCase()) {
                case 'COMPLETE':
                    args.cell.classList.add('estado-complete');
                    break;
                case 'CANCELLED':
                    args.cell.classList.add('estado-cancelled');
                    break;
                case 'REFUNDED':
                    args.cell.classList.add('estado-refunded');
                    break;
                case 'PENDING':
                    args.cell.classList.add('estado-pending');
                    break;
            }
        }
    }
    
    // Agregar tooltip a celdas según el campo
    if (args.column.field === 'EstadoOrden') {
        var estado = args.data.EstadoOrden;
        if (estado) {
            var tooltipText = 'Estado: ' + estado;
            if (estado === 'COMPLETE') {
                tooltipText += ' - Orden completada exitosamente';
            } else if (estado === 'CANCELLED') {
                tooltipText += ' - Orden cancelada';
            } else if (estado === 'REFUNDED') {
                tooltipText += ' - Orden reembolsada';
            } else if (estado === 'PENDING') {
                tooltipText += ' - Orden pendiente de procesamiento';
            }
            args.cell.setAttribute('title', tooltipText);
        }
    } else if (args.column.field === 'IdCliente') {
        args.cell.setAttribute('title', 'ID del Cliente: ' + args.data.IdCliente);
    } else if (args.column.field === 'IdTienda') {
        args.cell.setAttribute('title', 'ID de la Tienda: ' + args.data.IdTienda);
    } else if (args.column.field === 'FechaOrden') {
        args.cell.setAttribute('title', 'Fecha de la Orden: ' + args.data.FechaOrden);
    }
};

// Estilo Condicional de Filas: Aplicar estilos a filas completas
window.ordersGridRowDataBound = function(args) {
    var estado = args.data.EstadoOrden;
    if (estado) {
        // Aplicar clase CSS a toda la fila según estado
        switch (estado.toUpperCase()) {
            case 'COMPLETE':
                args.row.classList.add('fila-estado-complete');
                break;
            case 'CANCELLED':
                args.row.classList.add('fila-estado-cancelled');
                break;
            case 'REFUNDED':
                args.row.classList.add('fila-estado-refunded');
                break;
            case 'PENDING':
                args.row.classList.add('fila-estado-pending');
                break;
        }
    }
};

// Procesar templates de agregación para mostrar valores correctos
window.ordersGridAggregateCellInfo = function(args) {
    // Procesar el contenido del template de agregación
    if (args.column && args.column.field) {
        var field = args.column.field;
        var aggregateType = args.aggregateType;
        var value = args.value;
        var key = args.key;
        
        // Actualizar el contenido de la celda con los valores reales
        if (args.cell) {
            var innerHTML = args.cell.innerHTML || '';
            
            // Reemplazar ${Count} con el valor real
            if (value !== undefined && value !== null) {
                innerHTML = innerHTML.replace(/\$\{Count\}/g, value.toString());
                // También reemplazar el placeholder si existe
                var countElement = args.cell.querySelector('#totalCount, #groupCount');
                if (countElement) {
                    countElement.textContent = value.toString();
                }
            }
            
            // Reemplazar ${key} con el valor real
            if (key !== undefined && key !== null) {
                innerHTML = innerHTML.replace(/\$\{key\}/g, key.toString());
                // También reemplazar el placeholder si existe
                var keyElement = args.cell.querySelector('#groupKey');
                if (keyElement) {
                    keyElement.textContent = key.toString();
                }
            }
            
            // Si el template todavía tiene variables sin procesar, intentar reemplazarlas
            if (innerHTML.includes('${Count}') || innerHTML.includes('${key}')) {
                // Usar los valores de args directamente
                if (value !== undefined && value !== null) {
                    innerHTML = innerHTML.replace(/\$\{Count\}/g, value.toString());
                }
                if (key !== undefined && key !== null) {
                    innerHTML = innerHTML.replace(/\$\{key\}/g, key.toString());
                }
                args.cell.innerHTML = innerHTML;
            }
        }
    }
};

window.ordersGridActionComplete = function(args) {
    if (args.requestType === 'filtering') {
        // Actualizar contadores después de filtrar
        if (window.Orders && window.Orders.Dashboard) {
            window.Orders.Dashboard.ActualizarMetricas();
        }
    } else if (args.requestType === 'save') {
        // Después de guardar edición inline
        if (args.data) {
            window.Orders.Utilidades.MostrarExito(
                'Orden actualizada',
                'El estado de la orden se actualizó correctamente.'
            );
            
            // Recargar métricas
            if (window.Orders && window.Orders.Dashboard) {
                window.Orders.Dashboard.ActualizarMetricas();
            }
        }
    }
};

// Evento para manejar clicks en el toolbar (Excel/PDF export)
window.ordersGridToolbarClick = function(args) {
    var gridElement = document.getElementById('ordersGrid');
    if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
        console.warn('Grid no encontrado para exportación');
        return;
    }
    
    var grid = gridElement.ej2_instances[0];
    
    // Verificar qué botón se hizo clic
    var exportPromise;
    var fileNamePrefix = 'Ordenes_' + new Date().toISOString().split('T')[0];

    if (args.item.text === 'Excel Export' || args.item.id && args.item.id.includes('excelexport')) {
        exportPromise = grid.excelExport({
            fileName: fileNamePrefix + '.xlsx'
        });
    } else if (args.item.text === 'Pdf Export' || args.item.id && args.item.id.includes('pdfexport')) {
        exportPromise = grid.pdfExport({
            fileName: fileNamePrefix + '.pdf'
        });
    } else if (args.item.text === 'Csv Export' || args.item.id && args.item.id.includes('csvexport')) {
        exportPromise = grid.csvExport({
            fileName: fileNamePrefix + '.csv'
        });
    } else {
        return; // No es un botón de exportación manejado aquí
    }

    if (exportPromise) {
        exportPromise.then(function() {
            window.Orders.Utilidades.MostrarExito('Exportación Exitosa', 'El archivo se ha descargado correctamente.');
        }).catch(function(error) {
            window.Orders.Utilidades.MostrarError('Error de Exportación', 'No se pudo exportar. Por favor, intenta nuevamente.');
            console.error('Error al exportar:', error);
        });
    }
};

// Funciones de eventos para filtros (scope global ANTES del IIFE)
window.filtroClienteIdChange = function(args) {
    console.log('Filtro Cliente ID cambió');
    if (window.Orders && window.Orders.Filtros) {
        window.Orders.Filtros.Aplicar();
    } else {
        console.warn('Orders.Filtros no está disponible');
    }
};

window.filtroTiendaIdChange = function(args) {
    console.log('Filtro Tienda ID cambió');
    if (window.Orders && window.Orders.Filtros) {
        window.Orders.Filtros.Aplicar();
    } else {
        console.warn('Orders.Filtros no está disponible');
    }
};

window.filtroEstadoChange = function(args) {
    console.log('Filtro Estado cambió:', args ? args.value : 'null');
    if (window.Orders && window.Orders.Filtros) {
        // Actualizar estado visual de los botones
        var estado = args ? (args.value || null) : null;
        window.Orders.Filtros.ActualizarEstadoBotones(estado);
        // Aplicar el filtro
        window.Orders.Filtros.Aplicar();
    } else {
        console.warn('Orders.Filtros no está disponible');
    }
};

window.filtroFechaInicioChange = function(args) {
    console.log('Filtro Fecha Inicio cambió');
    if (window.Orders && window.Orders.Filtros) {
        window.Orders.Filtros.Aplicar();
    } else {
        console.warn('Orders.Filtros no está disponible');
    }
};

window.filtroFechaFinChange = function(args) {
    console.log('Filtro Fecha Fin cambió');
    if (window.Orders && window.Orders.Filtros) {
        window.Orders.Filtros.Aplicar();
    } else {
        console.warn('Orders.Filtros no está disponible');
    }
};

// Namespace principal
window.Orders = window.Orders || {};

(function() {
    'use strict';
    
    // Utilidades - Spinner removido, ahora usamos Shimmer del Grid
    window.Orders.Utilidades = {
        // Funciones de spinner removidas - el Grid usa Shimmer automáticamente
        // Funciones de spinner removidas - el Grid maneja el loading con Shimmer
        
        MostrarError: function(titulo, mensaje) {
            Swal.fire({
                icon: 'error',
                title: titulo || 'Error',
                text: mensaje || 'Ha ocurrido un error. Por favor, intenta nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        },
        
        MostrarExito: function(titulo, mensaje) {
            Swal.fire({
                icon: 'success',
                title: titulo || 'Éxito',
                text: mensaje || 'Operación completada correctamente.',
                confirmButtonText: 'Aceptar',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };
    
    // Sub-namespace para Grid
    window.Orders.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('ordersGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                console.warn('Grid instance no encontrada, reintentando en 500ms...');
                setTimeout(function() {
                    window.Orders.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            // Cargar datos desde el servidor
            // El Grid maneja el loading automáticamente con Shimmer
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ObtenerOrders', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            
                            if (respuesta.exito && respuesta.datos) {
                                // Normalizar y limpiar datos antes de asignar al grid
                                var datosNormalizados = respuesta.datos.map(function(orden) {
                                    // Crear un nuevo objeto para evitar mutar el original
                                    var ordenNormalizado = {
                                        IdOrden: orden.IdOrden || orden.idOrden || orden.OrderId || orden.orderId || 0,
                                        EstadoOrden: orden.EstadoOrden || orden.estadoOrden || orden.OrderStatus || orden.orderStatus || 'PENDING',
                                        IdCliente: orden.IdCliente || orden.idCliente || orden.CustomerId || orden.customerId || 0,
                                        IdTienda: orden.IdTienda || orden.idTienda || orden.StoreId || orden.storeId || 0,
                                        FechaOrden: orden.FechaOrden || orden.fechaOrden || orden.OrderTms || orden.orderTms || new Date(),
                                        NombreCliente: orden.NombreCliente || orden.nombreCliente || '',
                                        NombreTienda: orden.NombreTienda || orden.nombreTienda || '',
                                        Subtotal: orden.Subtotal || orden.subtotal || 0,
                                        Descuentos: orden.Descuentos || orden.descuentos || 0,
                                        Impuestos: orden.Impuestos || orden.impuestos || 0,
                                        Total: orden.Total || orden.total || 0
                                    };
                                    
                                    // Asegurar que EstadoOrden nunca sea null, undefined, o string vacío
                                    if (!ordenNormalizado.EstadoOrden || 
                                        ordenNormalizado.EstadoOrden === 'null' || 
                                        ordenNormalizado.EstadoOrden === 'undefined' || 
                                        ordenNormalizado.EstadoOrden === '' ||
                                        ordenNormalizado.EstadoOrden === null ||
                                        ordenNormalizado.EstadoOrden === undefined) {
                                        ordenNormalizado.EstadoOrden = 'PENDING';
                                    }
                                    
                                    // Asegurar que IdOrden sea un número válido
                                    ordenNormalizado.IdOrden = parseInt(ordenNormalizado.IdOrden, 10) || 0;
                                    ordenNormalizado.IdCliente = parseInt(ordenNormalizado.IdCliente, 10) || 0;
                                    ordenNormalizado.IdTienda = parseInt(ordenNormalizado.IdTienda, 10) || 0;
                                    
                                    if (ordenNormalizado.IdOrden === 0) {
                                        console.warn('Orden sin ID válido:', orden);
                                    }
                                    
                                    return ordenNormalizado;
                                });
                                
                                // Verificar estructura de datos
                                if (datosNormalizados.length > 0) {
                                    console.log('Primera orden normalizada (ejemplo):', datosNormalizados[0]);
                                }
                                
                                // Guardar en caché (2 minutos = 120000 ms)
                                if (window.Orders.Cache) {
                                    window.Orders.Cache.Guardar('ordenes_lista', datosNormalizados, 2 * 60 * 1000);
                                }
                                
                                grid.dataSource = datosNormalizados;
                                grid.refresh();
                                console.log('Datos cargados y normalizados:', datosNormalizados.length, 'órdenes');
                            } else {
                                window.Orders.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar los datos. Por favor, intenta nuevamente.'
                                );
                                console.error('Respuesta sin éxito:', respuesta);
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Orders.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error al conectar con el servidor. ';
                        try {
                            var errorRespuesta = JSON.parse(xhr.responseText);
                            if (errorRespuesta && errorRespuesta.mensaje) {
                                mensajeError += errorRespuesta.mensaje;
                            } else {
                                mensajeError += 'Por favor, verifica tu conexión e intenta nuevamente.';
                            }
                        } catch (e) {
                            mensajeError += 'Respuesta no JSON o vacía.';
                        }
                        
                        window.Orders.Utilidades.MostrarError('Error de Conexión', mensajeError);
                        console.error('Error al cargar datos:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            // Limpiar caché y forzar recarga
            if (window.Orders.Cache) {
                window.Orders.Cache.Limpiar();
            }
            this.CargarDatos(true);
        }
    };
    
    // Sub-namespace para Filtros
    window.Orders.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('ordersGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado para aplicar filtros');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                console.warn('Grid instance no encontrada para aplicar filtros');
                return;
            }
            
            // Validar fechas
            var fechaInicio = this.ObtenerFechaInicio();
            var fechaFin = this.ObtenerFechaFin();
            
            if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: 'La fecha de inicio no puede ser posterior a la fecha de fin.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
            
            var filtros = {
                IdCliente: this.ObtenerIdCliente(),
                IdTienda: this.ObtenerIdTienda(),
                Estado: this.ObtenerEstado(),
                FechaInicio: fechaInicio ? fechaInicio.toISOString() : null,
                FechaFin: fechaFin ? fechaFin.toISOString() : null
            };
            
            // Enviar filtros al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/BuscarOrders', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                // Normalizar datos igual que en CargarDatos
                                var datosNormalizados = respuesta.datos.map(function(orden) {
                                    var ordenNormalizado = {
                                        IdOrden: orden.IdOrden || orden.idOrden || orden.OrderId || orden.orderId || 0,
                                        EstadoOrden: orden.EstadoOrden || orden.estadoOrden || orden.OrderStatus || orden.orderStatus || 'PENDING',
                                        IdCliente: orden.IdCliente || orden.idCliente || orden.CustomerId || orden.customerId || 0,
                                        IdTienda: orden.IdTienda || orden.idTienda || orden.StoreId || orden.storeId || 0,
                                        FechaOrden: orden.FechaOrden || orden.fechaOrden || orden.OrderTms || orden.orderTms || new Date(),
                                        NombreCliente: orden.NombreCliente || orden.nombreCliente || '',
                                        NombreTienda: orden.NombreTienda || orden.nombreTienda || '',
                                        Subtotal: orden.Subtotal || orden.subtotal || 0,
                                        Descuentos: orden.Descuentos || orden.descuentos || 0,
                                        Impuestos: orden.Impuestos || orden.impuestos || 0,
                                        Total: orden.Total || orden.total || 0
                                    };
                                    
                                    if (!ordenNormalizado.EstadoOrden || 
                                        ordenNormalizado.EstadoOrden === 'null' || 
                                        ordenNormalizado.EstadoOrden === 'undefined' || 
                                        ordenNormalizado.EstadoOrden === '' ||
                                        ordenNormalizado.EstadoOrden === null ||
                                        ordenNormalizado.EstadoOrden === undefined) {
                                        ordenNormalizado.EstadoOrden = 'PENDING';
                                    }
                                    
                                    ordenNormalizado.IdOrden = parseInt(ordenNormalizado.IdOrden, 10) || 0;
                                    ordenNormalizado.IdCliente = parseInt(ordenNormalizado.IdCliente, 10) || 0;
                                    ordenNormalizado.IdTienda = parseInt(ordenNormalizado.IdTienda, 10) || 0;
                                    
                                    return ordenNormalizado;
                                });
                                
                                grid.dataSource = datosNormalizados;
                                grid.refresh();
                                
                                // Actualizar estado visual de los botones según el estado filtrado
                                var estadoFiltrado = filtros.Estado || null;
                                window.Orders.Filtros.ActualizarEstadoBotones(estadoFiltrado);
                                
                                window.Orders.Utilidades.MostrarExito(
                                    'Filtros aplicados',
                                    'Se encontraron ' + datosNormalizados.length + ' órdenes.'
                                );
                            } else {
                                window.Orders.Utilidades.MostrarError(
                                    'Error al aplicar filtros',
                                    respuesta.mensaje || 'No se pudieron aplicar los filtros. Por favor, intenta nuevamente.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de filtros:', e);
                            window.Orders.Utilidades.MostrarError('Error de Parseo', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error al conectar con el servidor. ';
                        try {
                            var errorRespuesta = JSON.parse(xhr.responseText);
                            if (errorRespuesta && errorRespuesta.mensaje) {
                                mensajeError += errorRespuesta.mensaje;
                            } else {
                                mensajeError += 'Por favor, verifica tu conexión e intenta nuevamente.';
                            }
                        } catch (e) {
                            mensajeError += 'Respuesta no JSON o vacía.';
                        }
                        
                        window.Orders.Utilidades.MostrarError('Error de Conexión', mensajeError);
                        console.error('Error al cargar datos:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            // Limpiar ID Cliente
            var filtroClienteId = document.getElementById('filtroClienteId');
            if (filtroClienteId && filtroClienteId.ej2_instances && filtroClienteId.ej2_instances[0]) {
                filtroClienteId.ej2_instances[0].value = null;
                filtroClienteId.ej2_instances[0].dataBind();
            }
            
            // Limpiar Estado
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
                filtroEstado.ej2_instances[0].dataBind();
            }
            
            // Limpiar ID Tienda
            var filtroTiendaId = document.getElementById('filtroTiendaId');
            if (filtroTiendaId && filtroTiendaId.ej2_instances && filtroTiendaId.ej2_instances[0]) {
                filtroTiendaId.ej2_instances[0].value = null;
                filtroTiendaId.ej2_instances[0].dataBind();
            }
            
            // Limpiar Fecha Inicio
            var filtroFechaInicio = document.getElementById('filtroFechaInicio');
            if (filtroFechaInicio && filtroFechaInicio.ej2_instances && filtroFechaInicio.ej2_instances[0]) {
                filtroFechaInicio.ej2_instances[0].value = null;
                filtroFechaInicio.ej2_instances[0].dataBind();
            }
            
            // Limpiar Fecha Fin
            var filtroFechaFin = document.getElementById('filtroFechaFin');
            if (filtroFechaFin && filtroFechaFin.ej2_instances && filtroFechaFin.ej2_instances[0]) {
                filtroFechaFin.ej2_instances[0].value = null;
                filtroFechaFin.ej2_instances[0].dataBind();
            }
            
            // Actualizar estado visual de los botones
            this.ActualizarEstadoBotones(null);
            
            // Recargar datos sin filtros
            if (window.Orders && window.Orders.Grid) {
                window.Orders.Grid.CargarDatos();
            }
        },
        
        ObtenerIdCliente: function() {
            var campoNumerico = document.getElementById('filtroClienteId');
            if (!campoNumerico || !campoNumerico.ej2_instances) return null;
            return campoNumerico.ej2_instances[0] ? campoNumerico.ej2_instances[0].value : null;
        },
        
        ObtenerIdTienda: function() {
            var campoNumerico = document.getElementById('filtroTiendaId');
            if (!campoNumerico || !campoNumerico.ej2_instances) return null;
            return campoNumerico.ej2_instances[0] ? campoNumerico.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var listaDesplegable = document.getElementById('filtroEstado');
            if (!listaDesplegable || !listaDesplegable.ej2_instances) return null;
            return listaDesplegable.ej2_instances[0] ? listaDesplegable.ej2_instances[0].value : null;
        },
        
        ObtenerFechaInicio: function() {
            var selectorFecha = document.getElementById('filtroFechaInicio');
            if (!selectorFecha || !selectorFecha.ej2_instances) return null;
            return selectorFecha.ej2_instances[0] ? selectorFecha.ej2_instances[0].value : null;
        },
        
        ObtenerFechaFin: function() {
            var selectorFecha = document.getElementById('filtroFechaFin');
            if (!selectorFecha || !selectorFecha.ej2_instances) return null;
            return selectorFecha.ej2_instances[0] ? selectorFecha.ej2_instances[0].value : null;
        },
        
        FiltrarPorEstado: function(estado) {
            // Establecer el valor en el dropdown de estado
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = estado;
                filtroEstado.ej2_instances[0].dataBind();
            }
            
            // Actualizar estado visual de los botones
            this.ActualizarEstadoBotones(estado);
            
            // Aplicar el filtro
            this.Aplicar();
        },
        
        ActualizarEstadoBotones: function(estadoActivo) {
            // Remover clase activa de todos los botones
            var btnTotal = document.getElementById('btnFiltroTotal');
            var btnComplete = document.getElementById('btnFiltroComplete');
            var btnCancelled = document.getElementById('btnFiltroCancelled');
            var btnRefunded = document.getElementById('btnFiltroRefunded');
            
            if (btnTotal) {
                btnTotal.classList.remove('active', 'fw-bold');
                btnTotal.style.textDecoration = 'none';
            }
            if (btnComplete) {
                btnComplete.classList.remove('active', 'fw-bold');
                btnComplete.style.textDecoration = 'none';
            }
            if (btnCancelled) {
                btnCancelled.classList.remove('active', 'fw-bold');
                btnCancelled.style.textDecoration = 'none';
            }
            if (btnRefunded) {
                btnRefunded.classList.remove('active', 'fw-bold');
                btnRefunded.style.textDecoration = 'none';
            }
            
            // Agregar clase activa al botón correspondiente
            if (estadoActivo === null && btnTotal) {
                btnTotal.classList.add('active', 'fw-bold');
                btnTotal.style.textDecoration = 'underline';
            } else if (estadoActivo === 'COMPLETE' && btnComplete) {
                btnComplete.classList.add('active', 'fw-bold');
                btnComplete.style.textDecoration = 'underline';
            } else if (estadoActivo === 'CANCELLED' && btnCancelled) {
                btnCancelled.classList.add('active', 'fw-bold');
                btnCancelled.style.textDecoration = 'underline';
            } else if (estadoActivo === 'REFUNDED' && btnRefunded) {
                btnRefunded.classList.add('active', 'fw-bold');
                btnRefunded.style.textDecoration = 'underline';
            }
        }
    };
    
    // Sub-namespace para Cache (caché en memoria)
    window.Orders.Cache = {
        datos: {},
        
        Obtener: function(clave) {
            var item = this.datos[clave];
            if (!item) return null;
            // Verificar expiración
            if (item.expiracion && Date.now() > item.expiracion) {
                delete this.datos[clave];
                return null;
            }
            return item.valor;
        },
        
        Guardar: function(clave, valor, tiempoExpiracion) {
            this.datos[clave] = {
                valor: valor,
                expiracion: tiempoExpiracion ? Date.now() + tiempoExpiracion : null
            };
        },
        
        EsValido: function(clave) {
            var item = this.datos[clave];
            if (!item) return false;
            if (item.expiracion && Date.now() > item.expiracion) {
                delete this.datos[clave];
                return false;
            }
            return true;
        },
        
        Limpiar: function() {
            this.datos = {};
        }
    };
    
    // Sub-namespace para Dashboard
    window.Orders.Dashboard = {
        ActualizarMetricas: function() {
            // Obtener métricas del servidor y actualizar cards
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                var total = respuesta.datos.totalOrders || 0;
                                var elTotal = document.getElementById('totalOrders');
                                if (elTotal) elTotal.textContent = total;
                                var elCompleted = document.getElementById('completedOrders');
                                if (elCompleted) elCompleted.textContent = respuesta.datos.completedOrders || 0;
                                var elCancelled = document.getElementById('cancelledOrders');
                                if (elCancelled) elCancelled.textContent = respuesta.datos.cancelledOrders || 0;
                                var elRefunded = document.getElementById('refundedOrders');
                                if (elRefunded) elRefunded.textContent = respuesta.datos.refundedOrders || 0;
                                
                                // Actualizar contador en breadcrumb si existe
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = total.toString();
                                }
                            } else {
                                console.error('Error al actualizar métricas:', respuesta.mensaje);
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de métricas:', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas: HTTP ' + xhr.status);
                        // No mostramos error al usuario para métricas, solo en consola
                    }
                }
            };
            xhr.send();
        }
    };
    
    // Sub-namespace para Modal
    window.Orders.Modal = {
        Abrir: function(idOrden, modo) {
            // Convertir a número si viene como string
            var id = parseInt(idOrden, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                console.error('ID de orden no válido:', idOrden);
                window.Orders.Utilidades.MostrarError('Error', 'ID de orden no válido.');
                return;
            }
            
            modalOrdenId = id;
            modalOrdenModo = modo || 'ver';
            
            // Cargar datos de la orden
            this.CargarDatosOrden(id);
        },
        
        CargarDatosOrden: function(idOrden) {
            var cacheKey = 'orden_' + idOrden;
            var self = this;
            
            // Verificar caché (5 minutos de expiración)
            if (window.Orders.Cache.EsValido(cacheKey)) {
                var datosCache = window.Orders.Cache.Obtener(cacheKey);
                self.MostrarDatos(datosCache);
                // Abrir el modal después de mostrar los datos
                setTimeout(function() {
                    self.AbrirDialog();
                    self.CargarItemsFactura(idOrden);
                }, 100);
                return;
            }
            
            // Si no está en caché, cargar desde servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ObtenerOrderPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                // Guardar en caché (5 minutos = 300000 ms)
                                window.Orders.Cache.Guardar(cacheKey, respuesta.datos, 5 * 60 * 1000);
                                self.MostrarDatos(respuesta.datos);
                                // Abrir el modal después de mostrar los datos
                                setTimeout(function() {
                                    self.AbrirDialog();
                                    // Cargar items de factura
                                    self.CargarItemsFactura(idOrden);
                                }, 100);
                            } else {
                                window.Orders.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar la orden.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Orders.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        window.Orders.Utilidades.MostrarError('Error de Conexión', 'Error al cargar la orden.');
                        console.error('Error al cargar orden: HTTP ' + xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify(idOrden));
        },
        
        MostrarDatos: function(orden) {
            // Helper para obtener elementos de forma segura
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
            
            // Actualizar título
            setText('modalOrdenTitulo', orden.IdOrden);
            
            // Información general
            setText('modalIdOrden', orden.IdOrden);
            setText('modalFechaOrden', orden.FechaOrden ? new Date(orden.FechaOrden).toLocaleString('es-MX') : '-');
            
            // Estado con badge y tooltip
            var estadoHtml = '';
            if (orden.EstadoOrden === 'COMPLETE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-orden" data-field="EstadoOrden" data-tooltip="Orden completada exitosamente">' + orden.EstadoOrden + '</span>';
            } else if (orden.EstadoOrden === 'CANCELLED') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-orden" data-field="EstadoOrden" data-tooltip="Orden cancelada por el cliente o sistema">' + orden.EstadoOrden + '</span>';
            } else if (orden.EstadoOrden === 'REFUNDED') {
                estadoHtml = '<span class="badge bg-danger info-tooltip-orden" data-field="EstadoOrden" data-tooltip="Orden reembolsada, el pago fue devuelto">' + orden.EstadoOrden + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-orden" data-field="EstadoOrden" data-tooltip="Orden pendiente de procesamiento">' + (orden.EstadoOrden || 'PENDING') + '</span>';
            }
            setHtml('modalEstadoOrden', estadoHtml);
            
            setText('modalIdCliente', orden.IdCliente || '-');
            setText('modalNombreCliente', orden.NombreCliente || '-');
            setText('modalIdTienda', orden.IdTienda || '-');
            setText('modalNombreTienda', orden.NombreTienda || '-');
            
            // Totales
            setText('modalSubtotal', '$' + (orden.Subtotal || 0).toFixed(2));
            setText('modalDescuentos', '-$' + (orden.Descuentos || 0).toFixed(2));
            setText('modalImpuestos', '$' + (orden.Impuestos || 0).toFixed(2));
            setText('modalTotal', '$' + (orden.Total || 0).toFixed(2));
        },
        
        CargarItemsFactura: function(idOrden) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ObtenerItemsFactura', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var gridElement = document.getElementById('gridItemsModalOrden');
                                if (gridElement && gridElement.ej2_instances && gridElement.ej2_instances[0]) {
                                    gridElement.ej2_instances[0].dataSource = respuesta.datos;
                                    gridElement.ej2_instances[0].refresh();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de items de factura:', e);
                        }
                    } else {
                        console.error('Error al cargar items de factura: HTTP ' + xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify(idOrden));
        },
        
        AbrirDialog: function() {
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalOrden === 'function') {
                if (window.mostrarModalOrden()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalOrden');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalOrdenObj !== 'undefined') {
                                tooltipModalOrdenObj = tooltipElement.ej2_instances[0];
                            }
                        }
                    }, 100);
                    return;
                }
            }
            
            // Si la función helper no está disponible o falló, usar el método robusto anterior
            var self = this;
            var intentos = 0;
            var maxIntentos = 50; // 5 segundos
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                // Prioridad 1: Instancia guardada en window.modalOrdenInstance
                if (typeof window.modalOrdenInstance !== 'undefined' && window.modalOrdenInstance !== null) {
                    return window.modalOrdenInstance;
                }
                
                // Prioridad 2: Instancia del DOM
                var dialogElement = document.getElementById('modalOrden');
                if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                    return dialogElement.ej2_instances[0];
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
                        window.modalOrdenInstance = dialogInstance;
                        
                        // Reinicializar tooltip después de abrir el modal
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalOrden');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                if (typeof tooltipModalOrdenObj !== 'undefined') {
                                    tooltipModalOrdenObj = tooltipElement.ej2_instances[0];
                                }
                            }
                        }, 100);
                        return; // Éxito, salir
                    } catch (error) {
                        console.error('❌ Error al abrir modal:', error);
                        window.Orders.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
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
                    // Agotados los intentos, hacer diagnóstico
                    console.error('❌ Modal no inicializado después de ' + maxIntentos + ' intentos');
                    var dialogElement = document.getElementById('modalOrden');
                    console.log('=== DIAGNÓSTICO DETALLADO ===');
                    console.log('- Elemento modalOrden existe:', !!dialogElement);
                    if (dialogElement) {
                        console.log('- Elemento HTML:', dialogElement.outerHTML.substring(0, 200));
                        console.log('- Elemento tiene ej2_instances:', !!dialogElement.ej2_instances);
                        console.log('- Número de instancias:', dialogElement.ej2_instances ? dialogElement.ej2_instances.length : 0);
                        console.log('- Primera instancia disponible:', !!(dialogElement.ej2_instances && dialogElement.ej2_instances[0]));
                    }
                    console.log('- Syncfusion (ejs) disponible:', typeof ejs !== 'undefined');
                    console.log('- Instancia created disponible:', typeof window.modalOrdenInstance !== 'undefined');
                    console.log('- window.modalOrdenInstance valor:', window.modalOrdenInstance);
                    console.log('- Función modalOrdenCreated definida:', typeof window.modalOrdenCreated !== 'undefined');
                    console.log('- Función mostrarModalOrden disponible:', typeof window.mostrarModalOrden !== 'undefined');
                    console.log('- Script Manager ejecutado:', typeof ejs !== 'undefined' && typeof ejs.popups !== 'undefined');
                    console.log('=== FIN DIAGNÓSTICO ===');
                    
                    // Último intento: crear el Dialog manualmente si el elemento no existe
                    if (!dialogElement && typeof ejs !== 'undefined' && ejs.popups && ejs.popups.Dialog) {
                        console.warn('⚠️ Elemento modalOrden no existe en el DOM. Creando manualmente...');
                        try {
                            // Crear el elemento div si no existe
                            var nuevoElemento = document.createElement('div');
                            nuevoElemento.id = 'modalOrden';
                            nuevoElemento.style.display = 'none';
                            document.body.appendChild(nuevoElemento);
                            
                            // Inicializar el Dialog manualmente
                            var dialogOptions = {
                                isModal: true,
                                showCloseIcon: true,
                                width: '90%',
                                height: '85%',
                                visible: false,
                                header: 'Orden #<span id="modalOrdenTitulo">0</span>',
                                created: function(args) {
                                    console.log('✅ Dialog creado manualmente');
                                    if (args && args.component) {
                                        window.modalOrdenInstance = args.component;
                                    }
                                }
                            };
                            
                            // Obtener el contenido del template (está en el DOM pero oculto)
                            var contenidoTemplate = document.querySelector('#modalOrdenContenido');
                            if (contenidoTemplate) {
                                nuevoElemento.innerHTML = contenidoTemplate.innerHTML;
                            } else {
                                // Si no existe el template, crear estructura básica
                                nuevoElemento.innerHTML = '<div id="modalOrdenContenido"><div id="tabsModalOrden"></div></div>';
                            }
                            
                            var dialogInstance = new ejs.popups.Dialog(dialogOptions, nuevoElemento);
                            window.modalOrdenInstance = dialogInstance;
                            
                            dialogInstance.show();
                            console.log('✅ Modal creado e inicializado manualmente');
                            return;
                        } catch (e) {
                            console.error('❌ Error al crear Dialog manualmente:', e);
                        }
                    } else if (dialogElement && typeof ejs !== 'undefined' && ejs.popups && ejs.popups.Dialog) {
                        console.warn('⚠️ Intentando inicialización manual del Dialog usando Syncfusion API...');
                        try {
                            // Si el elemento existe pero no tiene instancia, Syncfusion puede no haberlo procesado
                            // Intentar forzar el procesamiento del Script Manager
                            if (typeof ejs !== 'undefined' && ejs.base && ejs.base.process) {
                                ejs.base.process([dialogElement]);
                                setTimeout(function() {
                                    var instancia = obtenerInstancia();
                                    if (instancia) {
                                        instancia.show();
                                        console.log('✅ Modal inicializado y abierto manualmente');
                                    } else {
                                        window.Orders.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                                    }
                                }, 200);
                                return;
                            }
                        } catch (e) {
                            console.error('❌ Error en inicialización manual:', e);
                        }
                    }
                    
                    window.Orders.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            // Iniciar intentos después de un pequeño delay
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idOrden) {
            if (!idOrden || idOrden <= 0) {
                window.Orders.Utilidades.MostrarError('Error', 'ID de orden no válido.');
                return;
            }
            
            modalOrdenId = idOrden;
            modalOrdenModo = 'editar';
            
            // Cambiar modo del modal
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            // Cambiar campos de solo lectura a editables
            this.ConvertirCamposAEditables();
            
            // Cambiar botones del modal
            this.ActualizarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalOrdenTitulo');
            if (titulo) {
                titulo.textContent = modalOrdenId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            // Restaurar campos a solo lectura
            this.ConvertirCamposASoloLectura();
            
            // Restaurar botones del modal
            this.RestaurarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalOrdenTitulo');
            if (titulo) {
                titulo.textContent = modalOrdenId;
            }
            
            modalOrdenModo = 'ver';
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoOrden');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoOrden" class="form-select form-select-sm">' +
                    '<option value="PENDING"' + (estadoActual === 'PENDING' ? ' selected' : '') + '>PENDING</option>' +
                    '<option value="COMPLETE"' + (estadoActual === 'COMPLETE' ? ' selected' : '') + '>COMPLETE</option>' +
                    '<option value="CANCELLED"' + (estadoActual === 'CANCELLED' ? ' selected' : '') + '>CANCELLED</option>' +
                    '<option value="REFUNDED"' + (estadoActual === 'REFUNDED' ? ' selected' : '') + '>REFUNDED</option>' +
                    '</select>';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoOrden');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoOrden');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'COMPLETE') {
                        estadoHtml = '<span class="badge bg-success">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'CANCELLED') {
                        estadoHtml = '<span class="badge bg-warning text-dark">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'REFUNDED') {
                        estadoHtml = '<span class="badge bg-danger">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-info text-dark">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
        },
        
        ActualizarBotonesModal: function() {
            // Ocultar botones de modo ver
            var btnImprimir = document.getElementById('btnModalImprimir');
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnImprimir) btnImprimir.classList.add('d-none');
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
            var btnImprimir = document.getElementById('btnModalImprimir');
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnImprimir) btnImprimir.classList.remove('d-none');
            if (btnEditar) btnEditar.classList.remove('d-none');
            if (btnCerrar) btnCerrar.classList.remove('d-none');
        },
        
        GuardarCambios: function() {
            if (!modalOrdenId || modalOrdenId <= 0) {
                window.Orders.Utilidades.MostrarError('Error', 'No hay orden seleccionada para guardar.');
                return;
            }
            
            // Obtener valores editados
            var selectEstado = document.getElementById('editEstadoOrden');
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            
            if (!nuevoEstado) {
                window.Orders.Utilidades.MostrarError('Error', 'Debe seleccionar un estado válido.');
                return;
            }
            
            // Preparar datos para enviar
            var datosActualizacion = {
                IdOrden: modalOrdenId,
                EstadoOrden: nuevoEstado
                // Agregar más campos editables aquí cuando se implementen
            };
            
            // Enviar al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ActualizarOrden', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Orders.Utilidades.MostrarExito(
                                    'Orden actualizada',
                                    'Los cambios se guardaron correctamente.'
                                );
                                
                                // Desactivar modo edición
                                if (window.Orders && window.Orders.Modal) {
                                    window.Orders.Modal.DesactivarModoEdicion();
                                    
                                    // Recargar datos de la orden
                                    window.Orders.Modal.CargarDatosOrden(modalOrdenId);
                                    
                                    // Recargar grid
                                    if (window.Orders && window.Orders.Grid) {
                                        window.Orders.Grid.Recargar();
                                    }
                                    
                                    // Actualizar métricas
                                    if (window.Orders && window.Orders.Dashboard) {
                                        window.Orders.Dashboard.ActualizarMetricas();
                                    }
                                }
                            } else {
                                window.Orders.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Orders.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Orders.Utilidades.MostrarError('Error de Conexión', mensajeError);
                        console.error('Error al guardar orden:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            // Recargar datos originales
            if (modalOrdenId) {
                this.CargarDatosOrden(modalOrdenId);
            }
            
            // Desactivar modo edición
            this.DesactivarModoEdicion();
        }
    };
    
    // Sub-namespace para Detalles
    window.Orders.Detalles = {
        Ver: function(idOrden) {
            window.Orders.Modal.Abrir(idOrden, 'ver');
        }
    };
    
    // Sub-namespace para Edición
    window.Orders.Edicion = {
        Editar: function(idOrden) {
            window.Orders.Modal.Abrir(idOrden, 'editar');
        }
    };
    
    // Sub-namespace para Acciones Batch
    window.Orders.Batch = {
        ObtenerFilasSeleccionadas: function() {
            var gridElement = document.getElementById('ordersGrid');
            if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
                return [];
            }
            
            var grid = gridElement.ej2_instances[0];
            var filasSeleccionadas = grid.getSelectedRows();
            return filasSeleccionadas || [];
        },
        
        ActualizarContador: function() {
            var filasSeleccionadas = this.ObtenerFilasSeleccionadas();
            var contador = filasSeleccionadas.length;
            var contadorElement = document.getElementById('contadorSeleccionados');
            var accionesBatch = document.getElementById('accionesBatch');
            
            if (contadorElement) {
                contadorElement.textContent = contador + ' órdenes seleccionadas';
            }
            
            if (accionesBatch) {
                if (contador > 0) {
                    accionesBatch.style.display = 'block';
                } else {
                    accionesBatch.style.display = 'none';
                }
            }
        },
        
        CambiarEstado: function(nuevoEstado) {
            var filasSeleccionadas = this.ObtenerFilasSeleccionadas();
            
            if (filasSeleccionadas.length === 0) {
                window.Orders.Utilidades.MostrarError('Error', 'No hay órdenes seleccionadas.');
                return;
            }
            
            // Confirmar acción
            Swal.fire({
                title: '¿Confirmar cambio de estado?',
                text: 'Se cambiará el estado de ' + filasSeleccionadas.length + ' órdenes a ' + nuevoEstado + '.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, cambiar estado',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.ProcesarCambioEstado(filasSeleccionadas, nuevoEstado);
                }
            });
        },
        
        ProcesarCambioEstado: function(filasSeleccionadas, nuevoEstado) {
            var idsOrdenes = filasSeleccionadas.map(function(fila) {
                return fila.data.IdOrden;
            });
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/CambiarEstadoBatch', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Orders.Utilidades.MostrarExito(
                                    'Estado actualizado',
                                    'Se actualizaron ' + idsOrdenes.length + ' órdenes correctamente.'
                                );
                                
                                // Recargar datos
                                if (window.Orders && window.Orders.Grid) {
                                    window.Orders.Grid.Recargar();
                                }
                                
                                // Deseleccionar todas
                                window.Orders.Batch.DeseleccionarTodas();
                            } else {
                                window.Orders.Utilidades.MostrarError(
                                    'Error al actualizar estado',
                                    respuesta.mensaje || 'No se pudieron actualizar las órdenes.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Orders.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        window.Orders.Utilidades.MostrarError(
                            'Error de Conexión',
                            'No se pudo conectar al servidor. Por favor, intenta nuevamente.'
                        );
                        console.error('Error al cambiar estado: HTTP ' + xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify({
                IdsOrdenes: idsOrdenes,
                NuevoEstado: nuevoEstado
            }));
        },
        
        ExportarSeleccionadas: function() {
            var filasSeleccionadas = this.ObtenerFilasSeleccionadas();
            
            if (filasSeleccionadas.length === 0) {
                window.Orders.Utilidades.MostrarError('Error', 'No hay órdenes seleccionadas.');
                return;
            }
            
            var gridElement = document.getElementById('ordersGrid');
            if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
                window.Orders.Utilidades.MostrarError('Error', 'Grid no encontrado.');
                return;
            }
            
            var grid = gridElement.ej2_instances[0];
            
            // Exportar solo las filas seleccionadas
            try {
                grid.excelExport({
                    fileName: 'OrdenesSeleccionadas_' + new Date().toISOString().split('T')[0] + '.xlsx',
                    dataSource: filasSeleccionadas.map(function(fila) { return fila.data; }),
                    complete: function() {
                        window.Orders.Utilidades.MostrarExito(
                            'Exportación Exitosa',
                            'Se exportaron ' + filasSeleccionadas.length + ' órdenes correctamente.'
                        );
                    },
                    failure: function() {
                        window.Orders.Utilidades.MostrarError(
                            'Error de Exportación',
                            'No se pudo exportar a Excel.'
                        );
                    }
                });
            } catch (error) {
                window.Orders.Utilidades.MostrarError(
                    'Error de Exportación',
                    'Error al exportar: ' + error.message
                );
                console.error('Error al exportar:', error);
            }
        },
        
        DeseleccionarTodas: function() {
            var gridElement = document.getElementById('ordersGrid');
            if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
                return;
            }
            
            var grid = gridElement.ej2_instances[0];
            grid.clearSelection();
            this.ActualizarContador();
        }
    };
    
    // Sub-namespace para Facturación
    window.Orders.Facturacion = {
        CargarItemsFactura: function(idOrden) {
            var gridElement = document.getElementById('gridItemsModalOrden');
            if (!gridElement) {
                console.warn('Grid de items no encontrado');
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Orders/ObtenerItemsFactura', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
                                if (grid) {
                                    grid.dataSource = respuesta.datos;
                                    grid.refresh();
                                }
                            } else {
                                // Si no hay items, mostrar datos mock para demostración
                                window.Orders.Facturacion.CargarItemsMock(idOrden);
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de items:', e);
                            // En caso de error, cargar datos mock
                            window.Orders.Facturacion.CargarItemsMock(idOrden);
                        }
                    } else {
                        // En caso de error, cargar datos mock
                        console.warn('Error al cargar items de factura: HTTP ' + xhr.status);
                        window.Orders.Facturacion.CargarItemsMock(idOrden);
                    }
                }
            };
            xhr.send(JSON.stringify(idOrden));
        },
        
        CargarItemsMock: function(idOrden) {
            // Datos mock para simular items de factura - simula integración Oracle/JDE
            var itemsMock = [
                {
                    IdItem: 1,
                    IdProducto: 101,
                    NombreProducto: 'Producto A',
                    Cantidad: 2,
                    PrecioUnitario: 150.00,
                    Descuento: 10.00,
                    Subtotal: 290.00,
                    Impuesto: 46.40,
                    Total: 336.40
                },
                {
                    IdItem: 2,
                    IdProducto: 102,
                    NombreProducto: 'Producto B',
                    Cantidad: 1,
                    PrecioUnitario: 250.00,
                    Descuento: 0.00,
                    Subtotal: 250.00,
                    Impuesto: 40.00,
                    Total: 290.00
                },
                {
                    IdItem: 3,
                    IdProducto: 103,
                    NombreProducto: 'Producto C',
                    Cantidad: 3,
                    PrecioUnitario: 75.50,
                    Descuento: 5.00,
                    Subtotal: 221.50,
                    Impuesto: 35.44,
                    Total: 256.94
                }
            ];
            
            var gridElement = document.getElementById('gridItemsFactura');
            if (gridElement && gridElement.ej2_instances) {
                var grid = gridElement.ej2_instances[0];
                if (grid) {
                    grid.dataSource = itemsMock;
                    grid.refresh();
                }
            }
        },
        
        Imprimir: function() {
            window.print();
        }
    };
    
})();
