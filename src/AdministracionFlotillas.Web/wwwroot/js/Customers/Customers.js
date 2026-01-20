// Funciones de eventos del Grid (scope global)
window.customersGridCreated = function(args) {
    console.log('Grid de clientes creado, cargando datos...');
    if (window.Customers && window.Customers.Grid) {
        window.Customers.Grid.CargarDatos();
    }
};

window.customersGridRowSelected = function(args) {
    console.log('Cliente seleccionado:', args.data);
};

window.customersGridActionComplete = function(args) {
    if (args.requestType === 'filtering') {
        if (window.Customers && window.Customers.Dashboard) {
            window.Customers.Dashboard.ActualizarMetricas();
        }
    }
};

window.customersGridDataBound = function(args) {
    // Implementar event delegation para los botones de acciones
    var gridElement = document.getElementById('customersGrid');
    if (gridElement) {
        gridElement.removeEventListener('click', handleCustomerActionButtonsClick);
        gridElement.addEventListener('click', handleCustomerActionButtonsClick);
    }
};

function handleCustomerActionButtonsClick(event) {
    var target = event.target.closest('.btn-cabecera-cliente, .btn-comercial-cliente, .btn-contacto-cliente');
    if (target) {
        var idCliente = target.getAttribute('data-id-cliente');
        
        if (idCliente && idCliente !== 'undefined' && idCliente !== 'null') {
            idCliente = parseInt(idCliente, 10);
            
            if (idCliente && !isNaN(idCliente) && idCliente > 0) {
                if (target.classList.contains('btn-cabecera-cliente')) {
                    if (window.Customers && window.Customers.Modal) {
                        window.Customers.Modal.AbrirCabecera(idCliente);
                    }
                } else if (target.classList.contains('btn-comercial-cliente')) {
                    if (window.Customers && window.Customers.Modal) {
                        window.Customers.Modal.AbrirComercial(idCliente);
                    }
                } else if (target.classList.contains('btn-contacto-cliente')) {
                    if (window.Customers && window.Customers.Modal) {
                        window.Customers.Modal.AbrirContacto(idCliente);
                    }
                }
            } else {
                console.error('ID de cliente no válido:', idCliente);
            }
        } else {
            console.error('No se pudo obtener ID de cliente del botón. data-id-cliente:', idCliente);
        }
    }
}

// Evento para manejar clicks en el toolbar
window.customersGridToolbarClick = function(args) {
    var gridElement = document.getElementById('customersGrid');
    if (!gridElement || !gridElement.ej2_instances || !gridElement.ej2_instances[0]) {
        console.warn('Grid no encontrado para exportación');
        return;
    }
    
    var grid = gridElement.ej2_instances[0];
    
    var exportPromise;
    var fileNamePrefix = 'Clientes_' + new Date().toISOString().split('T')[0];

    if (args.item.text === 'Excel Export' || args.item.id && args.item.id.includes('excelexport')) {
        exportPromise = grid.excelExport({
            fileName: fileNamePrefix + '.xlsx'
        });
    } else if (args.item.text === 'Pdf Export' || args.item.id && args.item.id.includes('pdfexport')) {
        exportPromise = grid.pdfExport({
            fileName: fileNamePrefix + '.pdf'
        });
    } else {
        return; // No es un botón de exportación manejado aquí
    }

    if (exportPromise) {
        exportPromise.then(function() {
            window.Customers.Utilidades.MostrarExito('Exportación Exitosa', 'El archivo se ha descargado correctamente.');
        }).catch(function(error) {
            window.Customers.Utilidades.MostrarError('Error de Exportación', 'No se pudo exportar. Por favor, intenta nuevamente.');
            console.error('Error al exportar:', error);
        });
    }
};

// Funciones de eventos para filtros
// Funciones de eventos para filtros con debouncing (300ms) para mejorar rendimiento
window.filtroNombreChange = window.debounce(function(args) {
    if (window.Customers && window.Customers.Filtros) {
        window.Customers.Filtros.Aplicar();
    }
}, 300);

window.filtroEstadoChange = window.debounce(function(args) {
    if (window.Customers && window.Customers.Filtros) {
        window.Customers.Filtros.Aplicar();
    }
}, 300);

