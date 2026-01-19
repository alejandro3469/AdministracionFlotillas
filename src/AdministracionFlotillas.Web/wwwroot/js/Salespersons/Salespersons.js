window.salespersonsGridCreated = function(args) {
    console.log('Grid de vendedores creado, cargando datos...');
    if (window.Salespersons && window.Salespersons.Grid) {
        window.Salespersons.Grid.CargarDatos();
    }
};

window.salespersonsGridDataBound = function(args) {
    // Event delegation ya está registrado en _SalespersonsGrid.cshtml
};

window.Salespersons = window.Salespersons || {};

(function() {
    'use strict';
    
    window.Salespersons.Utilidades = {
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
    
    window.Salespersons.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('salespersonsGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Salespersons.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ObtenerSalespersons', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Vendedores cargados:', respuesta.datos.length);
                            } else {
                                window.Salespersons.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar los vendedores.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar vendedores:', mensajeError);
                        window.Salespersons.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    window.Salespersons.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('salespersonsGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                Nombre: this.ObtenerNombre(),
                Zona: this.ObtenerZona(),
                Estado: this.ObtenerEstado()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/BuscarSalespersons', true);
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
                                window.Salespersons.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar vendedores:', mensajeError);
                        window.Salespersons.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroNombre = document.getElementById('filtroNombre');
            if (filtroNombre) {
                filtroNombre.value = '';
            }
            
            var filtroZona = document.getElementById('filtroZona');
            if (filtroZona && filtroZona.ej2_instances && filtroZona.ej2_instances[0]) {
                filtroZona.ej2_instances[0].value = null;
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            if (window.Salespersons && window.Salespersons.Grid) {
                window.Salespersons.Grid.CargarDatos();
            }
        },
        
        ObtenerNombre: function() {
            var textbox = document.getElementById('filtroNombre');
            if (!textbox) return null;
            var valor = textbox.value || '';
            return valor && valor.trim() ? valor.trim() : null;
        },
        
        ObtenerZona: function() {
            var dropdown = document.getElementById('filtroZona');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        }
    };
    
    window.Salespersons.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalVendedores').textContent = datos.totalVendedores || 0;
                                document.getElementById('vendedoresActivos').textContent = datos.vendedoresActivos || 0;
                                document.getElementById('totalVentas').textContent = '$' + parseFloat(datos.totalVentas || 0).toFixed(2);
                                document.getElementById('totalComisiones').textContent = '$' + parseFloat(datos.totalComisiones || 0).toFixed(2);
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalVendedores || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (Salespersons):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de vendedores:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    window.Salespersons.Modal = {
        Abrir: function(idVendedor, modo) {
            var id = parseInt(idVendedor, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'ID de vendedor no válido.');
                return;
            }
            
            modalVendedorId = id;
            modalVendedorModo = modo || 'ver';
            
            this.CargarDatosVendedor(id);
        },
        
        CargarDatosVendedor: function(idVendedor) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ObtenerSalespersonPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.Salespersons.Modal.MostrarDatos(respuesta.datos);
                                window.Salespersons.Modal.AbrirDialog();
                            } else {
                                window.Salespersons.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar el vendedor.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Salespersons.Utilidades.MostrarError('Error de Conexión', 'Error al cargar el vendedor.');
                        console.error('Error al cargar vendedor:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idVendedor));
        },
        
        MostrarDatos: function(vendedor) {
            document.getElementById('modalVendedorTitulo').textContent = vendedor.IdVendedor;
            document.getElementById('modalIdVendedor').textContent = vendedor.IdVendedor;
            document.getElementById('modalNombreCompleto').textContent = vendedor.NombreCompleto || '-';
            document.getElementById('modalEmail').textContent = vendedor.Email || '-';
            document.getElementById('modalTelefono').textContent = vendedor.Telefono || '-';
            document.getElementById('modalZonaCobertura').textContent = vendedor.ZonaCobertura || '-';
            
            var estadoHtml = '';
            if (vendedor.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-vendedor" data-field="Estado" data-tooltip="Vendedor activo y operativo">' + vendedor.Estado + '</span>';
            } else if (vendedor.Estado === 'INACTIVE') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="Vendedor inactivo">' + vendedor.Estado + '</span>';
            } else if (vendedor.Estado === 'ON_LEAVE') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-vendedor" data-field="Estado" data-tooltip="Vendedor en licencia">' + vendedor.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="Estado desconocido">' + (vendedor.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoVendedor').innerHTML = estadoHtml;
            
            document.getElementById('modalComisionBase').textContent = (vendedor.ComisionBase || 0).toFixed(2) + '%';
            document.getElementById('modalComisionVariable').textContent = (vendedor.ComisionVariable || 0).toFixed(2) + '%';
            
            if (vendedor.FechaContratacion) {
                document.getElementById('modalFechaContratacion').textContent = new Date(vendedor.FechaContratacion).toLocaleDateString('es-MX');
            } else {
                document.getElementById('modalFechaContratacion').textContent = '-';
            }
            
            document.getElementById('modalTotalOrdenes').textContent = vendedor.TotalOrdenes || 0;
            document.getElementById('modalTotalVentas').textContent = '$' + (vendedor.TotalVentas || 0).toFixed(2);
            document.getElementById('modalTotalComisiones').textContent = '$' + (vendedor.TotalComisiones || 0).toFixed(2);
            document.getElementById('modalCadenasAsignadas').textContent = vendedor.CadenasAsignadas || 0;
        },
        
        AbrirDialog: function() {
            var self = this;
            var intentos = 0;
            var maxIntentos = 50;
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                if (typeof window.modalVendedorInstance !== 'undefined' && window.modalVendedorInstance !== null) {
                    return window.modalVendedorInstance;
                }
                var dialogElement = document.getElementById('modalVendedor');
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
                        console.log('✅ Modal de vendedor abierto correctamente después de ' + intentos + ' intentos');
                        window.modalVendedorInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalVendedor');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalVendedorObj = tooltipElement.ej2_instances[0];
                            }
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de vendedor:', error);
                        window.Salespersons.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de vendedor... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de vendedor no inicializado después de ' + maxIntentos + ' intentos');
                    window.Salespersons.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idVendedor) {
            window.Salespersons.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.Salespersons.Detalles = {
        Ver: function(idVendedor) {
            window.Salespersons.Modal.Abrir(idVendedor, 'ver');
        }
    };
    
    window.Salespersons.Edicion = {
        Editar: function(idVendedor) {
            window.Salespersons.Modal.Abrir(idVendedor, 'editar');
        }
    };
    
})();
