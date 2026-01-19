# Quick Start - Inicio Rápido

## Para Usuarios Nuevos (Clonando el Repositorio)

### Paso 1: Instalar Herramientas (Solo Primera Vez)

**Windows:**
- Instala .NET SDK 10.0.101
- Instala Git
- Instala VS Code
- Instala extensión C# para VS Code

**Mac:**
- Instala .NET SDK 10.0.101
- Git (viene preinstalado)
- Instala Rider o VS Code

**Guía detallada**: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)

### Paso 2: Clonar el Repositorio

```bash
# Windows (PowerShell)
cd C:\Users\TU_USUARIO\Documents
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# Mac (Terminal)
cd ~/Documents
git clone https://github.com/alejandro3469/AdministracionFlotillas.git

# O usando SSH (si tienes configurado)
# git clone git@github.com:alejandro3469/AdministracionFlotillas.git
```

**Guía detallada**: [CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md)

### Paso 3: Configurar el Proyecto (Después de Clonar)

```bash
# Navegar al proyecto
cd AdministracionFlotillas

# Restaurar dependencias (IMPORTANTE)
dotnet restore

# Compilar para verificar
dotnet build

# Si todo está bien, deberías ver: "Build succeeded"
```

### Paso 4: Ejecutar la Aplicación

```bash
cd src/AdministracionFlotillas.Web
dotnet run
```

Abre el navegador en: `https://localhost:5001`

---

## Para Desarrolladores Existentes

### Comandos Diarios

```bash
# Restaurar dependencias (si hay cambios)
dotnet restore

# Compilar
dotnet build

# Ejecutar
cd src/AdministracionFlotillas.Web
dotnet run
```

---

## Compatibilidad

**Este proyecto funciona en:**
- Windows (VS Code, Visual Studio)
- Mac (Rider, VS Code)
- Linux (VS Code)

**Mismo código, mismos comandos, diferentes sistemas operativos.**

---

## Documentación Completa

- **Clonar repo**: [CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md)
- **Instalar herramientas**: [INSTALACION_HERRAMIENTAS.md](./INSTALACION_HERRAMIENTAS.md)
- **Arquitectura**: [ARQUITECTURA.md](./ARQUITECTURA.md)
- **Continuar desarrollo**: [COMO_CONTINUAR.md](./COMO_CONTINUAR.md)

---

**Última actualización**: Enero 2026

