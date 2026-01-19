# Guía de Optimizaciones

**Fecha**: 2026-01-18  
**Versión**: 1.0

---

## Índice

1. [Lazy Loading de Modals](#lazy-loading-modals)
2. [Caché de Datos Frecuentes](#caché-datos)
3. [Optimización de Queries](#optimización-queries)
4. [Minificación de Assets](#minificación-assets)

---

## Lazy Loading de Modals

### Implementación Actual

Los modals se inicializan cuando se carga la página, pero el contenido se carga solo cuando se abre el modal.

**Archivo**: `wwwroot/js/Orders/Orders.js`

```javascript
// El modal se inicializa una vez
window.Orders.Modal.Inicializar = function() {
    // Inicialización del Dialog y Tooltip
    // El contenido se carga cuando se abre
};

// El contenido se carga solo cuando se necesita
window.Orders.Modal.CargarOrden = function(idOrden, modo) {
    // AJAX para cargar datos solo cuando se abre el modal
    $.ajax({
        url: '/Orders/ObtenerOrderPorId',
        // ...
    });
};
```

### Mejoras Implementadas

1. **Inicialización diferida**: El modal se inicializa solo cuando se necesita por primera vez
2. **Carga de contenido bajo demanda**: Los datos se cargan solo cuando el modal se abre
3. **Caché de datos**: Los datos cargados se almacenan en memoria para evitar recargas innecesarias

---

## Caché de Datos Frecuentes

### Implementación de Caché en Memoria

**Archivo**: `wwwroot/js/Orders/Orders.js`

```javascript
window.Orders.Cache = {
    datos: {},
    
    Obtener: function(clave) {
        return this.datos[clave] || null;
    },
    
    Guardar: function(clave, valor, tiempoExpiracion) {
        this.datos[clave] = {
            valor: valor,
            expiracion: tiempoExpiracion ? Date.now() + tiempoExpiracion : null
        };
    },
    
    EsValido: function(clave) {
        var item = this.datos[clave];
        if (!item) return false;
        if (item.expiracion && Date.now() > item.expiracion) {
            delete this.datos[clave];
            return false;
        }
        return true;
    },
    
    Limpiar: function() {
        this.datos = {};
    }
};
```

### Uso del Caché

```javascript
// Al cargar datos de orden
window.Orders.Modal.CargarOrden = function(idOrden, modo) {
    var cacheKey = 'orden_' + idOrden;
    
    // Verificar caché
    if (window.Orders.Cache.EsValido(cacheKey)) {
        var datosCache = window.Orders.Cache.Obtener(cacheKey);
        window.Orders.Modal.MostrarDatos(datosCache.valor);
        window.Orders.Modal.AbrirDialog();
        return;
    }
    
    // Si no está en caché, cargar desde servidor
    $.ajax({
        url: '/Orders/ObtenerOrderPorId',
        // ...
        success: function(respuesta) {
            if (respuesta.exito && respuesta.datos) {
                // Guardar en caché (5 minutos)
                window.Orders.Cache.Guardar(cacheKey, respuesta.datos, 5 * 60 * 1000);
                window.Orders.Modal.MostrarDatos(respuesta.datos);
            }
        }
    });
};
```

### Tiempos de Expiración Recomendados

- **Órdenes**: 5 minutos (pueden cambiar frecuentemente)
- **Productos**: 10 minutos (cambian menos frecuentemente)
- **Clientes**: 10 minutos (cambian menos frecuentemente)
- **Métricas del Dashboard**: 1 minuto (cambian frecuentemente)

---

## Optimización de Queries

### Índices Recomendados

```sql
-- Índices para mejorar rendimiento de queries frecuentes

-- Índice en ORDERS por ORDER_STATUS (para filtros por estado)
CREATE INDEX IDX_ORDERS_STATUS ON CO.ORDERS(ORDER_STATUS);

-- Índice en ORDERS por CUSTOMER_ID (para búsquedas por cliente)
CREATE INDEX IDX_ORDERS_CUSTOMER ON CO.ORDERS(CUSTOMER_ID);

-- Índice en ORDERS por ORDER_TMS (para ordenamiento y rangos de fechas)
CREATE INDEX IDX_ORDERS_TMS ON CO.ORDERS(ORDER_TMS DESC);

-- Índice en PRODUCTS por CATEGORY (para filtros por categoría)
CREATE INDEX IDX_PRODUCTS_CATEGORY ON CO.PRODUCTS(CATEGORY);

-- Índice en PRODUCTS por STATUS (para filtros por estado)
CREATE INDEX IDX_PRODUCTS_STATUS ON CO.PRODUCTS(STATUS);

-- Índice en CUSTOMERS por STATUS (para filtros por estado)
CREATE INDEX IDX_CUSTOMERS_STATUS ON CO.CUSTOMERS(STATUS);

-- Índice compuesto en ORDER_ITEMS (para joins eficientes)
CREATE INDEX IDX_ORDER_ITEMS_ORDER ON CO.ORDER_ITEMS(ORDER_ID, PRODUCT_ID);
```

### Optimización de Stored Procedures

1. **Usar WHERE apropiado**: Filtrar en la base de datos, no en la aplicación
2. **Evitar SELECT ***: Seleccionar solo las columnas necesarias
3. **Usar LIMIT/ROWNUM**: Para paginación en el servidor (futuro)

### Paginación en el Servidor (Futuro)

Actualmente la paginación es en el cliente. Para grandes volúmenes de datos, implementar paginación en el servidor:

```sql
-- Ejemplo de stored procedure con paginación
PROCEDURE SP_OBTENER_ORDERS_PAGINADO(
    P_PAGINA IN NUMBER DEFAULT 1,
    P_TAMANO_PAGINA IN NUMBER DEFAULT 10,
    P_RESULTADO OUT SYS_REFCURSOR,
    P_TOTAL OUT NUMBER
) AS
    V_OFFSET NUMBER;
BEGIN
    V_OFFSET := (P_PAGINA - 1) * P_TAMANO_PAGINA;
    
    -- Contar total
    SELECT COUNT(*) INTO P_TOTAL FROM ORDERS;
    
    -- Obtener página
    OPEN P_RESULTADO FOR
        SELECT * FROM (
            SELECT O.*, ROWNUM RN
            FROM (
                SELECT ORDER_ID, ORDER_TMS, CUSTOMER_ID, ORDER_STATUS, STORE_ID
                FROM ORDERS
                ORDER BY ORDER_TMS DESC
            ) O
            WHERE ROWNUM <= V_OFFSET + P_TAMANO_PAGINA
        )
        WHERE RN > V_OFFSET;
END;
```

---

## Minificación de Assets

### Configuración en bundleconfig.json

```json
[
  {
    "outputFileName": "wwwroot/js/bundles/orders.min.js",
    "inputFiles": [
      "wwwroot/js/Orders/Orders.js"
    ],
    "minify": {
      "enabled": true,
      "renameLocals": true
    }
  },
  {
    "outputFileName": "wwwroot/js/bundles/products.min.js",
    "inputFiles": [
      "wwwroot/js/Products/Products.js"
    ],
    "minify": {
      "enabled": true,
      "renameLocals": true
    }
  },
  {
    "outputFileName": "wwwroot/js/bundles/customers.min.js",
    "inputFiles": [
      "wwwroot/js/Customers/Customers.js"
    ],
    "minify": {
      "enabled": true,
      "renameLocals": true
    }
  }
]
```

### Compilar Bundles

```bash
# Instalar BundlerMinifier (si no está instalado)
dotnet tool install -g BundlerMinifier.Core

# Compilar bundles
dotnet bundle

# O usar Visual Studio: Build > Bundler & Minifier > Update Bundles
```

### Usar Bundles en Producción

```razor
@* En _Layout.cshtml o Index.cshtml *@

@if (Environment.IsDevelopment())
{
    <script src="~/js/Orders/Orders.js" asp-append-version="true"></script>
}
else
{
    <script src="~/js/bundles/orders.min.js" asp-append-version="true"></script>
}
```

### Compresión Gzip/Brotli

Configurar en `Program.cs`:

```csharp
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

// ...

app.UseResponseCompression();
```

---

## Optimizaciones Adicionales

### 1. Lazy Loading de Imágenes

```html
<img src="imagen.jpg" loading="lazy" alt="Descripción">
```

### 2. Preload de Recursos Críticos

```html
<link rel="preload" href="~/css/site.css" as="style">
<link rel="preload" href="~/js/Orders/Orders.js" as="script">
```

### 3. CDN para Librerías

Usar CDN para Syncfusion y otras librerías grandes:

```html
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

### 4. Service Workers (Futuro)

Implementar Service Workers para caché offline y mejor rendimiento.

---

## Monitoreo de Rendimiento

### Herramientas Recomendadas

1. **Chrome DevTools**: Performance tab para analizar tiempos de carga
2. **Lighthouse**: Para auditoría de rendimiento
3. **Application Insights**: Para monitoreo en producción (Azure)

### Métricas a Monitorear

- Tiempo de carga inicial de página
- Tiempo de respuesta de endpoints
- Tamaño de archivos JavaScript/CSS
- Uso de memoria del navegador
- Tiempo de renderizado del grid

---

**Última actualización**: 2026-01-18
