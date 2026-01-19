# Guía de Funcionalidades Avanzadas de Syncfusion

## Propósito

Esta guía documenta cómo implementar funcionalidades avanzadas de Syncfusion en AdministracionFlotillas, adaptadas a nuestra arquitectura en capas, base de datos Oracle Sample Schema CO, y convenciones de nomenclatura en español.

**Nota**: Esta es una guía atemporal para enseñanza y desarrollo. Todos los ejemplos están adaptados a nuestro stack tecnológico y estructura de base de datos.

## Base de Datos: Oracle Sample Schema CO

### Estructura de Datos Disponible

**Schema**: `CO` (Customer Orders)  
**Usuario de Aplicación**: `FLOTILLAS_APP`  
**Tablas Principales**:

- **ORDERS**: Órdenes de venta
  - `ORDER_ID` (NUMBER) - Identificador único
  - `ORDER_TMS` (TIMESTAMP) - Fecha y hora
  - `CUSTOMER_ID` (NUMBER) - Cliente
  - `ORDER_STATUS` (VARCHAR2) - Estado: COMPLETE, CANCELLED, REFUNDED
  - `STORE_ID` (NUMBER) - Tienda

- **ORDER_ITEMS**: Items de órdenes
  - `ORDER_ITEM_ID` (NUMBER)
  - `ORDER_ID` (NUMBER)
  - `PRODUCT_ID` (NUMBER)
  - `QUANTITY` (NUMBER)
  - `UNIT_PRICE` (NUMBER)
  - `DISCOUNT` (NUMBER)
  - `SUBTOTAL` (NUMBER)
  - `TAX` (NUMBER)
  - `TOTAL` (NUMBER)

- **CUSTOMERS**: Clientes
  - `CUSTOMER_ID` (NUMBER)
  - `CUSTOMER_NAME` (VARCHAR2)
  - `EMAIL` (VARCHAR2)
  - `PHONE` (VARCHAR2)
  - `ADDRESS` (VARCHAR2)
  - `CITY` (VARCHAR2)
  - `STATE` (VARCHAR2)
  - `ZIP_CODE` (VARCHAR2)
  - `COUNTRY` (VARCHAR2)
  - `STATUS` (VARCHAR2) - ACTIVE, INACTIVE
  - `REGISTRATION_DATE` (DATE)
  - `CREDIT_LIMIT` (NUMBER)

- **PRODUCTS**: Productos
  - `PRODUCT_ID` (NUMBER)
  - `PRODUCT_NAME` (VARCHAR2)
  - `DESCRIPTION` (VARCHAR2)
  - `CATEGORY` (VARCHAR2)
  - `UNIT_PRICE` (NUMBER)
  - `STOCK_QUANTITY` (NUMBER)
  - `STATUS` (VARCHAR2) - ACTIVE, INACTIVE, DISCONTINUED
  - `COST_PRICE` (NUMBER)

- **STORES**: Tiendas
  - `STORE_ID` (NUMBER)
  - `STORE_NAME` (VARCHAR2)
  - `ADDRESS` (VARCHAR2)
  - `CITY` (VARCHAR2)
  - `STATE` (VARCHAR2)
  - `ZIP_CODE` (VARCHAR2)
  - `PHONE` (VARCHAR2)
  - `STATUS` (VARCHAR2)

- **EMPLOYEES**: Empleados
  - `EMPLOYEE_ID` (NUMBER)
  - `FIRST_NAME` (VARCHAR2)
  - `LAST_NAME` (VARCHAR2)
  - `EMAIL` (VARCHAR2)
  - `PHONE_NUMBER` (VARCHAR2)
  - `HIRE_DATE` (DATE)
  - `JOB_ID` (NUMBER)
  - `SALARY` (NUMBER)
  - `COMMISSION_PCT` (NUMBER)
  - `MANAGER_ID` (NUMBER)
  - `DEPARTMENT_ID` (NUMBER)
  - `STORE_ID` (NUMBER)

- **INVENTORY**: Inventario
  - `INVENTORY_ID` (NUMBER)
  - `STORE_ID` (NUMBER)
  - `PRODUCT_ID` (NUMBER)
  - `QUANTITY_ON_HAND` (NUMBER)
  - `REORDER_LEVEL` (NUMBER)
  - `LAST_RESTOCK_DATE` (DATE)

- **SHIPMENTS**: Envíos
  - `SHIPMENT_ID` (NUMBER)
  - `ORDER_ID` (NUMBER)
  - `SHIPMENT_DATE` (DATE)
  - `SHIPMENT_STATUS` (VARCHAR2)
  - `TRACKING_NUMBER` (VARCHAR2)
  - `CARRIER` (VARCHAR2)

## Reglas de Negocio Realistas

### Reglas de Negocio para Órdenes

1. **Creación de Órdenes**
   - Una orden debe tener al menos un item (ORDER_ITEMS)
   - El cliente debe estar activo (STATUS = 'ACTIVE')
   - Los productos deben tener stock disponible
   - El precio unitario no puede ser menor al precio base del producto
   - El precio unitario puede ser mayor al precio base (permite descuentos y ajustes)

2. **Estados de Órdenes**
   - **COMPLETE**: Orden completada y facturada
   - **CANCELLED**: Orden cancelada (solo la última puede cancelarse)
   - **REFUNDED**: Orden reembolsada
   - Solo se puede cancelar la última orden de un cliente

3. **Cancelación de Órdenes**
   - Solo se permite cancelar el último folio emitido
   - Al cancelar, los productos vuelven al inventario
   - Se registra la cancelación con fecha y motivo

4. **Cálculo de Totales**
   - Subtotal = Suma de (Cantidad × Precio Unitario - Descuento) por item
   - Impuesto = Subtotal × Tasa de Impuesto (16% en México)
   - Total = Subtotal + Impuesto

5. **Validación de Stock**
   - Al crear una orden, se valida que haya stock suficiente
   - El stock se reserva al crear la orden
   - El stock se libera al cancelar la orden

### Reglas de Negocio para Clientes

1. **Tipos de Cliente**
   - **ACTIVE**: Cliente activo, puede realizar compras
   - **INACTIVE**: Cliente inactivo, no puede realizar compras
   - Clientes inactivos pueden reactivarse

2. **Límite de Crédito**
   - Los clientes pueden tener límite de crédito
   - Las órdenes de crédito no pueden exceder el límite
   - El sistema muestra el crédito disponible

3. **Historial de Compras**
   - Se mantiene historial completo de órdenes
   - Se calcula total de compras del cliente
   - Se muestra última fecha de compra

### Reglas de Negocio para Productos

1. **Gestión de Stock**
   - El stock se actualiza al crear/cancelar órdenes
   - Alerta cuando el stock está por debajo del nivel de reorden
   - No se pueden vender productos sin stock

2. **Estados de Producto**
   - **ACTIVE**: Producto disponible para venta
   - **INACTIVE**: Producto no disponible temporalmente
   - **DISCONTINUED**: Producto descontinuado

3. **Precios**
   - El precio unitario base se mantiene en PRODUCTS
   - Se permite ajuste de precio por cliente (lista de precios)
   - Los descuentos se aplican por item

### Reglas de Negocio para Inventario

1. **Control de Inventario**
   - El inventario se controla por tienda y producto
   - Se registra la última fecha de reposición
   - Se alerta cuando el stock está bajo

2. **Nivel de Reorden**
   - Cada producto tiene un nivel de reorden
   - Cuando el stock cae por debajo del nivel, se genera alerta
   - Se puede solicitar reposición al almacén

## Funcionalidades Avanzadas de Syncfusion

### 1. Grid Avanzado - Agrupación y Agregaciones

#### Agrupación de Datos

