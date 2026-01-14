# Gu�a de Configuración de Base de Datos - Paso a Paso Granular

##  Objetivo

Configurar una base de datos remota gratuita accesible desde DataGrip (Mac) o herramientas similares (Windows) para practicar conexión Oracle con procedimientos almacenados.

##  Compatibilidad

-  **Mac**: DataGrip (recomendado) o cualquier herramienta compatible
-  **Windows**: DataGrip, SQL Developer, o cualquier herramienta compatible
-  Misma base de datos, misma conexión, diferentes herramientas

##  Requisitos

-  Base de datos remota (accesible v�a URL/connection string)
-  Gratuita (free tier)
-  Accesible desde DataGrip (Mac) o herramientas similares (Windows)
-  Soporte para procedimientos almacenados Oracle
-  NO Supabase (ya en uso en otro proyecto)

##  Opciones Recomendadas

### 1. Oracle Cloud Free Tier  RECOMENDADO

**Ventajas:**
-  Siempre gratis (no expira)
-  Base de datos Oracle nativa
-  Soporte completo para procedimientos almacenados
-  Accesible desde DataGrip
-  Autonomous Database (fácil de configurar)

**Pasos Granulares:**

### PASO 1: Crear cuenta en Oracle Cloud

**1.1. Abre tu navegador:**
- Ve a: https://www.oracle.com/cloud/free/
- Haz clic en "Start for Free" o "Try for Free"

**1.2. Completa el formulario de registro:**
- **Email**: Tu email (ej: tu@email.com)
- **Password**: Crea una contraseña segura
- **Country**: Selecciona tu pa�s
- Acepta los términos y condiciones
- Haz clic en "Create Account"

**1.3. Verifica tu email:**
- Revisa tu bandeja de entrada
- Busca el email de Oracle Cloud
- Haz clic en el enlace de verificación
- Completa cualquier paso adicional que te pida

**1.4. Inicia sesión:**
- Ve a: https://cloud.oracle.com/
- Inicia sesión con tu email y contraseña

### PASO 2: Crear Autonomous Database

**2.1. Navega a Autonomous Database:**
- En el menú principal (hamburguesa ��), busca "Oracle Database"
- Haz clic en "Autonomous Database"
- Si es tu primera vez, puede que te pida seleccionar una región (elige la más cercana)

**2.2. Crear nueva base de datos:**
- Haz clic en el botón "Create Autonomous Database" (arriba derecha)
- O busca el botón "Create" en la página

**2.3. Configurar la base de datos:**

**Pestaña "Provide basic information":**
- **Compartment**: Deja el predeterminado o crea uno nuevo
- **Display Name**: `AdministracionFlotillas`
- **Database Name**: `ADMINFLOTILLAS` (solo mayúsculas, sin espacios)

**Pestaña "Choose a workload type":**
- Selecciona: **"Transaction Processing"** o **"Data Warehouse"** (cualquiera funciona)
- Haz clic en "Next"

**Pestaña "Configure the database":**
- **Deployment type**: Selecciona **"Always Free"**  (IMPORTANTE)
- **Database version**: Deja el predeterminado (23c o 19c)
- **OCPU count**: Debe estar en 1 (gratis)
- **Storage (TB)**: Debe estar en 0.02 (gratis)
- Haz clic en "Next"

**Pestaña "Create administrator credentials":**
- **Username**: `ADMIN` (ya está prellenado)
- **Password**: Crea una contraseña segura
  -  **IMPORTANTE**: Guarda esta contraseña en un lugar seguro
  - Debe tener al menos 12 caracteres
  - Debe incluir mayúsculas, minúsculas, números y caracteres especiales
- **Confirm Password**: Vuelve a escribir la misma contraseña
- Haz clic en "Next"

**Pestaña "Choose network access":**
- **Network access type**: Selecciona **"Secure access from everywhere"** (para que funcione desde cualquier lugar)
- O si prefieres más seguridad: **"Allow secure access from specified IPs and VCNs"** y agrega tu IP pública
- Haz clic en "Next"

