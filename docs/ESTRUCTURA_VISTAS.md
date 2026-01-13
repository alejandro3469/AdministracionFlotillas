# Estructura de Vistas - Guía Completa

Este documento explica detalladamente qué archivos componen cada vista del proyecto y cómo se relacionan entre sí.

## 📋 Índice

1. [Vista Employees (Completa)](#vista-employees-completa)
2. [Vista Home (Básica)](#vista-home-básica)
3. [Cómo Crear una Nueva Vista](#cómo-crear-una-nueva-vista)
4. [Flujo de Datos en una Vista](#flujo-de-datos-en-una-vista)

---

## Vista Employees - COMPLETA Y FUNCIONAL

### 📁 Archivos que Componen esta Vista

La vista Employees está completamente implementada y funcional. Está compuesta por **11 archivos** distribuidos en las 4 capas de la arquitectura:

#### 1️⃣ Capa de Modelos Comunes (1 archivo)

**`src/AdministracionFlotillas.ModelosComunes/Employee.cs`**
- **Propósito**: Define el modelo de negocio que representa un empleado
- **Contenido**: 
  - Propiedades que corresponden a la tabla `EMPLOYEES` de Oracle HR
  - Propiedades: `EmployeeId`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `HireDate`, `JobId`, `Salary`, `CommissionPct`, `ManagerId`, `DepartmentId`
- **Uso**: Este modelo se usa en todas las capas (AccesoDatos, ReglasNegocio, Web)
- **Convención**: Nombre en singular (`Employee`) porque representa una entidad individual

---

#### 2️⃣ Capa de Acceso a Datos (2 archivos)

**`src/AdministracionFlotillas.AccesoDatos/Repositorios/IEmployeesRepository.cs`**
- **Propósito**: Define la interfaz del repositorio (contrato)
- **Contenido**:
  - Métodos: `ObtenerEmployeesAsync()`, `ObtenerEmployeePorIdAsync(int id)`
- **Uso**: La capa de ReglasNegocio usa esta interfaz para acceder a datos
- **Convención**: Prefijo `I` para interfaces, nombre en plural (`Employees`) porque maneja múltiples empleados

**`src/AdministracionFlotillas.AccesoDatos/Repositorios/EmployeesRepository.cs`**
- **Propósito**: Implementa el acceso a datos de empleados
- **Contenido**:
  - Implementa `IEmployeesRepository`
  - Por ahora retorna datos mock (8 empleados de ejemplo)
  - Métodos: `ObtenerEmployeesAsync()`, `ObtenerEmployeePorIdAsync(int id)`
- **Uso**: Es inyectado en la capa de ReglasNegocio
- **Convención**: Nombre en plural (`EmployeesRepository`) porque maneja múltiples empleados
- **Nota**: Cuando se conecte a Oracle real, aquí se ejecutarán las queries SQL

---

#### 3️⃣ Capa de Reglas de Negocio (2 archivos)

**`src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IEmployeesService.cs`**
- **Propósito**: Define la interfaz del servicio de negocio (contrato)
- **Contenido**:
  - **Métodos principales**: `ObtenerEmployeesAsync()`, `ObtenerEmployeePorIdAsync(int id)`
  - **Métodos de negocio**: 
    - `ObtenerEmployeesActivosConSalarioMinimoAsync(decimal salarioMinimo)`
    - `CalcularAntiguedadEnAnios(Employee empleado)`
    - `EsElegibleParaBonificacion(Employee empleado)`
    - `CalcularSalarioAnualEstimado(Employee empleado)`
- **Uso**: La capa Web usa esta interfaz para acceder a la lógica de negocio
- **Convención**: Prefijo `I` para interfaces, nombre en plural (`Employees`) porque maneja múltiples empleados

**`src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/EmployeesServiceOracle.cs`**
- **Propósito**: Implementa las reglas de negocio para empleados en escenario Oracle
- **Contenido**:
  - Implementa `IEmployeesService` con lógica de negocio específica
  - **Reglas de negocio aplicadas**:
    - Validación de salario mínimo (1000m)
    - Ordenamiento por antigüedad (más antiguos primero)
    - Validación de criterios de negocio antes de devolver datos
  - **Métodos de negocio implementados**:
    - `CalcularAntiguedadEnAnios()`: Calcula antigüedad en años con ajuste por meses/días
    - `EsElegibleParaBonificacion()`: Valida elegibilidad según antigüedad (≥1 año) y salario mínimo (≥2000m)
    - `CalcularSalarioAnualEstimado()`: Calcula salario anual incluyendo comisiones estimadas
    - `ObtenerEmployeesActivosConSalarioMinimoAsync()`: Filtra por salario mínimo
  - **Constantes de negocio**:
    - `SalarioMinimo = 1000m`
    - `AntiguedadMinimaParaBonificacion = 1`
    - `SalarioMinimoParaBonificacion = 2000m`
- **Uso**: Es inyectado en el Controller de la capa Web, aplica toda la lógica de negocio
- **Convención**: 
  - Nombre en plural (`EmployeesService`)
  - Sufijo `Oracle` indica el escenario de base de datos
  - Está en carpeta `Escenarios/Oracle/` para separar por tipo de BD
- **Nota**: Si hubiera SQL Server, habría `EmployeesServiceSqlServer.cs` en `Escenarios/SqlServer/` con sus propias reglas de negocio

---

#### 4️⃣ Capa Web - ViewModels y Parseador (2 archivos)

**`src/AdministracionFlotillas.Web/ViewModels/EmployeeViewModel.cs`**
- **Propósito**: Modelo específico para mostrar datos en la vista (UI)
- **Contenido**:
  - **Todas las propiedades están en español**: `IdEmpleado`, `PrimerNombre`, `Apellido`, `CorreoElectronico`, `NumeroTelefono`, `FechaContratacion`, `Salario`, `PorcentajeComision`, `NombreCompleto`, etc.
  - Propiedades formateadas para la UI: `FechaContratacion` (string), `Salario` (string formateado como moneda), `PorcentajeComision` (string formateado como porcentaje)
  - Propiedades adicionales: `NombreDepartamento`, `TituloPuesto` (para mostrar nombres en lugar de IDs)
- **Uso**: Se usa en las vistas y se parsea desde `Employee` usando el parseador manual
- **Convención**: 
  - Sufijo `ViewModel`, nombre en singular (`EmployeeViewModel`)
  - Todas las propiedades en español siguiendo convenciones oficiales
- **Diferencia con Model**: El ViewModel tiene datos formateados y combinados para la UI, mientras que el Model tiene los datos puros de la BD

**`src/AdministracionFlotillas.Web/Parseador/EmployeeParseador.cs`**
- **Propósito**: Parseador manual (sin AutoMapper) para convertir entre `Employee` y `EmployeeViewModel`
- **Contenido**:
  - **Métodos estáticos en español**:
    - `ConvertirAVista(Employee empleado)`: Convierte un Employee a EmployeeViewModel
    - `ConvertirListaAVista(List<Employee> empleados)`: Convierte una lista de Employee a lista de EmployeeViewModel
    - `ConvertirAModelo(EmployeeViewModel modeloVista)`: Convierte un EmployeeViewModel a Employee
  - Conversiones explícitas y formateo manual: fechas a string, salarios a formato moneda, porcentajes, combina nombres
- **Uso**: El Controller llama directamente a los métodos estáticos del parseador
- **Convención**: 
  - Carpeta `Parseador` (en español)
  - Nombre `EmployeeParseador` (sufijo `Parseador`)
  - Métodos y variables en español
  - Parseo manual y explícito (no automático)
- **Nota**: Si agregas otra entidad (ej: Department), creas `DepartmentParseador.cs` en la misma carpeta

---

#### 5️⃣ Capa Web - Controller (1 archivo)

**`src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`**
- **Propósito**: Maneja las peticiones HTTP y coordina las capas (Controller limpio y legible)
- **Contenido**:
  - **Método `Index()`**: Retorna la vista principal (`Views/Employees/Index.cshtml`)
  - **Método `ObtenerEmployees()`**: 
    - Coordina: Llama al Service → Service aplica reglas de negocio → Convierte con Parseador → Retorna JSON
    - El Service ya aplica validaciones y ordenamiento de negocio
  - **Método `ObtenerEmployeePorId(int id)`**: 
    - Coordina: Llama al Service → Service valida y aplica reglas → Convierte con Parseador → Retorna JSON
  - **Métodos helper privados** (para mantener el Controller limpio):
    - `CrearRespuestaExito(object datos)`: Crea respuesta JSON de éxito
    - `CrearRespuestaError(string mensaje)`: Crea respuesta JSON de error
- **Dependencias inyectadas**:
  - `IEmployeesService _servicio`: Para acceder a la lógica de negocio
- **Uso del Parseador**:
  - Usa `EmployeeParseador.ConvertirListaAVista()` para convertir List<Employee> a List<EmployeeViewModel>
  - Usa `EmployeeParseador.ConvertirAVista()` para convertir Employee a EmployeeViewModel
  - El parseador es estático, no requiere inyección de dependencias
- **Características del Controller**:
  - **Limpio y legible**: Los métodos principales se leen como una receta paso a paso
  - **Sin lógica de negocio**: Toda la lógica de negocio está en el Service
  - **Sin parsing complejo**: Solo coordina la conversión usando el Parseador
  - **Métodos helper**: Encapsula la creación de respuestas JSON para mantener el código DRY
- **Convención**: 
  - Nombre en plural (`EmployeesController`)
  - Hereda de `Controller`
  - Métodos públicos son acciones que responden a peticiones HTTP
- **Atributos**:
  - `[AllowAnonymous]`: Permite acceso sin autenticación (para desarrollo)
  - `[IgnoreAntiforgeryToken]`: Ignora validación CSRF para peticiones AJAX
  - `[HttpPost]`: Indica que el método responde a peticiones POST

---

#### 6️⃣ Capa Web - Views (2 archivos)

**`src/AdministracionFlotillas.Web/Views/Employees/Index.cshtml`**
- **Propósito**: Vista principal que el usuario ve en el navegador
- **Contenido**:
  - HTML con breadcrumb de navegación (arriba del título), título y descripción
  - Incluye la vista parcial `_EmployeesGrid` usando `@await Html.PartialAsync("_EmployeesGrid")`
  - Modal para envío por email con validación
  - Sección `@section Scripts` con JavaScript completo para:
    - Inicialización de DataTables con configuración avanzada
    - Filtros personalizados (nombre, fecha, salario, departamento, email, teléfono)
    - Selección de empleados con checkboxes
    - Validación de email con SweetAlert2
    - jQuery UI Datepicker para fechas (localización en español)
    - Inputmask para formato de moneda
    - Tooltips de Bootstrap
- **Funciones JavaScript principales** (todas en PascalCase):
  - `AplicarFiltros()`: Aplica todos los filtros personalizados a la tabla
  - `AgregarEmpleadoSeleccionado(checkbox)`: Agrega un empleado a la lista de seleccionados
  - `RemoverEmpleadoSeleccionado(checkbox)`: Remueve un empleado de la lista de seleccionados
  - `AbrirModalEnviarEmail()`: Abre el modal para enviar email con empleados seleccionados
  - `ValidarEmail(email)`: Valida el formato del email con múltiples reglas
  - `VerDetallesEmpleado(id)`: Muestra detalles de un empleado específico
- **Variables principales** (camelCase, español):
  - `empleadosSeleccionados`: Array con empleados seleccionados
  - `fechaContratacionBase`: Fecha base para restricción de selección
  - `tabla`: Instancia de DataTables
  - `filtroPersonalizado`: Función de filtro personalizado para DataTables
  - `textoFechaInicio`, `textoFechaFin`: Textos de fechas para parsing
  - `partesFechaInicio`, `partesFechaFin`: Arrays con partes de fecha parseada
  - `indiceFila`: Índice de fila en DataTables
  - `textoSalarioMin`, `textoSalarioMax`: Textos de salarios para parsing
  - `salarioNumerico`: Salario convertido a número para comparaciones
  - `textoFiltroDepartamento`, `textoFiltroEmail`, `textoFiltroTelefono`: Textos de filtros de búsqueda
  - `datosFila`: Datos de la fila actual en DataTables
  - `checkboxEmpleado`, `fechaContratacionEmpleado`, `idEmpleadoSeleccionado`: Variables de selección
  - `emailReceptor`, `resultadoValidacion`, `simboloArroba`: Variables de validación de email
  - `datosEmpleado`, `respuestaServidor`, `mensajeDetalle`: Variables de detalle de empleado
  - `instanciaModal`, `nombresEmpleados`: Variables del modal de email
  - `boton`, `tituloAtributo`: Referencias a botones y sus tooltips
  - `listaDesencadenadoresTooltip`, `listaTooltips`: Listas para inicializar tooltips
- **Funcionalidades implementadas**:
  - Breadcrumb: `Home > Employees` (arriba del título)
  - Espaciado visual entre grupos (breadcrumb, título/descripción, filtros, tabla)
  - Modal de envío por email con tabla resumen
  - Validación robusta de email (9 validaciones diferentes)
  - Filtros en tiempo real
  - Selección restringida por fecha de contratación
  - Botones de exportación (Excel, PDF, Print, Refresh, Enviar Email)
- **Estructura**:
  ```html
  <div class="container-fluid">
    <!-- Breadcrumb arriba del título -->
    <nav aria-label="breadcrumb" class="mb-4">...</nav>
    
    <!-- Título y descripción -->
    <div class="mb-5">
      <h2>Employees</h2>
      <p>Descripción</p>
    </div>
    
    <!-- Vista parcial con filtros y tabla -->
    @await Html.PartialAsync("_EmployeesGrid")
  </div>
  <!-- Modal Enviar Email -->
  <div class="modal fade" id="modalEnviarEmail">...</div>
  @section Scripts {
    <script src="~/js/employees.js"></script>
    <script>
      // Funciones: AplicarFiltros(), AgregarEmpleadoSeleccionado(), etc.
      // Variables: empleadosSeleccionados, fechaContratacionBase, tabla, etc.
    </script>
  }
  ```
- **Convención**: 
  - Nombre `Index.cshtml` (vista principal)
  - Ubicación: `Views/[Controller]/Index.cshtml` (sin "Controller" en la ruta)
  - Extensión `.cshtml` (mezcla de C# y HTML)

**`src/AdministracionFlotillas.Web/Views/Employees/_EmployeesGrid.cshtml`**
- **Propósito**: Vista parcial que contiene los filtros y la tabla HTML
- **Contenido**:
  - **Filtros** (6 inputs en 2 filas):
    - Filtro por Nombre (búsqueda en tiempo real)
    - Filtro por Fecha de Contratación (rango: Desde/Hasta con datepicker)
    - Filtro por Rango de Salario (Mínimo/Máximo con formato moneda)
    - Filtro por Departamento (búsqueda por texto)
    - Filtro por Email (búsqueda por texto)
    - Filtro por Teléfono (búsqueda por texto)
  - Tabla HTML con estructura para DataTables
  - Columnas: Checkbox (selección), Nombre Completo, Email, Teléfono, Fecha Contratación, Salario, Departamento, Acciones
  - El `<tbody>` está vacío porque los datos se cargan vía AJAX
- **Estructura**:
  ```html
  <!-- Filtros -->
  <div class="row mb-3">
    <div class="col-md-4">
      <input type="text" id="filtroBusqueda" placeholder="Buscar por nombre...">
    </div>
    <!-- Más filtros... -->
  </div>
  <!-- Tabla -->
  <div class="table-responsive">
    <table id="employeesTable" class="table">
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <!-- Más columnas... -->
        </tr>
      </thead>
      <tbody><!-- Datos cargados vía AJAX --></tbody>
    </table>
  </div>
  ```
- **Convención**: 
  - Prefijo `_` indica que es una vista parcial
  - Se puede reutilizar en otras vistas si es necesario
  - No tiene `@section Scripts` porque el JavaScript está en la vista principal
  - Estilo minimalista (sin cards, solo tabla y filtros)

---

#### 7️⃣ Capa Web - JavaScript (1 archivo)

**`src/AdministracionFlotillas.Web/wwwroot/js/employees.js`**
- **Propósito**: Funciones JavaScript reutilizables para la vista Employees
- **Contenido**:
  - **Espera a que jQuery esté disponible** antes de ejecutar código (función `EsperarJQuery`)
  - **`window.mostrarMensaje(tipo, mensaje, titulo)`**: Muestra toasts de Bootstrap (success/error/info)
  - **`window.actualizarTabla()`**: Recarga la tabla DataTables
  - **Manejo global de errores AJAX**: Captura errores de todas las peticiones AJAX (función `RegistrarErrorAjax`)
- **Uso**: Se incluye en `Index.cshtml` con `<script src="~/js/employees.js"></script>`
- **Nota**: La mayoría de la lógica JavaScript está en el `@section Scripts` de `Index.cshtml` (inicialización de DataTables, filtros, validación, etc.)
- **Convención**: 
  - Nombre en minúsculas y plural (`employees.js`)
  - Ubicación: `wwwroot/js/` (archivos estáticos)
  - **Funciones en PascalCase** (ej: `EsperarJQuery`, `RegistrarErrorAjax`)
  - **Variables en camelCase y español** (ej: `idToast`, `claseFondo`, `iconoMensaje`, `htmlToast`, `elementoToast`, `instanciaToast`, `tituloMensaje`, `evento`, `configuracion`, `mensajeError`)
  - Funciones expuestas globalmente con `window.` para acceso desde otras partes del código

---

#### 8️⃣ Capa Web - Configuración y Layout (3 archivos)

**`src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml`**
- **Propósito**: Layout principal que envuelve todas las vistas
- **Contenido**:
  - **Scripts cargados en orden oficial** (al final de `<body>`):
    1. jQuery 3.7.1 (CDN, minificado)
    2. Bootstrap JS (local)
    3. jQuery UI 1.13.2 (CDN) para datepicker
    4. jsZip (CDN) - requerido por DataTables Buttons
    5. pdfmake (CDN) - requerido por DataTables Buttons
    6. DataTables Core 1.13.7 (CDN)
    7. DataTables Extensions: Buttons, HTML5, Print, Responsive (CDN)
    8. Inputmask 5.0.8 (CDN) para formato de moneda
    9. SweetAlert2 11 (CDN) para alertas personalizadas
    10. Custom scripts (site.js, employees.js)
  - **CSS cargados en `<head>`**:
    - Bootstrap CSS (local)
    - jQuery UI CSS (CDN)
    - DataTables CSS (CDN) con extensiones
    - Font Awesome 5.15.4 (CDN) para iconos
    - Custom CSS (site.css)
  - Menú de navegación con enlace "Employees"
  - Padding consistente en toda la aplicación
- **Uso**: Todas las vistas usan este layout (configurado en `_ViewStart.cshtml`)
- **Convención**: Prefijo `_` indica que es compartido
- **Nota**: El orden de carga de scripts es crítico y sigue la documentación oficial de cada librería

**`src/AdministracionFlotillas.Web/Program.cs`**
- **Propósito**: Configuración de la aplicación y Dependency Injection
- **Contenido**:
  - Registro de Repository: `builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>()`
  - Registro de Service: `builder.Services.AddScoped<IEmployeesService, EmployeesServiceOracle>()`
  - Configuración de rutas MVC
  - **Nota**: No se registra AutoMapper, se usa parseador manual estático
- **Uso**: Se ejecuta al iniciar la aplicación
- **Convención**: Archivo de configuración principal de ASP.NET Core

**`src/AdministracionFlotillas.Web/appsettings.json`**
- **Propósito**: Configuración de la aplicación (cadenas de conexión, etc.)
- **Contenido**:
  - `ConnectionStrings.OracleConnection`: Cadena de conexión a Oracle (placeholder)
  - `DatabaseSettings.UseMockData`: Flag para usar datos mock o reales (actualmente `true`)
- **Uso**: Se lee en `Program.cs` con `builder.Configuration.GetConnectionString("OracleConnection")`
- **Convención**: Archivo JSON estándar de configuración en ASP.NET Core

**`src/AdministracionFlotillas.Web/wwwroot/css/site.css`**
- **Propósito**: Estilos CSS personalizados para la aplicación
- **Contenido**:
  - Padding consistente para `.container`, `.container-fluid`, `main`
  - Estilos para botones de DataTables (transparentes con hover opaco)
  - Estilos para botón "Enviar por Email" (transparente con hover opaco)
  - Estilos minimalistas (solo lo necesario)
- **Uso**: Se incluye automáticamente en `_Layout.cshtml`
- **Convención**: Archivo CSS estándar en `wwwroot/css/`

---

### 🔄 Flujo de Datos en la Vista Employees

```
1. Usuario visita /Employees
   ↓
2. EmployeesController.Index() retorna Views/Employees/Index.cshtml
   ↓
3. El navegador carga Index.cshtml + _EmployeesGrid.cshtml + employees.js
   ↓
4. JavaScript inicializa DataTables y hace petición AJAX POST a /Employees/ObtenerEmployees
   ↓
5. EmployeesController.ObtenerEmployees() recibe la petición
   ↓
6. Controller llama a _servicio.ObtenerEmployeesAsync() (IEmployeesService)
   ↓
7. Service llama a _repositorio.ObtenerEmployeesAsync() (IEmployeesRepository)
   ↓
8. Repository retorna List<Employee> (datos mock por ahora)
   ↓
9. Service aplica reglas de negocio:
   - Valida salario mínimo (1000m)
   - Ordena por antigüedad (más antiguos primero)
   - Retorna List<Employee> con reglas aplicadas
   ↓
10. Controller usa EmployeeParseador.ConvertirListaAVista() para convertir List<Employee> → List<EmployeeViewModel>
    ↓
11. Controller retorna JSON: { exito: true, datos: List<EmployeeViewModel> }
    (Las propiedades del JSON están en español: idEmpleado, nombreCompleto, correoElectronico, etc.)
    ↓
12. JavaScript recibe la respuesta y actualiza DataTables
    ↓
13. Usuario ve la tabla con datos
```

---

## Vista Home - BÁSICA (No Funcional)

### 📁 Archivos que Componen esta Vista

La vista Home es básica y viene por defecto con ASP.NET Core MVC. Está compuesta por **3 archivos**:

#### 1️⃣ Capa Web - Controller (1 archivo)

**`src/AdministracionFlotillas.Web/Controllers/HomeController.cs`**
- **Propósito**: Controller básico por defecto de ASP.NET Core
- **Contenido**:
  - `Index()`: Retorna la vista de inicio
  - `Privacy()`: Retorna la vista de privacidad
  - `Error()`: Retorna la vista de error
- **Estado**: No tiene lógica de negocio, solo retorna vistas básicas
- **Nota**: Esta vista no está relacionada con el dominio del proyecto (flotillas/empleados)

---

#### 2️⃣ Capa Web - Views (2 archivos)

**`src/AdministracionFlotillas.Web/Views/Home/Index.cshtml`**
- **Propósito**: Vista de inicio por defecto
- **Contenido**: HTML básico de bienvenida
- **Estado**: No tiene funcionalidad específica del proyecto

**`src/AdministracionFlotillas.Web/Views/Home/Privacy.cshtml`**
- **Propósito**: Vista de privacidad por defecto
- **Contenido**: HTML básico sobre privacidad
- **Estado**: No tiene funcionalidad específica del proyecto

---

### ⚠️ Nota sobre Vista Home

Esta vista es solo un placeholder. No tiene:
- ❌ Modelo de negocio
- ❌ Repository
- ❌ Service
- ❌ ViewModel
- ❌ JavaScript personalizado
- ❌ Funcionalidad específica del proyecto

---

## Cómo Crear una Nueva Vista

Para crear una nueva vista completa (ej: Departments), necesitas crear **11 archivos** siguiendo el mismo patrón que Employees:

### Checklist de Archivos a Crear

#### 1. Capa de Modelos Comunes
- [ ] `src/AdministracionFlotillas.ModelosComunes/Department.cs`

#### 2. Capa de Acceso a Datos
- [ ] `src/AdministracionFlotillas.AccesoDatos/Repositorios/IDepartmentsRepository.cs`
- [ ] `src/AdministracionFlotillas.AccesoDatos/Repositorios/DepartmentsRepository.cs`

#### 3. Capa de Reglas de Negocio
- [ ] `src/AdministracionFlotillas.ReglasNegocio/Servicios/Interfaces/IDepartmentsService.cs`
- [ ] `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/DepartmentsServiceOracle.cs`

#### 4. Capa Web - ViewModels y Parseador
- [ ] `src/AdministracionFlotillas.Web/ViewModels/DepartmentViewModel.cs` (con propiedades en español)
- [ ] `src/AdministracionFlotillas.Web/Parseador/DepartmentParseador.cs` (parseador manual)

#### 5. Capa Web - Controller
- [ ] `src/AdministracionFlotillas.Web/Controllers/DepartmentsController.cs`

#### 6. Capa Web - Views
- [ ] `src/AdministracionFlotillas.Web/Views/Departments/Index.cshtml`
- [ ] `src/AdministracionFlotillas.Web/Views/Departments/_DepartmentsGrid.cshtml`

#### 7. Capa Web - JavaScript
- [ ] `src/AdministracionFlotillas.Web/wwwroot/js/departments.js`

#### 8. Capa Web - Configuración
- [ ] Actualizar `src/AdministracionFlotillas.Web/Program.cs` (registrar Repository y Service)
- [ ] Actualizar `src/AdministracionFlotillas.Web/Views/Shared/_Layout.cshtml` (agregar enlace de navegación)

---

## Flujo de Datos en una Vista

### Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA WEB (Vista)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Index.cshtml│  │_EmployeesGrid│  │employees.js  │     │
│  │   (Vista)     │  │  (Parcial)   │  │  (JavaScript)│     │
│  └──────┬────────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                   │                 │             │
│         └───────────────────┴─────────────────┘             │
│                            │                                 │
│                            ▼                                 │
│                  ┌──────────────────┐                        │
│                  │EmployeesController│                       │
│                  │  (Controller)    │                        │
│                  └────────┬─────────┘                        │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE REGLAS DE NEGOCIO                      │
│  ┌──────────────────────────────────────────────┐         │
│  │  EmployeesServiceOracle (Service)              │         │
│  │  - Aplica validaciones                        │         │
│  │  - Aplica reglas de negocio                   │         │
│  └──────────────┬─────────────────────────────────┘         │
└─────────────────┼───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE ACCESO A DATOS                         │
│  ┌──────────────────────────────────────────────┐         │
│  │  EmployeesRepository (Repository)             │         │
│  │  - Ejecuta queries SQL                        │         │
│  │  - Retorna datos de la BD                     │         │
│  └──────────────┬─────────────────────────────────┘         │
└─────────────────┼───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE MODELOS COMUNES                        │
│  ┌──────────────────────────────────────────────┐         │
│  │  Employee (Model)                             │         │
│  │  - Representa un empleado                     │         │
│  └──────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    ORACLE DATABASE                           │
│  ┌──────────────────────────────────────────────┐         │
│  │  Tabla EMPLOYEES                               │         │
│  └──────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Flujo Detallado Paso a Paso

1. **Usuario hace clic en "Employees" en el menú**
   - El navegador hace petición GET a `/Employees`
   - ASP.NET Core MVC enruta a `EmployeesController.Index()`

2. **Controller retorna la vista**
   - `Index()` retorna `Views/Employees/Index.cshtml`
   - La vista se renderiza usando `_Layout.cshtml`

3. **El navegador carga los recursos**
   - HTML de `Index.cshtml` y `_EmployeesGrid.cshtml`
   - CSS de DataTables y Bootstrap (desde CDN en `_Layout.cshtml`)
   - JavaScript: jQuery, DataTables, y `employees.js`

4. **JavaScript inicializa DataTables**
   - Cuando el documento está listo (`$(document).ready()`)
   - DataTables hace petición AJAX POST a `/Employees/ObtenerEmployees`

5. **Controller recibe la petición AJAX**
   - `ObtenerEmployees()` se ejecuta
   - Llama a `_servicio.ObtenerEmployeesAsync()`

6. **Service aplica reglas de negocio**
   - `EmployeesServiceOracle.ObtenerEmployeesAsync()` se ejecuta
   - Llama a `_repositorio.ObtenerEmployeesAsync()`
   - Aplica validación de salario mínimo (1000m)
   - Ordena por antigüedad (más antiguos primero)
   - Retorna List<Employee> con reglas de negocio aplicadas

7. **Repository obtiene datos**
   - `EmployeesRepository.ObtenerEmployeesAsync()` se ejecuta
   - Por ahora retorna datos mock
   - En producción, ejecutaría query SQL a Oracle

8. **Datos regresan por las capas**
   - Repository retorna `List<Employee>`
   - Service retorna `List<Employee>` (con reglas aplicadas)
   - Controller recibe `List<Employee>`

9. **Controller convierte a ViewModel**
   - Usa parseador manual: `EmployeeParseador.ConvertirListaAVista(empleados)`
   - Convierte fechas a string, salarios a formato moneda, porcentajes, etc.
   - Todas las propiedades se convierten a español (IdEmpleado, PrimerNombre, etc.)

10. **Controller retorna JSON**
    - Usa método helper `CrearRespuestaExito(modelosVista)` para mantener el código limpio
    - Retorna `Json(new { exito = true, datos = modelosVista })`
    - El JSON se envía al navegador

11. **JavaScript procesa la respuesta**
    - DataTables recibe los datos en `respuesta.datos`
    - Actualiza la tabla con los datos
    - Usuario ve la tabla poblada

---

## Resumen de Archivos por Vista

### Vista Employees (COMPLETA) - 11 archivos

| Capa | Archivo | Propósito |
|------|---------|-----------|
| **ModelosComunes** | `Employee.cs` | Modelo de negocio |
| **AccesoDatos** | `IEmployeesRepository.cs` | Interfaz del repositorio |
| **AccesoDatos** | `EmployeesRepository.cs` | Implementación del repositorio |
| **ReglasNegocio** | `IEmployeesService.cs` | Interfaz del servicio |
| **ReglasNegocio** | `EmployeesServiceOracle.cs` | Implementación del servicio |
| **Web** | `EmployeeViewModel.cs` | Modelo para la vista (propiedades en español) |
| **Web** | `Parseador/EmployeeParseador.cs` | Parseador manual (sin AutoMapper) |
| **Web** | `EmployeesController.cs` | Controller MVC |
| **Web** | `Views/Employees/Index.cshtml` | Vista principal |
| **Web** | `Views/Employees/_EmployeesGrid.cshtml` | Vista parcial (tabla) |
| **Web** | `wwwroot/js/employees.js` | JavaScript |
| **Web** | `Program.cs` | Configuración DI |
| **Web** | `_Layout.cshtml` | Layout compartido |
| **Web** | `appsettings.json` | Configuración |

### Vista Home (BÁSICA) - 3 archivos

| Capa | Archivo | Propósito |
|------|---------|-----------|
| **Web** | `HomeController.cs` | Controller básico |
| **Web** | `Views/Home/Index.cshtml` | Vista de inicio |
| **Web** | `Views/Home/Privacy.cshtml` | Vista de privacidad |

---

## Convenciones de Nomenclatura

### Para Modelos
- **Singular**: `Employee.cs`, `Department.cs`, `Job.cs`
- **Ubicación**: `src/AdministracionFlotillas.ModelosComunes/`

### Para Repositories
- **Interfaz**: `IEmployeesRepository.cs` (plural, prefijo `I`)
- **Implementación**: `EmployeesRepository.cs` (plural)
- **Ubicación**: `src/AdministracionFlotillas.AccesoDatos/Repositorios/`

### Para Services
- **Interfaz**: `IEmployeesService.cs` (plural, prefijo `I`)
- **Implementación**: `EmployeesServiceOracle.cs` (plural + escenario)
- **Ubicación**: `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/[Escenario]/`

### Para ViewModels
- **Singular**: `EmployeeViewModel.cs`, `DepartmentViewModel.cs`
- **Ubicación**: `src/AdministracionFlotillas.Web/ViewModels/`
- **Convención**: Todas las propiedades en español (IdEmpleado, PrimerNombre, etc.)

### Para Parseadores
- **Sufijo Parseador**: `EmployeeParseador.cs`, `DepartmentParseador.cs`
- **Ubicación**: `src/AdministracionFlotillas.Web/Parseador/`
- **Convención**: Métodos estáticos en español (ConvertirAVista, ConvertirAModelo)

### Para Controllers
- **Plural**: `EmployeesController.cs`, `DepartmentsController.cs`
- **Ubicación**: `src/AdministracionFlotillas.Web/Controllers/`

### Para Views
- **Principal**: `Index.cshtml` (siempre este nombre)
- **Parcial**: `_[Nombre]Grid.cshtml` (prefijo `_` para parciales)
- **Ubicación**: `src/AdministracionFlotillas.Web/Views/[Controller]/`

### Para JavaScript
- **Minúsculas y plural**: `employees.js`, `departments.js`
- **Ubicación**: `src/AdministracionFlotillas.Web/wwwroot/js/`

---

**Última actualización**: Enero 2026