**Uso**: Agrupar órdenes por estado, cliente, tienda, o fecha.

**Implementación**:
```html
<ejs-grid id="ordersGrid" 
          allowGrouping="true"
          groupSettings="@(new Syncfusion.EJ2.Grids.GridGroupSettings { 
              AllowReordering = true,
              ShowDropArea = true,
              Columns = new string[] { "EstadoOrden", "IdCliente" }
          })"
          ...>
    <e-grid-columns>
        <e-grid-column field="EstadoOrden" headerText="Estado" allowGrouping="true"></e-grid-column>
        <e-grid-column field="IdCliente" headerText="Cliente ID" allowGrouping="true"></e-grid-column>
        <e-grid-column field="IdOrden" headerText="ID" type="number"></e-grid-column>
        <e-grid-column field="FechaOrden" headerText="Fecha" type="date"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**JavaScript**:
```javascript
window.Orders.Grid.Agrupacion = {
    AgruparPorEstado: function() {
        var grid = document.getElementById('ordersGrid').ej2_instances[0];
        grid.groupColumn('EstadoOrden');
    },
    
    AgruparPorCliente: function() {
        var grid = document.getElementById('ordersGrid').ej2_instances[0];
        grid.groupColumn('IdCliente');
    },
    
    Desagrupar: function() {
        var grid = document.getElementById('ordersGrid').ej2_instances[0];
        grid.ungroupColumn('EstadoOrden');
        grid.ungroupColumn('IdCliente');
    }
};
```

#### Agregaciones

**Uso**: Mostrar totales, promedios, conteos en el grid.

**Implementación**:
```html
<ejs-grid id="ordersGrid" ...>
    <e-grid-aggregates>
        <e-grid-aggregate>
            <e-aggregate-columns>
                <e-aggregate-column field="IdOrden" type="Count" format="N0">
                    <e-aggregate-footerTemplate>
                        <span>Total Órdenes: ${Count}</span>
                    </e-aggregate-footerTemplate>
                </e-aggregate-column>
            </e-aggregate-columns>
        </e-grid-aggregate>
        <e-grid-aggregate>
            <e-aggregate-columns>
                <e-aggregate-column field="Total" type="Sum" format="C2">
                    <e-aggregate-footerTemplate>
                        <span>Total Ventas: ${Sum}</span>
                    </e-aggregate-footerTemplate>
                </e-aggregate-column>
            </e-aggregate-columns>
        </e-grid-aggregate>
    </e-grid-aggregates>
    ...
</ejs-grid>
```

**Nota**: Para que las agregaciones funcionen, el ViewModel debe incluir el campo `Total` calculado.

### 2. Grid Avanzado - Edición Inline

#### Edición de Celdas

**Uso**: Editar directamente en el grid sin abrir dialog.

**Implementación**:
```html
<ejs-grid id="ordersGrid" 
          allowEditing="true"
          editSettings="@(new Syncfusion.EJ2.Grids.GridEditSettings { 
              AllowEditing = true,
              AllowAdding = true,
              AllowDeleting = true,
              Mode = Syncfusion.EJ2.Grids.EditMode.Normal
          })"
          actionBegin="ordersGridActionBegin"
          actionComplete="ordersGridActionComplete"
          ...>
    <e-grid-columns>
        <e-grid-column field="EstadoOrden" headerText="Estado" 
                       editType="dropdownedit"
                       edit="@(new Syncfusion.EJ2.Grids.DropDownEditCellParams { 
                           Params = new { Value = "EstadoOrden", DataSource = new string[] { "COMPLETE", "CANCELLED", "REFUNDED" } }
                       })">
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**JavaScript**:
```javascript
window.ordersGridActionBegin = function(args) {
    if (args.requestType === 'save') {
        // Validar datos antes de guardar
        var datosEditados = args.data;
        if (!window.Orders.Validaciones.ValidarOrden(datosEditados)) {
            args.cancel = true;
            window.Orders.Toast.MostrarError('Error de Validación', 'Los datos no son válidos.');
        }
    }
};

window.ordersGridActionComplete = function(args) {
    if (args.requestType === 'save') {
        // Guardar en servidor
        window.Orders.Grid.GuardarCambios(args.data);
    }
};

window.Orders.Grid = {
    GuardarCambios: function(datos) {
        $.ajax({
            url: '/Orders/ActualizarOrder',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function(respuesta) {
                if (respuesta.exito) {
                    window.Orders.Toast.MostrarExito('Actualización Exitosa', 'La orden se actualizó correctamente.');
                } else {
                    window.Orders.Toast.MostrarError('Error', respuesta.mensaje);
                }
            },
            error: function() {
                window.Orders.Toast.MostrarError('Error de Conexión', 'No se pudo actualizar la orden.');
            }
        });
    }
};
```

**Controller**:
```csharp
[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ActualizarOrder([FromBody] OrderViewModel orden)
{
    try
    {
        // Validar reglas de negocio
        if (!ValidarReglasNegocio(orden))
        {
            return Json(new { exito = false, mensaje = "No se cumplen las reglas de negocio." });
        }
        
        // Actualizar en base de datos
        var resultado = _ordersService.ActualizarOrderAsync(orden).Result;
        
        if (resultado)
        {
            return Json(new { exito = true, mensaje = "Orden actualizada correctamente." });
        }
        else
        {
            return Json(new { exito = false, mensaje = "No se pudo actualizar la orden." });
        }
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}
```

### 3. Dialog para Crear/Editar

#### Dialog Modal para Crear Orden

**Uso**: Formulario modal para crear nueva orden con validación.

**Implementación**:
```html
<ejs-dialog id="dialogCrearOrden" 
            header="Crear Nueva Orden"
            showCloseIcon="true"
            width="800px"
            isModal="true"
            visible="false"
            allowDragging="true"
            allowResizing="true"
            target=".container-fluid"
            created="dialogCrearOrdenCreated"
            close="dialogCrearOrdenClose">
    <e-content-template>
        <div class="container-fluid p-3">
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Cliente</label>
                    <ejs-dropdownlist id="ddlClienteCrear" 
                                      placeholder="Seleccionar cliente"
                                      dataSource="@(new List<object>())"
                                      fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                          Value = "IdCliente", 
                                          Text = "NombreCliente" 
                                      })"
                                      change="ddlClienteCrearChange">
                    </ejs-dropdownlist>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Tienda</label>
                    <ejs-dropdownlist id="ddlTiendaCrear" 
                                      placeholder="Seleccionar tienda"
                                      dataSource="@(new List<object>())"
                                      fields="@(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { 
                                          Value = "IdTienda", 
                                          Text = "NombreTienda" 
                                      })">
                    </ejs-dropdownlist>
                </div>
            </div>
            
            <!-- Grid de Items -->
            <div class="row mb-3">
                <div class="col-12">
                    <label class="form-label">Items de la Orden</label>
                    <ejs-grid id="gridItemsCrear" 
                              allowPaging="false"
                              allowAdding="true"
                              allowDeleting="true"
                              editSettings="@(new Syncfusion.EJ2.Grids.GridEditSettings { 
                                  AllowAdding = true,
                                  AllowDeleting = true,
                                  AllowEditing = true,
                                  Mode = Syncfusion.EJ2.Grids.EditMode.Normal
                              })">
                        <e-grid-columns>
                            <e-grid-column field="IdProducto" headerText="Producto" 
                                         editType="dropdownedit"
                                         width="200">
                            </e-grid-column>
                            <e-grid-column field="Cantidad" headerText="Cantidad" 
                                         type="number" 
                                         editType="numericedit"
                                         width="100">
                            </e-grid-column>
                            <e-grid-column field="PrecioUnitario" headerText="Precio Unit." 
                                         type="number" 
                                         format="C2"
                                         editType="numericedit"
                                         width="120">
                            </e-grid-column>
                            <e-grid-column field="Descuento" headerText="Descuento" 
                                         type="number" 
                                         format="C2"
                                         editType="numericedit"
                                         width="120">
                            </e-grid-column>
                            <e-grid-column field="Total" headerText="Total" 
                                         type="number" 
                                         format="C2"
                                         allowEditing="false"
                                         width="120">
                            </e-grid-column>
                        </e-grid-columns>
                    </ejs-grid>
                </div>
            </div>
            
            <!-- Totales -->
            <div class="row">
                <div class="col-md-6 offset-md-6">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td class="text-end"><strong>Subtotal:</strong></td>
                                <td class="text-end" id="subtotalCrear">$0.00</td>
                            </tr>
                            <tr>
                                <td class="text-end"><strong>Impuestos (16%):</strong></td>
                                <td class="text-end" id="impuestosCrear">$0.00</td>
                            </tr>
                            <tr class="border-top">
                                <td class="text-end"><h5>Total:</h5></td>
                                <td class="text-end"><h5 class="text-primary" id="totalCrear">$0.00</h5></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="@(new Syncfusion.EJ2.Popups.DialogButtonModel { 
            Content = "Cancelar", 
            IsPrimary = false,
            CssClass = "e-flat"
        })" click="btnCancelarCrearClick"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton buttonModel="@(new Syncfusion.EJ2.Popups.DialogButtonModel { 
            Content = "Crear Orden", 
            IsPrimary = true
        })" click="btnCrearOrdenClick"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>
```