**Pestaña "Choose a license type":**
- Selecciona **"License Included"** (gratis)
- Haz clic en "Create Autonomous Database"

**2.4. Espera a que se cree:**
- Verás una pantalla de "Provisioning"
- Esto puede tardar **5-10 minutos**
- No cierres la ventana
- Cuando termine, verás el estado cambiar a "Available" (verde)

### PASO 3: Descargar Wallet de Conexión

**3.1. Abre la base de datos:**
- En la lista de Autonomous Databases, haz clic en `AdministracionFlotillas`

**3.2. Accede a DB Connection:**
- Busca el botón **"DB Connection"** (arriba, en la barra de herramientas)
- Haz clic en él

**3.3. Configura la descarga del Wallet:**
- Se abrirá un modal/popup
- **Wallet Type**: Selecciona **"Instance Wallet"**
- **Password**: Crea una contraseña para el wallet (diferente a la de la BD)
  -  **IMPORTANTE**: Guarda esta contraseña también
- Haz clic en **"Download Wallet"**

**3.4. Guarda el archivo:**
- Se descargará un archivo ZIP (ej: `Wallet_ADMINFLOTILLAS.zip`)
- **Mac**: Se descarga en `~/Downloads/` por defecto
- **Windows**: Se descarga en `C:\Users\TU_USUARIO\Downloads\` por defecto

**3.5. Extrae el ZIP:**
- **Mac**: 
  - Haz doble clic en el ZIP
  - O desde terminal: `unzip ~/Downloads/Wallet_ADMINFLOTILLAS.zip -d ~/Documents/OracleWallet/`
- **Windows**:
  - Haz clic derecho en el ZIP �� "Extract All..."
  - Extrae a: `C:\OracleWallet\` (crea la carpeta si no existe)
  - O desde PowerShell: `Expand-Archive -Path ~\Downloads\Wallet_ADMINFLOTILLAS.zip -DestinationPath C:\OracleWallet\`

**3.5.1. Verifica que se extrajo:**
- Deber�as ver varios archivos, incluyendo: `tnsnames.ora`, `sqlnet.ora`, `keystore.jks`, `truststore.jks`

**3.6. Anota la ruta completa:**
- **Mac**: Ejemplo: `/Users/wallfacer/Documents/OracleWallet/`
- **Windows**: Ejemplo: `C:\OracleWallet\`
-  **IMPORTANTE**: Necesitarás esta ruta más adelante

### PASO 4: Obtener Connection String

**4.1. En el mismo modal de "DB Connection":**
- Verás una sección llamada **"Connection Strings"**
- Hay diferentes tipos: `TLS`, `MTLS`, `Low`, `Medium`, `High`
- Para desarrollo, usa **"TLS"** o **"High"**

**4.2. Copia el connection string:**
- Busca algo como: `ADMINFLOTILLAS_high?TNS_ADMIN=/ruta/al/wallet`
- **Copia el texto completo**

**4.3. Anota también:**
- **Host**: (aparece en el connection string)
- **Port**: `1522` (puerto por defecto de Always Free)
- **Service Name**: `ADMINFLOTILLAS_high` (o similar)

### PASO 5: Configurar en appsettings.json

**5.1. Ubica el archivo appsettings.json:**
- **Mac**: `/Users/wallfacer/Documents/AdministracionFlotillas/src/AdministracionFlotillas.Web/appsettings.json`
- **Windows**: `C:\Users\TU_USUARIO\Documents\AdministracionFlotillas\src\AdministracionFlotillas.Web\appsettings.json`

**5.2. Abre el archivo en tu editor:**
- **Mac**: Rider o cualquier editor
- **Windows**: VS Code o cualquier editor

**5.3. Agrega o modifica la sección ConnectionStrings:**

**Si el archivo NO tiene ConnectionStrings, agrégalo:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=/Users/wallfacer/Documents/OracleWallet;User Id=ADMIN;Password=TU_CONTRASEÑA_DE_BD;"
  }
}
```

