# Comandos Útiles

## Clonar Repositorio (Primera Vez)

```bash
# Clonar el repositorio (HTTPS)
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# O usando SSH
# git clone git@github.com:alejandro3469/AdministracionFlotillas.git
```

# Navegar al proyecto
cd AdministracionFlotillas

# Restaurar dependencias (IMPORTANTE después de clonar)
dotnet restore

# Compilar para verificar
dotnet build
```

**Guía completa**: Ver [CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md)

## Navegación

```bash
# Ver dónde estás
pwd

# Ir a la raíz del proyecto
cd /Users/wallfacer/Documents/AdministracionFlotillas

# Ir a un proyecto específico
cd src/AdministracionFlotillas.Web
cd src/AdministracionFlotillas.ReglasNegocio
cd src/AdministracionFlotillas.AccesoDatos
```

## Compilación y Ejecución

```bash
# Restaurar paquetes NuGet (necesario después de clonar o actualizar)
dotnet restore

# Compilar toda la solución
dotnet build

# Compilar un proyecto específico
dotnet build src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj

# Ejecutar la aplicación
cd src/AdministracionFlotillas.Web
dotnet run

# Ejecutar sin compilar primero
dotnet run --no-build
```

## Gestión de Paquetes NuGet

```bash
# Agregar un paquete
dotnet add package NombreDelPaquete

# Listar paquetes instalados
dotnet list package

# Actualizar un paquete
dotnet add package NombreDelPaquete --version NuevaVersion
```

## Gestión de Referencias

```bash
# Agregar referencia entre proyectos
dotnet add reference ../OtroProyecto/OtroProyecto.csproj

# Listar referencias
dotnet list reference

# Remover referencia
dotnet remove reference ../OtroProyecto/OtroProyecto.csproj
```

## Limpieza

```bash
# Limpiar archivos compilados
dotnet clean

# Limpiar y reconstruir
dotnet clean && dotnet build
```

## Información del Proyecto

```bash
# Ver versión de .NET
dotnet --version

# Ver SDKs instalados
dotnet --list-sdks

# Ver información del proyecto
dotnet --info
```

## Testing (cuando agregues tests)

```bash
# Ejecutar tests
dotnet test

# Ejecutar tests con cobertura
dotnet test --collect:"XPlat Code Coverage"
```

## Búsqueda y Reemplazo

```bash
# Buscar texto en archivos (usando grep)
grep -r "texto" src/

# Buscar en archivos C#
grep -r "class" src/ --include="*.cs"
```

## Crear Nuevos Archivos

```bash
# Crear nueva clase
dotnet new class -n NombreClase

# Crear nuevo controlador (en proyecto MVC)
dotnet new controller -n NombreController
```

## Ejecutar con Configuraciones Específicas

```bash
# Ejecutar en modo Release
dotnet run --configuration Release

# Ejecutar con variables de entorno
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

## Publicar

```bash
# Publicar para producción
dotnet publish -c Release

# Publicar para una plataforma específica
dotnet publish -c Release -r osx-x64
```

---

**Última actualización**: Enero 2026