**JavaScript**:
```javascript
window.Orders.Dialog = {
    MostrarCrear: function() {
        var dialog = document.getElementById('dialogCrearOrden').ej2_instances[0];
        if (dialog) {
            dialog.show();
            // Cargar datos iniciales
            this.CargarClientes();
            this.CargarTiendas();
            this.LimpiarFormulario();
        }
    },
    
    OcultarCrear: function() {
        var dialog = document.getElementById('dialogCrearOrden').ej2_instances[0];
        if (dialog) {
            dialog.hide();
        }
    },
    
    CargarClientes: function() {
        $.ajax({
            url: '/Customers/ObtenerCustomers',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var ddlCliente = document.getElementById('ddlClienteCrear').ej2_instances[0];
                    if (ddlCliente) {
                        ddlCliente.dataSource = respuesta.datos.filter(function(c) {
                            return c.Status === 'ACTIVE';
                        });
                        ddlCliente.dataBind();
                    }
                }
            }
        });
    },
    
    CargarTiendas: function() {
        // Similar a CargarClientes
    },
    
    LimpiarFormulario: function() {
        var grid = document.getElementById('gridItemsCrear').ej2_instances[0];
        if (grid) {
            grid.dataSource = [];
            grid.refresh();
        }
        this.ActualizarTotales();
    },
    
    ActualizarTotales: function() {
        var grid = document.getElementById('gridItemsCrear').ej2_instances[0];
        if (!grid || !grid.dataSource) return;
        
        var subtotal = 0;
        grid.dataSource.forEach(function(item) {
            subtotal += (item.Cantidad * item.PrecioUnitario - (item.Descuento || 0));
        });
        
        var impuestos = subtotal * 0.16; // 16% IVA
        var total = subtotal + impuestos;
        
        $('#subtotalCrear').text('$' + subtotal.toFixed(2));
        $('#impuestosCrear').text('$' + impuestos.toFixed(2));
        $('#totalCrear').text('$' + total.toFixed(2));
    },
    
    Guardar: function() {
        var ddlCliente = document.getElementById('ddlClienteCrear').ej2_instances[0];
        var ddlTienda = document.getElementById('ddlTiendaCrear').ej2_instances[0];
        var grid = document.getElementById('gridItemsCrear').ej2_instances[0];
        
        if (!ddlCliente || !ddlCliente.value) {
            window.Orders.Toast.MostrarError('Validación', 'Debe seleccionar un cliente.');
            return;
        }
        
        if (!ddlTienda || !ddlTienda.value) {
            window.Orders.Toast.MostrarError('Validación', 'Debe seleccionar una tienda.');
            return;
        }
        
        if (!grid || !grid.dataSource || grid.dataSource.length === 0) {
            window.Orders.Toast.MostrarError('Validación', 'Debe agregar al menos un item a la orden.');
            return;
        }
        
        var orden = {
            IdCliente: ddlCliente.value,
            IdTienda: ddlTienda.value,
            Items: grid.dataSource
        };
        
        window.Orders.Utilidades.MostrarSpinner();
        
        $.ajax({
            url: '/Orders/CrearOrder',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(orden),
            success: function(respuesta) {
                window.Orders.Utilidades.OcultarSpinner();
                if (respuesta.exito) {
                    window.Orders.Toast.MostrarExito('Orden Creada', 'La orden se creó correctamente.');
                    window.Orders.Dialog.OcultarCrear();
                    window.Orders.Grid.CargarDatos();
                } else {
                    window.Orders.Toast.MostrarError('Error', respuesta.mensaje);
                }
            },
            error: function() {
                window.Orders.Utilidades.OcultarSpinner();
                window.Orders.Toast.MostrarError('Error de Conexión', 'No se pudo crear la orden.');
            }
        });
    }
};

window.dialogCrearOrdenCreated = function() {
    // Inicializar dialog
};

window.dialogCrearOrdenClose = function() {
    window.Orders.Dialog.LimpiarFormulario();
};

window.btnCancelarCrearClick = function() {
    window.Orders.Dialog.OcultarCrear();
};

window.btnCrearOrdenClick = function() {
    window.Orders.Dialog.Guardar();
};

window.ddlClienteCrearChange = function() {
    // Validar cliente activo, cargar lista de precios si aplica
};
```

**Controller**:
```csharp
[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult CrearOrder([FromBody] SolicitudCrearOrden solicitud)
{
    try
    {
        // Validar reglas de negocio
        if (!ValidarClienteActivo(solicitud.IdCliente))
        {
            return Json(new { exito = false, mensaje = "El cliente no está activo." });
        }
        
        if (!ValidarStockDisponible(solicitud.Items))
        {
            return Json(new { exito = false, mensaje = "No hay stock suficiente para algunos productos." });
        }
        
        // Crear orden
        var orden = _ordersService.CrearOrderAsync(solicitud).Result;
        
        if (orden != null)
        {
            return Json(new { exito = true, mensaje = "Orden creada correctamente.", datos = orden });
        }
        else
        {
            return Json(new { exito = false, mensaje = "No se pudo crear la orden." });
        }
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}
```

### 4. Toast Notifications

#### Configuración Global

**Ubicación**: `Views/Shared/_Layout.cshtml`

**Implementación**:
```html
<ejs-toast id="toastNotificaciones" 
           position="@(new Syncfusion.EJ2.Notifications.ToastPosition { X = "Right", Y = "Top" })"
           timeOut="5000"
           showCloseButton="true"
           showProgressBar="true"
           newestOnTop="true"
           width="350px">
</ejs-toast>
```

