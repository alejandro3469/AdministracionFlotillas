# Oracle Cloud Always Free - Sample Schemas para Ventas y Facturación

Esta guía explica cómo configurar Oracle Cloud Always Free y habilitar los Sample Schemas (esquemas de ejemplo) que contienen datos realistas de ventas, órdenes, facturación, clientes, productos e inventario.

## Objetivo

Configurar una base de datos Oracle en la nube (Always Free) con datos de ejemplo que simulen un entorno real de:
- Procesamiento de órdenes de venta
- Gestión de clientes y productos
- Facturación y envíos
- Inventario y almacenes
- Empleados y tiendas

## Sample Schema Recomendado: CO (Customer Orders)

El schema **CO (Customer Orders)** es el más adecuado para este proyecto porque incluye:

### Tablas Principales

- **ORDERS**: Órdenes de venta con información de clientes, fechas, estados
- **ORDER_ITEMS**: Items individuales de cada orden (productos, cantidades, precios)
- **CUSTOMERS**: Información de clientes (nombres, direcciones, contactos)
- **PRODUCTS**: Catálogo de productos (nombres, descripciones, precios, categorías)
- **STORES**: Tiendas/almacenes donde se realizan las ventas
- **SHIPMENTS**: Información de envíos y entregas
- **INVENTORY**: Control de inventario por tienda y producto
- **EMPLOYEES**: Empleados asociados a tiendas
- **REGIONS, COUNTRIES, LOCATIONS**: Datos geográficos

### Características del Schema CO

- **Datos realistas**: Miles de registros que simulan operaciones reales
- **Relaciones complejas**: Foreign keys, joins, constraints
- **Soporte JSON**: Algunas tablas usan JSON para datos flexibles
- **Datos históricos**: Órdenes con fechas variadas para análisis temporal
- **Múltiples tiendas**: Permite análisis por ubicación
- **Estados de órdenes**: Pendiente, Completada, Cancelada, etc.

## Paso 1: Crear Cuenta en Oracle Cloud

### 1.1. Registrarse en Oracle Cloud

1. Abre el navegador y ve a: https://www.oracle.com/cloud/free/
2. Haz clic en "Start for Free" o "Try for Free"
3. Completa el formulario:
   - **Email**: Tu dirección de email
   - **Password**: Crea una contraseña segura
   - **Country**: Selecciona tu país
   - Acepta los términos y condiciones
4. Haz clic en "Create Account"

### 1.2. Verificar Email

1. Revisa tu bandeja de entrada
2. Busca el email de verificación de Oracle Cloud
3. Haz clic en el enlace de verificación
4. Completa cualquier paso adicional requerido

### 1.3. Iniciar Sesión

1. Ve a: https://cloud.oracle.com/
2. Inicia sesión con tu email y contraseña
3. Completa el proceso de onboarding si es la primera vez

**Nota**: Oracle Cloud puede requerir una tarjeta de crédito para verificación, pero el tier Always Free no genera cargos si no excedes los límites.

## Paso 2: Crear Autonomous Database Always Free

### 2.1. Navegar a Autonomous Database

1. En el menú principal (icono de hamburguesa), busca "Oracle Database"
2. Haz clic en "Autonomous Database"
3. Si es tu primera vez, selecciona una región (elige la más cercana a tu ubicación)

### 2.2. Crear Nueva Base de Datos

1. Haz clic en "Create Autonomous Database"
2. Completa el formulario:

   **Basic Information:**
   - **Compartment**: Deja el predeterminado o crea uno nuevo
   - **Display Name**: `AdministracionFlotillas` (o el nombre que prefieras)
   - **Database Name**: `ADMINFLOTILLAS` (máximo 14 caracteres, solo mayúsculas y números)

   **Configuration:**
   - **Workload Type**: Selecciona "Transaction Processing" o "Data Warehouse" (ambos funcionan)
   - **Deployment Type**: Selecciona "Shared Infrastructure"
   - **Always Free**: **Marca esta casilla** (esto es crítico para el tier gratuito)

   **Database Configuration:**
   - **Database Version**: Deja "23ai Free" (o la versión más reciente disponible)
   - **OCPU Count**: Se establece automáticamente en 1 (Always Free)
   - **Storage (TB)**: Se establece automáticamente en 0.02 TB (20 GB)

   **Administrator Credentials:**
   - **Username**: `ADMIN` (no se puede cambiar)
   - **Password**: Crea una contraseña segura (guárdala en un lugar seguro)
   - **Confirm Password**: Confirma la contraseña

   **Network Access:**
   - **Secure access from everywhere**: Selecciona esta opción para permitir conexiones desde cualquier IP
   - O configura "Secure access from allowed IPs and VCNs only" si prefieres restringir el acceso

