# Estructura de Vistas - Guía Completa

Este documento explica detalladamente qué archivos componen cada vista del proyecto y cómo se relacionan entre sí.

## 📋 Índice

1. [Guía para Principiantes: Cómo Funciona la Vista Employees](#guía-para-principiantes-cómo-funciona-la-vista-employees)
2. [Vista Employees (Completa)](#vista-employees-completa)
3. [Vista Home (Básica)](#vista-home-básica)
4. [Cómo Crear una Nueva Vista](#cómo-crear-una-nueva-vista)
5. [Flujo de Datos en una Vista](#flujo-de-datos-en-una-vista)

---

## 🎓 Guía para Principiantes: Cómo Funciona la Vista Employees

Esta sección explica paso a paso cómo funciona la vista Employees, desde que el usuario abre la página hasta que ve los datos en la pantalla. Usa esta sección como ejemplo para entender cómo crear otras vistas.

### ¿Qué es una Vista?

Una **vista** es lo que el usuario ve en su navegador cuando visita una página web. En nuestro caso, la vista Employees muestra una tabla con información de empleados.

### ¿Qué Capas Existen y Para Qué Sirven?

Nuestra aplicación está dividida en **4 capas** (como pisos de un edificio). Cada capa tiene una responsabilidad específica:

#### 🏢 Capa 1: Modelos Comunes (Base)
**Ubicación**: `src/AdministracionFlotillas.ModelosComunes/`

**¿Qué es?**: Es como un diccionario común que todas las otras capas usan para entenderse.

**¿Para qué sirve?**: Define cómo se ve un "empleado" en el código. Por ejemplo, un empleado tiene: nombre, apellido, email, salario, etc.

**Ejemplo de archivo**: `Employee.cs` - Define que un empleado tiene estas propiedades:
- `EmployeeId` (número de identificación)
- `FirstName` (primer nombre)
- `LastName` (apellido)
- `Email` (correo electrónico)
- `Salary` (salario)
- etc.

**En términos simples**: Es como una plantilla que dice "un empleado tiene estos datos".

---

#### 💾 Capa 2: Acceso a Datos (Almacén)
**Ubicación**: `src/AdministracionFlotillas.AccesoDatos/`

**¿Qué es?**: Es como un almacén que guarda y recupera información de la base de datos.

**¿Para qué sirve?**: 
- Obtiene datos de la base de datos (o datos de prueba si no hay base de datos)
- Guarda datos en la base de datos
- No sabe nada sobre reglas de negocio, solo obtiene datos

**Ejemplo de archivos**:
- `IEmployeesRepository.cs` - Define qué métodos debe tener el repositorio (como un contrato)
- `EmployeesRepository.cs` - Implementa esos métodos, obtiene los datos reales

**En términos simples**: Es como un empleado de almacén que va a buscar cajas cuando se le pide.

**¿De dónde vienen los datos?**
- Por ahora: Datos de prueba (mock) - 56 empleados de ejemplo guardados en el código
- En el futuro: Base de datos Oracle real

---

#### 🧠 Capa 3: Reglas de Negocio (Lógica)
**Ubicación**: `src/AdministracionFlotillas.ReglasNegocio/`

**¿Qué es?**: Es como el cerebro de la aplicación. Aquí se aplican las reglas y validaciones.

**¿Para qué sirve?**:
- Aplica reglas de negocio (ej: solo mostrar empleados con salario mayor a $1000)
- Calcula cosas (ej: antigüedad de un empleado)
- Valida datos (ej: verificar que un empleado existe)
- Ordena y filtra datos según reglas

**Ejemplo de archivos**:
- `IEmployeesService.cs` - Define qué métodos debe tener el servicio (contrato)
- `EmployeesServiceOracle.cs` - Implementa esos métodos con la lógica real

**Ejemplo de reglas aplicadas**:
- Solo mostrar empleados con salario >= $1000
- Ordenar empleados por antigüedad (más antiguos primero)
- Calcular cuántos años lleva un empleado trabajando

**En términos simples**: Es como un supervisor que revisa los datos y decide qué hacer con ellos según las reglas de la empresa.

---

#### 🌐 Capa 4: Web (Presentación)
**Ubicación**: `src/AdministracionFlotillas.Web/`

**¿Qué es?**: Es lo que el usuario ve y con lo que interactúa en el navegador.

**¿Para qué sirve?**:
- Muestra datos en la pantalla (tablas, formularios, botones)
- Recibe acciones del usuario (clicks, escribir texto)
- Convierte datos del formato de negocio al formato de la vista
- Envía peticiones al servidor cuando el usuario hace algo

**Ejemplo de archivos**:
- `EmployeesController.cs` - Recibe peticiones del navegador y coordina todo
- `EmployeeViewModel.cs` - Datos formateados para mostrar en la pantalla (propiedades en español)
- `EmployeeParseador.cs` - Convierte datos entre formato de negocio y formato de vista
- `Views/Employees/Index.cshtml` - HTML que se muestra en el navegador
- `Views/Employees/_EmployeesGrid.cshtml` - Tabla HTML para mostrar empleados
- `wwwroot/js/employees.js` - JavaScript que hace la página interactiva

**En términos simples**: Es como la fachada de una tienda - lo que el cliente ve y con lo que interactúa.

---

### 🔄 ¿Cómo se Relacionan las Capas?

Las capas se comunican en un orden específico (como una cadena):

```
Usuario (Navegador)
    ↓
Capa Web (Controller, Views, JavaScript)
    ↓
Capa Reglas de Negocio (Service)
    ↓
Capa Acceso a Datos (Repository)
    ↓
Base de Datos (Oracle) o Datos Mock
```

**Regla importante**: Cada capa solo puede hablar con la capa de abajo, nunca con capas superiores.

- La capa Web puede usar la capa Reglas de Negocio
- La capa Reglas de Negocio puede usar la capa Acceso a Datos
- La capa Acceso a Datos puede usar Modelos Comunes
- Pero la capa Acceso a Datos NO puede usar la capa Web directamente

---

### 📊 Flujo Completo: De la Base de Datos a la Pantalla

Vamos a seguir un ejemplo paso a paso de cómo se muestran los empleados:

#### Paso 1: Usuario Abre la Página
**Usuario hace**: Escribe en el navegador `http://localhost:5050/Employees` y presiona Enter

**Qué pasa**:
- El navegador envía una petición al servidor
- El servidor busca el archivo `EmployeesController.cs`
- Encuentra el método `Index()` y ejecuta: `return View()`
- Esto retorna el archivo `Views/Employees/Index.cshtml`

**Resultado**: El navegador muestra la página HTML (pero la tabla está vacía todavía)

---

#### Paso 2: JavaScript Carga la Tabla
**Qué pasa**:
- El archivo `Index.cshtml` incluye JavaScript que se ejecuta automáticamente
- El JavaScript busca el elemento HTML con id `employeesTable`
- Inicializa DataTables (la librería que hace la tabla interactiva)
- DataTables hace una petición AJAX automática

**Archivos involucrados**:
- `Views/Employees/Index.cshtml` - Contiene el código JavaScript
- `wwwroot/js/employees.js` - Funciones JavaScript auxiliares

**Resultado**: Se envía una petición POST a `/Employees/ObtenerEmployees`

---

#### Paso 3: Controller Recibe la Petición
**Qué pasa**:
- El archivo `EmployeesController.cs` recibe la petición en el método `ObtenerEmployees()`
- El Controller NO tiene datos, solo coordina
- Llama al Service: `await _servicio.ObtenerEmployeesAsync()`

**Archivo involucrado**: `src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs`

**Código ejemplo**:
```csharp
public async Task<IActionResult> ObtenerEmployees()
{
    var empleados = await _servicio.ObtenerEmployeesAsync(); // Llama al Service
    var modelosVista = EmployeeParseador.ConvertirListaAVista(empleados); // Convierte
    return CrearRespuestaExito(modelosVista); // Retorna JSON
}
```

**Resultado**: El Controller espera datos del Service

---

#### Paso 4: Service Aplica Reglas de Negocio
**Qué pasa**:
- El archivo `EmployeesServiceOracle.cs` recibe la llamada
- Llama al Repository: `await _repositorio.ObtenerEmployeesAsync()`
- Espera los datos del Repository
- Cuando recibe los datos, aplica reglas:
  - Filtra empleados con salario >= $1000
  - Ordena por antigüedad (más antiguos primero)
- Retorna la lista filtrada y ordenada

**Archivo involucrado**: `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/EmployeesServiceOracle.cs`

**Código ejemplo**:
```csharp
public async Task<List<Employee>> ObtenerEmployeesAsync()
{
    var empleados = await _repositorio.ObtenerEmployeesAsync(); // Obtiene datos
    var empleadosValidos = empleados.Where(e => ValidarSalarioValido(e)).ToList(); // Filtra
    return empleadosValidos.OrderByDescending(e => CalcularAntiguedadEnAnios(e)).ToList(); // Ordena
}
```

**Resultado**: Lista de empleados con reglas aplicadas

---

#### Paso 5: Repository Obtiene Datos
**Qué pasa**:
- El archivo `EmployeesRepository.cs` recibe la llamada
- Por ahora, retorna datos mock (56 empleados de ejemplo guardados en el código)
- En el futuro, ejecutará una query SQL a Oracle: `SELECT * FROM EMPLOYEES`
- Retorna una lista de objetos `Employee`

**Archivo involucrado**: `src/AdministracionFlotillas.AccesoDatos/Repositorios/EmployeesRepository.cs`

**Código ejemplo** (datos mock):
```csharp
public async Task<List<Employee>> ObtenerEmployeesAsync()
{
    // Por ahora retorna datos de prueba
    return new List<Employee> {
        new Employee { EmployeeId = 1, FirstName = "Juan", LastName = "Pérez", ... },
        new Employee { EmployeeId = 2, FirstName = "María", LastName = "García", ... },
        // ... 54 empleados más
    };
}
```

**Resultado**: Lista de objetos `Employee` (modelo de negocio)

---

#### Paso 6: Datos Suben por las Capas
**Qué pasa**:
- Repository retorna `List<Employee>` → Service
- Service retorna `List<Employee>` (con reglas aplicadas) → Controller
- Controller recibe `List<Employee>`

**Resultado**: Controller tiene los datos, pero están en formato de negocio (inglés)

---

#### Paso 7: Parseador Convierte a ViewModel
**Qué pasa**:
- El Controller llama al Parseador: `EmployeeParseador.ConvertirListaAVista(empleados)`
- El Parseador convierte cada `Employee` a `EmployeeViewModel`:
  - `EmployeeId` → `IdEmpleado`
  - `FirstName` → `PrimerNombre`
  - `Salary` → `Salario` (formateado como "$1,234.56")
  - `HireDate` → `FechaContratacion` (formateado como "15/01/2020")

**Archivo involucrado**: `src/AdministracionFlotillas.Web/Parseador/EmployeeParseador.cs`

**Código ejemplo**:
```csharp
public static EmployeeViewModel ConvertirAVista(Employee empleado)
{
    return new EmployeeViewModel
    {
        IdEmpleado = empleado.EmployeeId,
        PrimerNombre = empleado.FirstName,
        Salario = empleado.Salary?.ToString("C"), // Formatea como moneda
        FechaContratacion = empleado.HireDate.ToString("dd/MM/yyyy")
    };
}
```

**Resultado**: Lista de `EmployeeViewModel` (propiedades en español, formateadas)

---

#### Paso 8: Controller Retorna JSON
**Qué pasa**:
- El Controller crea una respuesta JSON:
```json
{
  "exito": true,
  "datos": [
    {
      "idEmpleado": 1,
      "primerNombre": "Juan",
      "apellido": "Pérez",
      "salario": "$5,000.00",
      "fechaContratacion": "15/01/2020"
    },
    // ... más empleados
  ]
}
```

**Archivo involucrado**: `EmployeesController.cs`

**Resultado**: JSON enviado al navegador

---

#### Paso 9: JavaScript Recibe y Muestra Datos
**Qué pasa**:
- DataTables recibe la respuesta JSON
- Extrae el array de `datos`
- Crea filas en la tabla HTML para cada empleado
- Muestra la tabla completa con paginación, ordenamiento, etc.

**Archivos involucrados**:
- `Views/Employees/Index.cshtml` - Código JavaScript de DataTables
- `Views/Employees/_EmployeesGrid.cshtml` - Estructura HTML de la tabla

**Resultado**: Usuario ve la tabla con todos los empleados

---

### 📥 Inputs y Outputs de la Pantalla Employees

#### Inputs (Entradas - Lo que el Usuario Puede Hacer)

1. **Filtro por Nombre**
   - **Input**: Usuario escribe texto en el campo "Buscar por Nombre"
   - **Dónde**: Campo HTML con id `filtroBusqueda`
   - **Qué hace**: Filtra la tabla mostrando solo empleados cuyo nombre contiene el texto

2. **Filtro por Fecha de Contratación**
   - **Input**: Usuario selecciona fechas "Desde" y "Hasta" con el datepicker
   - **Dónde**: Campos HTML con ids `filtroFechaInicio` y `filtroFechaFin`
   - **Qué hace**: Muestra solo empleados contratados en ese rango de fechas

3. **Filtro por Salario**
   - **Input**: Usuario escribe salario mínimo y máximo
   - **Dónde**: Campos HTML con ids `filtroSalarioMin` y `filtroSalarioMax`
   - **Qué hace**: Muestra solo empleados con salario en ese rango

4. **Filtro por Departamento, Email, Teléfono**
   - **Input**: Usuario escribe texto en los campos correspondientes
   - **Dónde**: Campos HTML con ids `filtroDepartamento`, `filtroEmail`, `filtroTelefono`
   - **Qué hace**: Filtra la tabla por esos campos

5. **Selección de Empleados**
   - **Input**: Usuario marca checkboxes en la primera columna
   - **Dónde**: Checkboxes con clase `checkbox-empleado`
   - **Qué hace**: Selecciona empleados para enviar por email (solo si tienen misma fecha de contratación)

6. **Botón "Enviar por Email"**
   - **Input**: Usuario hace click en el botón
   - **Dónde**: Botón en la barra de herramientas de DataTables
   - **Qué hace**: Abre un modal donde el usuario puede ingresar un email y enviar información

7. **Botones de Exportación**
   - **Input**: Usuario hace click en botones (Excel, PDF, Print, Refresh)
   - **Dónde**: Botones en la barra de herramientas de DataTables
   - **Qué hace**: Exporta los datos o actualiza la tabla

#### Outputs (Salidas - Lo que el Usuario Ve)

1. **Tabla de Empleados**
   - **Output**: Tabla HTML con columnas: Checkbox, Nombre Completo, Email, Teléfono, Fecha Contratación, Salario, Departamento, Acciones
   - **Dónde**: Elemento HTML con id `employeesTable`
   - **Formato**: DataTables con paginación, ordenamiento, búsqueda

2. **Modal de Envío por Email**
   - **Output**: Modal (ventana emergente) con:
     - Campo para ingresar email del receptor
     - Tabla resumen con empleados seleccionados
     - Botones "Cancelar" y "Enviar Email"
   - **Dónde**: Elemento HTML con id `modalEnviarEmail`

3. **Mensajes de Éxito/Error**
   - **Output**: Toasts (notificaciones) que aparecen en la esquina superior derecha
   - **Dónde**: Contenedor con id `toastContainer`
   - **Tipos**: Éxito (verde), Error (rojo), Información (azul)

---

### 🛠️ Herramientas y Tecnologías Usadas

#### Frontend (Lo que se ejecuta en el navegador)

1. **HTML**
   - **Qué es**: Lenguaje de marcado para crear la estructura de la página
   - **Archivos**: `Index.cshtml`, `_EmployeesGrid.cshtml`
   - **Para qué**: Define qué elementos hay en la página (tablas, botones, inputs)

2. **CSS (Bootstrap)**
   - **Qué es**: Estilos para hacer la página bonita
   - **Dónde**: CDN de Bootstrap cargado en `_Layout.cshtml`
   - **Para qué**: Da colores, espaciado, diseño responsive

3. **JavaScript (jQuery)**
   - **Qué es**: Lenguaje de programación que se ejecuta en el navegador
   - **Dónde**: CDN de jQuery cargado en `_Layout.cshtml`
   - **Para qué**: Hace la página interactiva (clicks, filtros, peticiones AJAX)

4. **DataTables**
   - **Qué es**: Librería JavaScript para crear tablas interactivas
   - **Dónde**: CDN cargado en `_Layout.cshtml`
   - **Para qué**: Tabla con paginación, ordenamiento, búsqueda, exportación

5. **jQuery UI Datepicker**
   - **Qué es**: Componente para seleccionar fechas
   - **Dónde**: CDN cargado en `_Layout.cshtml`
   - **Para qué**: Calendario para seleccionar fechas en los filtros

6. **Inputmask**
   - **Qué es**: Librería para formatear inputs (ej: moneda)
   - **Dónde**: CDN cargado en `_Layout.cshtml`
   - **Para qué**: Formatea automáticamente los campos de salario como "$1,234.56"

7. **SweetAlert2**
   - **Qué es**: Librería para mostrar alertas bonitas
   - **Dónde**: CDN cargado en `_Layout.cshtml`
   - **Para qué**: Muestra mensajes de éxito/error de forma elegante

8. **Font Awesome**
   - **Qué es**: Librería de iconos
   - **Dónde**: CDN cargado en `_Layout.cshtml`
   - **Para qué**: Iconos en botones (envelope, eye, etc.)

#### Backend (Lo que se ejecuta en el servidor)

1. **C# (.NET 10.0)**
   - **Qué es**: Lenguaje de programación del servidor
   - **Dónde**: Todo el código en `src/`
   - **Para qué**: Lógica del servidor, acceso a datos, reglas de negocio

2. **ASP.NET Core MVC**
   - **Qué es**: Framework para crear aplicaciones web
   - **Dónde**: Proyecto `AdministracionFlotillas.Web`
   - **Para qué**: Maneja peticiones HTTP, renderiza vistas, coordina capas

3. **Dependency Injection**
   - **Qué es**: Patrón para inyectar dependencias automáticamente
   - **Dónde**: Configurado en `Program.cs`
   - **Para qué**: El Controller recibe automáticamente el Service, el Service recibe el Repository

---

### 📁 Tipos de Archivos que Forman el Flujo de Employees

#### Archivos C# (Código del Servidor)

1. **Modelo de Negocio** (`.cs`)
   - `Employee.cs` - Define la estructura de un empleado
   - **Tipo**: Clase simple con propiedades
   - **Ubicación**: `ModelosComunes/`

2. **Interfaz de Repository** (`.cs`)
   - `IEmployeesRepository.cs` - Define qué métodos debe tener el repositorio
   - **Tipo**: Interfaz (contrato)
   - **Ubicación**: `AccesoDatos/Repositorios/`

3. **Implementación de Repository** (`.cs`)
   - `EmployeesRepository.cs` - Implementa los métodos para obtener datos
   - **Tipo**: Clase que implementa interfaz
   - **Ubicación**: `AccesoDatos/Repositorios/`

4. **Interfaz de Service** (`.cs`)
   - `IEmployeesService.cs` - Define qué métodos debe tener el servicio
   - **Tipo**: Interfaz (contrato)
   - **Ubicación**: `ReglasNegocio/Servicios/Interfaces/`

5. **Implementación de Service** (`.cs`)
   - `EmployeesServiceOracle.cs` - Implementa la lógica de negocio
   - **Tipo**: Clase que implementa interfaz
   - **Ubicación**: `ReglasNegocio/Servicios/Escenarios/Oracle/`

6. **ViewModel** (`.cs`)
   - `EmployeeViewModel.cs` - Datos formateados para la vista
   - **Tipo**: Clase simple con propiedades en español
   - **Ubicación**: `Web/ViewModels/`

7. **Parseador** (`.cs`)
   - `EmployeeParseador.cs` - Convierte entre Employee y EmployeeViewModel
   - **Tipo**: Clase estática con métodos estáticos
   - **Ubicación**: `Web/Parseador/`

8. **Controller** (`.cs`)
   - `EmployeesController.cs` - Coordina las peticiones HTTP
   - **Tipo**: Clase que hereda de Controller
   - **Ubicación**: `Web/Controllers/`

#### Archivos de Vista (HTML/JavaScript)

9. **Vista Principal** (`.cshtml`)
   - `Index.cshtml` - Vista principal con JavaScript
   - **Tipo**: Razor view (mezcla HTML y C#)
   - **Ubicación**: `Web/Views/Employees/`

10. **Vista Parcial** (`.cshtml`)
    - `_EmployeesGrid.cshtml` - Tabla HTML y filtros
    - **Tipo**: Razor partial view
    - **Ubicación**: `Web/Views/Employees/`

11. **JavaScript** (`.js`)
    - `employees.js` - Funciones JavaScript auxiliares
    - **Tipo**: Archivo JavaScript
    - **Ubicación**: `Web/wwwroot/js/`

12. **Layout** (`.cshtml`)
    - `_Layout.cshtml` - Layout compartido con scripts y estilos
    - **Tipo**: Razor layout
    - **Ubicación**: `Web/Views/Shared/`

---

### 🗺️ Rutas (Paths) de la Aplicación

#### Rutas HTTP (URLs que el usuario visita)

1. **GET `/Employees`**
   - **Qué hace**: Muestra la página principal de empleados
   - **Controller**: `EmployeesController.Index()`
   - **Vista**: `Views/Employees/Index.cshtml`
   - **Resultado**: HTML de la página

2. **POST `/Employees/ObtenerEmployees`**
   - **Qué hace**: Obtiene todos los empleados en formato JSON
   - **Controller**: `EmployeesController.ObtenerEmployees()`
   - **Resultado**: JSON con lista de empleados

3. **POST `/Employees/ObtenerEmployeePorId`**
   - **Qué hace**: Obtiene un empleado específico por ID
   - **Controller**: `EmployeesController.ObtenerEmployeePorId(int id)`
   - **Resultado**: JSON con datos de un empleado

#### Rutas de Archivos (Dónde están los archivos en el proyecto)

```
src/
├── AdministracionFlotillas.ModelosComunes/
│   └── Employee.cs                                    ← Modelo de negocio
│
├── AdministracionFlotillas.AccesoDatos/
│   └── Repositorios/
│       ├── IEmployeesRepository.cs                   ← Interfaz del repositorio
│       └── EmployeesRepository.cs                    ← Implementación del repositorio
│
├── AdministracionFlotillas.ReglasNegocio/
│   └── Servicios/
│       ├── Interfaces/
│       │   └── IEmployeesService.cs                   ← Interfaz del servicio
│       └── Escenarios/
│           └── Oracle/
│               └── EmployeesServiceOracle.cs         ← Implementación del servicio
│
└── AdministracionFlotillas.Web/
    ├── Controllers/
    │   └── EmployeesController.cs                     ← Controller
    ├── ViewModels/
    │   └── EmployeeViewModel.cs                      ← ViewModel
    ├── Parseador/
    │   └── EmployeeParseador.cs                      ← Parseador
    ├── Views/
    │   ├── Shared/
    │   │   └── _Layout.cshtml                        ← Layout compartido
    │   └── Employees/
    │       ├── Index.cshtml                          ← Vista principal
    │       └── _EmployeesGrid.cshtml                 ← Vista parcial (tabla)
    └── wwwroot/
        └── js/
            └── employees.js                          ← JavaScript
```

---

### 📐 Diagramas para Representar el Flujo

#### Diagrama 1: Arquitectura en Capas (Vista Lateral)

```
┌─────────────────────────────────────────────────┐
│         CAPA WEB (Presentación)                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │  Controller  │  │    Views     │           │
│  │  ViewModel   │  │  JavaScript  │           │
│  └──────┬───────┘  └──────┬───────┘           │
│         │                  │                    │
│         └────────┬─────────┘                    │
│                  │                              │
└──────────────────┼──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│    CAPA REGLAS DE NEGOCIO (Lógica)              │
│  ┌──────────────────────────────────────┐       │
│  │         Service                      │       │
│  │  - Aplica reglas                    │       │
│  │  - Valida datos                     │       │
│  │  - Calcula valores                  │       │
│  └──────────────┬───────────────────────┘       │
└─────────────────┼───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│    CAPA ACCESO A DATOS (Almacén)               │
│  ┌──────────────────────────────────────┐       │
│  │      Repository                     │       │
│  │  - Obtiene datos                    │       │
│  │  - Guarda datos                     │       │
│  └──────────────┬───────────────────────┘       │
└─────────────────┼───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         MODELOS COMUNES (Plantillas)            │
│  ┌──────────────────────────────────────┐       │
│  │         Employee                     │       │
│  │  - EmployeeId                        │       │
│  │  - FirstName                         │       │
│  │  - LastName                          │       │
│  │  - Salary                            │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│           BASE DE DATOS                        │
│  ┌──────────────────────────────────────┐     │
│  │      Tabla EMPLOYEES                  │     │
│  │  (o Datos Mock)                       │     │
│  └──────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

#### Diagrama 2: Flujo de Datos (Secuencia)

```
Usuario → Navegador → JavaScript → Controller → Service → Repository → Datos
                                                                          │
Usuario ← Navegador ← JavaScript ← Controller ← Parseador ← Service ←───┘
```

#### Diagrama 3: Tipos de Datos en Cada Capa

```
Base de Datos:
  - Datos en formato de tabla (filas y columnas)
  - Ejemplo: EMPLOYEE_ID=1, FIRST_NAME='Juan', SALARY=5000

Repository:
  - List<Employee> (objetos C#)
  - Ejemplo: employee.EmployeeId = 1, employee.FirstName = "Juan"

Service:
  - List<Employee> (mismo formato, pero filtrado y ordenado)
  - Ejemplo: Solo empleados con Salary >= 1000, ordenados por antigüedad

Controller:
  - List<Employee> (recibe del Service)
  - List<EmployeeViewModel> (después de convertir con Parseador)
  - Ejemplo: viewModel.IdEmpleado = 1, viewModel.PrimerNombre = "Juan"

JavaScript/JSON:
  - JSON (formato de texto)
  - Ejemplo: {"idEmpleado": 1, "primerNombre": "Juan", "salario": "$5,000.00"}

HTML/Vista:
  - Datos mostrados en la tabla HTML
  - Ejemplo: Celda con texto "Juan" en la columna "Nombre Completo"
```

---

### ✅ Resumen: Cómo Usar Esta Vista como Ejemplo

Para crear una nueva vista (ej: Departments), sigue estos pasos:

1. **Crea el Modelo** en `ModelosComunes/Department.cs`
2. **Crea el Repository** en `AccesoDatos/Repositorios/` (interfaz e implementación)
3. **Crea el Service** en `ReglasNegocio/Servicios/` (interfaz e implementación)
4. **Crea el ViewModel** en `Web/ViewModels/DepartmentViewModel.cs`
5. **Crea el Parseador** en `Web/Parseador/DepartmentParseador.cs`
6. **Crea el Controller** en `Web/Controllers/DepartmentsController.cs`
7. **Crea las Vistas** en `Web/Views/Departments/` (Index.cshtml y _DepartmentsGrid.cshtml)
8. **Crea el JavaScript** en `Web/wwwroot/js/departments.js`
9. **Registra en Program.cs** (Repository y Service)
10. **Agrega enlace en _Layout.cshtml** (navegación)

Copia la estructura de Employees y adapta los nombres y propiedades según tu nueva entidad.

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
