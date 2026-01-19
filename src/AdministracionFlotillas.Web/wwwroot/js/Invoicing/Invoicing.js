window.invoicesGridCreated = function(args) {
    console.log('Grid de facturas creado, cargando datos...');
    if (window.Invoicing && window.Invoicing.Grid) {
        window.Invoicing.Grid.CargarDatos();
    }
};

window.invoicesGridDataBound = function(args) {
    // Event delegation ya está registrado en _InvoicesGrid.cshtml
};

window.Invoicing = window.Invoicing || {};

(function() {
    'use strict';
    
    window.Invoicing.Utilidades = {
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
    
    window.Invoicing.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('invoicesGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Invoicing.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoicing/ObtenerInvoices', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Facturas cargadas:', respuesta.datos.length);
                            } else {
                                window.Invoicing.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar las facturas.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Invoicing.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar facturas:', mensajeError);
                        window.Invoicing.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    window.Invoicing.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('invoicesGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                IdOrden: this.ObtenerIdOrden(),
                Estado: this.ObtenerEstado(),
                FechaInicio: this.ObtenerFechaInicio(),
                FechaFin: this.ObtenerFechaFin()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoicing/BuscarInvoices', true);
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
                                window.Invoicing.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Invoicing.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar facturas:', mensajeError);
                        window.Invoicing.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroIdOrden = document.getElementById('filtroIdOrden');
            if (filtroIdOrden && filtroIdOrden.ej2_instances && filtroIdOrden.ej2_instances[0]) {
                filtroIdOrden.ej2_instances[0].value = null;
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            var filtroFechaInicio = document.getElementById('filtroFechaInicio');
            if (filtroFechaInicio && filtroFechaInicio.ej2_instances && filtroFechaInicio.ej2_instances[0]) {
                filtroFechaInicio.ej2_instances[0].value = null;
            }
            
            var filtroFechaFin = document.getElementById('filtroFechaFin');
            if (filtroFechaFin && filtroFechaFin.ej2_instances && filtroFechaFin.ej2_instances[0]) {
                filtroFechaFin.ej2_instances[0].value = null;
            }
            
            if (window.Invoicing && window.Invoicing.Grid) {
                window.Invoicing.Grid.CargarDatos();
            }
        },
        
        ObtenerIdOrden: function() {
            var numeric = document.getElementById('filtroIdOrden');
            if (!numeric || !numeric.ej2_instances) return null;
            return numeric.ej2_instances[0] ? numeric.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        },
        
        ObtenerFechaInicio: function() {
            var datepicker = document.getElementById('filtroFechaInicio');
            if (!datepicker || !datepicker.ej2_instances) return null;
            return datepicker.ej2_instances[0] ? datepicker.ej2_instances[0].value : null;
        },
        
        ObtenerFechaFin: function() {
            var datepicker = document.getElementById('filtroFechaFin');
            if (!datepicker || !datepicker.ej2_instances) return null;
            return datepicker.ej2_instances[0] ? datepicker.ej2_instances[0].value : null;
        }
    };
    
    window.Invoicing.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoicing/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalFacturas').textContent = datos.totalFacturas || 0;
                                document.getElementById('facturasTimbradas').textContent = datos.facturasTimbradas || 0;
                                document.getElementById('facturasBorrador').textContent = datos.facturasBorrador || 0;
                                document.getElementById('facturasCanceladas').textContent = datos.facturasCanceladas || 0;
                                document.getElementById('totalFacturado').textContent = '$' + parseFloat(datos.totalFacturado || 0).toFixed(2);
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalFacturas || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (Invoicing):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de facturas:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    window.Invoicing.Modal = {
        Abrir: function(idFactura, modo) {
            var id = parseInt(idFactura, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Invoicing.Utilidades.MostrarError('Error', 'ID de factura no válido.');
                return;
            }
            
            modalFacturaId = id;
            modalFacturaModo = modo || 'ver';
            
            this.CargarDatosFactura(id);
        },
        
        CargarDatosFactura: function(idFactura) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoicing/ObtenerInvoicePorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.Invoicing.Modal.MostrarDatos(respuesta.datos);
                                window.Invoicing.Modal.AbrirDialog();
                            } else {
                                window.Invoicing.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar la factura.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Invoicing.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Invoicing.Utilidades.MostrarError('Error de Conexión', 'Error al cargar la factura.');
                        console.error('Error al cargar factura:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idFactura));
        },
        
        MostrarDatos: function(factura) {
            document.getElementById('modalFacturaTitulo').textContent = factura.IdFactura;
            document.getElementById('modalIdFactura').textContent = factura.IdFactura;
            document.getElementById('modalFolio').textContent = factura.Folio || '-';
            document.getElementById('modalUUID').textContent = factura.UUID || '-';
            document.getElementById('modalIdOrden').textContent = factura.IdOrden || '-';
            
            var estadoHtml = '';
            if (factura.Estado === 'STAMPED') {
                estadoHtml = '<span class="badge bg-success info-tooltip-factura" data-field="Estado" data-tooltip="Factura timbrada y válida">' + factura.Estado + '</span>';
            } else if (factura.Estado === 'DRAFT') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-factura" data-field="Estado" data-tooltip="Factura en borrador">' + factura.Estado + '</span>';
            } else if (factura.Estado === 'CANCELLED') {
                estadoHtml = '<span class="badge bg-danger info-tooltip-factura" data-field="Estado" data-tooltip="Factura cancelada">' + factura.Estado + '</span>';
            } else if (factura.Estado === 'PAID') {
                estadoHtml = '<span class="badge bg-info info-tooltip-factura" data-field="Estado" data-tooltip="Factura pagada">' + factura.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-factura" data-field="Estado" data-tooltip="Estado desconocido">' + (factura.Estado || 'DRAFT') + '</span>';
            }
            document.getElementById('modalEstadoFactura').innerHTML = estadoHtml;
            
            document.getElementById('modalRFCEmisor').textContent = factura.RFCEmisor || '-';
            document.getElementById('modalRFCReceptor').textContent = factura.RFCReceptor || '-';
            
            if (factura.FechaEmision) {
                document.getElementById('modalFechaEmision').textContent = new Date(factura.FechaEmision).toLocaleString('es-MX');
            } else {
                document.getElementById('modalFechaEmision').textContent = '-';
            }
            
            document.getElementById('modalMetodoPago').textContent = factura.MetodoPago || '-';
            document.getElementById('modalFormaPago').textContent = factura.FormaPago || '-';
            document.getElementById('modalMoneda').textContent = factura.Moneda || 'MXN';
            document.getElementById('modalSubtotal').textContent = '$' + (factura.Subtotal || 0).toFixed(2);
            document.getElementById('modalImpuesto').textContent = '$' + (factura.Impuesto || 0).toFixed(2);
            document.getElementById('modalTotal').textContent = '$' + (factura.Total || 0).toFixed(2);
            document.getElementById('modalRutaXML').textContent = factura.RutaXML || '-';
            document.getElementById('modalRutaPDF').textContent = factura.RutaPDF || '-';
            
            if (factura.FechaCancelacion) {
                document.getElementById('modalFechaCancelacion').textContent = new Date(factura.FechaCancelacion).toLocaleString('es-MX');
            } else {
                document.getElementById('modalFechaCancelacion').textContent = '-';
            }
            
            document.getElementById('modalMotivoCancelacion').textContent = factura.MotivoCancelacion || '-';
        },
        
        AbrirDialog: function() {
            var dialogElement = document.getElementById('modalFactura');
            if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                dialogElement.ej2_instances[0].show();
                
                setTimeout(function() {
                    var tooltipElement = document.getElementById('tooltipModalFactura');
                    if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                        tooltipModalFacturaObj = tooltipElement.ej2_instances[0];
                    }
                }, 100);
            } else if (window.modalFacturaInstance) {
                window.modalFacturaInstance.show();
            } else {
                console.warn('Modal de factura no disponible aún');
                setTimeout(function() {
                    window.Invoicing.Modal.AbrirDialog();
                }, 200);
            }
        },
        
        CambiarAModoEdicion: function(idFactura) {
            window.Invoicing.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.Invoicing.Detalles = {
        Ver: function(idFactura) {
            window.Invoicing.Modal.Abrir(idFactura, 'ver');
        }
    };
    
    window.Invoicing.Edicion = {
        Editar: function(idFactura) {
            window.Invoicing.Modal.Abrir(idFactura, 'editar');
        }
    };
    
})();
