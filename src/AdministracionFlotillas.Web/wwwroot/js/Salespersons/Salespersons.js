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
                                // Formatear con separadores de miles
                                var totalVentas = parseFloat(datos.totalVentas || 0);
                                document.getElementById('totalVentas').textContent = '$' + totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                var totalComisiones = parseFloat(datos.totalComisiones || 0);
                                document.getElementById('totalComisiones').textContent = '$' + totalComisiones.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                
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
        AbrirCabecera: function(idVendedor) {
            var id = parseInt(idVendedor, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'ID de vendedor no válido.');
                return;
            }
            window.modalCabeceraVendedorId = id;
            if (typeof modalCabeceraVendedorId !== 'undefined') {
                modalCabeceraVendedorId = id;
            }
            this.CargarDatosVendedor(id, 'cabecera');
        },
        
        AbrirComercial: function(idVendedor) {
            var id = parseInt(idVendedor, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'ID de vendedor no válido.');
                return;
            }
            window.modalComercialVendedorId = id;
            if (typeof modalComercialVendedorId !== 'undefined') {
                modalComercialVendedorId = id;
            }
            this.CargarDatosVendedor(id, 'comercial');
        },
        
        AbrirContacto: function(idVendedor) {
            var id = parseInt(idVendedor, 10);
            if (!id || isNaN(id) || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'ID de vendedor no válido.');
                return;
            }
            window.modalContactoVendedorId = id;
            if (typeof modalContactoVendedorId !== 'undefined') {
                modalContactoVendedorId = id;
            }
            this.CargarDatosVendedor(id, 'contacto');
        },
        
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
        
        CargarDatosVendedor: function(idVendedor, tipo) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ObtenerSalespersonPorId', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var self = this;
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
        
        MostrarDatosCabecera: function(vendedor) {
            document.getElementById('modalCabeceraVendedorTitulo').textContent = vendedor.IdVendedor;
            document.getElementById('modalCabeceraIdVendedor').value = vendedor.IdVendedor;
            document.getElementById('modalCabeceraNombreCompleto').value = vendedor.NombreCompleto || '';
            document.getElementById('modalCabeceraEstado').value = vendedor.Estado || 'ACTIVE';
            
            if (vendedor.FechaContratacion) {
                var fecha = new Date(vendedor.FechaContratacion);
                var fechaStr = fecha.toISOString().split('T')[0];
                document.getElementById('modalCabeceraFechaContratacion').value = fechaStr;
            }
        },
        
        MostrarDatosComercial: function(vendedor) {
            document.getElementById('modalComercialVendedorTitulo').textContent = vendedor.IdVendedor;
            document.getElementById('modalComercialComisionBase').value = vendedor.ComisionBase || 0;
            document.getElementById('modalComercialComisionVariable').value = vendedor.ComisionVariable || 0;
            document.getElementById('modalComercialTotalOrdenes').value = vendedor.TotalOrdenes || 0;
            document.getElementById('modalComercialTotalVentas').value = '$' + (vendedor.TotalVentas || 0).toFixed(2);
            document.getElementById('modalComercialTotalComisiones').value = '$' + (vendedor.TotalComisiones || 0).toFixed(2);
        },
        
        MostrarDatosContacto: function(vendedor) {
            document.getElementById('modalContactoVendedorTitulo').textContent = vendedor.IdVendedor;
            document.getElementById('modalContactoEmail').value = vendedor.Email || '';
            document.getElementById('modalContactoTelefono').value = vendedor.Telefono || '';
            document.getElementById('modalContactoZonaCobertura').value = vendedor.ZonaCobertura || '';
        },
        
        AbrirDialogCabecera: function() {
            if (typeof window.mostrarModalCabeceraVendedor === 'function') {
                window.mostrarModalCabeceraVendedor();
            }
        },
        
        AbrirDialogComercial: function() {
            if (typeof window.mostrarModalComercialVendedor === 'function') {
                window.mostrarModalComercialVendedor();
            }
        },
        
        AbrirDialogContacto: function() {
            if (typeof window.mostrarModalContactoVendedor === 'function') {
                window.mostrarModalContactoVendedor();
            }
        },
        
        GuardarCabecera: function() {
            var id = (typeof window.modalCabeceraVendedorId !== 'undefined' && window.modalCabeceraVendedorId) 
                ? window.modalCabeceraVendedorId 
                : (typeof modalCabeceraVendedorId !== 'undefined' ? modalCabeceraVendedorId : null);
            if (!id || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'No hay vendedor seleccionado.');
                return;
            }
            
            var datos = {
                IdVendedor: id,
                NombreCompleto: document.getElementById('modalCabeceraNombreCompleto').value.trim(),
                Estado: document.getElementById('modalCabeceraEstado').value,
                FechaContratacion: document.getElementById('modalCabeceraFechaContratacion').value
            };
            
            if (!datos.NombreCompleto) {
                window.Salespersons.Utilidades.MostrarError('Error', 'El nombre completo es requerido.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalCabeceraVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ActualizarSalesperson', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Salespersons.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalCabeceraVendedor();
                                    if (window.Salespersons && window.Salespersons.Grid) {
                                        window.Salespersons.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalCabeceraVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Salespersons.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalCabeceraVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalCabeceraVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Salespersons.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalCabeceraVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarComercial: function() {
            var id = typeof modalComercialVendedorId !== 'undefined' ? modalComercialVendedorId : null;
            if (!id || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'No hay vendedor seleccionado.');
                return;
            }
            
            var comisionBase = parseFloat(document.getElementById('modalComercialComisionBase').value);
            var comisionVar = parseFloat(document.getElementById('modalComercialComisionVariable').value);
            
            if (isNaN(comisionBase) || comisionBase < 0 || comisionBase > 100) {
                window.Salespersons.Utilidades.MostrarError('Error', 'La comisión base debe ser un número entre 0 y 100.');
                return;
            }
            
            if (isNaN(comisionVar) || comisionVar < 0 || comisionVar > 100) {
                window.Salespersons.Utilidades.MostrarError('Error', 'La comisión variable debe ser un número entre 0 y 100.');
                return;
            }
            
            var datos = {
                IdVendedor: id,
                ComisionBase: comisionBase,
                ComisionVariable: comisionVar
            };
            
            window.ModalButtons.Deshabilitar('modalComercialVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ActualizarSalesperson', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Salespersons.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalComercialVendedor();
                                    if (window.Salespersons && window.Salespersons.Grid) {
                                        window.Salespersons.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalComercialVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Salespersons.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalComercialVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalComercialVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Salespersons.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalComercialVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        GuardarContacto: function() {
            var id = typeof modalContactoVendedorId !== 'undefined' ? modalContactoVendedorId : null;
            if (!id || id <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'No hay vendedor seleccionado.');
                return;
            }
            
            var email = document.getElementById('modalContactoEmail').value.trim();
            var telefono = document.getElementById('modalContactoTelefono').value.trim();
            var zona = document.getElementById('modalContactoZonaCobertura').value;
            
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                window.Salespersons.Utilidades.MostrarError('Error', 'El email no es válido.');
                return;
            }
            
            var datos = {
                IdVendedor: id,
                Email: email,
                Telefono: telefono,
                ZonaCobertura: zona
            };
            
            window.ModalButtons.Deshabilitar('modalContactoVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ActualizarSalesperson', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Salespersons.Utilidades.MostrarExito('Información actualizada', 'Los cambios se guardaron correctamente.').then(function() {
                                    window.ocultarModalContactoVendedor();
                                    if (window.Salespersons && window.Salespersons.Grid) {
                                        window.Salespersons.Grid.Recargar();
                                    }
                                    window.ModalButtons.Habilitar('modalContactoVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Salespersons.Utilidades.MostrarError('Error', respuesta.mensaje || 'No se pudieron guardar los cambios.').then(function() {
                                    window.ModalButtons.Habilitar('modalContactoVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta.').then(function() {
                                window.ModalButtons.Habilitar('modalContactoVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        window.Salespersons.Utilidades.MostrarError('Error', 'Error de conexión.').then(function() {
                            window.ModalButtons.Habilitar('modalContactoVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                        });
                    }
                }
            };
            xhr.send(JSON.stringify(datos));
        },
        
        MostrarDatos: function(vendedor) {
            document.getElementById('modalVendedorTitulo').textContent = vendedor.IdVendedor;
            
            // ID Vendedor con tooltip
            var idElement = document.getElementById('modalIdVendedor');
            idElement.textContent = vendedor.IdVendedor;
            idElement.setAttribute('data-tooltip', 'Identificador único del vendedor en el sistema. Usado para referencias internas y reportes.');
            
            // Nombre Completo
            var nombreElement = document.getElementById('modalNombreCompleto');
            nombreElement.textContent = vendedor.NombreCompleto || '-';
            nombreElement.setAttribute('data-tooltip', 'Nombre completo del vendedor registrado en el sistema.');
            
            // Email
            var emailElement = document.getElementById('modalEmail');
            emailElement.textContent = vendedor.Email || '-';
            emailElement.setAttribute('data-tooltip', 'Correo electrónico de contacto oficial del vendedor. Usado para comunicaciones y notificaciones.');
            
            // Teléfono
            var telefonoElement = document.getElementById('modalTelefono');
            telefonoElement.textContent = vendedor.Telefono || '-';
            telefonoElement.setAttribute('data-tooltip', 'Número de teléfono de contacto directo del vendedor.');
            
            // Zona de Cobertura
            var zonaElement = document.getElementById('modalZonaCobertura');
            zonaElement.textContent = vendedor.ZonaCobertura || '-';
            var zonaTooltip = 'Zona geográfica asignada al vendedor: ' + (vendedor.ZonaCobertura || 'No asignada') + '. Define el área de operación y clientes asignados.';
            zonaElement.setAttribute('data-tooltip', zonaTooltip);
            
            // Estado con tooltip contextual
            var estadoHtml = '';
            var estadoTooltip = '';
            if (vendedor.Estado === 'ACTIVE') {
                estadoHtml = '<span class="badge bg-success info-tooltip-vendedor" data-field="Estado" data-tooltip="✅ Vendedor activo y operativo. Puede recibir órdenes, generar comisiones y está disponible para asignación de clientes.">' + vendedor.Estado + '</span>';
            } else if (vendedor.Estado === 'INACTIVE') {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="❌ Vendedor inactivo. No puede recibir órdenes nuevas ni generar comisiones. Contactar con recursos humanos para reactivación.">' + vendedor.Estado + '</span>';
            } else if (vendedor.Estado === 'ON_LEAVE') {
                estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-vendedor" data-field="Estado" data-tooltip="⏸️ Vendedor en licencia. Temporalmente no disponible. Las órdenes existentes se mantienen, pero no se asignan nuevas.">' + vendedor.Estado + '</span>';
            } else {
                estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="Estado desconocido. Verificar con administración.">' + (vendedor.Estado || 'ACTIVE') + '</span>';
            }
            document.getElementById('modalEstadoVendedor').innerHTML = estadoHtml;
            
            // Comisión Base con tooltip contextual
            var comisionBase = parseFloat(vendedor.ComisionBase || 0);
            var comisionBaseElement = document.getElementById('modalComisionBase');
            comisionBaseElement.textContent = comisionBase.toFixed(2) + '%';
            var comisionBaseTooltip = 'Comisión base fija: ' + comisionBase.toFixed(2) + '%. ';
            if (comisionBase < 4.0) {
                comisionBaseTooltip += '⚠️ Comisión baja - Considerar revisar estructura de comisiones para mejorar incentivos.';
            } else if (comisionBase > 6.0) {
                comisionBaseTooltip += '✅ Comisión alta - Vendedor con estructura de comisiones preferencial, generalmente por alto rendimiento.';
            } else {
                comisionBaseTooltip += 'Comisión estándar del mercado. Aplicada a todas las ventas del vendedor.';
            }
            comisionBaseElement.setAttribute('data-tooltip', comisionBaseTooltip);
            
            // Comisión Variable con tooltip contextual
            var comisionVar = parseFloat(vendedor.ComisionVariable || 0);
            var comisionVarElement = document.getElementById('modalComisionVariable');
            comisionVarElement.textContent = comisionVar.toFixed(2) + '%';
            var comisionVarTooltip = 'Comisión variable adicional: ' + comisionVar.toFixed(2) + '%. ';
            if (comisionVar < 2.0) {
                comisionVarTooltip += '⚠️ Variable baja - Incentivo limitado por volumen. Considerar aumentar para motivar mayores ventas.';
            } else if (comisionVar > 3.5) {
                comisionVarTooltip += '✅ Variable alta - Fuerte incentivo por volumen de ventas. Diseñado para premiar alto rendimiento.';
            } else {
                comisionVarTooltip += 'Variable estándar. Se aplica sobre ventas que exceden metas establecidas.';
            }
            comisionVarElement.setAttribute('data-tooltip', comisionVarTooltip);
            
            // Fecha de Contratación
            var fechaElement = document.getElementById('modalFechaContratacion');
            if (vendedor.FechaContratacion) {
                try {
                    var fecha = vendedor.FechaContratacion instanceof Date 
                        ? vendedor.FechaContratacion 
                        : new Date(vendedor.FechaContratacion);
                    if (!isNaN(fecha.getTime())) {
                        var fechaFormateada = fecha.toLocaleDateString('es-MX', { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit' 
                        });
                        fechaElement.textContent = fechaFormateada;
                        var diasContratado = Math.floor((new Date() - fecha) / (1000 * 60 * 60 * 24));
                        var fechaTooltip = 'Fecha de contratación: ' + fechaFormateada + '. ';
                        if (diasContratado < 30) {
                            fechaTooltip += '🆕 Vendedor nuevo (menos de 30 días). En período de capacitación.';
                        } else if (diasContratado < 180) {
                            fechaTooltip += '📅 Vendedor reciente (' + Math.floor(diasContratado / 30) + ' meses). En desarrollo.';
                        } else if (diasContratado < 365) {
                            fechaTooltip += '✅ Vendedor con experiencia (' + Math.floor(diasContratado / 30) + ' meses).';
                        } else {
                            fechaTooltip += '🏆 Vendedor senior (' + Math.floor(diasContratado / 365) + ' años). Alta experiencia.';
                        }
                        fechaElement.setAttribute('data-tooltip', fechaTooltip);
                    } else {
                        fechaElement.textContent = '-';
                        fechaElement.setAttribute('data-tooltip', 'Fecha de contratación no disponible.');
                    }
                } catch (e) {
                    console.warn('Error al formatear fecha de contratación:', e);
                    fechaElement.textContent = '-';
                    fechaElement.setAttribute('data-tooltip', 'Error al procesar fecha de contratación.');
                }
            } else {
                fechaElement.textContent = '-';
                fechaElement.setAttribute('data-tooltip', 'Fecha de contratación no registrada.');
            }
            
            // Total Órdenes con tooltip contextual
            var totalOrdenes = vendedor.TotalOrdenes || 0;
            var totalOrdenesElement = document.getElementById('modalTotalOrdenes');
            totalOrdenesElement.textContent = totalOrdenes.toLocaleString('es-MX');
            var totalOrdenesTooltip = 'Número total de órdenes gestionadas: ' + totalOrdenes.toLocaleString('es-MX') + '. ';
            if (totalOrdenes === 0) {
                totalOrdenesTooltip += '⚠️ Sin órdenes - Vendedor nuevo o sin actividad. Considerar capacitación o reasignación.';
            } else if (totalOrdenes < 10) {
                totalOrdenesTooltip += '⚠️ Órdenes bajas - Actividad limitada. Revisar estrategia de ventas.';
            } else if (totalOrdenes < 50) {
                totalOrdenesTooltip += '📊 Órdenes moderadas - Actividad estándar.';
            } else if (totalOrdenes < 200) {
                totalOrdenesTooltip += '✅ Órdenes altas - Buen nivel de actividad.';
            } else {
                totalOrdenesTooltip += '🏆 Órdenes excepcionales - Top performer con alta actividad.';
            }
            totalOrdenesElement.setAttribute('data-tooltip', totalOrdenesTooltip);
            
            // Total Ventas con tooltip contextual
            var totalVentas = parseFloat(vendedor.TotalVentas || 0);
            var totalVentasElement = document.getElementById('modalTotalVentas');
            totalVentasElement.textContent = '$' + totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            var totalVentasTooltip = 'Monto total de ventas generadas: $' + totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '. ';
            if (totalVentas === 0) {
                totalVentasTooltip += '⚠️ Sin ventas - Vendedor nuevo o sin actividad registrada.';
            } else if (totalVentas < 100000) {
                totalVentasTooltip += '⚠️ Ventas bajas - Considerar capacitación, reasignación de zona o revisión de estrategia.';
            } else if (totalVentas < 500000) {
                totalVentasTooltip += '📊 Ventas moderadas - Rendimiento estándar del mercado.';
            } else if (totalVentas < 2000000) {
                totalVentasTooltip += '✅ Ventas altas - Buen rendimiento. Vendedor productivo.';
            } else {
                totalVentasTooltip += '🏆 Ventas excepcionales - Top performer. Considerar reconocimiento y mejores incentivos.';
            }
            totalVentasElement.setAttribute('data-tooltip', totalVentasTooltip);
            
            // Total Comisiones con tooltip contextual
            var totalComisiones = parseFloat(vendedor.TotalComisiones || 0);
            var totalComisionesElement = document.getElementById('modalTotalComisiones');
            totalComisionesElement.textContent = '$' + totalComisiones.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            var totalComisionesTooltip = 'Monto total de comisiones ganadas: $' + totalComisiones.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '. ';
            var porcentajeComision = totalVentas > 0 ? ((totalComisiones / totalVentas) * 100).toFixed(2) : 0;
            totalComisionesTooltip += 'Representa el ' + porcentajeComision + '% del total de ventas. ';
            if (totalComisiones === 0) {
                totalComisionesTooltip += '⚠️ Sin comisiones - No hay ventas registradas.';
            } else if (totalComisiones < 5000) {
                totalComisionesTooltip += '⚠️ Comisiones bajas - Corresponden a ventas limitadas.';
            } else if (totalComisiones < 50000) {
                totalComisionesTooltip += '📊 Comisiones moderadas - Nivel estándar.';
            } else if (totalComisiones < 200000) {
                totalComisionesTooltip += '✅ Comisiones altas - Buen rendimiento.';
            } else {
                totalComisionesTooltip += '🏆 Comisiones excepcionales - Top performer.';
            }
            totalComisionesElement.setAttribute('data-tooltip', totalComisionesTooltip);
            
            // Cadenas Asignadas con tooltip contextual
            var cadenasAsignadas = vendedor.CadenasAsignadas || 0;
            var cadenasElement = document.getElementById('modalCadenasAsignadas');
            cadenasElement.textContent = cadenasAsignadas.toLocaleString('es-MX');
            var cadenasTooltip = 'Número de cadenas comerciales asignadas: ' + cadenasAsignadas.toLocaleString('es-MX') + '. ';
            if (cadenasAsignadas === 0) {
                cadenasTooltip += '⚠️ Sin cadenas asignadas - Vendedor sin clientes corporativos asignados. Considerar asignación de cadenas.';
            } else if (cadenasAsignadas < 2) {
                cadenasTooltip += '📊 Pocas cadenas - Oportunidad de crecimiento asignando más clientes corporativos.';
            } else if (cadenasAsignadas < 5) {
                cadenasTooltip += '✅ Cadenas estándar - Número adecuado de clientes corporativos.';
            } else {
                cadenasTooltip += '🏆 Muchas cadenas - Vendedor con alta responsabilidad y múltiples clientes corporativos.';
            }
            cadenasElement.setAttribute('data-tooltip', cadenasTooltip);
            
            // Asegurar que todos los elementos tengan la clase para tooltips
            [idElement, nombreElement, emailElement, telefonoElement, zonaElement, 
             comisionBaseElement, comisionVarElement, fechaElement, totalOrdenesElement, 
             totalVentasElement, totalComisionesElement, cadenasElement].forEach(function(el) {
                if (el && !el.classList.contains('info-tooltip-vendedor')) {
                    el.classList.add('info-tooltip-vendedor');
                }
            });
        },
        
        AbrirDialog: function() {
            // Usar la función helper simple
            if (typeof window.mostrarModalVendedor === 'function') {
                var resultado = window.mostrarModalVendedor();
                if (!resultado) {
                    // Si falla, usar el método anterior con retry
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
                }
            } else {
                console.warn('⚠️ Función mostrarModalVendedor no disponible, usando método alternativo');
            }
        },
        
        CambiarAModoEdicion: function(idVendedor) {
            if (!idVendedor || idVendedor <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'ID de vendedor no válido.');
                return;
            }
            
            if (typeof modalVendedorId !== 'undefined') {
                modalVendedorId = idVendedor;
            }
            if (typeof modalVendedorModo !== 'undefined') {
                modalVendedorModo = 'editar';
            }
            
            this.ActivarModoEdicion();
        },
        
        ActivarModoEdicion: function() {
            this.ConvertirCamposAEditables();
            this.ActualizarBotonesModal();
            
            var titulo = document.getElementById('modalVendedorTitulo');
            if (titulo && typeof modalVendedorId !== 'undefined') {
                titulo.textContent = modalVendedorId + ' (Editando)';
            }
        },
        
        DesactivarModoEdicion: function() {
            this.ConvertirCamposASoloLectura();
            this.RestaurarBotonesModal();
            
            var titulo = document.getElementById('modalVendedorTitulo');
            if (titulo && typeof modalVendedorId !== 'undefined') {
                titulo.textContent = modalVendedorId;
            }
            
            if (typeof modalVendedorModo !== 'undefined') {
                modalVendedorModo = 'ver';
            }
        },
        
        ConvertirCamposAEditables: function() {
            // Estado - convertir a dropdown
            var estadoContainer = document.getElementById('modalEstadoVendedor');
            if (estadoContainer) {
                var estadoActual = estadoContainer.textContent.trim();
                estadoContainer.innerHTML = '<select id="editEstadoVendedor" class="form-select form-select-sm">' +
                    '<option value="ACTIVE"' + (estadoActual === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option>' +
                    '<option value="INACTIVE"' + (estadoActual === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option>' +
                    '<option value="ON_LEAVE"' + (estadoActual === 'ON_LEAVE' ? ' selected' : '') + '>ON_LEAVE</option>' +
                    '</select>';
            }
            
            // Nombre Completo - convertir a input
            var nombreContainer = document.getElementById('modalNombreCompleto');
            if (nombreContainer) {
                var nombreActual = nombreContainer.textContent.trim();
                nombreContainer.innerHTML = '<input type="text" id="editNombreCompleto" class="form-control form-control-sm" value="' + nombreActual + '">';
            }
            
            // Email - convertir a input
            var emailContainer = document.getElementById('modalEmail');
            if (emailContainer) {
                var emailActual = emailContainer.textContent.trim();
                emailContainer.innerHTML = '<input type="email" id="editEmail" class="form-control form-control-sm" value="' + emailActual + '">';
            }
            
            // Teléfono - convertir a input
            var telefonoContainer = document.getElementById('modalTelefono');
            if (telefonoContainer) {
                var telefonoActual = telefonoContainer.textContent.trim();
                telefonoContainer.innerHTML = '<input type="tel" id="editTelefono" class="form-control form-control-sm" value="' + telefonoActual + '">';
            }
            
            // Zona de Cobertura - convertir a input
            var zonaContainer = document.getElementById('modalZonaCobertura');
            if (zonaContainer) {
                var zonaActual = zonaContainer.textContent.trim();
                zonaContainer.innerHTML = '<input type="text" id="editZonaCobertura" class="form-control form-control-sm" value="' + zonaActual + '">';
            }
            
            // Comisión Base - convertir a input numérico
            var comisionBaseContainer = document.getElementById('modalComisionBase');
            if (comisionBaseContainer) {
                var comisionBaseActual = comisionBaseContainer.textContent.trim().replace('%', '').trim();
                comisionBaseContainer.innerHTML = '<input type="number" id="editComisionBase" class="form-control form-control-sm" step="0.01" min="0" max="100" value="' + comisionBaseActual + '">';
            }
            
            // Comisión Variable - convertir a input numérico
            var comisionVarContainer = document.getElementById('modalComisionVariable');
            if (comisionVarContainer) {
                var comisionVarActual = comisionVarContainer.textContent.trim().replace('%', '').trim();
                comisionVarContainer.innerHTML = '<input type="number" id="editComisionVariable" class="form-control form-control-sm" step="0.01" min="0" max="100" value="' + comisionVarActual + '">';
            }
        },
        
        ConvertirCamposASoloLectura: function() {
            // Estado - restaurar badge
            var estadoContainer = document.getElementById('modalEstadoVendedor');
            if (estadoContainer) {
                var selectEstado = document.getElementById('editEstadoVendedor');
                if (selectEstado) {
                    var estadoSeleccionado = selectEstado.value;
                    var estadoHtml = '';
                    if (estadoSeleccionado === 'ACTIVE') {
                        estadoHtml = '<span class="badge bg-success info-tooltip-vendedor" data-field="Estado" data-tooltip="✅ Vendedor activo y operativo. Puede recibir órdenes, generar comisiones y está disponible para asignación de clientes.">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'INACTIVE') {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="❌ Vendedor inactivo. No puede recibir órdenes nuevas ni generar comisiones. Contactar con recursos humanos para reactivación.">' + estadoSeleccionado + '</span>';
                    } else if (estadoSeleccionado === 'ON_LEAVE') {
                        estadoHtml = '<span class="badge bg-warning text-dark info-tooltip-vendedor" data-field="Estado" data-tooltip="⏸️ Vendedor en licencia. Temporalmente no disponible. Las órdenes existentes se mantienen, pero no se asignan nuevas.">' + estadoSeleccionado + '</span>';
                    } else {
                        estadoHtml = '<span class="badge bg-secondary info-tooltip-vendedor" data-field="Estado" data-tooltip="Estado desconocido. Verificar con administración.">' + estadoSeleccionado + '</span>';
                    }
                    estadoContainer.innerHTML = estadoHtml;
                }
            }
            
            // Nombre Completo
            var nombreContainer = document.getElementById('modalNombreCompleto');
            if (nombreContainer) {
                var inputNombre = document.getElementById('editNombreCompleto');
                if (inputNombre) {
                    nombreContainer.textContent = inputNombre.value || '-';
                }
            }
            
            // Email
            var emailContainer = document.getElementById('modalEmail');
            if (emailContainer) {
                var inputEmail = document.getElementById('editEmail');
                if (inputEmail) {
                    emailContainer.textContent = inputEmail.value || '-';
                }
            }
            
            // Teléfono
            var telefonoContainer = document.getElementById('modalTelefono');
            if (telefonoContainer) {
                var inputTelefono = document.getElementById('editTelefono');
                if (inputTelefono) {
                    telefonoContainer.textContent = inputTelefono.value || '-';
                }
            }
            
            // Zona de Cobertura
            var zonaContainer = document.getElementById('modalZonaCobertura');
            if (zonaContainer) {
                var inputZona = document.getElementById('editZonaCobertura');
                if (inputZona) {
                    zonaContainer.textContent = inputZona.value || '-';
                }
            }
            
            // Comisión Base
            var comisionBaseContainer = document.getElementById('modalComisionBase');
            if (comisionBaseContainer) {
                var inputComisionBase = document.getElementById('editComisionBase');
                if (inputComisionBase) {
                    comisionBaseContainer.textContent = parseFloat(inputComisionBase.value || 0).toFixed(2) + '%';
                }
            }
            
            // Comisión Variable
            var comisionVarContainer = document.getElementById('modalComisionVariable');
            if (comisionVarContainer) {
                var inputComisionVar = document.getElementById('editComisionVariable');
                if (inputComisionVar) {
                    comisionVarContainer.textContent = parseFloat(inputComisionVar.value || 0).toFixed(2) + '%';
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
            if (typeof modalVendedorId === 'undefined' || !modalVendedorId || modalVendedorId <= 0) {
                window.Salespersons.Utilidades.MostrarError('Error', 'No hay vendedor seleccionado para guardar.');
                return;
            }
            
            var selectEstado = document.getElementById('editEstadoVendedor');
            var inputNombre = document.getElementById('editNombreCompleto');
            var inputEmail = document.getElementById('editEmail');
            var inputTelefono = document.getElementById('editTelefono');
            var inputZona = document.getElementById('editZonaCobertura');
            var inputComisionBase = document.getElementById('editComisionBase');
            var inputComisionVar = document.getElementById('editComisionVariable');
            
            var nuevoEstado = selectEstado ? selectEstado.value : null;
            var nuevoNombre = inputNombre ? inputNombre.value.trim() : null;
            var nuevoEmail = inputEmail ? inputEmail.value.trim() : null;
            var nuevoTelefono = inputTelefono ? inputTelefono.value.trim() : null;
            var nuevaZona = inputZona ? inputZona.value.trim() : null;
            var nuevaComisionBase = inputComisionBase ? parseFloat(inputComisionBase.value) : null;
            var nuevaComisionVar = inputComisionVar ? parseFloat(inputComisionVar.value) : null;
            
            // Validaciones
            if (nuevoEstado && nuevoEstado !== 'ACTIVE' && nuevoEstado !== 'INACTIVE' && nuevoEstado !== 'ON_LEAVE') {
                window.Salespersons.Utilidades.MostrarError('Error', 'Estado inválido.');
                return;
            }
            
            if (nuevoEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoEmail)) {
                window.Salespersons.Utilidades.MostrarError('Error', 'Email inválido.');
                return;
            }
            
            if (nuevaComisionBase !== null && (isNaN(nuevaComisionBase) || nuevaComisionBase < 0 || nuevaComisionBase > 100)) {
                window.Salespersons.Utilidades.MostrarError('Error', 'Comisión base debe ser un número entre 0 y 100.');
                return;
            }
            
            if (nuevaComisionVar !== null && (isNaN(nuevaComisionVar) || nuevaComisionVar < 0 || nuevaComisionVar > 100)) {
                window.Salespersons.Utilidades.MostrarError('Error', 'Comisión variable debe ser un número entre 0 y 100.');
                return;
            }
            
            window.ModalButtons.Deshabilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
            
            var datosActualizacion = {
                IdVendedor: modalVendedorId,
                Estado: nuevoEstado,
                NombreCompleto: nuevoNombre,
                Email: nuevoEmail,
                Telefono: nuevoTelefono,
                ZonaCobertura: nuevaZona,
                ComisionBase: nuevaComisionBase,
                ComisionVariable: nuevaComisionVar
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Salespersons/ActualizarSalesperson', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            var respuesta = JSON.parse(xhr.responseText);
                            if (respuesta.exito) {
                                window.Salespersons.Utilidades.MostrarExito(
                                    'Vendedor actualizado',
                                    'Los cambios se guardaron correctamente.'
                                ).then(function() {
                                    if (window.Salespersons && window.Salespersons.Modal) {
                                        window.Salespersons.Modal.DesactivarModoEdicion();
                                        
                                        if (typeof modalVendedorId !== 'undefined' && modalVendedorId) {
                                            window.Salespersons.Modal.CargarDatosVendedor(modalVendedorId);
                                        }
                                        
                                        if (window.Salespersons && window.Salespersons.Grid) {
                                            window.Salespersons.Grid.Recargar();
                                        }
                                    }
                                    
                                    window.ModalButtons.Habilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            } else {
                                window.Salespersons.Utilidades.MostrarError(
                                    'Error al guardar',
                                    respuesta.mensaje || 'No se pudieron guardar los cambios.'
                                ).then(function() {
                                    window.ModalButtons.Habilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear respuesta:', e);
                            window.Salespersons.Utilidades.MostrarError('Error', 'Error al procesar la respuesta del servidor.').then(function() {
                                window.ModalButtons.Habilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                            });
                        }
                    } else {
                        var mensajeError = 'Error HTTP: ' + xhr.status + ' - ' + xhr.statusText;
                        window.Salespersons.Utilidades.MostrarError('Error de Conexión', mensajeError).then(function() {
                            window.ModalButtons.Habilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                        });
                        console.error('Error al guardar vendedor:', mensajeError);
                    }
                }
            };
            
            xhr.onerror = function() {
                window.Salespersons.Utilidades.MostrarError('Error de Conexión', 'No se pudo conectar con el servidor.').then(function() {
                    window.ModalButtons.Habilitar('modalVendedor', '#salespersonsGrid .e-gridcontent .e-rowcell .btn');
                });
            };
            
            xhr.send(JSON.stringify(datosActualizacion));
        },
        
        CancelarEdicion: function() {
            if (typeof modalVendedorId !== 'undefined' && modalVendedorId) {
                this.CargarDatosVendedor(modalVendedorId);
            }
            
            this.DesactivarModoEdicion();
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
