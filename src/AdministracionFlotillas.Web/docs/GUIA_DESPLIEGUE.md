# Guía de Despliegue

**Fecha**: 2026-01-18  
**Versión**: 1.0

---

## Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Preparación del Entorno](#preparación-entorno)
3. [Configuración de Base de Datos](#configuración-base-datos)
4. [Compilación y Publicación](#compilación-publicación)
5. [Despliegue en IIS](#despliegue-iis)
6. [Despliegue en Linux](#despliegue-linux)
7. [Despliegue en Azure](#despliegue-azure)
8. [Verificación Post-Despliegue](#verificación)

---

## Requisitos Previos

### Software Requerido

- **.NET 8.0 SDK** o superior
- **Oracle Client** (ODP.NET) o **Oracle Instant Client**
- **IIS** (para Windows) o **Nginx/Apache** (para Linux)
- **Oracle Database** (local o en la nube)

### Permisos Requeridos

- Acceso a la base de datos Oracle
- Permisos para crear/ejecutar stored procedures
- Permisos de escritura en el servidor de destino

---

## Preparación del Entorno

### 1. Configurar Variables de Entorno

Crear archivo `.env` o configurar variables de entorno del sistema:

```bash
# Connection String
ConnectionStrings__DefaultConnection="Data Source=...;User Id=FLOTILLAS_APP;Password=..."

# Ambiente
ASPNETCORE_ENVIRONMENT="Production"
```

### 2. Configurar appsettings.Production.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=...;User Id=FLOTILLAS_APP;Password=..."
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## Configuración de Base de Datos

### 1. Ejecutar Scripts SQL

Ejecutar en orden:

1. `01_CREATE_TABLE_FLOTILLAS.sql` (si las tablas no existen)
2. `02_CREATE_PKG_ORDERS.sql`
3. `03_CREATE_PKG_PRODUCTS.sql`
4. `04_CREATE_PKG_CUSTOMERS.sql`

### 2. Otorgar Permisos

```sql
-- Otorgar permisos al usuario de la aplicación
GRANT EXECUTE ON CO.PKG_ORDERS TO FLOTILLAS_APP;
GRANT EXECUTE ON CO.PKG_PRODUCTS TO FLOTILLAS_APP;
GRANT EXECUTE ON CO.PKG_CUSTOMERS TO FLOTILLAS_APP;

GRANT SELECT, INSERT, UPDATE, DELETE ON CO.ORDERS TO FLOTILLAS_APP;
GRANT SELECT, INSERT, UPDATE, DELETE ON CO.PRODUCTS TO FLOTILLAS_APP;
GRANT SELECT, INSERT, UPDATE, DELETE ON CO.CUSTOMERS TO FLOTILLAS_APP;

-- Crear sinónimos (opcional)
CREATE SYNONYM FLOTILLAS_APP.ORDERS FOR CO.ORDERS;
CREATE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR CO.PKG_ORDERS;
```

### 3. Verificar Conexión

Probar la conexión desde el servidor de destino:

```bash
# Usando sqlplus (si está instalado)
sqlplus FLOTILLAS_APP/password@connection_string
```

---

## Compilación y Publicación

### 1. Compilar en Modo Release

```bash
cd src/AdministracionFlotillas.Web
dotnet build -c Release
```

### 2. Publicar la Aplicación

#### Para Windows/IIS:

```bash
dotnet publish -c Release -o ./publish
```

#### Para Linux:

```bash
dotnet publish -c Release -o ./publish --self-contained false -r linux-x64
```

#### Para Docker:

```bash
docker build -t administracion-flotillas:latest .
```

---

## Despliegue en IIS

### 1. Instalar .NET Hosting Bundle

Descargar e instalar desde: https://dotnet.microsoft.com/download/dotnet/8.0

### 2. Crear Sitio Web en IIS

1. Abrir IIS Manager
2. Crear nuevo sitio web
3. Configurar:
   - **Nombre**: AdministracionFlotillas
   - **Ruta física**: Ruta donde se publicó la aplicación
   - **Puerto**: 80 o 443 (HTTPS)

### 3. Configurar Application Pool

1. Crear nuevo Application Pool
2. Configurar:
   - **.NET CLR Version**: No Managed Code
   - **Managed Pipeline Mode**: Integrated
   - **Identity**: Usuario con permisos adecuados

### 4. Configurar web.config (si es necesario)

El archivo `web.config` se genera automáticamente al publicar. Verificar que contiene:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="dotnet" 
                arguments=".\AdministracionFlotillas.Web.dll" 
                stdoutLogEnabled="false" 
                stdoutLogFile=".\logs\stdout" />
  </system.webServer>
</configuration>
```

---

## Despliegue en Linux

### 1. Instalar .NET Runtime

```bash
# Ubuntu/Debian
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y aspnetcore-runtime-8.0
```

### 2. Configurar Nginx como Reverse Proxy

Crear archivo `/etc/nginx/sites-available/administracion-flotillas`:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilitar el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/administracion-flotillas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Configurar Systemd Service

Crear archivo `/etc/systemd/system/administracion-flotillas.service`:

```ini
[Unit]
Description=Administracion Flotillas Web App
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/var/www/administracion-flotillas
ExecStart=/usr/bin/dotnet /var/www/administracion-flotillas/AdministracionFlotillas.Web.dll
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=administracion-flotillas
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

Iniciar el servicio:

```bash
sudo systemctl enable administracion-flotillas
sudo systemctl start administracion-flotillas
sudo systemctl status administracion-flotillas
```

---

## Despliegue en Azure

### 1. Crear App Service

1. En Azure Portal, crear nuevo App Service
2. Configurar:
   - **Runtime stack**: .NET 8.0
   - **Operating System**: Windows o Linux
   - **Plan**: App Service Plan

### 2. Configurar Connection String

1. Ir a **Configuration** > **Connection strings**
2. Agregar:
   - **Name**: DefaultConnection
   - **Value**: Connection string de Oracle
   - **Type**: Custom

### 3. Desplegar desde Visual Studio

1. Click derecho en el proyecto > **Publish**
2. Seleccionar **Azure** > **Azure App Service**
3. Seleccionar el App Service creado
4. Click en **Publish**

### 4. Desplegar desde Azure DevOps

Configurar pipeline de CI/CD:

```yaml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: DotNetCoreCLI@2
  displayName: 'Restore packages'
  inputs:
    command: 'restore'
    projects: '**/*.csproj'

- task: DotNetCoreCLI@2
  displayName: 'Build'
  inputs:
    command: 'build'
    projects: '**/*.csproj'
    arguments: '--configuration Release'

- task: DotNetCoreCLI@2
  displayName: 'Publish'
  inputs:
    command: 'publish'
    projects: '**/*.csproj'
    arguments: '--configuration Release --output $(Build.ArtifactStagingDirectory)'

- task: AzureWebApp@1
  displayName: 'Deploy to Azure'
  inputs:
    azureSubscription: 'tu-subscription'
    appName: 'tu-app-service'
    package: '$(Build.ArtifactStagingDirectory)'
```

---

## Verificación Post-Despliegue

### 1. Verificar que la Aplicación Inicia

```bash
# Ver logs
sudo journalctl -u administracion-flotillas -f  # Linux
# O revisar logs en IIS Manager (Windows)
```

### 2. Probar Endpoints

```bash
# Health check (si está implementado)
curl http://localhost:5000/health

# Probar endpoint de órdenes
curl -X POST http://localhost:5000/Orders/ObtenerOrders \
  -H "Content-Type: application/json"
```

### 3. Verificar Conexión a Base de Datos

1. Navegar a la aplicación en el navegador
2. Verificar que los grids cargan datos
3. Revisar logs para errores de conexión

### 4. Verificar Recursos Estáticos

- Verificar que CSS y JavaScript se cargan correctamente
- Verificar que las imágenes se muestran
- Verificar que Syncfusion se carga correctamente

---

## Consideraciones de Seguridad

### 1. HTTPS

Configurar HTTPS en producción:

```bash
# Usando Let's Encrypt (Linux)
sudo certbot --nginx -d tu-dominio.com
```

### 2. Variables de Entorno

Nunca commitear contraseñas o connection strings. Usar:
- Azure Key Vault
- Variables de entorno del sistema
- Secret Manager de .NET

### 3. Firewall

Configurar firewall para permitir solo tráfico necesario:
- Puerto 80/443 (HTTP/HTTPS)
- Bloquear acceso directo al puerto de la aplicación (5000)

---

## Rollback

En caso de problemas, hacer rollback:

### Windows/IIS:

1. Detener el sitio en IIS
2. Restaurar la versión anterior desde backup
3. Reiniciar el sitio

### Linux:

```bash
sudo systemctl stop administracion-flotillas
# Restaurar versión anterior
sudo systemctl start administracion-flotillas
```

### Azure:

1. Ir a **Deployment Center** > **Deployment History**
2. Seleccionar versión anterior
3. Click en **Redeploy**

---

**Última actualización**: 2026-01-18