3. Haz clic en "Create Autonomous Database"
4. Espera 2-5 minutos mientras se crea la base de datos

### 2.3. Verificar Creación

1. Una vez creada, verás la base de datos en la lista
2. El estado cambiará de "Provisioning" a "Available"
3. Haz clic en el nombre de la base de datos para abrir los detalles

## Paso 3: Habilitar Sample Schemas

### 3.1. Acceder a Database Actions

1. En la página de detalles de tu Autonomous Database, haz clic en "Database Actions"
2. Se abrirá una nueva pestaña
3. Inicia sesión con:
   - **Username**: `ADMIN`
   - **Password**: La contraseña que creaste

### 3.2. Instalar Sample Schemas

**Opción A: Usando SQL Scripts (Recomendado)**

1. En Database Actions, haz clic en "SQL" en el menú principal
2. Ve a la documentación oficial de Oracle Sample Schemas:
   - URL: https://github.com/oracle-samples/db-sample-schemas
   - O busca "Oracle Database Sample Schemas" en la documentación oficial
3. Descarga los scripts del schema CO (Customer Orders)
4. Ejecuta los scripts en este orden:
   - `co_main.sql` (script principal que crea todo el schema)

**Opción B: Usando Oracle APEX (Si está disponible)**

1. En Database Actions, haz clic en "APEX" si está disponible
2. Algunas versiones de Autonomous Database incluyen Sample Schemas preinstalados
3. Verifica si el schema CO ya está disponible

**Opción C: Usando SQL Developer Web**

1. En Database Actions, haz clic en "SQL"
2. Ejecuta el siguiente comando para verificar schemas disponibles:
   ```sql
   SELECT username FROM all_users WHERE username LIKE '%CO%' OR username LIKE '%OE%' OR username LIKE '%SH%';
   ```
3. Si no existe, procede con la Opción A

### 3.3. Verificar Instalación del Schema CO

1. En Database Actions → SQL, ejecuta:
   ```sql
   -- Ver todas las tablas del schema CO
   SELECT table_name FROM all_tables WHERE owner = 'CO' ORDER BY table_name;
   ```

2. Deberías ver tablas como:
   - CUSTOMERS
   - ORDERS
   - ORDER_ITEMS
   - PRODUCTS
   - STORES
   - SHIPMENTS
   - INVENTORY
   - EMPLOYEES
   - Y más...

3. Verifica que hay datos:
   ```sql
   -- Contar registros en ORDERS
   SELECT COUNT(*) FROM co.orders;
   
   -- Ver algunas órdenes
   SELECT * FROM co.orders WHERE ROWNUM <= 10;
   ```

## Paso 4: Descargar Wallet de Conexión

### 4.1. Descargar Wallet

1. En la página de detalles de tu Autonomous Database, haz clic en "DB Connection"
2. Se abrirá un modal con opciones de conexión
3. Haz clic en "Download Wallet"
4. Ingresa una contraseña para el wallet (guárdala, la necesitarás)
5. Haz clic en "Download"
6. Se descargará un archivo ZIP (ej: `Wallet_ADMINFLOTILLAS.zip`)

### 4.2. Extraer Wallet

