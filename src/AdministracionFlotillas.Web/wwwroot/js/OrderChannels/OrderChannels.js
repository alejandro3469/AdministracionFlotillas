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
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalCanal === 'function') {
                if (window.mostrarModalCanal()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalCanal');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalCanalObj !== 'undefined') {
                                tooltipModalCanalObj = tooltipElement.ej2_instances[0];
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
                if (typeof window.modalCanalInstance !== 'undefined' && window.modalCanalInstance !== null) {
                    return window.modalCanalInstance;
                }
                var dialogElement = document.getElementById('modalCanal');
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
                        console.log('✅ Modal de canal abierto correctamente después de ' + intentos + ' intentos');
                        window.modalCanalInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalCanal');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalCanalObj = tooltipElement.ej2_instances[0];
                            }
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de canal:', error);
                        window.OrderChannels.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de canal... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de canal no inicializado después de ' + maxIntentos + ' intentos');
                    window.OrderChannels.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idCanal) {
            if (!idCanal || idCanal <= 0) {
                window.OrderChannels.Utilidades.MostrarError('Error', 'ID de canal no válido.');
                return;
            }
            
            if (typeof modalCanalId !== 'undefined') {
                modalCanalId = idCanal;
            }
            if (typeof modalCanalModo !== 'undefined') {
                modalCanalModo = 'editar';
            }
            
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            this.ConvertirCamposAEditables();
            this.ActualizarBotonesModal();
            
            var titulo = document.getElementById('modalCanalTitulo');
            if (titulo && typeof modalCanalId !== 'undefined') {
                titulo.textContent = modalCanalId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            this.ConvertirCamposASoloLectura();
            this.RestaurarBotonesModal();
            
            var titulo = document.getElementById('modalCanalTitulo');
            if (titulo && typeof modalCanalId !== 'undefined') {
                titulo.textContent = modalCanalId;
            }
            
            if (typeof modalCanalModo !== 'undefined') {
                modalCanalModo = 'ver';
            }
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoCanal');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoCanal" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="INACTIVE"' + (estadoActual === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option>' +
                    '<option value="MAINTENANCE"' + (estadoActual === 'MAINTENANCE' ? ' selected' : '') + '>MAINTENANCE</option>' +
                    '</select>';
            }
            
            // Nombre - convertir a input
            var nombreContainer = document.getElementById('modalNombreCanal');
            if (nombreContainer) {
                var nombreActual = nombreContainer.textContent.trim();
                nombreContainer.innerHTML = '<input type="text" id="editNombreCanal" class="form-control form-control-sm" value="' + nombreActual + '">';
            }
            
            // Tipo - convertir a dropdown
            var tipoContainer = document.getElementById('modalTipoCanal');
            if (tipoContainer) {
                var tipoActual = tipoContainer.textContent.trim();
                tipoContainer.innerHTML = '<select id="editTipoCanal" class="form-select form-select-sm">' +
                    '<option value="MOBILE"' + (tipoActual === 'MOBILE' ? ' selected' : '') + '>MOBILE</option>' +
                    '<option value="CALL_CENTER"' + (tipoActual === 'CALL_CENTER' ? ' selected' : '') + '>CALL_CENTER</option>' +
                    '<option value="EMAIL"' + (tipoActual === 'EMAIL' ? ' selected' : '') + '>EMAIL</option>' +
                    '<option value="WEB"' + (tipoActual === 'WEB' ? ' selected' : '') + '>WEB</option>' +
                    '</select>';
            }
            
            // Descripción - convertir a textarea
            var descripcionContainer = document.getElementById('modalDescripcion');
            if (descripcionContainer) {
                var descripcionActual = descripcionContainer.textContent.trim();
                descripcionContainer.innerHTML = '<textarea id="editDescripcion" class="form-control form-control-sm" rows="3">' + descripcionActual + '</textarea>';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoCanal');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoCanal');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-canal" data-field="Estado" data-tooltip="Canal activo y operativo">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'INACTIVE') {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="Estado" data-tooltip="Canal inactivo">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'MAINTENANCE') {
                        estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-canal" data-field="Estado" data-tooltip="Canal en mantenimiento">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="Estado" data-tooltip="Estado desconocido">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Nombre
            var nombreContainer = document.getElementById('modalNombreCanal');
            if (nombreContainer) {
                var inputNombre = document.getElementById('editNombreCanal');
                if (inputNombre) {
                    nombreContainer.textContent = inputNombre.value || '-';
                }
            }
            
            // Tipo - restaurar badge
            var tipoContainer = document.getElementById('modalTipoCanal');
            if (tipoContainer) {
                var selectTipo = document.getElementById('editTipoCanal');
                if (selectTipo) {
                    var tipoSeleccionado = selectTipo.value;
                    var tipoHtml = '';
                    if (tipoSeleccionado === 'MOBILE') {
                        tipoHtml = '<span class="badge bg-primary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Canal móvil (aplicación)">MOBILE</span>';
                    } else if (tipoSeleccionado === 'CALL_CENTER') {
                        tipoHtml = '<span class="badge bg-info info-tooltip-canal" data-field="TipoCanal" data-tooltip="Call center telefónico">CALL_CENTER</span>';
                    } else if (tipoSeleccionado === 'EMAIL') {
                        tipoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Correo electrónico">EMAIL</span>';
                    } else if (tipoSeleccionado === 'WEB') {
                        tipoHtml = '<span class="badge bg-success info-tooltip-canal" data-field="TipoCanal" data-tooltip="Portal web">WEB</span>';
                    } else {
                        tipoHtml = '<span class="badge bg-secondary info-tooltip-canal" data-field="TipoCanal" data-tooltip="Tipo desconocido">' + tipoSeleccionado + '</span>';
                    }
                    tipoContainer.innerHTML = tipoHtml;
                }
            }
            
            // Descripción
            var descripcionContainer = document.getElementById('modalDescripcion');
            if (descripcionContainer) {
                var textareaDescripcion = document.getElementById('editDescripcion');
                if (textareaDescripcion) {
                    descripcionContainer.textContent = textareaDescripcion.value || '-';
                }
            }
        },
        
        ActualizarBotonesModal: function() {
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnEditar) btnEditar.classList.add('d-none');
            if (btnCerrar) btnCerrar.classList.add('d-none');
            
            var btnGuardar = document.getElementById('btnModalGuardar');
            var btnCancelar = document.getElementById('btnModalCancelar');
            
            if (btnGuardar) btnGuardar.classList.remove('d-none');
            if (btnCancelar) btnCancelar.classList.remove('d-none');
        },
        
        RestaurarBotonesModal: function() {
            var btnGuardar = document.getElementById('btnModalGuardar');
            var btnCancelar = document.getElementById('btnModalCancelar');
            
            if (btnGuardar) btnGuardar.classList.add('d-none');
            if (btnCancelar) btnCancelar.classList.add('d-none');
            
            var btnEditar = document.getElementById('btnModalEditar');
            var btnCerrar = document.getElementById('btnModalCerrar');
            
            if (btnEditar) btnEditar.classList.remove('d-none');
            if (btnCerrar) btnCerrar.classList.remove('d-none');
        },
        
        GuardarCambios: function() {
            if (typeof modalCanalId === 'undefined' || !modalCanalId || modalCanalId <= 0) {
                window.OrderChannels.Utilidades.MostrarError('Error', 'No hay canal seleccionado para guardar.');
                return;
            }
            
            var selectEstado = document.getElementById('editEstadoCanal');
            var inputNombre = document.getElementById('editNombreCanal');
            var selectTipo = document.getElementById('editTipoCanal');
            var textareaDescripcion = document.getElementById('editDescripcion');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoNombre = inputNombre ? inputNombre.value.trim() : null;
            var nuevoTipo = selectTipo ? selectTipo.value : null;
            var nuevaDescripcion = textareaDescripcion ? textareaDescripcion.value.trim() : null;
            
            // Validaciones
            if (nuevoEstado && nuevoEstado !== 'ACTIVE' && nuevoEstado !== 'INACTIVE') {
                window.OrderChannels.Utilidades.MostrarError('Error', 'Estado inválido.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
            
            var datosActualizacion = {
                IdCanal: modalCanalId,
                Estado: nuevoEstado,
                NombreCanal: nuevoNombre,
                TipoCanal: nuevoTipo,
                Descripcion: nuevaDescripcion
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/OrderChannels/ActualizarOrderChannel', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.OrderChannels.Utilidades.MostrarExito(
                                    'Canal actualizado',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    if (window.OrderChannels && window.OrderChannels.Modal) {
                                        window.OrderChannels.Modal.DesactivarModoEdicion();
                                        
                                        if (typeof modalCanalId !== 'undefined' && modalCanalId) {
                                            window.OrderChannels.Modal.CargarDatosCanal(modalCanalId);
                                        }
                                        
                                        if (window.OrderChannels && window.OrderChannels.Grid) {
                                            window.OrderChannels.Grid.Recargar();
                                        }
                                    }
                                    
                                    window.ModalButtons.Habilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.OrderChannels.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.OrderChannels.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.OrderChannels.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar canal:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.OrderChannels.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalCanal', '#orderChannelsGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            if (typeof modalCanalId !== 'undefined' && modalCanalId) {
                this.CargarDatosCanal(modalCanalId);
            }
            
            this.DesactivarModoEdicion();
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
