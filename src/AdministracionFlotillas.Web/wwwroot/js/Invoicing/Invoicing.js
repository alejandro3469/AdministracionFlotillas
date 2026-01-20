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
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalFactura === 'function') {
                if (window.mostrarModalFactura()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalFactura');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalFacturaObj !== 'undefined') {
                                tooltipModalFacturaObj = tooltipElement.ej2_instances[0];
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
                if (typeof window.modalFacturaInstance !== 'undefined' && window.modalFacturaInstance !== null) {
                    return window.modalFacturaInstance;
                }
                var dialogElement = document.getElementById('modalFactura');
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
                        console.log('✅ Modal de factura abierto correctamente después de ' + intentos + ' intentos');
                        window.modalFacturaInstance = dialogInstance;
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalFactura');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                tooltipModalFacturaObj = tooltipElement.ej2_instances[0];
                            }
                        }, 100);
                        return;
                    } catch (error) {
                        console.error('❌ Error al abrir modal de factura:', error);
                        window.Invoicing.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return;
                    }
                }
                
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal de factura... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal de factura no inicializado después de ' + maxIntentos + ' intentos');
                    window.Invoicing.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idFactura) {
            if (!idFactura || idFactura <= 0) {
                window.Invoicing.Utilidades.MostrarError('Error', 'ID de factura no válido.');
                return;
            }
            
            if (typeof modalFacturaId !== 'undefined') {
                modalFacturaId = idFactura;
            }
            if (typeof modalFacturaModo !== 'undefined') {
                modalFacturaModo = 'editar';
            }
            
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            this.ConvertirCamposAEditables();
            this.ActualizarBotonesModal();
            
            var titulo = document.getElementById('modalFacturaTitulo');
            if (titulo && typeof modalFacturaId !== 'undefined') {
                titulo.textContent = modalFacturaId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            this.ConvertirCamposASoloLectura();
            this.RestaurarBotonesModal();
            
            var titulo = document.getElementById('modalFacturaTitulo');
            if (titulo && typeof modalFacturaId !== 'undefined') {
                titulo.textContent = modalFacturaId;
            }
            
            if (typeof modalFacturaModo !== 'undefined') {
                modalFacturaModo = 'ver';
            }
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown (solo si no está timbrada)
            var estadoContainer = document.getElementById('modalEstadoFactura');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                var puedeEditar = estadoActual !== 'STAMPED';
                
                if (puedeEditar) {
                    estadoContainer.innerHTML = '<select id="editEstadoFactura" class="form-select form-select-sm">' +
                        '<option value="DRAFT"' + (estadoActual === 'DRAFT' ? ' selected' : '') + '>DRAFT</option>' +
                        '<option value="STAMPED"' + (estadoActual === 'STAMPED' ? ' selected' : '') + '>STAMPED</option>' +
                        '<option value="CANCELLED"' + (estadoActual === 'CANCELLED' ? ' selected' : '') + '>CANCELLED</option>' +
                        '<option value="PAID"' + (estadoActual === 'PAID' ? ' selected' : '') + '>PAID</option>' +
                        '</select>';
                }
            }
            
            // Método de Pago - convertir a dropdown
            var metodoPagoContainer = document.getElementById('modalMetodoPago');
            if (metodoPagoContainer) {
                var metodoActual = metodoPagoContainer.textContent.trim();
                metodoPagoContainer.innerHTML = '<select id="editMetodoPago" class="form-select form-select-sm">' +
                    '<option value="PUE"' + (metodoActual === 'PUE' ? ' selected' : '') + '>PUE (Pago en una exhibición)</option>' +
                    '<option value="PPD"' + (metodoActual === 'PPD' ? ' selected' : '') + '>PPD (Pago en parcialidades o diferido)</option>' +
                    '</select>';
            }
            
            // Forma de Pago - convertir a input
            var formaPagoContainer = document.getElementById('modalFormaPago');
            if (formaPagoContainer) {
                var formaActual = formaPagoContainer.textContent.trim();
                formaPagoContainer.innerHTML = '<input type="text" id="editFormaPago" class="form-control form-control-sm" value="' + formaActual + '" placeholder="Código SAT (ej: 03)">';
            }
            
            // Motivo Cancelación - convertir a textarea
            var motivoContainer = document.getElementById('modalMotivoCancelacion');
            if (motivoContainer) {
                var motivoActual = motivoContainer.textContent.trim();
                motivoContainer.innerHTML = '<textarea id="editMotivoCancelacion" class="form-control form-control-sm" rows="2">' + motivoActual + '</textarea>';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoFactura');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoFactura');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'STAMPED') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-factura" data-field="Estado" data-tooltip="Factura timbrada y válida">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'DRAFT') {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-factura" data-field="Estado" data-tooltip="Factura en borrador">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'CANCELLED') {
                        estadoHtml = '<span class="badge bg-danger info-tooltip-factura" data-field="Estado" data-tooltip="Factura cancelada">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'PAID') {
                        estadoHtml = '<span class="badge bg-info info-tooltip-factura" data-field="Estado" data-tooltip="Factura pagada">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-factura" data-field="Estado" data-tooltip="Estado desconocido">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Método de Pago
            var metodoPagoContainer = document.getElementById('modalMetodoPago');
            if (metodoPagoContainer) {
                var selectMetodo = document.getElementById('editMetodoPago');
                if (selectMetodo) {
                    metodoPagoContainer.textContent = selectMetodo.value || '-';
                }
            }
            
            // Forma de Pago
            var formaPagoContainer = document.getElementById('modalFormaPago');
            if (formaPagoContainer) {
                var inputForma = document.getElementById('editFormaPago');
                if (inputForma) {
                    formaPagoContainer.textContent = inputForma.value || '-';
                }
            }
            
            // Motivo Cancelación
            var motivoContainer = document.getElementById('modalMotivoCancelacion');
            if (motivoContainer) {
                var textareaMotivo = document.getElementById('editMotivoCancelacion');
                if (textareaMotivo) {
                    motivoContainer.textContent = textareaMotivo.value || '-';
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
            if (typeof modalFacturaId === 'undefined' || !modalFacturaId || modalFacturaId <= 0) {
                window.Invoicing.Utilidades.MostrarError('Error', 'No hay factura seleccionada para guardar.');
                return;
            }
            
            var selectEstado = document.getElementById('editEstadoFactura');
            var selectMetodo = document.getElementById('editMetodoPago');
            var inputForma = document.getElementById('editFormaPago');
            var textareaMotivo = document.getElementById('editMotivoCancelacion');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoMetodo = selectMetodo ? selectMetodo.value : null;
            var nuevaForma = inputForma ? inputForma.value.trim() : null;
            var nuevoMotivo = textareaMotivo ? textareaMotivo.value.trim() : null;
            
            // Validaciones
            if (nuevoEstado && nuevoEstado !== 'DRAFT' && nuevoEstado !== 'STAMPED' && 
                nuevoEstado !== 'CANCELLED' && nuevoEstado !== 'PAID' && nuevoEstado !== 'PENDING') {
                window.Invoicing.Utilidades.MostrarError('Error', 'Estado inválido.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
            
            var datosActualizacion = {
                IdFactura: modalFacturaId,
                Estado: nuevoEstado,
                MetodoPago: nuevoMetodo,
                FormaPago: nuevaForma,
                MotivoCancelacion: nuevoMotivo
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoicing/ActualizarInvoice', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Invoicing.Utilidades.MostrarExito(
                                    'Factura actualizada',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    if (window.Invoicing && window.Invoicing.Modal) {
                                        window.Invoicing.Modal.DesactivarModoEdicion();
                                        
                                        if (typeof modalFacturaId !== 'undefined' && modalFacturaId) {
                                            window.Invoicing.Modal.CargarDatosFactura(modalFacturaId);
                                        }
                                        
                                        if (window.Invoicing && window.Invoicing.Grid) {
                                            window.Invoicing.Grid.Recargar();
                                        }
                                    }
                                    
                                    window.ModalButtons.Habilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Invoicing.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Invoicing.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Invoicing.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar factura:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Invoicing.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalFactura', '#invoicesGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            if (typeof modalFacturaId !== 'undefined' && modalFacturaId) {
                this.CargarDatosFactura(modalFacturaId);
            }
            
            this.DesactivarModoEdicion();
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