1. Extrae el archivo ZIP en una ubicación accesible:
   - **Mac**: `/Users/TU_USUARIO/Documents/OracleWallet/`
   - **Windows**: `C:\OracleWallet\`
2. Dentro del ZIP encontrarás archivos como:
   - `tnsnames.ora`
   - `sqlnet.ora`
   - `cwallet.sso`
   - `ewallet.p12`
   - Y más archivos de certificados

### 4.3. Obtener Connection String

1. En el mismo modal "DB Connection", verás diferentes tipos de connection strings
2. Copia el connection string que necesites:
   - **For Thin Clients**: Para aplicaciones .NET
   - **For JDBC**: Para Java
   - **For Python**: Para Python
3. El connection string se verá algo como:
   ```
   ADMINFLOTILLAS_high?TNS_ADMIN=/ruta/al/wallet
   ```

## Paso 5: Configurar Conexión en DataGrip

### 5.1. Abrir DataGrip

1. Abre DataGrip en tu máquina (Mac o Windows)
2. Si no tienes DataGrip, descárgalo desde: https://www.jetbrains.com/datagrip/

### 5.2. Crear Nueva Conexión

1. Haz clic en el botón "+" (arriba izquierda)
2. Selecciona "Data Source" → "Oracle"

### 5.3. Configurar Conexión

**Pestaña General:**
- **Name**: `AdministracionFlotillas Cloud`
- **Host**: (del connection string, ej: `ADMINFLOTILLAS_high.adb.us-ashburn-1.oraclecloud.com`)
- **Port**: `1522` (puerto por defecto de Always Free)
- **Database**: (del connection string, ej: `ADMINFLOTILLAS_high`)
- **User**: `CO` (schema que usaremos) o `ADMIN` (para administración)
- **Password**: (contraseña del usuario, para CO puede ser diferente a ADMIN)

**Pestaña Advanced:**
- **TNS_ADMIN**: Ruta completa al wallet extraído
  - **Mac**: `/Users/TU_USUARIO/Documents/OracleWallet`
  - **Windows**: `C:\OracleWallet`
- **Connection type**: `TNS`

### 5.4. Probar Conexión

1. Haz clic en "Test Connection"
2. Si es la primera vez, DataGrip puede pedirte descargar el driver de Oracle
3. Deberías ver: "Connection successful"
4. Haz clic en "OK" para guardar

### 5.5. Verificar Schema CO

1. Una vez conectado, expande la conexión en el panel izquierdo
2. Expande "Schemas" → "CO"
3. Expande "Tables"
4. Deberías ver todas las tablas del schema CO
5. Haz clic derecho en una tabla (ej: `ORDERS`) → "Select Top 1000 Rows"
6. Deberías ver datos reales

## Paso 6: Configurar en appsettings.json

### 6.1. Ubicar appsettings.json

**Ubicación:**
- **Mac**: `src/AdministracionFlotillas.Web/appsettings.json`
- **Windows**: `src/AdministracionFlotillas.Web/appsettings.json`

### 6.2. Agregar Connection String

Abre el archivo y agrega o modifica la sección `ConnectionStrings`:

**Para Mac:**
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=/Users/TU_USUARIO/Documents/OracleWallet;User Id=CO;Password=TU_PASSWORD_CO;"
  }
}
```

**Para Windows:**
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=C:/OracleWallet;User Id=CO;Password=TU_PASSWORD_CO;"
  }
}
```

**Reemplaza:**
- `ADMINFLOTILLAS_high` → Tu connection string completo de Oracle Cloud
- `/Users/TU_USUARIO/Documents/OracleWallet` → Ruta completa al wallet en Mac
- `C:/OracleWallet` → Ruta completa al wallet en Windows
- `TU_PASSWORD_CO` → Contraseña del usuario CO (puede ser diferente a ADMIN)

**Nota importante**: Si el usuario CO no tiene contraseña o no existe, conéctate como ADMIN y crea/actualiza el usuario CO:

```sql
-- Conectado como ADMIN
ALTER USER CO IDENTIFIED BY "NuevaPassword123";
ALTER USER CO ACCOUNT UNLOCK;
GRANT CONNECT, RESOURCE TO CO;
```

## Paso 7: Verificar Estructura del Schema CO

### 7.1. Tablas Principales

Ejecuta en DataGrip o SQL Developer Web:

```sql
-- Ver todas las tablas del schema CO
SELECT table_name, num_rows 
FROM all_tables 
WHERE owner = 'CO' 
ORDER BY table_name;
```

### 7.2. Relaciones entre Tablas

El schema CO tiene las siguientes relaciones principales:

- **ORDERS** → **CUSTOMERS** (customer_id)
- **ORDERS** → **STORES** (store_id)
- **ORDERS** → **EMPLOYEES** (sales_rep_id)
- **ORDER_ITEMS** → **ORDERS** (order_id)
- **ORDER_ITEMS** → **PRODUCTS** (product_id)
- **SHIPMENTS** → **ORDERS** (order_id)
- **INVENTORY** → **PRODUCTS** (product_id)
- **INVENTORY** → **STORES** (store_id)

### 7.3. Consultas de Ejemplo

```sql
-- Ver órdenes con información de clientes
SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    o.order_status,
    o.order_total
FROM co.orders o
JOIN co.customers c ON o.customer_id = c.customer_id
WHERE ROWNUM <= 10;

