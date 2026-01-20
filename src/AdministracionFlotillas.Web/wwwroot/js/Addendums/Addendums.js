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
            if (typeof window.mostrarModalAdenda === 'function') {
                if (window.mostrarModalAdenda()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalAdenda');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalAdendaObj !== 'undefined') {
                                tooltipModalAdendaObj = tooltipElement.ej2_instances[0];
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
                // Prioridad 1: Instancia guardada en window.modalAdendaInstance
                if (typeof window.modalAdendaInstance !== 'undefined' && window.modalAdendaInstance !== null) {
                    return window.modalAdendaInstance;
                }
                
                // Prioridad 2: Instancia del DOM usando ej2_instances
                var dialogElement = document.getElementById('modalAdenda');
                if (dialogElement) {
                    // Método 1: ej2_instances directo
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
                        var instancia = dialogElement.ej2_instances[0];
                        if (instancia && typeof instancia.show === 'function') {
                            window.modalAdendaInstance = instancia; // Guardar para futuro uso
                            return instancia;
                        }
                    }
                    
                    // Método 2: Buscar en todos los ej2_instances
                    if (dialogElement.ej2_instances && dialogElement.ej2_instances.length > 0) {
                        for (var i = 0; i < dialogElement.ej2_instances.length; i++) {
                            var inst = dialogElement.ej2_instances[i];
                            if (inst && typeof inst.show === 'function') {
                                window.modalAdendaInstance = inst; // Guardar para futuro uso
                                return inst;
                            }
                        }
                    }
                    
                    // Método 3: Intentar obtener usando el método de Syncfusion
                    try {
                        if (typeof ej !== 'undefined' && ej.base && typeof ej.base.getComponent === 'function') {
                            var dialogInstance = ej.base.getComponent(dialogElement, 'dialog');
                            if (dialogInstance && typeof dialogInstance.show === 'function') {
                                window.modalAdendaInstance = dialogInstance; // Guardar para futuro uso
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
                                    window.modalAdendaInstance = inst; // Guardar para futuro uso
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
                        console.log('✅ Modal de adenda abierto correctamente después de ' + intentos + ' intentos');
                        window.modalAdendaInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalAdenda');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalAdendaObj = tooltipElement.ej2_instances[0];
                            }
                            limpiarFlag();
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de adenda:', error);
                        window.Addendums.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        limpiarFlag();
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
                    limpiarFlag();
                }
            }
            
            intentarAbrir();
        },
        
        CambiarAModoEdicion: function(idAdenda) {
            if (!idAdenda || idAdenda <= 0) {
                window.Addendums.Utilidades.MostrarError('Error', 'ID de adenda no válido.');
                return;
            }
            
            // modalAdendaId y modalAdendaModo están definidas en el modal
            if (typeof modalAdendaId !== 'undefined') {
                modalAdendaId = idAdenda;
            }
            if (typeof modalAdendaModo !== 'undefined') {
                modalAdendaModo = 'editar';
            }
            
            // Cambiar modo del modal
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            // Cambiar campos de solo lectura a editables
            this.ConvertirCamposAEditables();
            
            // Cambiar botones del modal
            this.ActualizarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalAdendaTitulo');
            if (titulo && typeof modalAdendaId !== 'undefined') {
                titulo.textContent = modalAdendaId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            // Restaurar campos a solo lectura
            this.ConvertirCamposASoloLectura();
            
            // Restaurar botones del modal
            this.RestaurarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalAdendaTitulo');
            if (titulo && typeof modalAdendaId !== 'undefined') {
                titulo.textContent = modalAdendaId;
            }
            
            if (typeof modalAdendaModo !== 'undefined') {
                modalAdendaModo = 'ver';
            }
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoAdenda');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoAdenda" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="EXPIRED"' + (estadoActual === 'EXPIRED' ? ' selected' : '') + '>EXPIRED</option>' +
                    '<option value="CANCELLED"' + (estadoActual === 'CANCELLED' ? ' selected' : '') + '>CANCELLED</option>' +
                    '</select>';
            }
            
            // Nombre - convertir a input
            var nombreContainer = document.getElementById('modalNombreAdenda');
            if (nombreContainer) {
                var nombreActual = nombreContainer.textContent.trim();
                nombreContainer.innerHTML = '<input type="text" id="editNombreAdenda" class="form-control form-control-sm" value="' + nombreActual + '">';
            }
            
            // Descuento Especial - convertir a input numérico
            var descuentoContainer = document.getElementById('modalDescuentoEspecial');
            if (descuentoContainer) {
                var descuentoActual = descuentoContainer.textContent.replace('%', '').trim();
                descuentoContainer.innerHTML = '<input type="number" id="editDescuentoEspecial" class="form-control form-control-sm" step="0.01" min="0" max="100" value="' + descuentoActual + '">';
            }
            
            // Días de Crédito - convertir a input numérico
            var diasContainer = document.getElementById('modalDiasCredito');
            if (diasContainer) {
                var diasActual = diasContainer.textContent.trim();
                diasContainer.innerHTML = '<input type="number" id="editDiasCredito" class="form-control form-control-sm" min="0" value="' + diasActual + '">';
            }
            
            // Monto Mínimo Pedido - convertir a input numérico
            var montoContainer = document.getElementById('modalMontoMinimoPedido');
            if (montoContainer) {
                var montoActual = montoContainer.textContent.replace('$', '').replace(',', '').trim();
                montoContainer.innerHTML = '<input type="number" id="editMontoMinimoPedido" class="form-control form-control-sm" step="0.01" min="0" value="' + montoActual + '">';
            }
            
            // Renovación Automática - convertir a checkbox
            var renovacionContainer = document.getElementById('modalRenovacionAutomatica');
            if (renovacionContainer) {
                var renovacionActual = renovacionContainer.textContent.trim() === 'Sí';
                renovacionContainer.innerHTML = '<input type="checkbox" id="editRenovacionAutomatica" class="form-check-input" ' + (renovacionActual ? 'checked' : '') + '>';
            }
            
            // Fecha Inicio - convertir a date input
            var fechaInicioContainer = document.getElementById('modalFechaInicio');
            if (fechaInicioContainer) {
                var fechaInicioActual = fechaInicioContainer.textContent.trim();
                // Intentar parsear fecha
                var fechaInicioValue = '';
                if (fechaInicioActual !== '-') {
                    try {
                        var fecha = new Date(fechaInicioActual);
                        if (!isNaN(fecha.getTime())) {
                            fechaInicioValue = fecha.toISOString().split('T')[0];
                        }
                    } catch (e) {
                        // Ignorar error
                    }
                }
                fechaInicioContainer.innerHTML = '<input type="date" id="editFechaInicio" class="form-control form-control-sm" value="' + fechaInicioValue + '">';
            }
            
            // Fecha Fin - convertir a date input
            var fechaFinContainer = document.getElementById('modalFechaFin');
            if (fechaFinContainer) {
                var fechaFinActual = fechaFinContainer.textContent.trim();
                var fechaFinValue = '';
                if (fechaFinActual !== '-') {
                    try {
                        var fecha = new Date(fechaFinActual);
                        if (!isNaN(fecha.getTime())) {
                            fechaFinValue = fecha.toISOString().split('T')[0];
                        }
                    } catch (e) {
                        // Ignorar error
                    }
                }
                fechaFinContainer.innerHTML = '<input type="date" id="editFechaFin" class="form-control form-control-sm" value="' + fechaFinValue + '">';
            }
            
            // Condiciones Especiales - convertir a textarea
            var condicionesContainer = document.getElementById('modalCondicionesEspeciales');
            if (condicionesContainer) {
                var condicionesActual = condicionesContainer.textContent.trim();
                condicionesContainer.innerHTML = '<textarea id="editCondicionesEspeciales" class="form-control form-control-sm" rows="3">' + condicionesActual + '</textarea>';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoAdenda');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoAdenda');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda activa y vigente">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'EXPIRED') {
                        estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda expirada">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'CANCELLED') {
                        estadoHtml = '<span class="badge bg-danger info-tooltip-adenda" data-field="Estado" data-tooltip="Adenda cancelada">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-adenda" data-field="Estado" data-tooltip="Estado desconocido">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Restaurar campos de texto
            var nombreContainer = document.getElementById('modalNombreAdenda');
            if (nombreContainer) {
                var inputNombre = document.getElementById('editNombreAdenda');
                if (inputNombre) {
                    nombreContainer.textContent = inputNombre.value || '-';
                }
            }
            
            // Descuento Especial
            var descuentoContainer = document.getElementById('modalDescuentoEspecial');
            if (descuentoContainer) {
                var inputDescuento = document.getElementById('editDescuentoEspecial');
                if (inputDescuento) {
                    var descuentoValue = parseFloat(inputDescuento.value) || 0;
                    descuentoContainer.textContent = descuentoValue.toFixed(2) + '%';
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
            
            // Monto Mínimo Pedido
            var montoContainer = document.getElementById('modalMontoMinimoPedido');
            if (montoContainer) {
                var inputMonto = document.getElementById('editMontoMinimoPedido');
                if (inputMonto) {
                    var montoValue = parseFloat(inputMonto.value) || 0;
                    montoContainer.textContent = '$' + montoValue.toFixed(2);
                }
            }
            
            // Renovación Automática
            var renovacionContainer = document.getElementById('modalRenovacionAutomatica');
            if (renovacionContainer) {
                var checkboxRenovacion = document.getElementById('editRenovacionAutomatica');
                if (checkboxRenovacion) {
                    var renovacionHtml = '';
                    if (checkboxRenovacion.checked) {
                        renovacionHtml = '<span class="badge bg-success info-tooltip-adenda" data-field="RenovacionAutomatica" data-tooltip="Se renueva automáticamente al vencer">Sí</span>';
                    } else {
                        renovacionHtml = '<span class="badge bg-secondary info-tooltip-adenda" data-field="RenovacionAutomatica" data-tooltip="No se renueva automáticamente">No</span>';
                    }
                    renovacionContainer.innerHTML = renovacionHtml;
                }
            }
            
            // Fecha Inicio
            var fechaInicioContainer = document.getElementById('modalFechaInicio');
            if (fechaInicioContainer) {
                var inputFechaInicio = document.getElementById('editFechaInicio');
                if (inputFechaInicio && inputFechaInicio.value) {
                    try {
                        var fecha = new Date(inputFechaInicio.value);
                        fechaInicioContainer.textContent = fecha.toLocaleDateString('es-MX');
                    } catch (e) {
                        fechaInicioContainer.textContent = inputFechaInicio.value;
                    }
                } else {
                    fechaInicioContainer.textContent = '-';
                }
            }
            
            // Fecha Fin
            var fechaFinContainer = document.getElementById('modalFechaFin');
            if (fechaFinContainer) {
                var inputFechaFin = document.getElementById('editFechaFin');
                if (inputFechaFin && inputFechaFin.value) {
                    try {
                        var fecha = new Date(inputFechaFin.value);
                        fechaFinContainer.textContent = fecha.toLocaleDateString('es-MX');
                    } catch (e) {
                        fechaFinContainer.textContent = inputFechaFin.value;
                    }
                } else {
                    fechaFinContainer.textContent = '-';
                }
            }
            
            // Condiciones Especiales
            var condicionesContainer = document.getElementById('modalCondicionesEspeciales');
            if (condicionesContainer) {
                var textareaCondiciones = document.getElementById('editCondicionesEspeciales');
                if (textareaCondiciones) {
                    condicionesContainer.textContent = textareaCondiciones.value || '-';
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
            if (typeof modalAdendaId === 'undefined' || !modalAdendaId || modalAdendaId <= 0) {
                window.Addendums.Utilidades.MostrarError('Error', 'No hay adenda seleccionada para guardar.');
                return;
            }
            
            // Obtener valores editados
            var selectEstado = document.getElementById('editEstadoAdenda');
            var inputNombre = document.getElementById('editNombreAdenda');
            var inputDescuento = document.getElementById('editDescuentoEspecial');
            var inputDias = document.getElementById('editDiasCredito');
            var inputMonto = document.getElementById('editMontoMinimoPedido');
            var checkboxRenovacion = document.getElementById('editRenovacionAutomatica');
            var inputFechaInicio = document.getElementById('editFechaInicio');
            var inputFechaFin = document.getElementById('editFechaFin');
            var textareaCondiciones = document.getElementById('editCondicionesEspeciales');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoNombre = inputNombre ? inputNombre.value.trim() : null;
            var nuevoDescuento = inputDescuento ? parseFloat(inputDescuento.value) : null;
            var nuevoDias = inputDias ? parseInt(inputDias.value) : null;
            var nuevoMonto = inputMonto ? parseFloat(inputMonto.value) : null;
            var nuevaRenovacion = checkboxRenovacion ? checkboxRenovacion.checked : null;
            var nuevaFechaInicio = inputFechaInicio && inputFechaInicio.value ? new Date(inputFechaInicio.value) : null;
            var nuevaFechaFin = inputFechaFin && inputFechaFin.value ? new Date(inputFechaFin.value) : null;
            var nuevasCondiciones = textareaCondiciones ? textareaCondiciones.value.trim() : null;
            
            // Validaciones
            if (nuevoDescuento !== null && (nuevoDescuento < 0 || nuevoDescuento > 100)) {
                window.Addendums.Utilidades.MostrarError('Error', 'El descuento especial debe estar entre 0 y 100.');
                return;
            }
            
            if (nuevoDias !== null && nuevoDias < 0) {
                window.Addendums.Utilidades.MostrarError('Error', 'Los días de crédito no pueden ser negativos.');
                return;
            }
            
            if (nuevoMonto !== null && nuevoMonto < 0) {
                window.Addendums.Utilidades.MostrarError('Error', 'El monto mínimo de pedido no puede ser negativo.');
                return;
            }
            
            if (nuevaFechaInicio && nuevaFechaFin && nuevaFechaInicio > nuevaFechaFin) {
                window.Addendums.Utilidades.MostrarError('Error', 'La fecha de inicio no puede ser posterior a la fecha de fin.');
                return;
            }
            
            // Deshabilitar botones antes de enviar
            window.ModalButtons.Deshabilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
            
            // Preparar datos para enviar
            var datosActualizacion = {
                IdAdenda: modalAdendaId,
                Estado: nuevoEstado,
                NombreAdenda: nuevoNombre,
                DescuentoEspecial: nuevoDescuento,
                DiasCredito: nuevoDias,
                MontoMinimoPedido: nuevoMonto,
                RenovacionAutomatica: nuevaRenovacion,
                FechaInicio: nuevaFechaInicio ? nuevaFechaInicio.toISOString() : null,
                FechaFin: nuevaFechaFin ? nuevaFechaFin.toISOString() : null,
                CondicionesEspeciales: nuevasCondiciones
            };
            
            // Enviar al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Addendums/ActualizarAddendum', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                // Mostrar mensaje de éxito y esperar confirmación
                                window.Addendums.Utilidades.MostrarExito(
                                    'Adenda actualizada',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    // Desactivar modo edición
                                    if (window.Addendums && window.Addendums.Modal) {
                                        window.Addendums.Modal.DesactivarModoEdicion();
                                        
                                        // Recargar datos de la adenda
                                        if (typeof modalAdendaId !== 'undefined' && modalAdendaId) {
                                            window.Addendums.Modal.CargarDatosAdenda(modalAdendaId);
                                        }
                                        
                                        // Recargar grid
                                        if (window.Addendums && window.Addendums.Grid) {
                                            window.Addendums.Grid.Recargar();
                                        }
                                    }
                                    
                                    // Re-habilitar botones después de confirmar éxito
                                    window.ModalButtons.Habilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Addendums.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Addendums.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Addendums.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar adenda:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Addendums.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalAdenda', '#addendumsGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            // Recargar datos originales
            if (typeof modalAdendaId !== 'undefined' && modalAdendaId) {
                this.CargarDatosAdenda(modalAdendaId);
            }
            
            // Desactivar modo edición
            this.DesactivarModoEdicion();
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
