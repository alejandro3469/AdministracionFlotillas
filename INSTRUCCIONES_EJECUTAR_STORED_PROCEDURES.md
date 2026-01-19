# Instrucciones para Ejecutar Stored Procedures

**Fecha**: 2026-01-18  
**Objetivo**: Crear stored procedures PKG_PRODUCTS y PKG_CUSTOMERS en Oracle Database

---

## 📋 PREREQUISITOS

1. ✅ Acceso a Oracle Database (Oracle Cloud, local, etc.)
2. ✅ Usuario con permisos para crear packages (CO o ADMIN)
3. ✅ Schema CO con tablas PRODUCTS y CUSTOMERS creadas
4. ✅ SQL Developer, DataGrip, o Database Actions disponible

---

## 🔍 VERIFICACIÓN PREVIA

Antes de ejecutar los scripts, verifica que las tablas existen:

```sql
-- Verificar que las tablas existen en el schema CO
SELECT table_name 
FROM all_tables 
WHERE owner = 'CO' 
  AND table_name IN ('PRODUCTS', 'CUSTOMERS')
ORDER BY table_name;

-- Verificar estructura de PRODUCTS
DESCRIBE CO.PRODUCTS;

-- Verificar estructura de CUSTOMERS
DESCRIBE CO.CUSTOMERS;

-- Verificar que hay datos (opcional)
SELECT COUNT(*) FROM CO.PRODUCTS;
SELECT COUNT(*) FROM CO.CUSTOMERS;
```

---

## 📝 PASOS PARA EJECUTAR

### Paso 1: Conectarse a Oracle Database

**Opción A: Database Actions (Oracle Cloud)**
1. Abre Oracle Cloud Console
2. Navega a tu Autonomous Database
3. Haz clic en "Database Actions"
4. Inicia sesión con usuario `CO` o `ADMIN`
5. Abre "SQL" en el menú

**Opción B: SQL Developer / DataGrip**
1. Abre tu herramienta SQL preferida
2. Conéctate usando:
   - **Usuario**: `CO` o `ADMIN`
   - **Password**: Tu contraseña
   - **Service Name**: Tu connection string

---

### Paso 2: Ejecutar Script PKG_PRODUCTS

1. Abre el archivo: `src/AdministracionFlotillas.Web/scripts/03_CREATE_PKG_PRODUCTS.sql`
2. Copia todo el contenido del archivo
3. Pégalo en SQL Worksheet / Editor
4. Ejecuta el script completo (F5 o botón "Run")
5. Verifica que no haya errores

**Verificación**:
```sql
-- Verificar que el paquete se creó correctamente
SELECT object_name, object_type, status
FROM all_objects
WHERE owner = 'CO'
  AND object_name = 'PKG_PRODUCTS'
ORDER BY object_type;

-- Deberías ver:
-- PKG_PRODUCTS | PACKAGE | VALID
-- PKG_PRODUCTS | PACKAGE BODY | VALID
```

**Probar un stored procedure**:
```sql
-- Probar SP_OBTENER_PRODUCTS
DECLARE
    v_cursor SYS_REFCURSOR;
    v_product_id NUMBER;
    v_product_name VARCHAR2(200);
BEGIN
    CO.PKG_PRODUCTS.SP_OBTENER_PRODUCTS(v_cursor);
    LOOP
        FETCH v_cursor INTO v_product_id, v_product_name, 
                            -- otros campos...
                            NULL, NULL, NULL, NULL, NULL, NULL;
        EXIT WHEN v_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Producto: ' || v_product_id || ' - ' || v_product_name);
    END LOOP;
    CLOSE v_cursor;
END;
/
```

---

### Paso 3: Ejecutar Script PKG_CUSTOMERS

1. Abre el archivo: `src/AdministracionFlotillas.Web/scripts/04_CREATE_PKG_CUSTOMERS.sql`
2. Copia todo el contenido del archivo
3. Pégalo en SQL Worksheet / Editor
4. Ejecuta el script completo (F5 o botón "Run")
5. Verifica que no haya errores

**Verificación**:
```sql
-- Verificar que el paquete se creó correctamente
SELECT object_name, object_type, status
FROM all_objects
WHERE owner = 'CO'
  AND object_name = 'PKG_CUSTOMERS'
ORDER BY object_type;

-- Deberías ver:
-- PKG_CUSTOMERS | PACKAGE | VALID
-- PKG_CUSTOMERS | PACKAGE BODY | VALID
```

**Probar un stored procedure**:
```sql
-- Probar SP_OBTENER_CUSTOMERS
DECLARE
    v_cursor SYS_REFCURSOR;
    v_customer_id NUMBER;
    v_customer_name VARCHAR2(200);
BEGIN
    CO.PKG_CUSTOMERS.SP_OBTENER_CUSTOMERS(v_cursor);
    LOOP
        FETCH v_cursor INTO v_customer_id, v_customer_name,
                            -- otros campos...
                            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL;
        EXIT WHEN v_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Cliente: ' || v_customer_id || ' - ' || v_customer_name);
    END LOOP;
    CLOSE v_cursor;
END;
/
```

---

## 🔐 PASO 4: Otorgar Permisos a FLOTILLAS_APP

Después de crear los stored procedures, otorga permisos al usuario de la aplicación:

