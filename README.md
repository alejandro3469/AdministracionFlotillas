# AdministracionFlotillas

Proyecto .NET multiplataforma para administración de flotillas con arquitectura en capas.

## 📋 Descripción

Este proyecto implementa una aplicación web para la administración de flotillas utilizando:
- **.NET 10.0** (Multiplataforma - Mac y Windows)
- **ASP.NET Core MVC** (Patrón Model-View-Controller)
- **Arquitectura en 3 capas**:
  - Capa de Aplicación (Web/MVC)
  - Capa de Reglas de Negocio
  - Capa de Acceso a Datos

## Estructura del Proyecto

```
AdministracionFlotillas/
├── src/
│   ├── AdministracionFlotillas.Web/              # Capa de Aplicación (MVC)
│   ├── AdministracionFlotillas.ReglasNegocio/   # Capa de Reglas de Negocio
│   ├── AdministracionFlotillas.AccesoDatos/      # Capa de Acceso a Datos
│   └── AdministracionFlotillas.ModelosComunes/   # Modelos compartidos
├── docs/                                          # Documentación del proyecto
│   ├── README.md                                  # Índice de documentación
│   ├── CLONAR_REPOSITORIO.md                     # Guía para clonar el repo
│   ├── QUICK_START.md                             # Inicio rápido
│   ├── INSTALACION_HERRAMIENTAS.md               # Instalación de herramientas
│   ├── ARQUITECTURA.md                            # Diagramas de arquitectura
│   ├── REQUISITOS_PROYECTO.md                    # Requisitos completos
│   ├── COMO_CONTINUAR.md                         # Guía paso a paso
│   ├── SETUP.md                                   # Guía de configuración
│   ├── GUIA_BASE_DATOS.md                        # Configuración de BD
│   ├── COMANDOS_UTILES.md                        # Comandos útiles
│   ├── NOTAS.md                                   # Notas personales
│   └── SEGUIMIENTO_PROGRESO.md                    # Seguimiento de progreso
└── README.md                                      # Este archivo
```

## Inicio Rápido

### Si estás clonando el repositorio por primera vez:

1. **Instala las herramientas necesarias:**
   - Sigue: [docs/INSTALACION_HERRAMIENTAS.md](./docs/INSTALACION_HERRAMIENTAS.md)
   - Necesitas: .NET SDK 10.0.101, Git, VS Code (Windows) o Rider (Mac)

2. **Clona el repositorio:**
   - Sigue: [docs/CLONAR_REPOSITORIO.md](./docs/CLONAR_REPOSITORIO.md)
   - Guía completa paso a paso para Windows y Mac

3. **Después de clonar, ejecuta:**
   ```bash
   # Restaurar dependencias (descarga paquetes NuGet)
   dotnet restore
   
   # Compilar para verificar que todo está bien
   dotnet build
   
   # Ejecutar la aplicación
   cd src/AdministracionFlotillas.Web
   dotnet run
   ```

### Si ya tienes el proyecto localmente:

1. **Abre el proyecto en tu IDE:**
   ```bash
   # Windows
   cd C:\Users\TU_USUARIO\Documents\AdministracionFlotillas
   
   # Mac
   cd ~/Documents/AdministracionFlotillas
   ```

2. **Restaura las dependencias (si es necesario):**
   ```bash
   dotnet restore
   ```

3. **Compila el proyecto:**
   ```bash
   dotnet build
   ```

4. **Ejecuta la aplicación:**
   ```bash
   cd src/AdministracionFlotillas.Web
   dotnet run
   ```

## 📚 Documentación

Toda la documentación está en la carpeta **[docs/](./docs/)**:

- **[docs/README.md](./docs/README.md)** - Índice de toda la documentación
- **[docs/CLONAR_REPOSITORIO.md](./docs/CLONAR_REPOSITORIO.md)** - **NUEVO** - Guía para clonar el repo y configurarlo
- **[docs/INSTALACION_HERRAMIENTAS.md](./docs/INSTALACION_HERRAMIENTAS.md)** - Guía completa de instalación (Mac y Windows)
- **[docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md)** - Diagramas de arquitectura y flujos
- **[docs/REQUISITOS_PROYECTO.md](./docs/REQUISITOS_PROYECTO.md)** - Requisitos completos del proyecto
- **[docs/COMO_CONTINUAR.md](./docs/COMO_CONTINUAR.md)** - Guía paso a paso para continuar
- **[docs/SETUP.md](./docs/SETUP.md)** - Guía de configuración rápida
- **[docs/GUIA_BASE_DATOS.md](./docs/GUIA_BASE_DATOS.md)** - Guía de configuración de base de datos
- **[docs/COMANDOS_UTILES.md](./docs/COMANDOS_UTILES.md)** - Comandos útiles para desarrollo
- **[docs/NOTAS.md](./docs/NOTAS.md)** - Notas personales y recordatorios
- **[docs/SEGUIMIENTO_PROGRESO.md](./docs/SEGUIMIENTO_PROGRESO.md)** - Seguimiento detallado del progreso

