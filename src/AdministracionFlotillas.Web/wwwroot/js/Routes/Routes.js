window.routesGridCreated = function(args) {
    console.log('Grid de rutas creado, cargando datos...');
    if (window.Routes && window.Routes.Grid) {
        window.Routes.Grid.CargarDatos();
    }
};

window.routesGridDataBound = function(args) {
    // Event delegation ya está registrado en _RoutesGrid.cshtml
};

window.Routes = window.Routes || {};

(function() {
    'use strict';
    
    window.Routes.Utilidades = {
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
    
    window.Routes.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('routesGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Routes.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Routes/ObtenerRoutes', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Rutas cargadas:', respuesta.datos.length);
                            } else {
                                window.Routes.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar las rutas.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Routes.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar rutas:', mensajeError);
                        window.Routes.Utilidades.MostrarError('Error de Conexión', mensajeError);
                    }
                }
            };
            xhr.send();
        },
        
        Recargar: function() {
            this.CargarDatos();
        }
    };
    
    window.Routes.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('routesGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                Nombre: this.ObtenerNombre(),
                Zona: this.ObtenerZona(),
                Estado: this.ObtenerEstado()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Routes/BuscarRoutes', true);
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
                                window.Routes.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Routes.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar rutas:', mensajeError);
                        window.Routes.Utilidades.MostrarError('Error de Conexión', mensajeError);
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
            
            if (window.Routes && window.Routes.Grid) {
                window.Routes.Grid.CargarDatos();
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
    
    window.Routes.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Routes/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalRutas').textContent = datos.totalRutas || 0;
                                document.getElementById('rutasActivas').textContent = datos.rutasActivas || 0;
                                document.getElementById('totalEntregas').textContent = datos.totalEntregas || 0;
                                document.getElementById('eficienciaPromedio').textContent = parseFloat(datos.eficienciaPromedio || 0).toFixed(2) + '%';
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalRutas || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (Routes):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de rutas:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    window.Routes.Modal = {
        Abrir: function(idRuta, modo) {
            var id = parseInt(idRuta, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Routes.Utilidades.MostrarError('Error', 'ID de ruta no válido.');
                return;
            }
            
            modalRutaId = id;
            modalRutaModo = modo || 'ver';
            
            this.CargarDatosRuta(id);
        },
        
        CargarDatosRuta: function(idRuta) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Routes/ObtenerRoutePorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.Routes.Modal.MostrarDatos(respuesta.datos);
                                window.Routes.Modal.AbrirDialog();
                            } else {
                                window.Routes.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar la ruta.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Routes.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Routes.Utilidades.MostrarError('Error de Conexión', 'Error al cargar la ruta.');
                        console.error('Error al cargar ruta:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idRuta));
        },
        
        MostrarDatos: function(ruta) {
            document.getElementById('modalRutaTitulo').textContent = ruta.IdRuta;
            document.getElementById('modalIdRuta').textContent = ruta.IdRuta;
            document.getElementById('modalNombreRuta').textContent = ruta.NombreRuta || '-';
            document.getElementById('modalDescripcion').textContent = ruta.Descripcion || '-';
            document.getElementById('modalZonaGeografica').textContent = ruta.ZonaGeografica || '-';
            
            var estadoHtml = '';
            if (ruta.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-ruta" data-field="Estado" data-tooltip="Ruta activa y operativa">' + ruta.Estado + '</span>';
            } else if (ruta.Estado === 'INACTIVE') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-ruta" data-field="Estado" data-tooltip="Ruta inactiva">' + ruta.Estado + '</span>';
            } else if (ruta.Estado === 'MAINTENANCE') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-ruta" data-field="Estado" data-tooltip="Ruta en mantenimiento">' + ruta.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-ruta" data-field="Estado" data-tooltip="Estado desconocido">' + (ruta.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoRuta').innerHTML = estadoHtml;
            
            document.getElementById('modalRepartidorAsignado').textContent = ruta.RepartidorAsignado || '-';
            document.getElementById('modalTiempoEstimado').textContent = (ruta.TiempoEstimado || 0) + ' min';
            document.getElementById('modalCapacidadMaxima').textContent = ruta.CapacidadMaxima || 0;
            document.getElementById('modalTotalEntregas').textContent = ruta.TotalEntregas || 0;
            document.getElementById('modalTiempoPromedio').textContent = parseFloat(ruta.TiempoPromedioEntrega || 0).toFixed(1) + ' min';
            document.getElementById('modalEficiencia').textContent = parseFloat(ruta.Eficiencia || 0).toFixed(2) + '%';
        },
        
        AbrirDialog: function() {
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalRuta === 'function') {
                if (window.mostrarModalRuta()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalRuta');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalRutaObj !== 'undefined') {
                                tooltipModalRutaObj = tooltipElement.ej2_instances[0];
                            }
                        }
                    }, 100);
                    return;
                }
            }
            
            // Si la función helper no está disponible o falló, usar el método robusto anterior
            var self = this;
            var intentos = 0;
            var maxIntentos = 50;
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                if (typeof window.modalRutaInstance !== 'undefined' && window.modalRutaInstance !== null) {
                    return window.modalRutaInstance;
                }
                var dialogElement = document.getElementById('modalRuta');
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
                        console.log('✅ Modal de ruta abierto correctamente después de ' + intentos + ' intentos');
                        window.modalRutaInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalRuta');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalRutaObj = tooltipElement.ej2_instances[0];
                            }
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de ruta:', error);
                        window.Routes.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de ruta... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de ruta no inicializado después de ' + maxIntentos + ' intentos');
                    window.Routes.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idRuta) {
            window.Routes.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.Routes.Detalles = {
        Ver: function(idRuta) {
            window.Routes.Modal.Abrir(idRuta, 'ver');
        }
    };
    
    window.Routes.Edicion = {
        Editar: function(idRuta) {
            window.Routes.Modal.Abrir(idRuta, 'editar');
        }
    };
    
})();