**JavaScript Global**:
```javascript
// En wwwroot/js/Common/Utilidades.js
window.Utilidades = window.Utilidades || {};

window.Utilidades.Toast = {
    Mostrar: function(tipo, titulo, mensaje, duracion) {
        var toast = document.getElementById('toastNotificaciones').ej2_instances[0];
        if (!toast) return;
        
        var icono = '';
        var color = '';
        
        switch(tipo) {
            case 'exito':
                icono = 'e-success';
                color = '#28a745';
                break;
            case 'error':
                icono = 'e-error';
                color = '#dc3545';
                break;
            case 'advertencia':
                icono = 'e-warning';
                color = '#ffc107';
                break;
            case 'informacion':
                icono = 'e-info';
                color = '#17a2b8';
                break;
        }
        
        toast.show({
            title: titulo,
            content: mensaje,
            icon: icono,
            cssClass: 'e-toast-' + tipo,
            timeOut: duracion || 5000
        });
    },
    
    MostrarExito: function(titulo, mensaje) {
        this.Mostrar('exito', titulo, mensaje);
    },
    
    MostrarError: function(titulo, mensaje) {
        this.Mostrar('error', titulo, mensaje);
    },
    
    MostrarAdvertencia: function(titulo, mensaje) {
        this.Mostrar('advertencia', titulo, mensaje);
    },
    
    MostrarInformacion: function(titulo, mensaje) {
        this.Mostrar('informacion', titulo, mensaje);
    }
};

// Namespace específico para Orders
window.Orders.Toast = {
    MostrarExito: function(titulo, mensaje) {
        window.Utilidades.Toast.MostrarExito(titulo, mensaje);
    },
    
    MostrarError: function(titulo, mensaje) {
        window.Utilidades.Toast.MostrarError(titulo, mensaje);
    }
};
```

### 5. ProgressBar para Operaciones

#### ProgressBar para Exportaciones

**Implementación**:
```html
<ejs-progressbar id="progressBarExportacion" 
                 type="Linear"
                 value="0"
                 height="20px"
                 showProgressValue="true"
                 animation="@(new Syncfusion.EJ2.ProgressBar.ProgressBarAnimationSettings { 
                     Enable = true,
                     Duration = 2000,
                     Delay = 0
                 })"
                 style="display: none;">
</ejs-progressbar>
```

**JavaScript**:
```javascript
window.Orders.Utilidades.ProgressBar = {
    Mostrar: function() {
        var progressBar = document.getElementById('progressBarExportacion');
        if (progressBar) {
            progressBar.style.display = 'block';
            var instance = progressBar.ej2_instances[0];
            if (instance) {
                instance.value = 0;
                instance.dataBind();
            }
        }
    },
    
    Actualizar: function(porcentaje) {
        var progressBar = document.getElementById('progressBarExportacion');
        if (progressBar && progressBar.ej2_instances && progressBar.ej2_instances[0]) {
            progressBar.ej2_instances[0].value = porcentaje;
            progressBar.ej2_instances[0].dataBind();
        }
    },
    
    Ocultar: function() {
        var progressBar = document.getElementById('progressBarExportacion');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    }
};

// Uso en exportación
window.ordersGridToolbarClick = function(args) {
    if (args.item.text === 'Excel Export') {
        window.Orders.Utilidades.ProgressBar.Mostrar();
        
        var grid = document.getElementById('ordersGrid').ej2_instances[0];
        grid.excelExport({
            fileName: 'Ordenes_' + new Date().toISOString().split('T')[0] + '.xlsx',
            progress: function(args) {
                // Actualizar progress bar durante exportación
                var porcentaje = (args.progress / 100) * 100;
                window.Orders.Utilidades.ProgressBar.Actualizar(porcentaje);
            },
            complete: function() {
                window.Orders.Utilidades.ProgressBar.Ocultar();
                window.Orders.Toast.MostrarExito('Exportación Exitosa', 'El archivo Excel se descargó correctamente.');
            },
            failure: function() {
                window.Orders.Utilidades.ProgressBar.Ocultar();
                window.Orders.Toast.MostrarError('Error de Exportación', 'No se pudo exportar a Excel.');
            }
        });
    }
};
```

### 6. Charts Avanzados - Múltiples Tipos

#### Vista Analytics para Órdenes

**Nueva Vista**: `Views/Orders/Analytics.cshtml`

**Implementación**:
```html
@{
    ViewData["Title"] = "Análisis de Órdenes";
}

<div class="container-fluid">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a asp-controller="Home" asp-action="Index">Dashboard</a></li>
            <li class="breadcrumb-item"><a asp-controller="Orders" asp-action="Index">Órdenes</a></li>
            <li class="breadcrumb-item active" aria-current="page">Análisis</li>
        </ol>
    </nav>

    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0">Análisis de Órdenes</h2>
            <p class="text-muted">Análisis detallado de ventas y tendencias</p>
        </div>
    </div>

    <!-- Tabs para diferentes análisis -->
    <ejs-tab id="tabsAnalytics" heightAdjustMode="Auto">
        <e-tab-tabitems>
            <e-tab-item header="@(new Syncfusion.EJ2.Navigations.TabHeader { Text = "Ventas por Mes" })">
                <e-content-template>
                    <div class="p-3">
                        <ejs-chart id="chartVentasPorMes" 
                                   title="Ventas por Mes"
                                   enableAnimation="true"
                                   tooltip="@(new Syncfusion.EJ2.Charts.ChartTooltipSettings { 
                                       Enable = true,
                                       Format = '${series.name} : ${point.y}'
                                   })"
                                   legendSettings="@(new Syncfusion.EJ2.Charts.ChartLegendSettings { 
                                       Visible = true,
                                       Position = Syncfusion.EJ2.Charts.LegendPosition.Top
                                   })">
                            <e-chart-primaryxaxis valueType="Category" 
                                                 labelRotation="-45"
                                                 interval="1">
                            </e-chart-primaryxaxis>
                            <e-chart-primaryyaxis valueType="Double" 
                                                 labelFormat="C2">
                            </e-chart-primaryyaxis>
                            <e-series-collection>
                                <e-series type="Column" 
                                         xName="mes" 
                                         yName="ventas" 
                                         name="Ventas Totales"
                                         dataSource="@(new List<object>())">
                                </e-series>
                            </e-series-collection>
                        </ejs-chart>
                    </div>
                </e-content-template>
            </e-tab-item>
            
            <e-tab-item header="@(new Syncfusion.EJ2.Navigations.TabHeader { Text = "Estado de Órdenes" })">
                <e-content-template>
                    <div class="p-3">
                        <ejs-accumulationchart id="chartEstadoOrdenes" 
                                              title="Distribución por Estado"
                                              enableAnimation="true"
                                              tooltip="@(new Syncfusion.EJ2.AccumulationChart.AccumulationTooltipSettings { 
                                                  Enable = true,
                                                  Format = '${point.x} : ${point.y} (${point.percentage}%)'
                                              })"
                                              legendSettings="@(new Syncfusion.EJ2.AccumulationChart.AccumulationLegendSettings { 
                                                  Visible = true,
                                                  Position = Syncfusion.EJ2.AccumulationChart.LegendPosition.Right
                                              })">
                            <e-accumulation-series-collection>
                                <e-accumulation-series type="Pie" 
                                                      xName="estado" 
                                                      yName="cantidad" 
                                                      dataSource="@(new List<object>())"
                                                      dataLabel="@(new Syncfusion.EJ2.AccumulationChart.AccumulationDataLabelSettings { 
                                                          Visible = true,
                                                          Name = '${point.x}',
                                                          Position = Syncfusion.EJ2.AccumulationChart.AccumulationLabelPosition.Outside
                                                      })">
                                </e-accumulation-series>
                            </e-accumulation-series-collection>
                        </ejs-accumulationchart>
                    </div>
                </e-content-template>
            </e-tab-item>
            
            <e-tab-item header="@(new Syncfusion.EJ2.Navigations.TabHeader { Text = "Tendencias" })">
                <e-content-template>
                    <div class="p-3">
                        <ejs-chart id="chartTendencias" 
                                   title="Tendencia de Ventas"
                                   enableAnimation="true"
                                   tooltip="@(new Syncfusion.EJ2.Charts.ChartTooltipSettings { 
                                       Enable = true
                                   })">
                            <e-chart-primaryxaxis valueType="DateTime" 
                                                 labelFormat="dd/MM/yyyy">
                            </e-chart-primaryxaxis>
                            <e-chart-primaryyaxis valueType="Double" 
                                                 labelFormat="C2">
                            </e-chart-primaryyaxis>
                            <e-series-collection>
                                <e-series type="Line" 
                                         xName="fecha" 
                                         yName="ventas" 
                                         name="Ventas Diarias"
                                         marker="@(new Syncfusion.EJ2.Charts.ChartMarkerSettings { 
                                             Visible = true,
                                             Width = 10,
                                             Height = 10
                                         })"
                                         dataSource="@(new List<object>())">
                                </e-series>
                            </e-series-collection>
                        </ejs-chart>
                    </div>
                </e-content-template>
            </e-tab-item>
        </e-tab-tabitems>
    </ejs-tab>
</div>

@section Scripts {
    <script src="~/js/Orders/Analytics.js" asp-append-version="true"></script>
}
```