### Documentación Externa

- **Guía Completa**: Ver `GUIA_PROYECTO_NET_CROSS_PLATFORM.md` en el proyecto pos-online
  - Guía detallada paso a paso para crear el proyecto
  - Explicaciones de conceptos (C#, .NET, MVC, IDE)
  - Instrucciones para Mac y Windows

## Tecnologías

- **.NET 10.0.101** - Framework multiplataforma
  - Compatible con Mac (Rider, DataGrip)
  - Compatible con Windows (VS Code, Visual Studio)
  - Compatible con Linux (VS Code)
  - **Mismo código funciona en todos los sistemas operativos**
- **ASP.NET Core MVC** - Patrón Model-View-Controller
- **C#** - Lenguaje de programación
- **Oracle Database** - Base de datos remota (Oracle Cloud Free Tier recomendado)
- **Kendo UI** - Framework de UI (última versión)
- **Bootstrap** - Framework CSS (última versión)
- **AutoMapper** - Parser ViewModel ↔ BusinessModel
- **DataGrip** (Mac) / **DataGrip o SQL Developer** (Windows) - Herramientas de visualización de base de datos

## Compatibilidad Multiplataforma

**Este proyecto es 100% compatible con:**
- Windows (VS Code, Visual Studio)
- Mac (Rider, VS Code)
- Linux (VS Code)

**Los usuarios de Windows pueden:**
- Clonar el repositorio sin problemas
- Ejecutar los mismos comandos `dotnet`
- Compilar y ejecutar la aplicación
- Trabajar con el mismo código que los usuarios de Mac

**Comandos después de clonar (Windows y Mac):**
```bash
dotnet restore  # Restaurar dependencias
dotnet build    # Compilar
dotnet run      # Ejecutar
```

## Estado del Proyecto

Ver el estado detallado en **[docs/SEGUIMIENTO_PROGRESO.md](./docs/SEGUIMIENTO_PROGRESO.md)**

**Resumen rápido:**
- [x] Crear solución
- [x] Crear proyecto AccesoDatos
- [x] Crear proyecto ModelosComunes
- [x] Crear proyecto ReglasNegocio
- [x] Crear proyecto Web (MVC)
- [x] Configurar todas las referencias entre proyectos
- [x] Crear documentación completa con diagramas
- [x] Crear guía para clonar repositorio
- [ ] Agregar paquetes NuGet necesarios
- [ ] Configurar base de datos remota gratuita
- [ ] Configurar Kendo UI y Bootstrap
- [ ] Crear repositorio GitHub
- [ ] Implementar funcionalidades CRUD con modales
- [ ] Crear dashboards gamificados

## Para Nuevos Miembros del Equipo

**Si vas a clonar y colaborar en el repositorio existente:**

1. **Instala las herramientas**: [docs/INSTALACION_HERRAMIENTAS.md](./docs/INSTALACION_HERRAMIENTAS.md)
2. **Clona el repositorio**: [docs/CLONAR_REPOSITORIO.md](./docs/CLONAR_REPOSITORIO.md)
3. **Después de clonar, ejecuta:**
   ```bash
   dotnet restore  # Restaurar dependencias
   dotnet build    # Compilar proyecto
   ```
4. **Inicio rápido**: [docs/QUICK_START.md](./docs/QUICK_START.md)

## Para Crear el Proyecto Desde Cero

**Si vas a crear el proyecto desde cero:**

1. **Plan completo**: [docs/PLAN_ANTES_COMPARTIR_REPO.md](./docs/PLAN_ANTES_COMPARTIR_REPO.md) - Plan completo de implementación
2. **Ver arquitectura**: [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md) - Diagramas y estructura
3. **Continúa desarrollo**: [docs/COMO_CONTINUAR.md](./docs/COMO_CONTINUAR.md) - Pasos de desarrollo
4. **Revisa progreso**: [docs/SEGUIMIENTO_PROGRESO.md](./docs/SEGUIMIENTO_PROGRESO.md) - Estado actual

## 🔗 Enlaces Útiles

- [Documentación oficial de .NET](https://learn.microsoft.com/dotnet/)
- [Documentación de ASP.NET Core](https://learn.microsoft.com/aspnet/core/)
- [AdventureWorks Sample Database](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure)
