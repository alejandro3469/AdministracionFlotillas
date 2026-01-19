# Guía de Troubleshooting

**Fecha**: 2026-01-18  
**Versión**: 1.0

---

## Índice

1. [Problemas de Conexión a Base de Datos](#problemas-de-conexión)
2. [Errores de Stored Procedures](#errores-stored-procedures)
3. [Problemas de UI/JavaScript](#problemas-ui)
4. [Errores de Compilación](#errores-compilación)
5. [Problemas de Rendimiento](#problemas-rendimiento)
6. [Errores Comunes](#errores-comunes)

---

## Problemas de Conexión a Base de Datos

### Error: ORA-01017: invalid username/password

**Síntomas**: La aplicación no puede conectarse a Oracle Database.

**Soluciones**:
1. Verificar el connection string en `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Data Source=...;User Id=FLOTILLAS_APP;Password=..."
     }
   }
   ```

2. Verificar que el usuario `FLOTILLAS_APP` existe y tiene la contraseña correcta:
   ```sql
   SELECT username FROM dba_users WHERE username = 'FLOTILLAS_APP';
   ```

3. Si la contraseña expiró, resetearla:
   ```sql
   ALTER USER FLOTILLAS_APP IDENTIFIED BY "nueva_contraseña";
   ```

---

### Error: ORA-12154: TNS:could not resolve the connect identifier

**Síntomas**: No se puede resolver el nombre del servidor de base de datos.

**Soluciones**:
1. Verificar que el `Data Source` en el connection string es correcto
2. Si usas Oracle Cloud, verificar el formato:
   ```
   Data Source=(description=(address=(protocol=tcps)(port=1522)(host=xxx.oraclecloud.com))(connect_data=(service_name=xxx.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=xxx, OU=Oracle ADB, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))
   ```

3. Verificar que el archivo `tnsnames.ora` está configurado correctamente (si se usa)

---

### Error: ORA-01006: bind variable does not exist

**Síntomas**: Error al ejecutar stored procedures con parámetros NULL.

**Solución**: Este error ya fue corregido en `SP_BUSCAR_ORDERS`. Si persiste:
1. Verificar que el stored procedure está actualizado:
   ```sql
   SELECT text FROM all_source 
   WHERE owner = 'CO' 
     AND name = 'PKG_ORDERS' 
     AND type = 'PACKAGE BODY'
     AND line BETWEEN 73 AND 98
   ORDER BY line;
   ```

2. Si no está actualizado, ejecutar el script de corrección:
   ```sql
   -- Ver archivo: FIX_SP_BUSCAR_ORDERS.sql
   ```

---

## Errores de Stored Procedures

### Error: ORA-00942: table or view does not exist

**Síntomas**: El stored procedure no puede encontrar la tabla.

**Soluciones**:
1. Verificar que las tablas existen en el schema `CO`:
   ```sql
   SELECT table_name FROM all_tables 
   WHERE owner = 'CO' 
   AND table_name IN ('ORDERS', 'PRODUCTS', 'CUSTOMERS');
   ```

2. Verificar permisos del usuario `FLOTILLAS_APP`:
   ```sql
   SELECT * FROM dba_tab_privs 
   WHERE grantee = 'FLOTILLAS_APP' 
   AND table_name IN ('ORDERS', 'PRODUCTS', 'CUSTOMERS');
   ```

3. Si faltan permisos, otorgarlos:
   ```sql
   GRANT SELECT, INSERT, UPDATE, DELETE ON CO.ORDERS TO FLOTILLAS_APP;
   GRANT SELECT, INSERT, UPDATE, DELETE ON CO.PRODUCTS TO FLOTILLAS_APP;
   GRANT SELECT, INSERT, UPDATE, DELETE ON CO.CUSTOMERS TO FLOTILLAS_APP;
   ```

---

### Error: ORA-06550: PLS-00306: wrong number or types of arguments

**Síntomas**: Los parámetros pasados al stored procedure no coinciden.

**Soluciones**:
1. Verificar la firma del stored procedure:
   ```sql
   SELECT argument_name, data_type, in_out 
   FROM all_arguments 
   WHERE owner = 'CO' 
   AND package_name = 'PKG_ORDERS' 
   AND object_name = 'SP_BUSCAR_ORDERS'
   ORDER BY position;
   ```

2. Verificar que el código C# pasa los parámetros correctamente (ver `OrdersRepository.cs`)

---

## Problemas de UI/JavaScript

### El Grid no carga datos (Shimmer infinito)

**Síntomas**: El grid muestra el efecto Shimmer pero nunca carga los datos.

**Soluciones**:
1. Abrir la consola del navegador (F12) y verificar errores JavaScript
2. Verificar que el endpoint responde correctamente:
   ```bash
   curl -X POST http://localhost:5050/Orders/ObtenerOrders \
     -H "Content-Type: application/json"
   ```

3. Verificar que el namespace `Orders` está inicializado:
   ```javascript
   console.log(window.Orders); // Debe mostrar el objeto
   ```

4. Verificar que el evento `ordersGridCreated` se dispara:
   ```javascript
   // En la consola del navegador
   window.ordersGridCreated = function(args) {
       console.log('Grid creado:', args);
   };
   ```

---

### Los modals no se abren

**Síntomas**: Al hacer clic en "Ver" o "Editar", el modal no aparece.

**Soluciones**:
1. Verificar que el modal está inicializado:
   ```javascript
   if (window.Orders && window.Orders.Modal) {
       console.log('Modal inicializado');
   }
   ```

2. Verificar que el elemento del modal existe en el DOM:
   ```javascript
   document.getElementById('modalOrden'); // No debe ser null
   ```

3. Verificar que Syncfusion Dialog está cargado:
   ```javascript
   console.log(typeof ej.popups.Dialog); // Debe ser "function"
   ```

---

### Los tooltips no aparecen

**Síntomas**: Al pasar el mouse sobre elementos con `info-tooltip-*`, no aparece el tooltip.

**Soluciones**:
1. Verificar que el tooltip está inicializado:
   ```javascript
   if (window.Orders && window.Orders.Modal && window.Orders.Modal.tooltipInstance) {
       console.log('Tooltip inicializado');
   }
   ```

2. Verificar que los elementos tienen los atributos correctos:
   ```html
   <span class="info-tooltip-orden" 
         data-field="Campo" 
         data-tooltip="Descripción del campo">
   ```

3. Verificar que Syncfusion Tooltip está cargado:
   ```javascript
   console.log(typeof ej.popups.Tooltip); // Debe ser "function"
   ```

---

## Errores de Compilación

### Error: CS0246: The type or namespace name 'X' could not be found

**Síntomas**: El compilador no encuentra un tipo o namespace.

**Soluciones**:
1. Verificar que todas las referencias de proyecto están correctas
2. Restaurar paquetes NuGet:
   ```bash
   dotnet restore
   ```

3. Limpiar y reconstruir:
   ```bash
   dotnet clean
   dotnet build
   ```

---

### Error: RZ2010: Tag helper error

**Síntomas**: Error en los tag helpers de Syncfusion.

**Soluciones**:
1. Verificar que Syncfusion está correctamente instalado:
   ```bash
   dotnet list package | grep Syncfusion
   ```

2. Verificar que los tag helpers están registrados en `_ViewImports.cshtml`:
   ```razor
   @addTagHelper *, Syncfusion.EJ2
   ```

3. Verificar la sintaxis del tag helper (consultar documentación oficial)

---

## Problemas de Rendimiento

### El grid tarda mucho en cargar

**Síntomas**: El grid tarda varios segundos en mostrar datos.

**Soluciones**:
1. Verificar que los índices están creados en la base de datos:
   ```sql
   SELECT index_name, table_name, column_name 
   FROM all_ind_columns 
   WHERE table_owner = 'CO' 
   AND table_name = 'ORDERS';
   ```

2. Considerar implementar paginación en el servidor (actualmente es en el cliente)

3. Verificar que no hay consultas N+1 en el código

---

### La aplicación consume mucha memoria

**Síntomas**: La aplicación consume más memoria de la esperada.

**Soluciones**:
1. Verificar que los datos no se están cargando múltiples veces
2. Implementar caché para datos frecuentes (ver sección de Optimizaciones)
3. Verificar que los recursos (imágenes, CSS, JS) están minificados en producción

---

## Errores Comunes

### Error 404 al navegar a una ruta

**Síntomas**: Al navegar a una URL, aparece error 404.

**Soluciones**:
1. Verificar que la ruta está definida en el controller
2. Verificar que el método HTTP es correcto (GET vs POST)
3. Verificar que el middleware de routing está configurado correctamente en `Program.cs`

---

### Error: "undefined" en columnas del grid

**Síntomas**: Algunas columnas muestran "undefined" en lugar de datos.

**Soluciones**:
1. Verificar que el mapeo de campos es correcto (ver `OrderParseador.cs`)
2. Verificar que la base de datos retorna los campos esperados
3. Agregar valores por defecto en el código:
   ```csharp
   EstadoOrden = lector.IsDBNull(lector.GetOrdinal("ORDER_STATUS")) 
       ? "PENDING" 
       : lector.GetString(lector.GetOrdinal("ORDER_STATUS"))
   ```

---

### Los breadcrumbs no muestran contadores

**Síntomas**: Los breadcrumbs no actualizan los contadores dinámicamente.

**Soluciones**:
1. Verificar que el JavaScript actualiza los contadores:
   ```javascript
   var breadcrumbContador = document.querySelector('[id^="breadcrumb-contador-"]');
   if (breadcrumbContador) {
       breadcrumbContador.textContent = total.toString();
   }
   ```

2. Verificar que las métricas se están cargando correctamente

---

## Herramientas de Diagnóstico

### Logs de la Aplicación

Los logs se pueden ver en la consola donde se ejecuta `dotnet run` o en los logs del servidor.

### Consola del Navegador

Abrir las herramientas de desarrollador (F12) y revisar:
- **Console**: Errores JavaScript
- **Network**: Peticiones HTTP y sus respuestas
- **Application**: Almacenamiento local, cookies, etc.

### Oracle Database

Conectarse a Oracle Database Actions y ejecutar queries para diagnosticar problemas de datos.

---

**Última actualización**: 2026-01-18