**JavaScript**: `wwwroot/js/Orders/Analytics.js`
```javascript
window.Orders.Analytics = window.Orders.Analytics || {};

(function() {
    'use strict';
    
    window.Orders.Analytics.CargarVentasPorMes = function() {
        $.ajax({
            url: '/Orders/ObtenerVentasPorMes',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var chart = document.getElementById('chartVentasPorMes').ej2_instances[0];
                    if (chart) {
                        chart.series[0].dataSource = respuesta.datos;
                        chart.refresh();
                    }
                }
            }
        });
    };
    
    window.Orders.Analytics.CargarEstadoOrdenes = function() {
        $.ajax({
            url: '/Orders/ObtenerEstadoOrdenes',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var chart = document.getElementById('chartEstadoOrdenes').ej2_instances[0];
                    if (chart) {
                        chart.series[0].dataSource = respuesta.datos;
                        chart.refresh();
                    }
                }
            }
        });
    };
    
    window.Orders.Analytics.CargarTendencias = function() {
        $.ajax({
            url: '/Orders/ObtenerTendencias',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    var chart = document.getElementById('chartTendencias').ej2_instances[0];
                    if (chart) {
                        chart.series[0].dataSource = respuesta.datos;
                        chart.refresh();
                    }
                }
            }
        });
    };
    
    // Cargar todos los gráficos al iniciar
    $(document).ready(function() {
        window.Orders.Analytics.CargarVentasPorMes();
        window.Orders.Analytics.CargarEstadoOrdenes();
        window.Orders.Analytics.CargarTendencias();
    });
})();
```

**Controller**:
```csharp
[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerVentasPorMes()
{
    try
    {
        var datos = _ordersService.ObtenerVentasPorMesAsync().Result;
        return Json(new { exito = true, datos = datos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerEstadoOrdenes()
{
    try
    {
        var datos = _ordersService.ObtenerEstadoOrdenesAsync().Result;
        return Json(new { exito = true, datos = datos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}

[HttpPost]
[IgnoreAntiforgeryToken]
public IActionResult ObtenerTendencias()
{
    try
    {
        var datos = _ordersService.ObtenerTendenciasAsync().Result;
        return Json(new { exito = true, datos = datos });
    }
    catch (Exception excepcion)
    {
        return Json(new { exito = false, mensaje = excepcion.Message });
    }
}
```

### 7. Query Builder para Filtros Avanzados

#### Query Builder Integrado

**Uso**: Construir filtros complejos con múltiples condiciones.

**Implementación**:
```html
<ejs-querybuilder id="queryBuilderOrdenes" 
                  dataSource="@(new List<object>())"
                  rule="Orders.QueryBuilder.ObtenerReglaPorDefecto()"
                  width="100%"
                  created="queryBuilderOrdenesCreated"
                  ruleChange="queryBuilderOrdenesRuleChange">
    <e-querybuilder-columns>
        <e-querybuilder-column field="IdOrden" label="ID Orden" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="IdCliente" label="ID Cliente" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="IdTienda" label="ID Tienda" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="EstadoOrden" label="Estado" type="string">
            <e-querybuilder-operators>
                <e-querybuilder-operator value="equal" key="Igual"></e-querybuilder-operator>
                <e-querybuilder-operator value="notequal" key="Diferente"></e-querybuilder-operator>
            </e-querybuilder-operators>
            <e-querybuilder-values>
                <e-querybuilder-value value="COMPLETE" label="Completada"></e-querybuilder-value>
                <e-querybuilder-value value="CANCELLED" label="Cancelada"></e-querybuilder-value>
                <e-querybuilder-value value="REFUNDED" label="Reembolsada"></e-querybuilder-value>
            </e-querybuilder-values>
        </e-querybuilder-column>
        <e-querybuilder-column field="FechaOrden" label="Fecha" type="date"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<div class="row mt-3">
    <div class="col-12">
        <button type="button" class="btn btn-primary" onclick="Orders.QueryBuilder.AplicarFiltros()">
            <i class="fas fa-filter"></i> Aplicar Filtros
        </button>
        <button type="button" class="btn btn-secondary" onclick="Orders.QueryBuilder.Limpiar()">
            <i class="fas fa-times"></i> Limpiar
        </button>
        <button type="button" class="btn btn-info" onclick="Orders.QueryBuilder.Guardar()">
            <i class="fas fa-save"></i> Guardar Filtro
        </button>
    </div>
</div>
```

**JavaScript**:
```javascript
window.Orders.QueryBuilder = {
    ObtenerReglaPorDefecto: function() {
        return {
            condition: 'and',
            rules: [
                {
                    label: 'Estado',
                    field: 'EstadoOrden',
                    operator: 'equal',
                    value: 'COMPLETE'
                }
            ]
        };
    },
    
    AplicarFiltros: function() {
        var queryBuilder = document.getElementById('queryBuilderOrdenes').ej2_instances[0];
        if (!queryBuilder) return;
        
        var reglas = queryBuilder.getValidRules();
        if (!reglas || !reglas.rules || reglas.rules.length === 0) {
            window.Orders.Toast.MostrarAdvertencia('Filtros', 'Debe definir al menos una condición.');
            return;
        }
        
        // Convertir reglas a formato de filtro para el grid
        var filtros = this.ConvertirReglasAFiltros(reglas);
        
        // Aplicar filtros al grid
        window.Orders.Grid.AplicarFiltrosAvanzados(filtros);
    },
    
    ConvertirReglasAFiltros: function(reglas) {
        // Lógica para convertir reglas del Query Builder a filtros del Grid
        var filtros = {};
        
        if (reglas.rules) {
            reglas.rules.forEach(function(regla) {
                if (regla.field === 'EstadoOrden') {
                    filtros.estado = regla.value;
                } else if (regla.field === 'IdCliente') {
                    filtros.idCliente = regla.value;
                } else if (regla.field === 'IdTienda') {
                    filtros.idTienda = regla.value;
                } else if (regla.field === 'FechaOrden') {
                    if (regla.operator === 'greaterthanorequal') {
                        filtros.fechaInicio = regla.value;
                    } else if (regla.operator === 'lessthanorequal') {
                        filtros.fechaFin = regla.value;
                    }
                }
            });
        }
        
        return filtros;
    },
    
    Limpiar: function() {
        var queryBuilder = document.getElementById('queryBuilderOrdenes').ej2_instances[0];
        if (queryBuilder) {
            queryBuilder.reset();
        }
        window.Orders.Grid.CargarDatos(); // Recargar sin filtros
    },
    
    Guardar: function() {
        var queryBuilder = document.getElementById('queryBuilderOrdenes').ej2_instances[0];
        if (!queryBuilder) return;
        
        var nombreFiltro = prompt('Ingrese un nombre para este filtro:');
        if (!nombreFiltro) return;
        
        var reglas = queryBuilder.getValidRules();
        
        // Guardar en localStorage o enviar al servidor
        var filtrosGuardados = JSON.parse(localStorage.getItem('filtrosOrdenes') || '[]');
        filtrosGuardados.push({
            nombre: nombreFiltro,
            reglas: reglas,
            fechaCreacion: new Date().toISOString()
        });
        localStorage.setItem('filtrosOrdenes', JSON.stringify(filtrosGuardados));
        
        window.Orders.Toast.MostrarExito('Filtro Guardado', 'El filtro se guardó correctamente.');
    }
};

window.queryBuilderOrdenesCreated = function() {
    // Inicializar Query Builder
};

window.queryBuilderOrdenesRuleChange = function() {
    // Validar reglas en tiempo real
};
```

