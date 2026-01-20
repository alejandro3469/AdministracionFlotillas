// Funciones de eventos del Grid (scope global)
window.chainsGridCreated = function(args) {
    console.log('Grid de cadenas creado, cargando datos...');
    if (window.Chains && window.Chains.Grid) {
        window.Chains.Grid.CargarDatos();
    }
};

window.chainsGridDataBound = function(args) {
    // Event delegation ya está registrado en _ChainsGrid.cshtml
};

// Namespace principal
window.Chains = window.Chains || {};

(function() {
    'use strict';
    
    // Utilidades
    window.Chains.Utilidades = {
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
    window.Chains.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('chainsGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Chains.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Chains/ObtenerChains', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Cadenas cargadas:', respuesta.datos.length);
                            } else {
                                window.Chains.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar las cadenas.'
                                );
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerChains:', e);
                            window.Chains.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al cargar cadenas:', mensajeError);
                        window.Chains.Utilidades.MostrarError('Error de Conexión', mensajeError);
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
    window.Chains.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('chainsGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                Nombre: this.ObtenerNombre(),
                Estado: this.ObtenerEstado()
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Chains/BuscarChains', true);
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
                                window.Chains.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de BuscarChains:', e);
                            window.Chains.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        console.error('Error al buscar cadenas:', mensajeError);
                        window.Chains.Utilidades.MostrarError('Error de Conexión', mensajeError);
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
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            if (window.Chains && window.Chains.Grid) {
                window.Chains.Grid.CargarDatos();
            }
        },
        
        ObtenerNombre: function() {
            var textbox = document.getElementById('filtroNombre');
            if (!textbox) return null;
            var valor = textbox.value || '';
            return valor && valor.trim() ? valor.trim() : null;
        },
        
        ObtenerEstado: function() {
            var dropdown = document.getElementById('filtroEstado');
            if (!dropdown || !dropdown.ej2_instances) return null;
            return dropdown.ej2_instances[0] ? dropdown.ej2_instances[0].value : null;
        }
    };
    
    // Sub-namespace para Dashboard
    window.Chains.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Chains/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                document.getElementById('totalCadenas').textContent = datos.totalCadenas || 0;
                                document.getElementById('cadenasActivas').textContent = datos.cadenasActivas || 0;
                                document.getElementById('totalSucursales').textContent = datos.totalSucursales || 0;
                                document.getElementById('totalVentas').textContent = '$' + parseFloat(datos.totalVentas || 0).toFixed(2);
                                
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = (datos.totalCadenas || 0).toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerMetricas (Chains):', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de cadenas:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    // Sub-namespace para Modal
    window.Chains.Modal = {
        Abrir: function(idCadena, modo) {
            var id = parseInt(idCadena, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Chains.Utilidades.MostrarError('Error', 'ID de cadena no válido.');
                return;
            }
            
            modalCadenaId = id;
            modalCadenaModo = modo || 'ver';
            
            this.CargarDatosCadena(id);
        },
        
        CargarDatosCadena: function(idCadena) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Chains/ObtenerChainPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                window.Chains.Modal.MostrarDatos(respuesta.datos);
                                window.Chains.Modal.AbrirDialog();
                            } else {
                                window.Chains.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar la cadena.');
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta de ObtenerChainPorId:', e);
                            window.Chains.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Chains.Utilidades.MostrarError('Error de Conexión', 'Error al cargar la cadena.');
                        console.error('Error al cargar cadena:', mensajeError);
                    }
                }
            };
            xhr.send(JSON.stringify(idCadena));
        },
        
        MostrarDatos: function(cadena) {
            document.getElementById('modalCadenaTitulo').textContent = cadena.IdCadena;
            document.getElementById('modalIdCadena').textContent = cadena.IdCadena;
            document.getElementById('modalNombreCadena').textContent = cadena.NombreCadena || '-';
            document.getElementById('modalRazonSocial').textContent = cadena.RazonSocial || '-';
            document.getElementById('modalRFC').textContent = cadena.RFC || '-';
            
            var estadoHtml = '';
            if (cadena.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena activa y operativa">' + cadena.Estado + '</span>';
            } else if (cadena.Estado === 'INACTIVE') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena inactiva">' + cadena.Estado + '</span>';
            } else if (cadena.Estado === 'SUSPENDED') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena suspendida temporalmente">' + cadena.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-cadena" data-field="Estado" data-tooltip="Estado desconocido">' + (cadena.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoCadena').innerHTML = estadoHtml;
            
            document.getElementById('modalNumeroSucursales').textContent = cadena.NumeroSucursales || 0;
            document.getElementById('modalLimiteCredito').textContent = '$' + (cadena.LimiteCredito || 0).toFixed(2);
            document.getElementById('modalDiasCredito').textContent = cadena.DiasCredito || 0;
            document.getElementById('modalTotalOrdenes').textContent = cadena.TotalOrdenes || 0;
            document.getElementById('modalTotalVentas').textContent = '$' + (cadena.TotalVentas || 0).toFixed(2);
            
            document.getElementById('modalContactEmail').textContent = cadena.ContactEmail || '-';
            document.getElementById('modalContactPhone').textContent = cadena.ContactPhone || '-';
            document.getElementById('modalDireccion').textContent = cadena.Direccion || '-';
            document.getElementById('modalCiudad').textContent = cadena.Ciudad || '-';
            document.getElementById('modalEstadoDireccion').textContent = cadena.EstadoDireccion || '-';
            document.getElementById('modalCodigoPostal').textContent = cadena.CodigoPostal || '-';
            document.getElementById('modalPais').textContent = cadena.Pais || '-';
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
            if (typeof window.mostrarModalCadena === 'function') {
                if (window.mostrarModalCadena()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalCadena');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalCadenaObj !== 'undefined') {
                                tooltipModalCadenaObj = tooltipElement.ej2_instances[0];
                            }
                        }
                        limpiarFlag();
                    }, 100);
                    return;
                }
            }
            
            // Si la función helper no está disponible o falló, usar el método robusto anterior
            var intentos = 0;
            var maxIntentos = 50;
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                // Prioridad 1: Instancia guardada en window.modalCadenaInstance
                if (typeof window.modalCadenaInstance !== 'undefined' && window.modalCadenaInstance !== null) {
                    return window.modalCadenaInstance;
                }
                
                // Prioridad 2: Instancia del DOM usando ej2_instances
                var dialogElement = document.getElementById('modalCadena');
                if (dialogElement) {
                    // Método 1: ej2_instances directo
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                        var instancia = dialogElement.ej2_instances[0];
                        if (instancia && typeof instancia.show === 'function') {
                            window.modalCadenaInstance = instancia; // Guardar para futuro uso
                            return instancia;
                        }
                    }
                    
                    // Método 2: Buscar en todos los ej2_instances
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances.length > 0) {
                        for (var i = 0; i < dialogElement.ej2_instances.length; i++) {
                            var inst = dialogElement.ej2_instances[i];
                            if (inst && typeof inst.show === 'function') {
                                window.modalCadenaInstance = inst; // Guardar para futuro uso
                                return inst;
                            }
                        }
                    }
                    
                    // Método 3: Intentar obtener usando el método de Syncfusion
                    try {
                        if (typeof ej !== 'undefined' && ej.base && typeof ej.base.getComponent === 'function') {
                            var dialogInstance = ej.base.getComponent(dialogElement, 'dialog');
                            if (dialogInstance && typeof dialogInstance.show === 'function') {
                                window.modalCadenaInstance = dialogInstance; // Guardar para futuro uso
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
                                    window.modalCadenaInstance = inst; // Guardar para futuro uso
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
                        console.log('✅ Modal de cadena abierto correctamente después de ' + intentos + ' intentos');
                        window.modalCadenaInstance = dialogInstance;
                        
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalCadena');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalCadenaObj = tooltipElement.ej2_instances[0];
                            }
                            limpiarFlag();
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de cadena:', error);
                        window.Chains.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        limpiarFlag();
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de cadena... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de cadena no inicializado después de ' + maxIntentos + ' intentos');
                    window.Chains.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                    limpiarFlag();
                }
            }
            
            intentarAbrir();
        },
        
        CambiarAModoEdicion: function(idCadena) {
            window.Chains.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
        }
    };
    
    window.Chains.Detalles = {
        Ver: function(idCadena) {
            window.Chains.Modal.Abrir(idCadena, 'ver');
        }
    };
    
    window.Chains.Edicion = {
        Editar: function(idCadena) {
            window.Chains.Modal.Abrir(idCadena, 'editar');
        }
    };
    
})();
