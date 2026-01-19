window.orderChannelsGridCreated = function(args) {
    console.log('Grid de canales creado, cargando datos...');
    if (window.OrderChannels && window.OrderChannels.Grid) {
        window.OrderChannels.Grid.CargarDatos();
    }
};

window.orderChannelsGridDataBound = function(args) {
    // Event delegation ya está registrado en _OrderChannelsGrid.cshtml
};

window.OrderChannels = window.OrderChannels || {};

(function() {
    'use strict';
    
    window.OrderChannels.Utilidades = {
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
    
    window.OrderChannels.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('orderChannelsGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.OrderChannels.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/OrderChannels/ObtenerOrderChannels', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Canales cargados:', respuesta.datos.length);
                            } else {
                                window.OrderChannels.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar los canales.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.OrderChannels.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar canales:', mensajeError);
                        window.OrderChannels.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    window.OrderChannels.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('orderChannelsGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                Tipo: this.ObtenerTipo(),
                Estado: this.ObtenerEstado()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/OrderChannels/BuscarOrderChannels', true);
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
                                window.OrderChannels.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.OrderChannels.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar canales:', mensajeError);
                        window.OrderChannels.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroTipo = document.getElementById('filtroTipo');
            if (filtroTipo && filtroTipo.ej2_instances && filtroTipo.ej2_instances[0]) {
                filtroTipo.ej2_instances[0].value = null;
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            if (window.OrderChannels && window.OrderChannels.Grid) {
                window.OrderChannels.Grid.CargarDatos();
            }
        },
        
        ObtenerTipo: function() {
            var dropdown = document.getElementById('filtroTipo');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        }
    };
    
    window.OrderChannels.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/OrderChannels/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalCanales').textContent = datos.totalCanales || 0;
                                document.getElementById('canalesActivos').textContent = datos.canalesActivos || 0;
                                document.getElementById('totalPedidos').textContent = datos.totalPedidos || 0;
                                document.getElementById('tasaConversionPromedio').textContent = parseFloat(datos.tasaConversionPromedio || 0).toFixed(2) + '%';
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalCanales || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (OrderChannels):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de canales:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    window.OrderChannels.Modal = {
        Abrir: function(idCanal, modo) {
            var id = parseInt(idCanal, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.OrderChannels.Utilidades.MostrarError('Error', 'ID de canal no válido.');
                return;
            }
            
            modalCanalId = id;
            modalCanalModo = modo || 'ver';
            
            this.CargarDatosCanal(id);
        },
        
        CargarDatosCanal: function(idCanal) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/OrderChannels/ObtenerOrderChannelPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.OrderChannels.Modal.MostrarDatos(respuesta.datos);
                                window.OrderChannels.Modal.AbrirDialog();
                            } else {
                                window.OrderChannels.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar el canal.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.OrderChannels.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.OrderChannels.Utilidades.MostrarError('Error de Conexión', 'Error al cargar el canal.');
                        console.error('Error al cargar canal:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idCanal));
        },
        
        MostrarDatos: function(canal) {
            document.getElementById('modalCanalTitulo').textContent = canal.IdCanal;
            document.getElementById('modalIdCanal').textContent = canal.IdCanal;
            document.getElementById('modalNombreCanal').textContent = canal.NombreCanal || '-';
            document.getElementById('modalDescripcion').textContent = canal.Descripcion || '-';
            
            var tipoHtml = '';
            if (canal.TipoCanal === 'MOBILE') {
                tipoHtml = '<span class="badge bg-primary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Canal móvil (aplicación)">MOBILE</span>';
            } else if (canal.TipoCanal === 'CALL_CENTER') {
                tipoHtml = '<span class="badge bg-info info-tooltip-canal" data-field="TipoCanal" data-tooltip="Call center telefónico">CALL_CENTER</span>';
            } else if (canal.TipoCanal === 'EMAIL') {
                tipoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Correo electrónico">EMAIL</span>';
            } else if (canal.TipoCanal === 'WEB') {
                tipoHtml = '<span class="badge bg-success info-tooltip-canal" data-field="TipoCanal" data-tooltip="Portal web">WEB</span>';
            } else {
                tipoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Tipo desconocido">' + (canal.TipoCanal || '-') + '</span>';
            }
            document.getElementById('modalTipoCanal').innerHTML = tipoHtml;
            
            var estadoHtml = '';
            if (canal.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-canal" data-field="Estado" data-tooltip="Canal activo y operativo">' + canal.Estado + '</span>';
            } else if (canal.Estado === 'INACTIVE') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="Estado" data-tooltip="Canal inactivo">' + canal.Estado + '</span>';
            } else if (canal.Estado === 'MAINTENANCE') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-canal" data-field="Estado" data-tooltip="Canal en mantenimiento">' + canal.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="Estado" data-tooltip="Estado desconocido">' + (canal.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoCanal').innerHTML = estadoHtml;
            
            document.getElementById('modalTotalPedidos').textContent = canal.TotalPedidos || 0;
            document.getElementById('modalTasaConversion').textContent = parseFloat(canal.TasaConversion || 0).toFixed(2) + '%';
            document.getElementById('modalValorPromedioPedido').textContent = '$' + (canal.ValorPromedioPedido || 0).toFixed(2);
            document.getElementById('modalPedidosHoy').textContent = canal.PedidosHoy || 0;
            document.getElementById('modalPedidosEsteMes').textContent = canal.PedidosEsteMes || 0;
            document.getElementById('modalEficiencia').textContent = parseFloat(canal.Eficiencia || 0).toFixed(2) + '%';
            
            if (canal.FechaUltimoPedido) {
                document.getElementById('modalFechaUltimoPedido').textContent = new Date(canal.FechaUltimoPedido).toLocaleString('es-MX');
            } else {
                document.getElementById('modalFechaUltimoPedido').textContent = '-';
            }
        },
        
        AbrirDialog: function() {
            var dialogElement = document.getElementById('modalCanal');
            if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                dialogElement.ej2_instances[0].show();
                
                setTimeout(function() {
                    var tooltipElement = document.getElementById('tooltipModalCanal');
                    if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                        tooltipModalCanalObj = tooltipElement.ej2_instances[0];
                    }
                }, 100);
            } else if (window.modalCanalInstance) {
                window.modalCanalInstance.show();
            } else {
                console.warn('Modal de canal no disponible aún');
                setTimeout(function() {
                    window.OrderChannels.Modal.AbrirDialog();
                }, 200);
            }
        },
        
        CambiarAModoEdicion: function(idCanal) {
            window.OrderChannels.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.OrderChannels.Detalles = {
        Ver: function(idCanal) {
            window.OrderChannels.Modal.Abrir(idCanal, 'ver');
        }
    };
    
    window.OrderChannels.Edicion = {
        Editar: function(idCanal) {
            window.OrderChannels.Modal.Abrir(idCanal, 'editar');
        }
    };
    
})();
