# Arquitectura del Proyecto AdministracionFlotillas

## Diagrama General de Arquitectura

```mermaid
graph TB
    subgraph "Frontend - Capa de Presentación"
        UI[Interfaz de Usuario<br/>DataTables + Bootstrap]
        JS[JavaScript/AJAX]
        UI --> JS
    end
    
    subgraph "Capa de Aplicación - Web"
        CTRL[Controllers<br/>EmployeesController]
        VM[ViewModels<br/>EmployeeViewModel]
        PARSER[AutoMapper<br/>MappingProfile]
        CTRL --> VM
        CTRL --> PARSER
    end
    
    subgraph "Capa de Reglas de Negocio"
        SERV[Servicios<br/>EmployeesServiceOracle]
        BM[Business Models<br/>ModelosComunes]
        SERV --> BM
    end
    
    subgraph "Capa de Acceso a Datos"
        REPO[Repositorios<br/>EmployeesRepository]
        CONN[ConexionOracle]
        REPO --> CONN
        REPO --> BM
    end
    
    subgraph "Base de Datos"
        ORACLE[(Oracle Database<br/>Procedimientos Almacenados)]
    end
    
    JS --> CTRL
    PARSER --> SERV
    SERV --> REPO
    CONN --> ORACLE
    
    style UI fill:#4a90e2,color:#fff
    style CTRL fill:#7b68ee,color:#fff
    style SERV fill:#f5a623,color:#fff
    style REPO fill:#d0021b,color:#fff
    style ORACLE fill:#7ed321,color:#fff
    style BM fill:#f0f0f0
    style VM fill:#e1f5ff
```

## Flujo Completo de una Petición

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuario
    participant DT as DataTables
    participant C as Controller
    participant P as AutoMapper
    participant S as Servicio
    participant R as Repositorio
    participant O as Oracle DB
    
    U->>DT: 1. Carga página /Employees
    DT->>C: 2. POST /Employees/ObtenerEmployees<br/>(AJAX)
    C->>P: 3. Convierte ViewModel
    P->>S: 4. BusinessModel
    S->>R: 5. ObtenerEmployeesAsync()
    R->>O: 6. SELECT * FROM EMPLOYEES<br/>(o datos mock)
    O-->>R: 7. Resultados
    R-->>S: 8. List<Employee>
    S->>S: 9. Aplica reglas de negocio
    S-->>P: 10. List<Employee>
    P->>P: 11. Convierte a ViewModel
    P-->>C: 12. List<EmployeeViewModel>
    C-->>DT: 13. JSON Response
    DT->>DT: 14. Actualiza DataTables
    DT-->>U: 15. Muestra resultados
```

## Estructura de Capas y Responsabilidades

```mermaid
graph TD
    subgraph "Capa Web - Responsabilidades"
        W1[Recibir peticiones HTTP]
        W2[Validar ViewModels]
        W3[Convertir ViewModel ↔ BusinessModel]
        W4[Devolver respuestas JSON/HTML]
        W5[Renderizar vistas con DataTables]
    end
    
    subgraph "Capa Reglas de Negocio - Responsabilidades"
        RN1[Lógica de negocio]
        RN2[Validaciones de negocio]
        RN3[Transformación de datos]
        RN4[Orquestación de operaciones]
    end
    
    subgraph "Capa Acceso a Datos - Responsabilidades"
        AD1[Conexión a base de datos]
        AD2[Ejecución de procedimientos almacenados]
        AD3[Mapeo de resultados]
        AD4[Manejo de transacciones]
    end
    
    subgraph "Modelos Comunes - Responsabilidades"
        MC1[Modelos de dominio compartidos]
        MC2[DTOs comunes]
        MC3[Entidades de negocio]
    end
    
    W1 --> W2
    W2 --> W3
    W3 --> RN1
    RN1 --> RN2
    RN2 --> AD1
    AD1 --> AD2
    AD2 --> MC1
