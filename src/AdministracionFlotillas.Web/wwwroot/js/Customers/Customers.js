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
    var target = event.target.closest('.btn-ver-cliente, .btn-editar-cliente');
    if (target) {
        var idCliente = target.getAttribute('data-id-cliente');
        
        if (idCliente && idCliente !== 'undefined' && idCliente !== 'null') {
            idCliente = parseInt(idCliente, 10);
            
            if (idCliente && !isNaN(idCliente) && idCliente > 0) {
                if (target.classList.contains('btn-ver-cliente')) {
                    if (window.Customers && window.Customers.Modal) {
                        window.Customers.Modal.Abrir(idCliente, 'ver');
                    } else {
                        console.error('Customers.Modal no está disponible');
                    }
                } else if (target.classList.contains('btn-editar-cliente')) {
                    if (window.Customers && window.Customers.Modal) {
                        window.Customers.Modal.Abrir(idCliente, 'editar');
                    } else {
                        console.error('Customers.Modal no está disponible');
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
window.filtroNombreChange = function(args) {
    if (window.Customers && window.Customers.Filtros) {
        window.Customers.Filtros.Aplicar();
    }
};

window.filtroEstadoChange = function(args) {
    if (window.Customers && window.Customers.Filtros) {
        window.Customers.Filtros.Aplicar();
    }
};

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
        
        CargarDatosCliente: function(idCliente) {
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
                                self.MostrarDatos(respuesta.datos);
                                self.AbrirDialog();
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
            setText('modalEmailCliente', cliente.Email || '-');
            setText('modalTelefonoCliente', cliente.Telefono || '-');
            
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
            
            // Información comercial
            setText('modalLimiteCredito', '$' + (cliente.LimiteCredito || 0).toFixed(2));
            setText('modalTotalOrdenes', cliente.TotalOrdenes || 0);
            setText('modalTotalCompras', '$' + (cliente.TotalCompras || 0).toFixed(2));
            
            if (cliente.FechaRegistro) {
                setText('modalFechaRegistro', new Date(cliente.FechaRegistro).toLocaleDateString('es-MX'));
            } else {
                setText('modalFechaRegistro', '-');
            }
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
            // TODO: Implementar modo edición
            window.Customers.Utilidades.MostrarExito('Modo Edición', 'El modo edición se implementará próximamente.');
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