### 8. Kanban para Gestión de Estados

#### Vista Kanban de Órdenes

**Nueva Vista**: `Views/Orders/Kanban.cshtml`

**Implementación**:
```html
@{
    ViewData["Title"] = "Kanban - Órdenes";
}

<div class="container-fluid">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a asp-controller="Home" asp-action="Index">Dashboard</a></li>
            <li class="breadcrumb-item"><a asp-controller="Orders" asp-action="Index">Órdenes</a></li>
            <li class="breadcrumb-item active" aria-current="page">Kanban</li>
        </ol>
    </nav>

    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0">Gestión de Órdenes - Vista Kanban</h2>
            <p class="text-muted">Visualización y gestión de órdenes por estado</p>
        </div>
    </div>

    <ejs-kanban id="kanbanOrdenes" 
                keyField="EstadoOrden"
                dataSource="@(new List<object>())"
                cardSettings="@(new Syncfusion.EJ2.Kanban.KanbanCardSettings { 
                    ContentField = "Resumen",
                    HeaderField = "IdOrden",
                    Template = "#cardTemplate"
                })"
                allowDragAndDrop="true"
                dragStop="kanbanOrdenesDragStop">
        <e-kanban-columns>
            <e-kanban-column headerText="Completadas" keyField="COMPLETE" allowToggle="true"></e-kanban-column>
            <e-kanban-column headerText="Canceladas" keyField="CANCELLED" allowToggle="true"></e-kanban-column>
            <e-kanban-column headerText="Reembolsadas" keyField="REFUNDED" allowToggle="true"></e-kanban-column>
        </e-kanban-columns>
        <e-kanban-swimlaneSettings keyField="IdTienda" textField="NombreTienda"></e-kanban-swimlaneSettings>
    </ejs-kanban>
</div>

<script id="cardTemplate" type="text/x-template">
    <div class="card-kanban">
        <div class="card-header-kanban">
            <strong>Orden #${IdOrden}</strong>
            <span class="badge ${getEstadoBadgeClass(EstadoOrden)}">${EstadoOrden}</span>
        </div>
        <div class="card-body-kanban">
            <p><strong>Cliente:</strong> ${IdCliente}</p>
            <p><strong>Fecha:</strong> ${formatFecha(FechaOrden)}</p>
            <p><strong>Tienda:</strong> ${IdTienda}</p>
        </div>
        <div class="card-footer-kanban">
            <button class="btn btn-sm btn-info" onclick="Orders.Kanban.VerDetalles(${IdOrden})">
                <i class="fas fa-eye"></i> Ver
            </button>
        </div>
    </div>
</script>

@section Scripts {
    <script src="~/js/Orders/Kanban.js" asp-append-version="true"></script>
}
```

**JavaScript**: `wwwroot/js/Orders/Kanban.js`
```javascript
window.Orders.Kanban = window.Orders.Kanban || {};

(function() {
    'use strict';
    
    window.Orders.Kanban.CargarDatos = function() {
        $.ajax({
            url: '/Orders/ObtenerOrders',
            method: 'POST',
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    // Transformar datos para Kanban
                    var datosKanban = respuesta.datos.map(function(orden) {
                        return {
                            IdOrden: orden.IdOrden,
                            IdCliente: orden.IdCliente,
                            IdTienda: orden.IdTienda,
                            FechaOrden: orden.FechaOrden,
                            EstadoOrden: orden.EstadoOrden,
                            Resumen: 'Orden #' + orden.IdOrden + ' - Cliente: ' + orden.IdCliente
                        };
                    });
                    
                    var kanban = document.getElementById('kanbanOrdenes').ej2_instances[0];
                    if (kanban) {
                        kanban.dataSource = datosKanban;
                        kanban.dataBind();
                    }
                }
            }
        });
    };
    
    window.Orders.Kanban.VerDetalles = function(idOrden) {
        window.location.href = '/Orders/Details/' + idOrden;
    };
    
    window.kanbanOrdenesDragStop = function(args) {
        // Cuando se mueve una tarjeta entre columnas, actualizar estado
        var orden = args.data;
        var nuevoEstado = args.targetKey;
        
        if (orden.EstadoOrden !== nuevoEstado) {
            // Validar reglas de negocio antes de cambiar estado
            if (!window.Orders.Validaciones.ValidarCambioEstado(orden.EstadoOrden, nuevoEstado)) {
                args.cancel = true;
                window.Orders.Toast.MostrarError('Error', 'No se puede cambiar el estado de esta orden.');
                return;
            }
            
            // Actualizar estado en servidor
            window.Orders.Kanban.ActualizarEstado(orden.IdOrden, nuevoEstado);
        }
    };
    
    window.Orders.Kanban.ActualizarEstado = function(idOrden, nuevoEstado) {
        $.ajax({
            url: '/Orders/ActualizarEstado',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ IdOrden: idOrden, EstadoOrden: nuevoEstado }),
            success: function(respuesta) {
                if (respuesta.exito) {
                    window.Orders.Toast.MostrarExito('Estado Actualizado', 'El estado de la orden se actualizó correctamente.');
                } else {
                    window.Orders.Toast.MostrarError('Error', respuesta.mensaje);
                    // Recargar para revertir cambio visual
                    window.Orders.Kanban.CargarDatos();
                }
            },
            error: function() {
                window.Orders.Toast.MostrarError('Error de Conexión', 'No se pudo actualizar el estado.');
                window.Orders.Kanban.CargarDatos();
            }
        });
    };
    
    $(document).ready(function() {
        window.Orders.Kanban.CargarDatos();
    });
})();
```

### 9. Scheduler/Calendar para Vista Temporal

#### Vista Calendar de Órdenes

**Nueva Vista**: `Views/Orders/Calendar.cshtml`

**Implementación**:
```html
@{
    ViewData["Title"] = "Calendario - Órdenes";
}

<div class="container-fluid">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a asp-controller="Home" asp-action="Index">Dashboard</a></li>
            <li class="breadcrumb-item"><a asp-controller="Orders" asp-action="Index">Órdenes</a></li>
            <li class="breadcrumb-item active" aria-current="page">Calendario</li>
        </ol>
    </nav>

    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0">Calendario de Órdenes</h2>
            <p class="text-muted">Visualización temporal de órdenes</p>
        </div>
    </div>

    <ejs-schedule id="scheduleOrdenes" 
                  height="650px"
                  selectedDate="@DateTime.Now"
                  eventSettings="@(new Syncfusion.EJ2.Schedule.ScheduleEventSettings { 
                      DataSource = new List<object>()
                  })"
                  currentView="Month"
                  actionBegin="scheduleOrdenesActionBegin"
                  eventClick="scheduleOrdenesEventClick"
                  popupOpen="scheduleOrdenesPopupOpen">
        <e-schedule-views>
            <e-schedule-view option="Day"></e-schedule-view>
            <e-schedule-view option="Week"></e-schedule-view>
            <e-schedule-view option="Month" isSelected="true"></e-schedule-view>
            <e-schedule-view option="Agenda"></e-schedule-view>
        </e-schedule-views>
    </ejs-schedule>
</div>

@section Scripts {
    <script src="~/js/Orders/Calendar.js" asp-append-version="true"></script>
}
```