**Si el archivo YA tiene ConnectionStrings, modifica solo esa sección:**
```json
"ConnectionStrings": {
  "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=/Users/wallfacer/Documents/OracleWallet;User Id=ADMIN;Password=TU_CONTRASEÑA_DE_BD;"
}
```

** IMPORTANTE - Reemplaza:**
- `ADMINFLOTILLAS_high` �� Tu connection string completo
- `/Users/wallfacer/Documents/OracleWallet` �� **Mac**: Tu ruta completa al wallet
- `C:\OracleWallet` �� **Windows**: Tu ruta completa al wallet (usa barras `/` o `\\`)
- `TU_CONTRASEÑA_DE_BD` �� La contraseña que creaste para el usuario ADMIN

**Ejemplo para Windows:**
```json
"ConnectionStrings": {
  "OracleConnection": "Data Source=ADMINFLOTILLAS_high?TNS_ADMIN=C:/OracleWallet;User Id=ADMIN;Password=MiPassword123!;"
}
```

**5.4. Guarda el archivo:**
- **Mac**: `Cmd + S`
- **Windows**: `Ctrl + S`

### PASO 6: Configurar en DataGrip (Mac) o Herramienta Similar (Windows)

#### Para Mac (DataGrip):

**6.1. Abre DataGrip:**
- Abre la aplicación DataGrip desde Aplicaciones

**6.2. Crea nueva conexión:**
- Haz clic en el botón **"+"** (arriba izquierda)
- O ve a: **File** �� **New** �� **Data Source** �� **Oracle**

**6.3. Configura la conexión:**

**Pestaña "General":**
- **Name**: `AdministracionFlotillas`
- **Host**: (del connection string)
- **Port**: `1522`
- **Database**: (del connection string, ej: `ADMINFLOTILLAS_high`)
- **User**: `ADMIN`
- **Password**: (tu contraseña de la BD)

**Pestaña "Advanced":**
- Busca el campo **"TNS_ADMIN"**
- Haz clic en el botón de carpeta (�)
- Navega a la carpeta donde extrajiste el wallet
- Selecciona la carpeta (ej: `/Users/wallfacer/Documents/OracleWallet/`)
- Haz clic en "OK"

**6.4. Prueba la conexión:**
- Haz clic en **"Test Connection"** (abajo)
- Deber�as ver: **"Connection successful"** 

**6.5. Guarda la conexión:**
- Haz clic en **"OK"**

#### Para Windows (DataGrip u otra herramienta):

**6.1. Abre DataGrip (o SQL Developer):**
- Si usas DataGrip, abre la aplicación
- Si usas SQL Developer, ábrelo

**6.2. Crea nueva conexión:**
- **DataGrip**: Botón **"+"** �� **Oracle**
- **SQL Developer**: Botón **"+"** en "Connections"

**6.3. Configura la conexión (similar a Mac):**