// Namespace principal
window.Customers = window.Customers || {};

// Variables globales para el modal (fuera del IIFE para evitar problemas con minificación en strict mode)
var modalClienteId = null;
var modalClienteModo = 'ver';

(function() {
    'use strict';
    
    // Utilidades
    window.Customers.Utilidades = {
        // Funciones de spinner removidas - el Grid usa Shimmer automáticamente
        // Funciones de spinner removidas - el Grid maneja el loading con Shimmer
        
        MostrarError: function(titulo, mensaje) {
            return new Promise((resolve) => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: titulo || 'Error',
                        text: mensaje || 'Ha ocurrido un error.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => resolve()); // Resuelve la promesa cuando el SweetAlert se cierra
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve(); // Resuelve inmediatamente si no hay SweetAlert
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
                    }).then(() => resolve()); // Resuelve la promesa cuando el SweetAlert se cierra
                } else {
                    alert(titulo + ': ' + mensaje);
                    resolve(); // Resuelve inmediatamente si no hay SweetAlert
                }
            });
        }
    };
    
    // Sub-namespace para Grid
    window.Customers.Grid = {
        CargarDatos: function() {
            var gridElement = document.getElementById('customersGrid');
            if (!gridElement) {
                console.warn('Grid element no encontrado');
                return;
            }
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) {
                setTimeout(function() {
                    window.Customers.Grid.CargarDatos();
                }, 500);
                return;
            }
            
            // El Grid maneja el loading automáticamente con Shimmer
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ObtenerCustomers', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                grid.dataSource = respuesta.datos;
                                grid.refresh();
                                console.log('Clientes cargados:', respuesta.datos.length);
                            } else {
                                window.Customers.Utilidades.MostrarError(
                                    'Error al cargar datos',
                                    respuesta.mensaje || 'No se pudieron cargar los clientes.'
                                );
                            }
                        } catch (e) {
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                        console.error('Error al cargar clientes:', xhr.status, xhr.statusText);
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
    window.Customers.Filtros = {
        Aplicar: function() {
            var gridElement = document.getElementById('customersGrid');
            if (!gridElement) return;
            
            var grid = gridElement.ej2_instances && gridElement.ej2_instances[0];
            if (!grid) return;
            
            var filtros = {
                Nombre: this.ObtenerNombre(),
                Estado: this.ObtenerEstado()
            };
            
            // El Grid maneja el loading automáticamente con Shimmer
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/BuscarCustomers', true);
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
                                window.Customers.Utilidades.MostrarError('Error al aplicar filtros', respuesta.mensaje || 'No se pudieron aplicar los filtros.');
                            }
                        } catch (e) {
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error de Conexión', 'Error al conectar con el servidor.');
                        console.error('Error al aplicar filtros:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(JSON.stringify(filtros));
        },
        
        Limpiar: function() {
            var filtroNombre = document.getElementById('filtroNombre');
            if (filtroNombre && filtroNombre.ej2_instances && filtroNombre.ej2_instances[0]) {
                filtroNombre.ej2_instances[0].value = '';
            }
            
            var filtroEstado = document.getElementById('filtroEstado');
            if (filtroEstado && filtroEstado.ej2_instances && filtroEstado.ej2_instances[0]) {
                filtroEstado.ej2_instances[0].value = null;
            }
            
            if (window.Customers && window.Customers.Grid) {
                window.Customers.Grid.CargarDatos();
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
    window.Customers.Dashboard = {
        ActualizarMetricas: function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ObtenerMetricas', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                var datos = respuesta.datos;
                                var total = datos.totalClientes || 0;
                                
                                // Helper function para obtener elemento y establecer texto
                                function setText(id, text) {
                                    var el = document.getElementById(id);
                                    if (el) el.textContent = text;
                                }
                                
                                setText('totalClientes', total);
                                setText('clientesActivos', datos.clientesActivos || 0);
                                setText('clientesInactivos', datos.clientesInactivos || 0);
                                setText('clientesNuevos', datos.clientesNuevos || 0);
                                
                                // Actualizar contador en breadcrumb si existe
                                var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
                                if (breadcrumbContador) {
                                    breadcrumbContador.textContent = total.toString();
                                }
                            }
                        } catch (e) {
                            console.error('Error al parsear métricas:', e);
                        }
                    } else {
                        console.error('Error al actualizar métricas de clientes:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    };
    
    // Sub-namespace para Modal
    window.Customers.Modal = {
        AbrirCabecera: function(idCliente) {
            var id = parseInt(idCliente, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'ID de cliente no válido.');
                return;
            }
            window.modalCabeceraClienteId = id;
            this.CargarDatosCliente(id, 'cabecera');
        },
        
        AbrirComercial: function(idCliente) {
            var id = parseInt(idCliente, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'ID de cliente no válido.');
                return;
            }
            window.modalComercialClienteId = id;
            this.CargarDatosCliente(id, 'comercial');
        },
        
        AbrirContacto: function(idCliente) {
            var id = parseInt(idCliente, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'ID de cliente no válido.');
                return;
            }
            window.modalContactoClienteId = id;
            this.CargarDatosCliente(id, 'contacto');
        },
        
        Abrir: function(idCliente, modo) {
            var id = parseInt(idCliente, 10);
            
            if (!id || isNaN(id) || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'ID de cliente no válido.');
                return;
            }
            
            modalClienteId = id;
            modalClienteModo = modo || 'ver';
            
            this.CargarDatosCliente(id);
        },
        
        CargarDatosCliente: function(idCliente, tipo) {
            var self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ObtenerCustomerPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito && respuesta.datos) {
                                if (tipo === 'cabecera') {
                                    self.MostrarDatosCabecera(respuesta.datos);
                                    self.AbrirDialogCabecera();
                                } else if (tipo === 'comercial') {
                                    self.MostrarDatosComercial(respuesta.datos);
                                    self.AbrirDialogComercial();
                                } else if (tipo === 'contacto') {
                                    self.MostrarDatosContacto(respuesta.datos);
                                    self.AbrirDialogContacto();
                                } else {
                                    self.MostrarDatos(respuesta.datos);
                                    self.AbrirDialog();
                                }
                            } else {
                                window.Customers.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudo cargar el cliente.');
                            }
                        } catch (e) {
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.');
                            console.error('Error al parsear respuesta:', e);
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error de Conexión', 'Error al cargar el cliente.');
                        console.error('Error al cargar cliente:', xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(JSON.stringify(idCliente));
        },
        
        MostrarDatos: function(cliente) {
            // Helper functions para obtener elementos y establecer valores
            function getElement(id) {
                return document.getElementById(id);
            }
            function setText(id, text) {
                var el = getElement(id);
                if (el) el.textContent = text;
            }
            function setHtml(id, html) {
                var el = getElement(id);
                if (el) el.innerHTML = html;
            }
            
            setText('modalClienteTitulo', cliente.IdCliente);
            setText('modalIdCliente', cliente.IdCliente);
            setText('modalNombreCliente', cliente.NombreCliente || '-');
            setHtml('modalEmailCliente', '<i class="fas fa-envelope me-1"></i>' + (cliente.Email || '-'));
            setHtml('modalTelefonoCliente', '<i class="fas fa-phone me-1"></i>' + (cliente.Telefono || '-'));
            
            // Estado con badge y tooltip
            var estadoHtml = '';
            if (cliente.EstadoCliente === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-cliente" data-field="EstadoCliente" data-tooltip="Cliente activo, puede realizar compras y operaciones">' + cliente.EstadoCliente + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-cliente" data-field="EstadoCliente" data-tooltip="Cliente inactivo, bloqueado o suspendido">' + (cliente.EstadoCliente || 'INACTIVE') + '</span>';
            }
            setHtml('modalEstadoCliente', estadoHtml);
            
            // Dirección
            setText('modalDireccionCliente', cliente.Direccion || '-');
            setText('modalCiudadCliente', cliente.Ciudad || '-');
            setText('modalEstadoDireccionCliente', cliente.Estado || '-');
            setText('modalCodigoPostalCliente', cliente.CodigoPostal || '-');
            setText('modalPaisCliente', cliente.Pais || '-');
            
            // Información comercial con iconos mejorados
            var limiteCredito = cliente.LimiteCredito || 0;
            var totalCompras = cliente.TotalCompras || 0;
            var totalOrdenes = cliente.TotalOrdenes || 0;
            
            setHtml('modalLimiteCredito', '<i class="fas fa-credit-card me-1"></i>$' + limiteCredito.toFixed(2));
            setHtml('modalTotalOrdenes', '<i class="fas fa-shopping-cart me-1"></i>' + totalOrdenes);
            setHtml('modalTotalCompras', '<i class="fas fa-dollar-sign me-1"></i>$' + totalCompras.toFixed(2));
            
            // Actualizar ProgressBar de límite de crédito (usando totalCompras como porcentaje)
            var progressBarLimite = document.getElementById('progressBarLimiteCredito');
            if (progressBarLimite && progressBarLimite.ej2_instances && progressBarLimite.ej2_instances[0]) {
                var porcentajeUso = limiteCredito > 0 ? Math.min((totalCompras / limiteCredito) * 100, 100) : 0;
                var progressColor = porcentajeUso > 80 ? '#dc3545' : (porcentajeUso > 50 ? '#ffc107' : '#0d6efd');
                progressBarLimite.ej2_instances[0].value = porcentajeUso;
                progressBarLimite.ej2_instances[0].progressColor = progressColor;
                progressBarLimite.ej2_instances[0].dataBind();
            }
            
            if (cliente.FechaRegistro) {
                setHtml('modalFechaRegistro', '<i class="fas fa-calendar-alt me-1"></i>' + new Date(cliente.FechaRegistro).toLocaleDateString('es-MX'));
            } else {
                setText('modalFechaRegistro', '-');
            }
            
            // Actualizar gráfica de actividad
            setTimeout(function() {
                window.Customers.Modal.ActualizarGraficaActividad(cliente);
            }, 300);
        },
        
        ActualizarGraficaActividad: function(cliente) {
            var chartContainer = document.getElementById('chartActividadCliente');
            if (!chartContainer) return;
            
            // Verificar que ej esté disponible
            if (typeof ej === 'undefined' || !ej.charts || !ej.charts.Chart) {
                console.warn('Syncfusion Charts no está disponible aún, reintentando...');
                setTimeout(function() {
                    window.Customers.Modal.ActualizarGraficaActividad(cliente);
                }, 500);
                return;
            }
            
            var totalOrdenes = cliente.TotalOrdenes || 0;
            var totalCompras = cliente.TotalCompras || 0;
            var limiteCredito = cliente.LimiteCredito || 0;
            
            // Destruir gráfica anterior si existe
            if (chartContainer.ej2_instances && chartContainer.ej2_instances[0]) {
                chartContainer.ej2_instances[0].destroy();
            }
            
            // Crear gráfica de barras para actividad comercial
            var chart = new ej.charts.Chart({
                primaryXAxis: {
                    valueType: 'Category'
                },
                primaryYAxis: {
                    title: 'Valor'
                },
                series: [{
                    type: 'Column',
                    dataSource: [
                        { concepto: 'Órdenes', valor: totalOrdenes },
                        { concepto: 'Compras ($)', valor: totalCompras / 1000 }, // Dividir por 1000 para mejor visualización
                        { concepto: 'Límite ($)', valor: limiteCredito / 1000 }
                    ],
                    xName: 'concepto',
                    yName: 'valor',
                    name: 'Actividad',
                    marker: {
                        dataLabel: {
                            visible: true,
                            position: 'Top'
                        }
                    }
                }],
                tooltip: {
                    enable: true
                },
                legendSettings: {
                    visible: false
                },
                height: '200px',
                width: '100%'
            });
            
            chart.appendTo('#chartActividadCliente');
        },
        
        AbrirDialog: function() {
            // SOLUCIÓN SIMPLE: Usar la función helper global
            // Primero intentar usar la función helper simple
            if (typeof window.mostrarModalCliente === 'function') {
                if (window.mostrarModalCliente()) {
                    console.log('✅ Modal abierto usando función helper');
                    
                    // Reinicializar tooltip después de abrir el modal
                    setTimeout(function() {
                        var tooltipElement = document.getElementById('tooltipModalCliente');
                        if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                            if (typeof tooltipModalClienteObj !== 'undefined') {
                                tooltipModalClienteObj = tooltipElement.ej2_instances[0];
                            }
                        }
                    }, 100);
                    return;
                }
            }
            
            // Si la función helper no está disponible o falló, usar el método robusto anterior
            var self = this;
            var intentos = 0;
            var maxIntentos = 50; // 5 segundos
            var intervaloEspera = 100;
            
            function obtenerInstancia() {
                // Prioridad 1: Instancia guardada en window.modalClienteInstance
                if (typeof window.modalClienteInstance !== 'undefined' && window.modalClienteInstance !== null) {
                    return window.modalClienteInstance;
                }
                
                // Prioridad 2: Instancia del DOM
                var dialogElement = document.getElementById('modalCliente');
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
                        console.log('✅ Modal abierto correctamente después de ' + intentos + ' intentos');
                        
                        // Guardar instancia para uso futuro
                        window.modalClienteInstance = dialogInstance;
                        
                        // Reinicializar tooltip después de abrir el modal
                        setTimeout(function() {
                            var tooltipElement = document.getElementById('tooltipModalCliente');
                            if (tooltipElement && tooltipElement.ej2_instances && tooltipElement.ej2_instances[0]) {
                                if (typeof tooltipModalClienteObj !== 'undefined') {
                                    tooltipModalClienteObj = tooltipElement.ej2_instances[0];
                                }
                            }
                        }, 100);
                        return; // Éxito, salir
                    } catch (error) {
                        console.error('❌ Error al abrir modal:', error);
                        window.Customers.Utilidades.MostrarError('Error', 'No se pudo abrir el modal: ' + error.message);
                        return; // Error, salir
                    }
                }
                
                // Si no hay instancia disponible, seguir intentando
                if (intentos < maxIntentos) {
                    if (intentos % 10 === 0) {
                        console.log('⏳ Esperando inicialización del modal... Intento ' + intentos + '/' + maxIntentos);
                    }
                    setTimeout(intentarAbrir, intervaloEspera);
                } else {
                    console.error('❌ Modal no inicializado después de ' + maxIntentos + ' intentos');
                    window.Customers.Utilidades.MostrarError('Error', 'El modal no está disponible. Por favor, recarga la página.');
                }
            }
            
            // Iniciar intentos después de un pequeño delay
            setTimeout(intentarAbrir, 50);
        },
        
        CambiarAModoEdicion: function(idCliente) {
            if (!idCliente || idCliente <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'ID de cliente no válido.');
                return;
            }
            
            modalClienteId = idCliente;
            modalClienteModo = 'editar';
            
            // Cambiar modo del modal
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            // Cambiar campos de solo lectura a editables
            this.ConvertirCamposAEditables();
            
            // Cambiar botones del modal
            this.ActualizarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalClienteTitulo');
            if (titulo) {
                titulo.textContent = modalClienteId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            // Restaurar campos a solo lectura
            this.ConvertirCamposASoloLectura();
            
            // Restaurar botones del modal
            this.RestaurarBotonesModal();
            
            // Actualizar header del modal
            var titulo = document.getElementById('modalClienteTitulo');
            if (titulo) {
                titulo.textContent = modalClienteId;
            }
            
            modalClienteModo = 'ver';
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoCliente');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoCliente" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="INACTIVE"' + (estadoActual === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option>' +
                    '</select>';
            }
            
            // Email - convertir a input
            var emailContainer = document.getElementById('modalEmailCliente');
            if (emailContainer) {
                var emailActual = emailContainer.textContent.trim();
                emailContainer.innerHTML = '<input type="email" id="editEmailCliente" class="form-control form-control-sm" value="' + emailActual + '">';
            }
            
            // Teléfono - convertir a input
            var telefonoContainer = document.getElementById('modalTelefonoCliente');
            if (telefonoContainer) {
                var telefonoActual = telefonoContainer.textContent.trim();
                telefonoContainer.innerHTML = '<input type="tel" id="editTelefonoCliente" class="form-control form-control-sm" value="' + telefonoActual + '">';
            }
            
            // Dirección - convertir a input
            var direccionContainer = document.getElementById('modalDireccionCliente');
            if (direccionContainer) {
                var direccionActual = direccionContainer.textContent.trim();
                direccionContainer.innerHTML = '<input type="text" id="editDireccionCliente" class="form-control form-control-sm" value="' + direccionActual + '">';
            }
            
            // Ciudad - convertir a input
            var ciudadContainer = document.getElementById('modalCiudadCliente');
            if (ciudadContainer) {
                var ciudadActual = ciudadContainer.textContent.trim();
                ciudadContainer.innerHTML = '<input type="text" id="editCiudadCliente" class="form-control form-control-sm" value="' + ciudadActual + '">';
            }
            
            // Estado (dirección) - convertir a input
            var estadoDirContainer = document.getElementById('modalEstadoDireccionCliente');
            if (estadoDirContainer) {
                var estadoDirActual = estadoDirContainer.textContent.trim();
                estadoDirContainer.innerHTML = '<input type="text" id="editEstadoDireccionCliente" class="form-control form-control-sm" value="' + estadoDirActual + '">';
            }
            
            // Código Postal - convertir a input
            var codigoPostalContainer = document.getElementById('modalCodigoPostalCliente');
            if (codigoPostalContainer) {
                var codigoPostalActual = codigoPostalContainer.textContent.trim();
                codigoPostalContainer.innerHTML = '<input type="text" id="editCodigoPostalCliente" class="form-control form-control-sm" value="' + codigoPostalActual + '">';
            }
            
            // País - convertir a input
            var paisContainer = document.getElementById('modalPaisCliente');
            if (paisContainer) {
                var paisActual = paisContainer.textContent.trim();
                paisContainer.innerHTML = '<input type="text" id="editPaisCliente" class="form-control form-control-sm" value="' + paisActual + '">';
            }
            
            // Límite de Crédito - convertir a input numérico
            var limiteContainer = document.getElementById('modalLimiteCredito');
            if (limiteContainer) {
                var limiteActual = limiteContainer.textContent.replace('$', '').replace(',', '').trim();
                limiteContainer.innerHTML = '<input type="number" id="editLimiteCredito" class="form-control form-control-sm" step="0.01" min="0" value="' + limiteActual + '">';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoCliente');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoCliente');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-cliente" data-field="EstadoCliente" data-tooltip="Cliente activo, puede realizar compras y operaciones">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-cliente" data-field="EstadoCliente" data-tooltip="Cliente inactivo, bloqueado o suspendido">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Email - restaurar texto
            var emailContainer = document.getElementById('modalEmailCliente');
            if (emailContainer) {
                var inputEmail = document.getElementById('editEmailCliente');
                if (inputEmail) {
                    emailContainer.textContent = inputEmail.value || '-';
                }
            }
            
            // Teléfono - restaurar texto
            var telefonoContainer = document.getElementById('modalTelefonoCliente');
            if (telefonoContainer) {
                var inputTelefono = document.getElementById('editTelefonoCliente');
                if (inputTelefono) {
                    telefonoContainer.textContent = inputTelefono.value || '-';
                }
            }
            
            // Dirección - restaurar texto
            var direccionContainer = document.getElementById('modalDireccionCliente');
            if (direccionContainer) {
                var inputDireccion = document.getElementById('editDireccionCliente');
                if (inputDireccion) {
                    direccionContainer.textContent = inputDireccion.value || '-';
                }
            }
            
            // Ciudad - restaurar texto
            var ciudadContainer = document.getElementById('modalCiudadCliente');
            if (ciudadContainer) {
                var inputCiudad = document.getElementById('editCiudadCliente');
                if (inputCiudad) {
                    ciudadContainer.textContent = inputCiudad.value || '-';
                }
            }
            
            // Estado (dirección) - restaurar texto
            var estadoDirContainer = document.getElementById('modalEstadoDireccionCliente');
            if (estadoDirContainer) {
                var inputEstadoDir = document.getElementById('editEstadoDireccionCliente');
                if (inputEstadoDir) {
                    estadoDirContainer.textContent = inputEstadoDir.value || '-';
                }
            }
            
            // Código Postal - restaurar texto
            var codigoPostalContainer = document.getElementById('modalCodigoPostalCliente');
            if (codigoPostalContainer) {
                var inputCodigoPostal = document.getElementById('editCodigoPostalCliente');
                if (inputCodigoPostal) {
                    codigoPostalContainer.textContent = inputCodigoPostal.value || '-';
                }
            }
            
            // País - restaurar texto
            var paisContainer = document.getElementById('modalPaisCliente');
            if (paisContainer) {
                var inputPais = document.getElementById('editPaisCliente');
                if (inputPais) {
                    paisContainer.textContent = inputPais.value || '-';
                }
            }
            
            // Límite de Crédito - restaurar formato
            var limiteContainer = document.getElementById('modalLimiteCredito');
            if (limiteContainer) {
                var inputLimite = document.getElementById('editLimiteCredito');
                if (inputLimite) {
                    var limiteValue = parseFloat(inputLimite.value) || 0;
                    limiteContainer.textContent = '$' + limiteValue.toFixed(2);
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
            if (!modalClienteId || modalClienteId <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'No hay cliente seleccionado para guardar.');
                return;
            }
            
            // Obtener valores editados
            var selectEstado = document.getElementById('editEstadoCliente');
            var inputEmail = document.getElementById('editEmailCliente');
            var inputTelefono = document.getElementById('editTelefonoCliente');
            var inputDireccion = document.getElementById('editDireccionCliente');
            var inputCiudad = document.getElementById('editCiudadCliente');
            var inputEstadoDir = document.getElementById('editEstadoDireccionCliente');
            var inputCodigoPostal = document.getElementById('editCodigoPostalCliente');
            var inputPais = document.getElementById('editPaisCliente');
            var inputLimite = document.getElementById('editLimiteCredito');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoEmail = inputEmail ? inputEmail.value.trim() : null;
            var nuevoTelefono = inputTelefono ? inputTelefono.value.trim() : null;
            var nuevaDireccion = inputDireccion ? inputDireccion.value.trim() : null;
            var nuevaCiudad = inputCiudad ? inputCiudad.value.trim() : null;
            var nuevoEstadoDir = inputEstadoDir ? inputEstadoDir.value.trim() : null;
            var nuevoCodigoPostal = inputCodigoPostal ? inputCodigoPostal.value.trim() : null;
            var nuevoPais = inputPais ? inputPais.value.trim() : null;
            var nuevoLimite = inputLimite ? parseFloat(inputLimite.value) : null;
            
            // Validaciones
            if (nuevoEmail && !nuevoEmail.includes('@')) {
                window.Customers.Utilidades.MostrarError('Error', 'El formato de email no es válido.');
                return;
            }
            
            if (nuevoLimite !== null && nuevoLimite < 0) {
                window.Customers.Utilidades.MostrarError('Error', 'El límite de crédito no puede ser negativo.');
                return;
            }
            
            // Deshabilitar botones antes de enviar
            window.ModalButtons.Deshabilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
            
            // Preparar datos para enviar
            var datosActualizacion = {
                IdCliente: modalClienteId,
                EstadoCliente: nuevoEstado,
                Email: nuevoEmail,
                Telefono: nuevoTelefono,
                Direccion: nuevaDireccion,
                Ciudad: nuevaCiudad,
                Estado: nuevoEstadoDir,
                CodigoPostal: nuevoCodigoPostal,
                Pais: nuevoPais,
                LimiteCredito: nuevoLimite
            };
            
            // Enviar al servidor
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ActualizarCustomer', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                // Mostrar mensaje de éxito y esperar confirmación
                                window.Customers.Utilidades.MostrarExito(
                                    'Cliente actualizado',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    // Desactivar modo edición
                                    if (window.Customers && window.Customers.Modal) {
                                        window.Customers.Modal.DesactivarModoEdicion();
                                        
                                        // Recargar datos del cliente
                                        window.Customers.Modal.CargarDatosCliente(modalClienteId);
                                        
                                        // Recargar grid
                                        if (window.Customers && window.Customers.Grid) {
                                            window.Customers.Grid.Recargar();
                                        }
                                    }
                                    
                                    // Re-habilitar botones después de confirmar éxito
                                    window.ModalButtons.Habilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Customers.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Customers.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar cliente:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Customers.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            // Recargar datos originales
            if (modalClienteId) {
                this.CargarDatosCliente(modalClienteId);
            }
            
            // Desactivar modo edición
            this.DesactivarModoEdicion();
        },
        
        GuardarCabecera: function() {
            var id = (typeof window.modalCabeceraClienteId !== 'undefined' && window.modalCabeceraClienteId) 
                ? window.modalCabeceraClienteId 
                : (typeof modalCabeceraClienteId !== 'undefined' ? modalCabeceraClienteId : null);
            if (!id || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'No hay cliente seleccionado.');
                return;
            }
            
            var datos = {
                IdCliente: id,
                NombreCliente: document.getElementById('modalCabeceraNombreCliente').value.trim(),
                EstadoCliente: document.getElementById('modalCabeceraEstadoCliente').value,
                FechaRegistro: document.getElementById('modalCabeceraFechaRegistro').value
            };
            
            if (!datos.NombreCliente) {
                window.Customers.Utilidades.MostrarError('Error', 'El nombre del cliente es requerido.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalCabeceraCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ActualizarCustomer', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Customers.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalCabeceraCliente();
                                    if (window.Customers && window.Customers.Grid) {
                                        window.Customers.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalCabeceraCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Customers.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalCabeceraCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalCabeceraCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalCabeceraCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarComercial: function() {
            var id = (typeof window.modalComercialClienteId !== 'undefined' && window.modalComercialClienteId) 
                ? window.modalComercialClienteId 
                : (typeof modalComercialClienteId !== 'undefined' ? modalComercialClienteId : null);
            if (!id || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'No hay cliente seleccionado.');
                return;
            }
            
            var limiteCredito = parseFloat(document.getElementById('modalComercialLimiteCredito').value);
            if (isNaN(limiteCredito) || limiteCredito < 0) {
                window.Customers.Utilidades.MostrarError('Error', 'El límite de crédito debe ser un número válido mayor o igual a 0.');
                return;
            }
            
            var datos = {
                IdCliente: id,
                LimiteCredito: limiteCredito
            };
            
            window.ModalButtons.Deshabilitar('modalComercialCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ActualizarCustomer', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Customers.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalComercialCliente();
                                    if (window.Customers && window.Customers.Grid) {
                                        window.Customers.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalComercialCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Customers.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalComercialCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalComercialCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalComercialCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarContacto: function() {
            var id = (typeof window.modalContactoClienteId !== 'undefined' && window.modalContactoClienteId) 
                ? window.modalContactoClienteId 
                : (typeof modalContactoClienteId !== 'undefined' ? modalContactoClienteId : null);
            if (!id || id <= 0) {
                window.Customers.Utilidades.MostrarError('Error', 'No hay cliente seleccionado.');
                return;
            }
            
            var email = document.getElementById('modalContactoEmailCliente').value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                window.Customers.Utilidades.MostrarError('Error', 'El email no es válido.');
                return;
            }
            
            var datos = {
                IdCliente: id,
                Email: email,
                Telefono: document.getElementById('modalContactoTelefonoCliente').value.trim(),
                Direccion: document.getElementById('modalContactoDireccion').value.trim(),
                Ciudad: document.getElementById('modalContactoCiudad').value.trim(),
                Estado: document.getElementById('modalContactoEstado').value.trim(),
                CodigoPostal: document.getElementById('modalContactoCodigoPostal').value.trim(),
                Pais: document.getElementById('modalContactoPais').value.trim()
            };
            
            window.ModalButtons.Deshabilitar('modalContactoCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Customers/ActualizarCustomer', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Customers.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalContactoCliente();
                                    if (window.Customers && window.Customers.Grid) {
                                        window.Customers.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalContactoCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Customers.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalContactoCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Customers.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalContactoCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Customers.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalContactoCliente', '#customersGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        }
    };
    
    // Sub-namespace para Detalles
    window.Customers.Detalles = {
        Ver: function(idCliente) {
            window.Customers.Modal.Abrir(idCliente, 'ver');
        }
    };
    
    // Sub-namespace para Edición
    window.Customers.Edicion = {
        Editar: function(idCliente) {
            window.Customers.Modal.Abrir(idCliente, 'editar');
        }
    };
    
})();