```sql
-- Conectarse como CO o ADMIN y ejecutar:

-- Permisos para PKG_PRODUCTS
GRANT EXECUTE ON CO.PKG_PRODUCTS TO FLOTILLAS_APP;
GRANT SELECT ON CO.PRODUCTS TO FLOTILLAS_APP;

-- Permisos para PKG_CUSTOMERS
GRANT EXECUTE ON CO.PKG_CUSTOMERS TO FLOTILLAS_APP;
GRANT SELECT ON CO.CUSTOMERS TO FLOTILLAS_APP;

-- Crear sinónimos (opcional pero recomendado)
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PRODUCTS FOR CO.PRODUCTS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_PRODUCTS FOR CO.PKG_PRODUCTS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.CUSTOMERS FOR CO.CUSTOMERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_CUSTOMERS FOR CO.PKG_CUSTOMERS;
```

**Verificar permisos**:
```sql
-- Verificar permisos otorgados
SELECT grantee, owner, table_name, privilege
FROM dba_tab_privs
WHERE grantee = 'FLOTILLAS_APP'
  AND owner = 'CO'
  AND table_name IN ('PRODUCTS', 'CUSTOMERS', 'PKG_PRODUCTS', 'PKG_CUSTOMERS')
ORDER BY table_name, privilege;
```

---

## 📊 STORED PROCEDURES CREADOS

### PKG_PRODUCTS

1. **SP_OBTENER_PRODUCTS** - Obtener todos los productos
2. **SP_OBTENER_PRODUCT_POR_ID** - Obtener un producto por ID
3. **SP_BUSCAR_PRODUCTS** - Buscar productos con filtros (categoría, estado, nombre, stock, precio)
4. **SP_OBTENER_PRODUCTS_POR_CATEGORIA** - Obtener productos por categoría
5. **SP_OBTENER_PRODUCTS_STOCK_BAJO** - Obtener productos con stock bajo (nivel de reorden)
6. **SP_OBTENER_PRODUCTS_POR_ESTADO** - Obtener productos por estado (ACTIVE, INACTIVE, DISCONTINUED)

### PKG_CUSTOMERS

1. **SP_OBTENER_CUSTOMERS** - Obtener todos los clientes
2. **SP_OBTENER_CUSTOMER_POR_ID** - Obtener un cliente por ID
3. **SP_BUSCAR_CUSTOMERS** - Buscar clientes con filtros (nombre, estado, ciudad, estado, país, límite de crédito)
4. **SP_OBTENER_CUSTOMERS_POR_ESTADO** - Obtener clientes por estado (ACTIVE, INACTIVE)
5. **SP_OBTENER_CUSTOMERS_POR_CIUDAD** - Obtener clientes por ciudad
6. **SP_OBTENER_CUSTOMERS_CON_LIMITE_CREDITO** - Obtener clientes activos con límite de crédito
7. **SP_OBTENER_CUSTOMERS_POR_RANGO_FECHAS** - Obtener clientes por rango de fechas de registro

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "ORA-00942: table or view does not exist"

**Causa**: Las tablas no existen en el schema CO o el usuario no tiene permisos.

**Solución**:
```sql
-- Verificar que las tablas existen
SELECT table_name FROM all_tables WHERE owner = 'CO' AND table_name IN ('PRODUCTS', 'CUSTOMERS');

-- Si no existen, necesitas crear el schema CO primero
-- Ver: docs/BASE_DATOS/ORACLE_CLOUD_SAMPLE_SCHEMAS.md
```

### Error: "ORA-01031: insufficient privileges"

**Causa**: El usuario no tiene permisos para crear packages.

**Solución**:
```sql
-- Conectarse como ADMIN y otorgar permisos:
GRANT CREATE PROCEDURE TO CO;
GRANT CREATE ANY PROCEDURE TO CO; -- Si es necesario
```

### Error: "ORA-00904: invalid identifier"

**Causa**: Los nombres de columnas no coinciden con la estructura real de las tablas.

**Solución**:
```sql
-- Verificar estructura real de las tablas
DESCRIBE CO.PRODUCTS;
DESCRIBE CO.CUSTOMERS;

-- Ajustar los scripts según la estructura real
```

---

## ✅ VERIFICACIÓN FINAL

Después de ejecutar ambos scripts, verifica que todo está correcto:

```sql
-- Verificar todos los paquetes creados
SELECT object_name, object_type, status
FROM all_objects
WHERE owner = 'CO'
  AND object_name IN ('PKG_ORDERS', 'PKG_PRODUCTS', 'PKG_CUSTOMERS')
ORDER BY object_name, object_type;

-- Deberías ver 6 objetos (3 packages + 3 package bodies), todos con status VALID
```

---

## 📁 ARCHIVOS CREADOS

- ✅ `src/AdministracionFlotillas.Web/scripts/03_CREATE_PKG_PRODUCTS.sql`
- ✅ `src/AdministracionFlotillas.Web/scripts/04_CREATE_PKG_CUSTOMERS.sql`

---

## 🔄 PRÓXIMOS PASOS

Después de ejecutar los stored procedures:

1. ✅ Actualizar repositorios en C# para usar los stored procedures reales
2. ✅ Reemplazar datos mock con llamadas a Oracle
3. ✅ Probar las funcionalidades en la aplicación
4. ✅ Implementar las mismas funcionalidades avanzadas del grid en Products y Customers

---

**Nota**: Si encuentras algún error al ejecutar los scripts, revisa la estructura real de las tablas en tu base de datos y ajusta los scripts según sea necesario.
