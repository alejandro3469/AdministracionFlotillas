# Cómo Resetear la Contraseña de Oracle Cloud

## 🔍 Situación Actual
- Estás en la página "Database connection"
- La contraseña no se muestra por seguridad
- Necesitas resetearla o recordarla

## 📋 Opción 1: Resetear desde Database Actions (Recomendado)

### Paso 1: Ir a Database Actions
1. En la página que estás viendo, busca la sección **"Database actions"**
2. O ve directamente a: https://GCCB3C39D89C090-ADMINFLOTILLAS.adb.mx-queretaro-1.oraclecloudapps.com/ords/sql-developer
3. Click en el enlace o botón de **"Database actions"**

### Paso 2: Iniciar Sesión
1. Te pedirá usuario y contraseña
2. Usuario: **ADMIN**
3. Si no recuerdas la contraseña, usa la opción "Forgot Password" o sigue con la Opción 2

### Paso 3: Resetear desde SQL
Si puedes acceder, ejecuta:
```sql
ALTER USER ADMIN IDENTIFIED BY "NuevaContrasena123";
```

## 📋 Opción 2: Resetear desde Oracle Cloud Console

### Paso 1: Buscar Opción de Resetear
1. En la página actual de "Database connection", busca:
   - Un botón que diga **"Reset Password"** o **"Change Password"**
   - O en el menú "More actions" → "Reset Password"

### Paso 2: Si No Encuentras la Opción
1. Ve a la página principal de tu base de datos
2. Busca en el menú lateral o superior: **"Administration"** o **"Security"**
3. Busca la opción de resetear contraseña del usuario ADMIN

## 📋 Opción 3: Recordar la Contraseña Original

### Revisa:
1. **Emails de Oracle Cloud**: Busca el email de confirmación cuando creaste la base de datos
2. **Notas o documentos**: Donde guardaste la contraseña inicial
3. **Gestor de contraseñas**: Si usas 1Password, LastPass, etc.

## 📋 Opción 4: Usar Database Actions para Verificar

### Paso 1: Intentar Conectar
1. Ve a: https://GCCB3C39D89C090-ADMINFLOTILLAS.adb.mx-queretaro-1.oraclecloudapps.com/ords/sql-developer
2. Intenta iniciar sesión con diferentes contraseñas que puedas haber usado
3. Usuario: **ADMIN**

### Paso 2: Si Funciona
- Ya tienes la contraseña correcta
- Úsala en `appsettings.json`

## 🔧 Configuración del Connection String

Una vez que tengas la contraseña, el connection string debe ser:

```json
"OracleConnection": "Data Source=adminflotillas_high;User Id=ADMIN;Password=TU_CONTRASENA_AQUI;"
```

**Nota**: El `adminflotillas_high` es correcto según los TNS names que veo en tu página.

## ⚡ Solución Rápida: Establecer Nueva Contraseña

Si no puedes recordar la contraseña, la forma más rápida es:

1. **Desde Database Actions**:
   - Intenta acceder con contraseñas comunes que uses
   - Si no funciona, necesitarás resetearla desde Oracle Cloud Console

2. **Desde Oracle Cloud Console**:
   - Ve a la página principal de tu base de datos
   - Busca "Administration" → "Users" o "Security"
   - Selecciona el usuario ADMIN
   - Click en "Reset Password"
   - Establece una nueva contraseña (guárdala bien)

## 🧪 Verificar Conexión

Después de configurar la contraseña:

1. Ejecuta: `dotnet run`
2. Navega a: http://localhost:5000/Orders
3. Si hay error, revisa:
   - La contraseña es correcta
   - El usuario es ADMIN (mayúsculas)
   - El connection string está bien formado
