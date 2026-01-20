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
            return new Promise((resolve) => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: titulo || 'Error',
                        text: mensaje || 'Ha ocurrido un error.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => resolve());
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve();
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
                    }).then(() => resolve());
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve();
                }
            });
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
            document.getElementById('modalLimiteCredito').innerHTML = '<i class="fas fa-credit-card me-1"></i>$' + (cadena.LimiteCredito || 0).toFixed(2);
            document.getElementById('modalDiasCredito').textContent = cadena.DiasCredito || 0;
            document.getElementById('modalTotalOrdenes').innerHTML = '<i class="fas fa-shopping-cart me-1"></i>' + (cadena.TotalOrdenes || 0);
            document.getElementById('modalTotalVentas').innerHTML = '<i class="fas fa-dollar-sign me-1"></i>$' + (cadena.TotalVentas || 0).toFixed(2);
            
            document.getElementById('modalContactEmail').innerHTML = '<i class="fas fa-envelope me-1"></i>' + (cadena.ContactEmail || '-');
            document.getElementById('modalContactPhone').innerHTML = '<i class="fas fa-phone me-1"></i>' + (cadena.ContactPhone || '-');
            document.getElementById('modalDireccion').innerHTML = '<i class="fas fa-map-marker-alt me-1"></i>' + (cadena.Direccion || '-');
            document.getElementById('modalCiudad').innerHTML = '<i class="fas fa-city me-1"></i>' + (cadena.Ciudad || '-');
            document.getElementById('modalEstadoDireccion').innerHTML = '<i class="fas fa-map me-1"></i>' + (cadena.EstadoDireccion || '-');
            document.getElementById('modalCodigoPostal').innerHTML = '<i class="fas fa-mail-bulk me-1"></i>' + (cadena.CodigoPostal || '-');
            document.getElementById('modalPais').innerHTML = '<i class="fas fa-flag me-1"></i>' + (cadena.Pais || '-');
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
            if (!idCadena || idCadena <= 0) {
                window.Chains.Utilidades.MostrarError('Error', 'ID de cadena no válido.');
                return;
            }
            
            modalCadenaId = idCadena;
            modalCadenaModo = 'editar';
            
            // Cambiar modo del modal
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            // Cambiar campos de solo lectura a editables
            this.ConvertirCamposAEditables();
            
            // Cambiar botones del modal
            this.ActualizarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalCadenaTitulo');
            if (titulo) {
                titulo.textContent = modalCadenaId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            // Restaurar campos a solo lectura
            this.ConvertirCamposASoloLectura();
            
            // Restaurar botones del modal
            this.RestaurarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalCadenaTitulo');
            if (titulo) {
                titulo.textContent = modalCadenaId;
            }
            
            modalCadenaModo = 'ver';
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoCadena');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoCadena" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="INACTIVE"' + (estadoActual === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option>' +
                    '<option value="SUSPENDED"' + (estadoActual === 'SUSPENDED' ? ' selected' : '') + '>SUSPENDED</option>' +
                    '</select>';
            }
            
            // Nombre - convertir a input
            var nombreContainer = document.getElementById('modalNombreCadena');
            if (nombreContainer) {
                var nombreActual = nombreContainer.textContent.trim();
                nombreContainer.innerHTML = '<input type="text" id="editNombreCadena" class="form-control form-control-sm" value="' + nombreActual + '">';
            }
            
            // Razón Social - convertir a input
            var razonContainer = document.getElementById('modalRazonSocial');
            if (razonContainer) {
                var razonActual = razonContainer.textContent.trim();
                razonContainer.innerHTML = '<input type="text" id="editRazonSocial" class="form-control form-control-sm" value="' + razonActual + '">';
            }
            
            // RFC - convertir a input
            var rfcContainer = document.getElementById('modalRFC');
            if (rfcContainer) {
                var rfcActual = rfcContainer.textContent.trim();
                rfcContainer.innerHTML = '<input type="text" id="editRFC" class="form-control form-control-sm" value="' + rfcActual + '">';
            }
            
            // Número de Sucursales - convertir a input numérico
            var sucursalesContainer = document.getElementById('modalNumeroSucursales');
            if (sucursalesContainer) {
                var sucursalesActual = sucursalesContainer.textContent.trim();
                sucursalesContainer.innerHTML = '<input type="number" id="editNumeroSucursales" class="form-control form-control-sm" min="0" value="' + sucursalesActual + '">';
            }
            
            // Límite de Crédito - convertir a input numérico
            var limiteContainer = document.getElementById('modalLimiteCredito');
            if (limiteContainer) {
                var limiteActual = limiteContainer.textContent.replace('$', '').replace(',', '').trim();
                limiteContainer.innerHTML = '<input type="number" id="editLimiteCredito" class="form-control form-control-sm" step="0.01" min="0" value="' + limiteActual + '">';
            }
            
            // Días de Crédito - convertir a input numérico
            var diasContainer = document.getElementById('modalDiasCredito');
            if (diasContainer) {
                var diasActual = diasContainer.textContent.trim();
                diasContainer.innerHTML = '<input type="number" id="editDiasCredito" class="form-control form-control-sm" min="0" value="' + diasActual + '">';
            }
            
            // Email - convertir a input
            var emailContainer = document.getElementById('modalContactEmail');
            if (emailContainer) {
                var emailActual = emailContainer.textContent.trim();
                emailContainer.innerHTML = '<input type="email" id="editContactEmail" class="form-control form-control-sm" value="' + emailActual + '">';
            }
            
            // Teléfono - convertir a input
            var telefonoContainer = document.getElementById('modalContactPhone');
            if (telefonoContainer) {
                var telefonoActual = telefonoContainer.textContent.trim();
                telefonoContainer.innerHTML = '<input type="tel" id="editContactPhone" class="form-control form-control-sm" value="' + telefonoActual + '">';
            }
            
            // Dirección - convertir a input
            var direccionContainer = document.getElementById('modalDireccion');
            if (direccionContainer) {
                var direccionActual = direccionContainer.textContent.trim();
                direccionContainer.innerHTML = '<input type="text" id="editDireccion" class="form-control form-control-sm" value="' + direccionActual + '">';
            }
            
            // Ciudad - convertir a input
            var ciudadContainer = document.getElementById('modalCiudad');
            if (ciudadContainer) {
                var ciudadActual = ciudadContainer.textContent.trim();
                ciudadContainer.innerHTML = '<input type="text" id="editCiudad" class="form-control form-control-sm" value="' + ciudadActual + '">';
            }
            
            // Estado (dirección) - convertir a input
            var estadoDirContainer = document.getElementById('modalEstadoDireccion');
            if (estadoDirContainer) {
                var estadoDirActual = estadoDirContainer.textContent.trim();
                estadoDirContainer.innerHTML = '<input type="text" id="editEstadoDireccion" class="form-control form-control-sm" value="' + estadoDirActual + '">';
            }
            
            // Código Postal - convertir a input
            var codigoPostalContainer = document.getElementById('modalCodigoPostal');
            if (codigoPostalContainer) {
                var codigoPostalActual = codigoPostalContainer.textContent.trim();
                codigoPostalContainer.innerHTML = '<input type="text" id="editCodigoPostal" class="form-control form-control-sm" value="' + codigoPostalActual + '">';
            }
            
            // País - convertir a input
            var paisContainer = document.getElementById('modalPais');
            if (paisContainer) {
                var paisActual = paisContainer.textContent.trim();
                paisContainer.innerHTML = '<input type="text" id="editPais" class="form-control form-control-sm" value="' + paisActual + '">';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoCadena');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoCadena');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena activa y operativa">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'INACTIVE') {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena inactiva">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'SUSPENDED') {
                        estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-cadena" data-field="Estado" data-tooltip="Cadena suspendida temporalmente">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-cadena" data-field="Estado" data-tooltip="Estado desconocido">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Restaurar todos los demás campos
            var campos = [
                { id: 'modalNombreCadena', inputId: 'editNombreCadena' },
                { id: 'modalRazonSocial', inputId: 'editRazonSocial' },
                { id: 'modalRFC', inputId: 'editRFC' },
                { id: 'modalContactEmail', inputId: 'editContactEmail' },
                { id: 'modalContactPhone', inputId: 'editContactPhone' },
                { id: 'modalDireccion', inputId: 'editDireccion' },
                { id: 'modalCiudad', inputId: 'editCiudad' },
                { id: 'modalEstadoDireccion', inputId: 'editEstadoDireccion' },
                { id: 'modalCodigoPostal', inputId: 'editCodigoPostal' },
                { id: 'modalPais', inputId: 'editPais' }
            ];
            
            campos.forEach(function(campo) {
                var container = document.getElementById(campo.id);
                if (container) {
                    var input = document.getElementById(campo.inputId);
                    if (input) {
                        container.textContent = input.value || '-';
                    }
                }
            });
            
            // Número de Sucursales
            var sucursalesContainer = document.getElementById('modalNumeroSucursales');
            if (sucursalesContainer) {
                var inputSucursales = document.getElementById('editNumeroSucursales');
                if (inputSucursales) {
                    sucursalesContainer.textContent = inputSucursales.value || 0;
                }
            }
            
            // Límite de Crédito
            var limiteContainer = document.getElementById('modalLimiteCredito');
            if (limiteContainer) {
                var inputLimite = document.getElementById('editLimiteCredito');
                if (inputLimite) {
                    var limiteValue = parseFloat(inputLimite.value) || 0;
                    limiteContainer.textContent = '$' + limiteValue.toFixed(2);
                }
            }
            
            // Días de Crédito
            var diasContainer = document.getElementById('modalDiasCredito');
            if (diasContainer) {
                var inputDias = document.getElementById('editDiasCredito');
                if (inputDias) {
                    diasContainer.textContent = inputDias.value || 0;
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
            if (!modalCadenaId || modalCadenaId <= 0) {
                window.Chains.Utilidades.MostrarError('Error', 'No hay cadena seleccionada para guardar.');
                return;
            }
            
            // Obtener valores editados
            var selectEstado = document.getElementById('editEstadoCadena');
            var inputNombre = document.getElementById('editNombreCadena');
            var inputRazon = document.getElementById('editRazonSocial');
            var inputRFC = document.getElementById('editRFC');
            var inputSucursales = document.getElementById('editNumeroSucursales');
            var inputLimite = document.getElementById('editLimiteCredito');
            var inputDias = document.getElementById('editDiasCredito');
            var inputEmail = document.getElementById('editContactEmail');
            var inputTelefono = document.getElementById('editContactPhone');
            var inputDireccion = document.getElementById('editDireccion');
            var inputCiudad = document.getElementById('editCiudad');
            var inputEstadoDir = document.getElementById('editEstadoDireccion');
            var inputCodigoPostal = document.getElementById('editCodigoPostal');
            var inputPais = document.getElementById('editPais');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoNombre = inputNombre ? inputNombre.value.trim() : null;
            var nuevaRazon = inputRazon ? inputRazon.value.trim() : null;
            var nuevoRFC = inputRFC ? inputRFC.value.trim() : null;
            var nuevoSucursales = inputSucursales ? parseInt(inputSucursales.value) : null;
            var nuevoLimite = inputLimite ? parseFloat(inputLimite.value) : null;
            var nuevoDias = inputDias ? parseInt(inputDias.value) : null;
            var nuevoEmail = inputEmail ? inputEmail.value.trim() : null;
            var nuevoTelefono = inputTelefono ? inputTelefono.value.trim() : null;
            var nuevaDireccion = inputDireccion ? inputDireccion.value.trim() : null;
            var nuevaCiudad = inputCiudad ? inputCiudad.value.trim() : null;
            var nuevoEstadoDir = inputEstadoDir ? inputEstadoDir.value.trim() : null;
            var nuevoCodigoPostal = inputCodigoPostal ? inputCodigoPostal.value.trim() : null;
            var nuevoPais = inputPais ? inputPais.value.trim() : null;
            
            // Validaciones
            if (nuevoEmail && !nuevoEmail.includes('@')) {
                window.Chains.Utilidades.MostrarError('Error', 'El formato de email no es válido.');
                return;
            }
            
            if (nuevoLimite !== null && nuevoLimite < 0) {
                window.Chains.Utilidades.MostrarError('Error', 'El límite de crédito no puede ser negativo.');
                return;
            }
            
            if (nuevoDias !== null && nuevoDias < 0) {
                window.Chains.Utilidades.MostrarError('Error', 'Los días de crédito no pueden ser negativos.');
                return;
            }
            
            if (nuevoSucursales !== null && nuevoSucursales < 0) {
                window.Chains.Utilidades.MostrarError('Error', 'El número de sucursales no puede ser negativo.');
                return;
            }
            
            // Deshabilitar botones antes de enviar
            window.ModalButtons.Deshabilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
            
            // Preparar datos para enviar
            var datosActualizacion = {
                IdCadena: modalCadenaId,
                Estado: nuevoEstado,
                NombreCadena: nuevoNombre,
                RazonSocial: nuevaRazon,
                RFC: nuevoRFC,
                NumeroSucursales: nuevoSucursales,
                LimiteCredito: nuevoLimite,
                DiasCredito: nuevoDias,
                ContactEmail: nuevoEmail,
                ContactPhone: nuevoTelefono,
                Direccion: nuevaDireccion,
                Ciudad: nuevaCiudad,
                EstadoDireccion: nuevoEstadoDir,
                CodigoPostal: nuevoCodigoPostal,
                Pais: nuevoPais
            };
            
            // Enviar al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Chains/ActualizarChain', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                // Mostrar mensaje de éxito y esperar confirmación
                                window.Chains.Utilidades.MostrarExito(
                                    'Cadena actualizada',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    // Desactivar modo edición
                                    if (window.Chains && window.Chains.Modal) {
                                        window.Chains.Modal.DesactivarModoEdicion();
                                        
                                        // Recargar datos de la cadena
                                        window.Chains.Modal.CargarDatosCadena(modalCadenaId);
                                        
                                        // Recargar grid
                                        if (window.Chains && window.Chains.Grid) {
                                            window.Chains.Grid.Recargar();
                                        }
                                    }
                                    
                                    // Re-habilitar botones después de confirmar éxito
                                    window.ModalButtons.Habilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Chains.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Chains.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Chains.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar cadena:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Chains.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalCadena', '#chainsGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            // Recargar datos originales
            if (modalCadenaId) {
                this.CargarDatosCadena(modalCadenaId);
            }
            
            // Desactivar modo edición
            this.DesactivarModoEdicion();
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