**JavaScript**: `wwwroot/js/Orders/Calendar.js`
```javascript
window.Orders.Calendar = window.Orders.Calendar || {};

(function() {
    'use strict';
    
    window.Orders.Calendar.CargarEventos = function(fechaInicio, fechaFin) {
        $.ajax({
            url: '/Orders/ObtenerOrdenesPorRangoFechas',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                FechaInicio: fechaInicio,
                FechaFin: fechaFin
            }),
            success: function(respuesta) {
                if (respuesta.exito && respuesta.datos) {
                    // Transformar órdenes a eventos del Scheduler
                    var eventos = respuesta.datos.map(function(orden) {
                        return {
                            Id: orden.IdOrden,
                            Subject: 'Orden #' + orden.IdOrden + ' - Cliente: ' + orden.IdCliente,
                            StartTime: new Date(orden.FechaOrden),
                            EndTime: new Date(orden.FechaOrden),
                            Description: 'Estado: ' + orden.EstadoOrden + ', Tienda: ' + orden.IdTienda,
                            CategoryColor: window.Orders.Calendar.ObtenerColorPorEstado(orden.EstadoOrden)
                        };
                    });
                    
                    var schedule = document.getElementById('scheduleOrdenes').ej2_instances[0];
                    if (schedule) {
                        schedule.eventSettings.dataSource = eventos;
                        schedule.dataBind();
                    }
                }
            }
        });
    };
    
    window.Orders.Calendar.ObtenerColorPorEstado = function(estado) {
        var colores = {
            'COMPLETE': '#28a745',
            'CANCELLED': '#ffc107',
            'REFUNDED': '#dc3545'
        };
        return colores[estado] || '#6c757d';
    };
    
    window.scheduleOrdenesActionBegin = function(args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            // Validar antes de crear/modificar evento
        }
    };
    
    window.scheduleOrdenesEventClick = function(args) {
        // Al hacer clic en un evento, navegar a detalles
        var idOrden = args.event.Id;
        window.Orders.Detalles.Ver(idOrden);
    };
    
    window.scheduleOrdenesPopupOpen = function(args) {
        // Personalizar popup de creación/edición
    };
    
    $(document).ready(function() {
        var schedule = document.getElementById('scheduleOrdenes').ej2_instances[0];
        if (schedule) {
            // Cargar eventos para el rango visible
            var fechaInicio = schedule.getCurrentViewDates()[0];
            var fechaFin = schedule.getCurrentViewDates()[schedule.getCurrentViewDates().length - 1];
            window.Orders.Calendar.CargarEventos(fechaInicio, fechaFin);
        }
    });
})();
```

## Implementación por Capas

### Capa ModelosComunes

#### Modelos Adicionales

**SolicitudCrearOrden.cs**:
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class SolicitudCrearOrden
{
    public int IdCliente { get; set; }
    public int IdTienda { get; set; }
    public List<SolicitudItemOrden> Items { get; set; } = new List<SolicitudItemOrden>();
}

public class SolicitudItemOrden
{
    public int IdProducto { get; set; }
    public int Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Descuento { get; set; }
}
```

**SolicitudActualizarEstado.cs**:
```csharp
namespace AdministracionFlotillas.ModelosComunes;

public class SolicitudActualizarEstado
{
    public int IdOrden { get; set; }
    public string EstadoOrden { get; set; } = string.Empty;
    public string? Motivo { get; set; }
}
```

### Capa AccesoDatos

#### Repositorio Expandido

**IOrdersRepository.cs**:
```csharp
public interface IOrdersRepository
{
    Task<List<Order>> ObtenerOrdersAsync();
    Task<Order?> ObtenerOrderPorIdAsync(int idOrden);
    Task<List<Order>> BuscarOrdersAsync(SolicitudBuscarOrdenes solicitud);
    Task<Order> CrearOrderAsync(SolicitudCrearOrden solicitud);
    Task<bool> ActualizarOrderAsync(Order orden);
    Task<bool> ActualizarEstadoAsync(int idOrden, string nuevoEstado);
    Task<bool> CancelarOrderAsync(int idOrden, string motivo);
    Task<Dictionary<string, object>> ObtenerVentasPorMesAsync();
    Task<Dictionary<string, object>> ObtenerEstadoOrdenesAsync();
    Task<List<Dictionary<string, object>>> ObtenerTendenciasAsync();
}
```

**OrdersRepository.cs** - Métodos adicionales:
```csharp
public async Task<Order> CrearOrderAsync(SolicitudCrearOrden solicitud)
{
    using var conexion = new OracleConnection(_connectionString);
    await conexion.OpenAsync();
    
    using var comando = new OracleCommand("PKG_ORDERS.SP_CREAR_ORDER", conexion)
    {
        CommandType = CommandType.StoredProcedure
    };
    
    // Parámetros de entrada
    comando.Parameters.Add("P_CUSTOMER_ID", OracleDbType.Int32).Value = solicitud.IdCliente;
    comando.Parameters.Add("P_STORE_ID", OracleDbType.Int32).Value = solicitud.IdTienda;
    
    // Parámetros de salida
    var resultado = new OracleParameter("P_RESULTADO", OracleDbType.RefCursor)
    {
        Direction = ParameterDirection.Output
    };
    comando.Parameters.Add(resultado);
    
    var exito = new OracleParameter("P_EXITO", OracleDbType.Int32)
    {
        Direction = ParameterDirection.Output
    };
    comando.Parameters.Add(exito);
    
    var mensaje = new OracleParameter("P_MENSAJE", OracleDbType.Varchar2, 500)
    {
        Direction = ParameterDirection.Output
    };
    comando.Parameters.Add(mensaje);
    
    await comando.ExecuteNonQueryAsync();
    
    if (exito.Value?.ToString() == "1")
    {
        using var lector = ((OracleRefCursor)resultado.Value).GetDataReader();
        if (await lector.ReadAsync())
        {
            return OrderParseador.ParsearDesdeDataReader(lector);
        }
    }
    
    throw new Exception(mensaje.Value?.ToString() ?? "Error al crear la orden.");
}
```

### Capa ReglasNegocio

#### Servicio con Validaciones

**OrdersServiceOracle.cs** - Métodos adicionales:
```csharp
public async Task<bool> ValidarClienteActivoAsync(int idCliente)
{
    var cliente = await _customersRepository.ObtenerCustomerPorIdAsync(idCliente);
    return cliente?.Status == "ACTIVE";
}

public async Task<bool> ValidarStockDisponibleAsync(List<SolicitudItemOrden> items)
{
    foreach (var item in items)
    {
        var inventario = await _inventoryRepository.ObtenerInventarioPorProductoAsync(item.IdProducto);
        if (inventario == null || inventario.QuantityOnHand < item.Cantidad)
        {
            return false;
        }
    }
    return true;
}

