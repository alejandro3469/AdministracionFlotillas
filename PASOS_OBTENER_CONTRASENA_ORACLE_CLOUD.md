# Pasos para Obtener/Resetear Contraseña de Oracle Cloud

## ✅ Información de tu Base de Datos
- **Database Name**: ADMINFLOTILLAS
- **Tipo**: Autonomous AI Database (Always Free)
- **Estado**: Available
- **Usuario**: ADMIN

## 📋 Pasos para Obtener la Contraseña

### Paso 1: Click en "Database connection"
En la página que estás viendo, busca la sección que dice:
- **"Database connection"** (debe estar visible en la página)

### Paso 2: Ver o Resetear Contraseña
Una vez que hagas click en "Database connection", verás:

**Opción A: Ver Contraseña Actual**
- Si la contraseña está visible, cópiala
- Si está enmascarada (con asteriscos), necesitarás resetearla

**Opción B: Resetear Contraseña**
1. Busca el botón **"Reset Password"** o **"Change Password"**
2. Click en el botón
3. Ingresa una nueva contraseña (guárdala en un lugar seguro)
4. Confirma la contraseña
5. **IMPORTANTE**: Copia y guarda la nueva contraseña

### Paso 3: Ver Connection String
En la misma página de "Database connection" también verás:
- **Connection String** completo
- Puede verse algo como: `adminflotillas_high` o similar
- Este es el que ya tenemos configurado: `adminflotillas_high`

## 🔧 Si No Ves "Database connection" en la Página

### Alternativa: Desde el Menú
1. En la parte superior de la página, busca el menú con tres puntos o "More actions"
2. Click en **"Database connection"** o **"DB Connection"**
3. Sigue los pasos anteriores

## ✅ Después de Obtener la Contraseña

### Configurar en appsettings.json

**Archivo**: `src/AdministracionFlotillas.Web/appsettings.json`

**Línea 10**, reemplaza:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_PASSWORD;"
```

**Con tu contraseña real**:
```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TuContrasenaReal123;"
```

## 🔒 Seguridad

### ⚠️ IMPORTANTE:
- **NO** subas el archivo `appsettings.json` con la contraseña real a Git
- Usa `appsettings.Development.json` para desarrollo local
- Para producción, usa variables de entorno o Azure Key Vault

## 🧪 Verificar Conexión

Después de configurar:

1. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```

2. Navega a: http://localhost:5000/Orders

3. Si hay error de conexión, revisa:
   - La contraseña es correcta
   - El connection string está bien formado
   - La base de datos está accesible desde tu red

## 📝 Notas Adicionales

### Connection String Completo
Si en "Database connection" ves un connection string completo, puede verse así:
```
adminflotillas_high = (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=...))(connect_data=(service_name=...))(security=(ssl_server_cert_dn="CN=..."))))
```

Para nuestra aplicación, solo necesitamos:
```
Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_CONTRASENA;
```

El `adminflotillas_high` es el alias que Oracle Cloud genera automáticamente.