-- Ver items de una orden específica
SELECT 
    oi.order_id,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS total
FROM co.order_items oi
JOIN co.products p ON oi.product_id = p.product_id
WHERE oi.order_id = 1;

-- Ver inventario por tienda
SELECT 
    s.store_name,
    p.product_name,
    i.quantity_on_hand
FROM co.inventory i
JOIN co.stores s ON i.store_id = s.store_id
JOIN co.products p ON i.product_id = p.product_id
WHERE ROWNUM <= 20;
```

## Conceptos Importantes

### ¿Qué es Oracle Cloud Always Free?

Oracle Cloud Always Free es un tier gratuito permanente de Oracle Cloud Infrastructure que incluye:
- 2 Autonomous Databases (cada una con 1 OCPU, 8 GB RAM, 20 GB almacenamiento)
- Acceso completo a todas las funcionalidades de Oracle Database
- Sin expiración (permanente mientras uses los recursos dentro de los límites)
- Requiere tarjeta de crédito para verificación, pero no genera cargos si no excedes los límites

### ¿Qué es un Sample Schema?

Un Sample Schema (esquema de ejemplo) es una base de datos de demostración proporcionada por Oracle que contiene:
- Estructura de tablas realistas
- Datos de ejemplo (miles de registros)
- Relaciones complejas entre tablas
- Procedimientos almacenados de ejemplo
- Diseñado para pruebas, desarrollo y aprendizaje

### ¿Por qué el Schema CO (Customer Orders)?

El schema CO es ideal para este proyecto porque:
- Modela un entorno real de ventas y facturación
- Incluye todas las entidades necesarias (órdenes, clientes, productos, inventario)
- Tiene datos suficientes para pruebas realistas
- Incluye relaciones complejas que simulan un sistema real
- Es mantenido y actualizado por Oracle

### ¿Qué es un Wallet?

Un Wallet es un archivo ZIP que contiene:
- Certificados de seguridad para conexión SSL/TLS
- Archivos de configuración de red (TNS)
- Credenciales encriptadas
- Necesario para conectarse a Autonomous Database de forma segura

## Solución de Problemas

### Error: "ORA-01017: invalid username/password"

**Solución:**
1. Verifica que estás usando el usuario correcto (CO o ADMIN)
2. Verifica que la contraseña es correcta
3. Si el usuario CO no existe, créalo como ADMIN:
   ```sql
   ALTER USER CO IDENTIFIED BY "Password123";
   ALTER USER CO ACCOUNT UNLOCK;
   ```

### Error: "ORA-12541: TNS:no listener"

**Solución:**
1. Verifica que el connection string es correcto
2. Verifica que la ruta al wallet (TNS_ADMIN) es correcta
3. Verifica que el wallet está extraído correctamente
4. Verifica que la base de datos está en estado "Available" en Oracle Cloud

### Error: "Sample Schema CO no encontrado"

**Solución:**
1. Verifica que ejecutaste los scripts de instalación del schema CO
2. Descarga los scripts desde: https://github.com/oracle-samples/db-sample-schemas
3. Ejecuta `co_main.sql` como usuario ADMIN
4. Verifica la instalación con: `SELECT table_name FROM all_tables WHERE owner = 'CO';`

### No puedo descargar el Wallet

**Solución:**
1. Verifica que la base de datos está en estado "Available"
2. Intenta desde otro navegador
3. Verifica que tienes permisos de administrador en la cuenta de Oracle Cloud
4. Contacta al soporte de Oracle Cloud si persiste

## Próximos Pasos

Después de configurar Oracle Cloud con el schema CO:

1. **Verificar conexión desde la aplicación**: Prueba conectarte desde el proyecto .NET
2. **Crear repositorios**: Implementa repositorios para las tablas principales (ORDERS, CUSTOMERS, PRODUCTS)
3. **Crear stored procedures**: Implementa procedimientos almacenados para operaciones complejas
4. **Desarrollar nuevo módulo**: Crea el módulo de ventas/órdenes usando Syncfusion UI
5. **Mantener módulo Employees**: El módulo Employees (V1) se mantiene intacto como referencia

---

**Última actualización**: Enero 2026
**Versión de Oracle**: 23ai Free (Always Free Tier)
**Schema utilizado**: CO (Customer Orders)
**Referencia oficial**: https://github.com/oracle-samples/db-sample-schemas