```

## Flujo de Creación de una Flotilla (CRUD)

```mermaid
flowchart TD
    Start([Usuario llena formulario]) --> Modal[Modal Bootstrap]
    Modal --> Validate{Validar<br/>Frontend}
    Validate -->|Error| ShowError[Mostrar errores]
    Validate -->|OK| SendAJAX[Enviar AJAX POST]
    SendAJAX --> Controller[Controller recibe]
    Controller --> ParseVM[AutoMapper: ViewModel → BusinessModel]
    ParseVM --> Service[Servicio valida reglas]
    Service -->|Error Negocio| ReturnError[Retornar error]
    Service -->|OK| Repo[Repositorio inserta]
    Repo --> SP[Ejecuta INSERT o SP]
    SP --> DB[(Oracle DB)]
    DB -->|Success| ReturnSuccess[Retornar éxito]
    DB -->|Error| ReturnDBError[Retornar error DB]
    ReturnSuccess --> UpdateUI[Actualizar DataTables]
    ReturnError --> ShowError
    ReturnDBError --> ShowError
    UpdateUI --> End([Flotilla creada])
    ShowError --> Modal
```

## Flujo de Búsqueda con Filtros

```mermaid
flowchart LR
    A[Usuario ingresa filtros] --> B[DataTables aplica filtros]
    B --> C[Enviar petición AJAX]
    C --> D[Controller recibe filtros]
    D --> E[AutoMapper convierte]
    E --> F[Servicio procesa]
    F --> G[Repositorio construye query]
    G --> H[Ejecuta SELECT con WHERE]
    H --> I[(Oracle DB)]
    I --> J[Retorna resultados]
    J --> K[Transforma resultados]
    K --> L[AutoMapper convierte a ViewModel]
    L --> M[Retorna JSON]
    M --> N[DataTables actualiza]
    N --> O[Usuario ve resultados]
```

## Estructura de Proyectos y Dependencias

```mermaid
graph TD
    subgraph "Solución: AdministracionFlotillas"
        WEB[AdministracionFlotillas.Web<br/>ASP.NET Core MVC]
        RN[AdministracionFlotillas.ReglasNegocio<br/>Class Library]
        AD[AdministracionFlotillas.AccesoDatos<br/>Class Library]
        MC[AdministracionFlotillas.ModelosComunes<br/>Class Library]
    end
    
    WEB -->|depende de| RN
    RN -->|depende de| AD
    RN -->|depende de| MC
    AD -->|depende de| MC
    
    style WEB fill:#4a90e2,color:#fff
    style RN fill:#f5a623,color:#fff
    style AD fill:#d0021b,color:#fff
    style MC fill:#7ed321,color:#fff
```

## Flujo de Eliminación Lógica (por Status)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant DT as DataTables
    participant C as Controller
    participant S as Servicio
    participant R as Repositorio
    participant DB as Oracle DB
    
    U->>DT: Click "Eliminar"
    DT->>DT: Confirmar acción
    DT->>C: POST /Employees/EliminarEmployee<br/>{id: ...}
    C->>S: EliminarEmployeeAsync(id)
    S->>S: Validar reglas de negocio
    S->>R: EliminarEmployeeAsync(id)
    R->>DB: UPDATE EMPLOYEES<br/>SET STATUS = 'INACTIVE'<br/>WHERE EMPLOYEE_ID = id
    DB-->>R: 1 fila afectada
    R-->>S: Éxito
    S-->>C: Éxito
    C-->>DT: JSON {success: true}
    DT->>DT: Actualizar fila (ocultar o marcar)
    DT-->>U: Employee desactivado
```

## Componentes y Tecnologías por Capa

```mermaid
mindmap
  root((AdministracionFlotillas))
    Web
      ASP.NET Core MVC
      Controllers
      Views .cshtml
      DataTables
      Bootstrap
      JavaScript/AJAX
      ViewModels
      AutoMapper
    ReglasNegocio
      Servicios
      Lógica de negocio
      Validaciones
      ModelosComunes
    AccesoDatos
      Repositorios
      ConexionOracle
      Procedimientos almacenados
      Oracle.ManagedDataAccess
      ModelosComunes
    ModelosComunes
      Business Models
      DTOs
      Entidades
    Base de Datos
      Oracle Database
      Procedimientos almacenados
      SYS_REFCURSOR
```

---

**Última actualización**: Enero 2026