**DataGrip:**
- **Name**: `AdministracionFlotillas`
- **Host**: (del connection string)
- **Port**: `1522`
- **Database**: (del connection string)
- **User**: `ADMIN`
- **Password**: (tu contraseña)
- **Advanced** �� **TNS_ADMIN**: `C:\OracleWallet\` (o tu ruta)

**SQL Developer:**
- **Connection Name**: `AdministracionFlotillas`
- **Username**: `ADMIN`
- **Password**: (tu contraseña)
- **Connection Type**: `TNS` o `Cloud Wallet`
- Si usas Cloud Wallet, selecciona la carpeta del wallet

**6.4. Prueba y guarda:**
- Prueba la conexión
- Si funciona, guarda

**Documentación oficial:**
- https://docs.oracle.com/en/cloud/paas/autonomous-database/

---

### 2. Azure SQL Database Free Tier

**Ventajas:**
-  12 meses gratis
-  Fácil de configurar
-  Accesible desde DataGrip

**Desventajas:**
-  SQL Server, no Oracle (no procedimientos almacenados Oracle)
-  Expira después de 12 meses

**Pasos:**

1. **Crear cuenta:**
   - Ve a: https://azure.microsoft.com/free/
   - Crea cuenta con créditos gratis

2. **Crear SQL Database:**
   - En Azure Portal, crea "SQL Database"
   - Selecciona "Basic" tier (gratis)
   - Configura servidor y base de datos

3. **Obtener Connection String:**
   - En la página de la base de datos �� "Connection strings"
   - Copia el connection string

4. **Configurar en appsettings.json:**
```json
{
  "ConnectionStrings": {
    "SqlServerConnection": "Server=tcp:TU_SERVIDOR.database.windows.net,1433;Database=TU_DB;User Id=TU_USUARIO;Password=TU_CONTRASEÑA;"
  }
}
```

**Nota**: Si usas Azure SQL, necesitarás cambiar de Oracle a SQL Server en el código.

---

### 3. AWS RDS Free Tier

**Ventajas:**
-  12 meses gratis
-  Opciones de PostgreSQL/MySQL

**Desventajas:**
-  No es Oracle (no procedimientos almacenados Oracle)
-  Expira después de 12 meses

**Pasos:**

1. **Crear cuenta:**
   - Ve a: https://aws.amazon.com/free/
   - Crea cuenta AWS

2. **Crear RDS Instance:**
   - En AWS Console, ve a RDS
   - Crea instancia (PostgreSQL o MySQL)
   - Selecciona "Free tier"

3. **Configurar conexión:**
   - Obtén endpoint y credenciales
   - Configura en appsettings.json

---

##  Configuración en DataGrip

### Para Oracle Cloud

1. **Abrir DataGrip**
2. **Nueva conexión** �� **Oracle**
3. **Configuración:**
   - **Name**: `AdministracionFlotillas`
   - **Host**: (del connection string de Oracle Cloud)
   - **Port**: `1522`
   - **Database**: (nombre de la base de datos)
   - **User**: `ADMIN`
   - **Password**: (tu contraseña)
4. **Advanced tab:**
   - **TNS_ADMIN**: (ruta completa al wallet extra�do)
5. **Test Connection**
6. **OK**

### Verificar Conexión

Una vez conectado, deber�as poder:
-  Ver las tablas de la base de datos
-  Ejecutar queries
-  Ver datos en tiempo real
-  Copiar datos fácilmente
-  Crear procedimientos almacenados

---

##  Crear Procedimientos Almacenados de Ejemplo

Una vez conectado, puedes crear procedimientos almacenados:

```sql
-- Ejemplo: Crear paquete y procedimiento
CREATE OR REPLACE PACKAGE PKG_FLOTILLAS AS
    PROCEDURE SP_BUSCAR_FLOTILLAS(
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_FLOTILLAS;
/

CREATE OR REPLACE PACKAGE BODY PKG_FLOTILLAS AS
    PROCEDURE SP_BUSCAR_FLOTILLAS(
        P_NOMBRE IN VARCHAR2 DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT * FROM FLOTILLAS
            WHERE (P_NOMBRE IS NULL OR UPPER(NOMBRE) LIKE '%' || UPPER(P_NOMBRE) || '%');
    END SP_BUSCAR_FLOTILLAS;
END PKG_FLOTILLAS;
/
```

---

##  Solución de Problemas

### Error: "TNS: could not resolve the connect identifier"

**Solución:**
- Verifica que TNS_ADMIN apunte a la carpeta del wallet extra�do
- Asegúrate de que todos los archivos del wallet estén en esa carpeta

### Error: "ORA-12154: TNS:could not resolve the connect identifier"

**Solución:**
- Verifica el connection string
- Asegúrate de que el formato sea correcto

### No puedo conectar desde DataGrip

**Solución:**
- Verifica que el firewall de Oracle Cloud permita tu IP
- En Oracle Cloud Console, ve a "Network" �� "Access Control List"
- Agrega tu IP pública

---

##  Recursos

- **Oracle Cloud Documentation**: https://docs.oracle.com/en/cloud/
- **DataGrip Oracle Connection**: https://www.jetbrains.com/help/datagrip/connect-to-oracle-database.html
- **Oracle Always Free**: https://www.oracle.com/cloud/free/

---

**�ltima actualización**: Enero 2025


