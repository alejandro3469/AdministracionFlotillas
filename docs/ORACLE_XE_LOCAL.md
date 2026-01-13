# Guía: Oracle Database Express Edition (XE) Local - Sin Tarjeta de Crédito

## ¿Por qué Oracle XE Local?

- ✅ **Completamente gratis** - Sin tarjeta de crédito
- ✅ **Sin límite de tiempo** - No expira
- ✅ **Incluye HR Schema** - Base de datos de ejemplo HR incluida
- ✅ **Funciona localmente** - No depende de servicios cloud
- ✅ **Compatible con DataGrip** - Se conecta fácilmente

## Instalación

### Para Mac:

**1. Descargar Oracle XE:**
- Ve a: https://www.oracle.com/database/technologies/xe-downloads.html
- Descarga: **Oracle Database Express Edition 23c** para macOS
- Requiere cuenta Oracle (gratis, solo email)

**2. Instalar:**
- Ejecuta el instalador descargado
- Sigue las instrucciones del instalador
- Durante la instalación, se te pedirá crear un password para el usuario SYS

**3. Verificar instalación:**
```bash
# Verificar que Oracle está corriendo
sqlplus / as sysdba
# Deberías ver: SQL>
```

**4. Desbloquear y configurar HR Schema:**
```sql
-- Conectar como sysdba
sqlplus / as sysdba

-- Desbloquear usuario HR
ALTER USER HR ACCOUNT UNLOCK;
ALTER USER HR IDENTIFIED BY hr;

-- Conectar como HR
CONNECT HR/hr

-- Verificar tablas
SELECT table_name FROM user_tables;
-- Deberías ver: EMPLOYEES, DEPARTMENTS, JOBS, etc.
```

### Para Windows:

**1. Descargar Oracle XE:**
- Ve a: https://www.oracle.com/database/technologies/xe-downloads.html
- Descarga: **Oracle Database Express Edition 23c** para Windows
- Requiere cuenta Oracle (gratis, solo email)

**2. Instalar:**
- Ejecuta el instalador
- Sigue las instrucciones
- Durante la instalación, crea password para SYS

**3. Verificar instalación:**
- Abre **SQL Plus** desde el menú de inicio
- Conecta como: `sys as sysdba` (usa tu password)

**4. Desbloquear HR Schema:**
```sql
ALTER USER HR ACCOUNT UNLOCK;
ALTER USER HR IDENTIFIED BY hr;
```

## Configurar Conexión en DataGrip

### Mac y Windows (mismo proceso):

**1. Abre DataGrip**

**2. Crea nueva conexión:**
- Haz clic en el botón **"+"** (arriba izquierda)
- Selecciona **Oracle**

**3. Configuración:**
- **Name**: `Oracle XE Local`
- **Host**: `localhost`
- **Port**: `1521`
- **SID**: `XE` (o `XEPDB1` si usas Pluggable Database)
- **User**: `HR`
- **Password**: `hr`

**4. Prueba la conexión:**
- Haz clic en **"Test Connection"**
- Deberías ver: **"Connection successful"**

**5. Guarda:**
- Haz clic en **OK**

## Configurar en appsettings.json

**Abre:** `src/AdministracionFlotillas.Web/appsettings.json`

**Agrega o modifica:**
```json
{
  "ConnectionStrings": {
    "OracleConnection": "Data Source=localhost:1521/XE;User Id=HR;Password=hr;"
  },
  "DatabaseSettings": {
    "UseMockData": false
  }
}
```

**Nota:** Si usas Pluggable Database, usa `XEPDB1` en lugar de `XE`:
```json
"OracleConnection": "Data Source=localhost:1521/XEPDB1;User Id=HR;Password=hr;"
```

## Verificar que HR Schema tiene datos

**En DataGrip:**
1. Conecta a `Oracle XE Local`
2. Expande: `HR` → `Tables`
3. Haz clic derecho en `EMPLOYEES` → **Select Top 1000 Rows**
4. Deberías ver datos de empleados

**Si no hay datos, ejecuta el script HR:**
- El script está en: `$ORACLE_HOME/demo/schema/human_resources/hr_main.sql`
- O descarga desde: Oracle Documentation

## Ventajas vs Oracle Cloud

| Característica | Oracle XE Local | Oracle Cloud |
|----------------|-----------------|--------------|
| Tarjeta de crédito | ❌ No requerida | ✅ Requerida |
| Costo | Gratis siempre | Gratis (con tarjeta) |
| Instalación | Local | Cloud |
| Acceso remoto | No (solo local) | Sí |
| HR Schema | ✅ Incluido | ✅ Disponible |

## Siguiente Paso

Una vez configurado Oracle XE local:
1. Actualiza `appsettings.json` con el connection string
2. Actualiza `EmployeesRepository` para usar Oracle real (ver PLAN_ANTES_COMPARTIR_REPO.md)
3. Prueba la conexión desde la aplicación

