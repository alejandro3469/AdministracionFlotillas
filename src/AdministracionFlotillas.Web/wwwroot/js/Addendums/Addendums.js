window.addendumsGridCreated = function(args) {
    console.log('Grid de adendas creado, cargando datos...');
    if (window.Addendums && window.Addendums.Grid) {
        window.Addendums.Grid.CargarDatos();
    }
};

window.addendumsGridDataBound = function(args) {
    // Event delegation ya está registrado en _AddendumsGrid.cshtml
};

window.Addendums = window.Addendums || {};

(function() {
    'use strict';
    
    window.Addendums.Utilidades = {
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
    
    window.Addendums.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('addendumsGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Addendums.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Addendums/ObtenerAddendums', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Adendas cargadas:', respuesta.datos.length);
                            } else {
                                window.Addendums.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar las adendas.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Addendums.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar adendas:', mensajeError);
                        window.Addendums.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    window.Addendums.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('addendumsGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                IdCadena: this.ObtenerIdCadena(),
                Estado: this.ObtenerEstado()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Addendums/BuscarAddendums', true);
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
                                window.Addendums.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Addendums.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar adendas:', mensajeError);
                        window.Addendums.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroIdCadena = document.getElementById('filtroIdCadena');
            if (filtroIdCadena && filtroIdCadena.ej2_instances && filtroIdCadena.ej2_instances[0]) {
                filtroIdCadena.ej2_instances[0].value = null;
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            if (window.Addendums && window.Addendums.Grid) {
                window.Addendums.Grid.CargarDatos();
            }
        },
        
        ObtenerIdCadena: function() {
            var numeric = document.getElementById('filtroIdCadena');
            if (!numeric || !numeric.ej2_instances) return null;
            return numeric.ej2_instances[0] ? numeric.ej2_instances[0].value : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        }
    };
    
    window.Addendums.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Addendums/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalAdendas').textContent = datos.totalAdendas || 0;
                                document.getElementById('adendasActivas').textContent = datos.adendasActivas || 0;
                                document.getElementById('adendasExpiradas').textContent = datos.adendasExpiradas || 0;
                                document.getElementById('adendasCanceladas').textContent = datos.adendasCanceladas || 0;
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalAdendas || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (Addendums):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de adendas:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    window.Addendums.Modal = {
        Abrir: function(idAdenda, modo) {
            var id = parseInt(idAdenda, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Addendums.Utilidades.MostrarError('Error', 'ID de adenda no válido.');
                return;
            }
            
            modalAdendaId = id;
            modalAdendaModo = modo || 'ver';
            
            this.CargarDatosAdenda(id);
        },
        
        CargarDatosAdenda: function(idAdenda) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Addendums/ObtenerAddendumPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.Addendums.Modal.MostrarDatos(respuesta.datos);
                                window.Addendums.Modal.AbrirDialog();
                            } else {
                                window.Addendums.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar la adenda.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Addendums.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Addendums.Utilidades.MostrarError('Error de Conexión', 'Error al cargar la adenda.');
                        console.error('Error al cargar adenda:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idAdenda));
        },
        
        MostrarDatos: function(adenda) {
            document.getElementById('modalAdendaTitulo').textContent = adenda.IdAdenda;
            document.getElementById('modalIdAdenda').textContent = adenda.IdAdenda;
            document.getElementById('modalNombreAdenda').textContent = adenda.NombreAdenda || '-';
            document.getElementById('modalNombreCadena').textContent = adenda.NombreCadena || '-';
            document.getElementById('modalIdCadena').textContent = adenda.IdCadena || '-';
            
            var estadoHtml = '';
            if (adenda.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda activa y vigente">' + adenda.Estado + '</span>';
            } else if (adenda.Estado === 'EXPIRED') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda expirada">' + adenda.Estado + '</span>';
            } else if (adenda.Estado === 'CANCELLED') {
                estadoHtml = '<span class="badge bg-danger info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda cancelada">' + adenda.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-adenda" data-field="Estado" data-tooltip="Estado desconocido">' + (adenda.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoAdenda').innerHTML = estadoHtml;
            
            document.getElementById('modalDescuentoEspecial').textContent = (adenda.DescuentoEspecial || 0).toFixed(2) + '%';
            document.getElementById('modalDiasCredito').textContent = adenda.DiasCredito || 0;
            document.getElementById('modalMontoMinimoPedido').textContent = '$' + (adenda.MontoMinimoPedido || 0).toFixed(2);
            
            var renovacionHtml = '';
            if (adenda.RenovacionAutomatica) {
                renovacionHtml = '<span class="badge bg-success info-tooltip-adenda" data-field="RenovacionAutomatica" data-tooltip="Se renueva automáticamente al vencer">Sí</span>';
            } else {
                renovacionHtml = '<span class="badge bg-secondary info-tooltip-adenda" data-field="RenovacionAutomatica" data-tooltip="No se renueva automáticamente">No</span>';
            }
            document.getElementById('modalRenovacionAutomatica').innerHTML = renovacionHtml;
            
            if (adenda.FechaInicio) {
                document.getElementById('modalFechaInicio').textContent = new Date(adenda.FechaInicio).toLocaleDateString('es-MX');
            } else {
                document.getElementById('modalFechaInicio').textContent = '-';
            }
            
            if (adenda.FechaFin) {
                document.getElementById('modalFechaFin').textContent = new Date(adenda.FechaFin).toLocaleDateString('es-MX');
            } else {
                document.getElementById('modalFechaFin').textContent = '-';
            }
            
            document.getElementById('modalCondicionesEspeciales').textContent = adenda.CondicionesEspeciales || '-';
        },
        
        AbrirDialog: function() {
            var self = this;
            var intentos = 0;
            var maxIntentos = 50;
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                if (typeof window.modalAdendaInstance !== 'undefined' && window.modalAdendaInstance !== null) {
                    return window.modalAdendaInstance;
                }
                var dialogElement = document.getElementById('modalAdenda');
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
                        console.log('✅ Modal de adenda abierto correctamente después de ' + intentos + ' intentos');
                        window.modalAdendaInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalAdenda');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalAdendaObj = tooltipElement.ej2_instances[0];
                            }
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de adenda:', error);
                        window.Addendums.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de adenda... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de adenda no inicializado después de ' + maxIntentos + ' intentos');
                    window.Addendums.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idAdenda) {
            window.Addendums.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.Addendums.Detalles = {
        Ver: function(idAdenda) {
            window.Addendums.Modal.Abrir(idAdenda, 'ver');
        }
    };
    
    window.Addendums.Edicion = {
        Editar: function(idAdenda) {
            window.Addendums.Modal.Abrir(idAdenda, 'editar');
        }
    };
    
})();