public async Task<Order> CrearOrderAsync(SolicitudCrearOrden solicitud)
{
    // Validar reglas de negocio
    if (!await ValidarClienteActivoAsync(solicitud.IdCliente))
    {
        throw new InvalidOperationException("El cliente no está activo.");
    }
    
    if (!await ValidarStockDisponibleAsync(solicitud.Items))
    {
        throw new InvalidOperationException("No hay stock suficiente para algunos productos.");
    }
    
    // Crear orden
    var orden = await _ordersRepository.CrearOrderAsync(solicitud);
    
    // Actualizar inventario
    foreach (var item in solicitud.Items)
    {
        await _inventoryRepository.ReservarStockAsync(item.IdProducto, item.Cantidad);
    }
    
    return orden;
}
```

## Stored Procedures Adicionales

### PKG_ORDERS - Procedimientos Adicionales

**SP_CREAR_ORDER**:
```sql
PROCEDURE SP_CREAR_ORDER(
    P_CUSTOMER_ID IN NUMBER,
    P_STORE_ID IN NUMBER,
    P_RESULTADO OUT SYS_REFCURSOR,
    P_EXITO OUT NUMBER,
    P_MENSAJE OUT VARCHAR2
) AS
    V_ORDER_ID NUMBER;
BEGIN
    -- Validar cliente activo
    SELECT COUNT(*) INTO V_ORDER_ID
    FROM CUSTOMERS
    WHERE CUSTOMER_ID = P_CUSTOMER_ID
      AND STATUS = 'ACTIVE';
    
    IF V_ORDER_ID = 0 THEN
        P_EXITO := 0;
        P_MENSAJE := 'El cliente no está activo.';
        RETURN;
    END IF;
    
    -- Crear orden
    INSERT INTO ORDERS (ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID)
    VALUES (SEQ_ORDERS.NEXTVAL, SYSTIMESTAMP, P_CUSTOMER_ID, 'PENDING', P_STORE_ID)
    RETURNING ORDER_ID INTO V_ORDER_ID;
    
    -- Retornar orden creada
    OPEN P_RESULTADO FOR
        SELECT ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID
        FROM ORDERS
        WHERE ORDER_ID = V_ORDER_ID;
    
    P_EXITO := 1;
    P_MENSAJE := 'Orden creada correctamente.';
EXCEPTION
    WHEN OTHERS THEN
        P_EXITO := 0;
        P_MENSAJE := SQLERRM;
END SP_CREAR_ORDER;
```

**SP_ACTUALIZAR_ESTADO**:
```sql
PROCEDURE SP_ACTUALIZAR_ESTADO(
    P_ORDER_ID IN NUMBER,
    P_NUEVO_ESTADO IN VARCHAR2,
    P_EXITO OUT NUMBER,
    P_MENSAJE OUT VARCHAR2
) AS
BEGIN
    -- Validar que la orden existe
    UPDATE ORDERS
    SET ORDER_STATUS = P_NUEVO_ESTADO
    WHERE ORDER_ID = P_ORDER_ID;
    
    IF SQL%ROWCOUNT = 0 THEN
        P_EXITO := 0;
        P_MENSAJE := 'La orden no existe.';
        RETURN;
    END IF;
    
    P_EXITO := 1;
    P_MENSAJE := 'Estado actualizado correctamente.';
EXCEPTION
    WHEN OTHERS THEN
        P_EXITO := 0;
        P_MENSAJE := SQLERRM;
END SP_ACTUALIZAR_ESTADO;
```

**SP_OBTENER_VENTAS_POR_MES**:
```sql
PROCEDURE SP_OBTENER_VENTAS_POR_MES(
    P_RESULTADO OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_RESULTADO FOR
        SELECT 
            TO_CHAR(TRUNC(O.ORDER_TMS, 'MM'), 'YYYY-MM') AS mes,
            COUNT(*) AS cantidad_ordenes,
            SUM(COALESCE(OI.TOTAL, 0)) AS total_ventas
        FROM ORDERS O
        LEFT JOIN (
            SELECT ORDER_ID, SUM(TOTAL) AS TOTAL
            FROM ORDER_ITEMS
            GROUP BY ORDER_ID
        ) OI ON O.ORDER_ID = OI.ORDER_ID
        WHERE O.ORDER_STATUS = 'COMPLETE'
        GROUP BY TO_CHAR(TRUNC(O.ORDER_TMS, 'MM'), 'YYYY-MM')
        ORDER BY mes DESC;
END SP_OBTENER_VENTAS_POR_MES;
```

## Nuevas Vistas y Funcionalidades

### 1. Vista de Análisis Avanzado

**Ruta**: `/Orders/Analytics`

**Funcionalidades**:
- Gráficos de ventas por mes (Column Chart)
- Distribución por estado (Pie Chart)
- Tendencias temporales (Line Chart)
- Comparación por tienda (Bar Chart)
- Exportación de gráficos a imagen

### 2. Vista Kanban

**Ruta**: `/Orders/Kanban`

**Funcionalidades**:
- Visualización de órdenes por estado en columnas
- Drag and drop entre estados
- Swimlanes por tienda
- Filtros en Kanban
- Agregaciones por columna

### 3. Vista Calendar

**Ruta**: `/Orders/Calendar`

**Funcionalidades**:
- Vista mensual, semanal, diaria, agenda
- Eventos coloreados por estado
- Crear orden desde calendario
- Navegación a detalles desde evento

### 4. Vista de Query Builder

**Ruta**: `/Orders/QueryBuilder`

**Funcionalidades**:
- Construcción de filtros complejos
- Múltiples condiciones (AND, OR)
- Guardar y cargar filtros
- Aplicar filtros al grid

## Convenciones de Nomenclatura

### Español - Consistente en Todas las Capas

**Métodos C#**:
- `ObtenerOrdersAgrupadosAsync`
- `CrearOrderAsync`
- `ActualizarEstadoAsync`
- `CancelarOrderAsync`
- `ValidarClienteActivoAsync`
- `ValidarStockDisponibleAsync`

**Variables C#**:
- `listaOrdenesAgrupadas`
- `filtrosAvanzados`
- `configuracionAgregaciones`
- `solicitudCrearOrden`
- `nuevoEstado`

**Funciones JavaScript**:
- `CargarDatosAgrupados`
- `AplicarFiltrosAvanzados`
- `MostrarDialogCrear`
- `OcultarDialogCrear`
- `MostrarToastExito`
- `ActualizarTotales`

**Namespaces JavaScript**:
- `Orders.Grid.Agrupacion`
- `Orders.Dialog`
- `Orders.Toast`
- `Orders.QueryBuilder`
- `Orders.Kanban`
- `Orders.Calendar`
- `Orders.Analytics`

## Referencias a Documentación Oficial

- [Syncfusion Grid - Grouping](https://help.syncfusion.com/aspnet-core/grid/grouping)
- [Syncfusion Grid - Aggregation](https://help.syncfusion.com/aspnet-core/grid/aggregate)
- [Syncfusion Grid - Editing](https://help.syncfusion.com/aspnet-core/grid/editing)
- [Syncfusion Dialog](https://help.syncfusion.com/aspnet-core/dialog/getting-started)
- [Syncfusion Toast](https://help.syncfusion.com/aspnet-core/toast/getting-started)
- [Syncfusion ProgressBar](https://help.syncfusion.com/aspnet-core/progressbar/getting-started)
- [Syncfusion Charts](https://help.syncfusion.com/aspnet-core/chart/getting-started)
- [Syncfusion Query Builder](https://help.syncfusion.com/aspnet-core/query-builder/getting-started)
- [Syncfusion Kanban](https://help.syncfusion.com/aspnet-core/kanban/getting-started)
- [Syncfusion Scheduler](https://help.syncfusion.com/aspnet-core/scheduler/getting-started)

---

**Última actualización**: 2026-01-18  
**Versión**: 1.0  
**Propósito**: Enseñanza y desarrollo  
**Base de Datos**: Oracle Sample Schema CO
