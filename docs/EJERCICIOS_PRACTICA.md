# Ejercicios de Práctica - Administración de Flotillas

## 📋 Antes de Empezar

**IMPORTANTE**: Antes de comenzar con los ejercicios, asegúrate de tener el proyecto clonado y configurado correctamente.

Sigue la guía completa: **[CLONAR_REPOSITORIO.md](./CLONAR_REPOSITORIO.md)**

Esta guía te explica paso a paso:
- Cómo clonar el repositorio
- Cómo restaurar dependencias
- Cómo compilar el proyecto
- Cómo ejecutar la aplicación
- Cómo verificar que todo funciona

**Una vez que tengas el proyecto funcionando localmente, puedes comenzar con los ejercicios.**

---

## 📚 Ejemplo de Commit: Agregar Validaciones

Antes de comenzar con los ejercicios, revisa el commit de ejemplo que muestra cómo agregar nuevas funcionalidades. Este commit agrega propiedades al modelo y validaciones de negocio.

**Commit**: `916e77c` - "Agregar antiguedad nombre departamento validacion salario alto nivel"

### Archivo 1: `Employee.cs` - Agregar Propiedades al Modelo

```csharp
// Línea 20: Agrega una línea en blanco para separar las propiedades existentes de las nuevas
public int? DepartmentId { get; set; }
    
// Línea 22: Agrega nueva propiedad para almacenar la antigüedad calculada
// Propósito: Evitar recalcular la antigüedad múltiples veces, se guarda después de calcularla
public int? Antiguedad { get; set; }
    
// Línea 24: Agrega nueva propiedad para el nombre del departamento
// Propósito: Permite mostrar el nombre del departamento en lugar de solo el ID
// Se puede poblar desde el servicio cuando se obtienen datos relacionados
public string? NombreDepartamento { get; set; }
```

**Explicación**:
- `Antiguedad`: Propiedad nullable (`int?`) que almacena años de antigüedad calculados
- `NombreDepartamento`: Propiedad nullable (`string?`) que almacena el nombre del departamento
- Ambas son opcionales porque pueden no estar disponibles al momento de crear el objeto

---

### Archivo 2: `EmployeesServiceOracle.cs` - Agregar Validación y Guardar Antigüedad

#### Cambio 1: Agregar Validación en `ObtenerEmployeePorIdAsync()`

```csharp
// Línea 50: Validación existente de salario válido
if (!ValidarSalarioValido(empleado))
    throw new InvalidOperationException($"El empleado con ID {id} no cumple con los criterios salariales del sistema");

// Línea 53: NUEVA validación - Verifica que el salario sea mayor a $10,000
// Propósito: Aplicar regla de negocio adicional para empleados de alto nivel
// Si el empleado no cumple, lanza una excepción con mensaje descriptivo
if (!ValidarSalarioAltoNivel(empleado))
    throw new InvalidOperationException($"El empleado con ID {id} no cumple con el salario mínimo requerido para alto nivel (mayor a $10,000)");

// Línea 57: Retorna el empleado solo si pasa todas las validaciones
return empleado;
```

**Explicación**:
- Esta validación se ejecuta después de obtener el empleado del repositorio
- Se aplica solo cuando se consulta un empleado por ID (no en la lista completa)
- Si falla, lanza una excepción que será capturada por el Controller y convertida en respuesta JSON de error

#### Cambio 2: Guardar Antigüedad Calculada en `CalcularAntiguedadEnAnios()`

```csharp
// Línea 86: Ajusta la antigüedad si aún no ha cumplido el año completo
if (fechaActual.Month < empleado.HireDate.Month || 
    (fechaActual.Month == empleado.HireDate.Month && fechaActual.Day < empleado.HireDate.Day))
{
    antiguedad--;
}

// Línea 92: NUEVA línea - Guarda la antigüedad calculada en la propiedad del modelo
// Propósito: Hace disponible el valor calculado para otras partes del código sin recalcular
// El valor se guarda en empleado.Antiguedad para uso posterior
empleado.Antiguedad = antiguedad;

// Línea 94: Retorna el valor calculado (asegurándose de que no sea negativo)
return Math.Max(0, antiguedad);
```

**Explicación**:
- Después de calcular la antigüedad, se guarda en la propiedad `Antiguedad` del modelo
- Esto permite que otras partes del código accedan a este valor sin necesidad de recalcularlo
- El valor se calcula una vez y se reutiliza

#### Cambio 3: Nuevo Método Privado `ValidarSalarioAltoNivel()`

```csharp
// Línea 157: Define nuevo método privado para validar salario de alto nivel
// Es privado porque solo se usa dentro de esta clase
// Retorna bool: true si cumple, false si no cumple
private bool ValidarSalarioAltoNivel(Employee empleado)
{
    // Línea 159: Validación de seguridad - verifica que el empleado no sea null
    // Si es null, retorna false (no cumple la validación)
    if (empleado == null)
        return false;
    
    // Línea 162: Define constante local con el salario mínimo requerido
    // Valor: $10,000 (10000m donde 'm' indica que es decimal)
    const decimal SalarioMinimoAltoNivel = 10000m;
    
    // Línea 164-165: Regla de negocio - verifica que el salario exista y sea mayor a $10,000
    // empleado.Salary.HasValue: Verifica que el salario no sea null
    // empleado.Salary.Value > SalarioMinimoAltoNivel: Verifica que sea mayor (no igual) a $10,000
    // Retorna true solo si ambas condiciones se cumplen
    return empleado.Salary.HasValue && empleado.Salary.Value > SalarioMinimoAltoNivel;
}
```

**Explicación**:
- Método privado porque solo se usa internamente en esta clase
- Usa una constante local para el valor mágico ($10,000)
- Valida que el salario exista y sea mayor (no igual) a $10,000
- Retorna `bool` para ser usado en condiciones `if`

---

### Archivo 3: `EmployeeParseador.cs` - Manejar NombreDepartamento

```csharp
// Línea 37: Línea original que asignaba null
NombreCompleto = $"{empleado.FirstName} {empleado.LastName}".Trim(),

// Línea 38: NUEVA lógica - Maneja el caso cuando NombreDepartamento es null o vacío
// Propósito: Mostrar un mensaje por defecto en lugar de null o string vacío en la UI
// string.IsNullOrWhiteSpace(): Verifica si es null, vacío o solo espacios en blanco
// Si es null/vacío: Asigna mensaje "Sin departamento asignado"
// Si tiene valor: Usa el valor del modelo (empleado.NombreDepartamento)
NombreDepartamento = string.IsNullOrWhiteSpace(empleado.NombreDepartamento) 
    ? "Sin departamento asignado" 
    : empleado.NombreDepartamento,
```

**Explicación**:
- Usa operador ternario (`? :`) para asignar un valor condicional
- `string.IsNullOrWhiteSpace()` es más robusto que solo verificar `== null` porque también verifica strings vacíos
- Proporciona un mensaje amigable al usuario cuando el departamento no está disponible
- El mensaje se mostrará en la vista cuando el departamento no esté asignado

---

## 🎯 Ejercicios de Práctica

Los ejercicios están organizados por nivel de dificultad. Cada nivel te obliga a pensar más y depurar más.

### Nivel 1: Principiante (Específico - Archivo, Clase, Método)

En este nivel, se te indica exactamente dónde hacer los cambios.

#### Ejercicio 1.1: Agregar Propiedad de Email Personal
**Objetivo**: Agregar una nueva propiedad al modelo Employee para almacenar un email personal alternativo.

**Instrucciones específicas**:
1. Abre el archivo: `src/AdministracionFlotillas.ModelosComunes/Employee.cs`
2. Agrega una nueva propiedad después de la línea que define `Email`
3. La propiedad debe llamarse `EmailPersonal` de tipo `string?`
4. Agrega un comentario XML que explique: "Email personal alternativo del empleado (opcional)"

**Resultado esperado**: El modelo Employee debe tener una nueva propiedad `EmailPersonal` nullable.

---

#### Ejercicio 1.2: Agregar Validación de Email Válido
**Objetivo**: Crear un método privado en el Service que valide que un email tenga formato válido.

**Instrucciones específicas**:
1. Abre el archivo: `src/AdministracionFlotillas.ReglasNegocio/Servicios/Escenarios/Oracle/EmployeesServiceOracle.cs`
2. Agrega un nuevo método privado llamado `ValidarEmailValido(string email)`
3. El método debe retornar `bool` (true si es válido, false si no)
4. El método debe verificar:
   - Que el email no sea null o vacío
   - Que contenga el símbolo `@`
   - Que tenga al menos un punto después del `@`
5. Agrega comentario XML explicando qué valida

**Resultado esperado**: Nuevo método privado que valida formato básico de email.

---

#### Ejercicio 1.3: Mostrar Email Personal en el Parseador
**Objetivo**: Agregar el email personal al ViewModel cuando se convierte el modelo.

**Instrucciones específicas**:
1. Abre el archivo: `src/AdministracionFlotillas.Web/ViewModels/EmployeeViewModel.cs`
2. Agrega una nueva propiedad `EmailPersonal` de tipo `string?`
3. Abre el archivo: `src/AdministracionFlotillas.Web/Parseador/EmployeeParseador.cs`
4. En el método `ConvertirAVista()`, después de la línea que asigna `CorreoElectronico`, agrega:
   - `EmailPersonal = empleado.EmailPersonal,`

**Resultado esperado**: El ViewModel incluye el email personal y el parseador lo mapea correctamente.

---

### Nivel 2: Intermedio (Específico - Pantalla/Vista)

En este nivel, debes identificar en qué vista hacer los cambios.

#### Ejercicio 2.1: Agregar Columna de Email Personal en la Tabla
**Objetivo**: Mostrar el email personal en la tabla de empleados.

**Instrucciones**:
- Pantalla: Vista Employees (`/Employees`)
- Agrega una nueva columna en la tabla que muestre el email personal
- La columna debe aparecer después de la columna "Email"
- Si el email personal no existe, muestra "-"

**Pistas**:
- Busca dónde se definen las columnas de DataTables
- Revisa cómo se renderizan otras columnas como "Email"

---

#### Ejercicio 2.2: Agregar Filtro por Email Personal
**Objetivo**: Permitir filtrar empleados por su email personal.

**Instrucciones**:
- Pantalla: Vista Employees (`/Employees`)
- Agrega un nuevo campo de filtro para buscar por email personal
- El filtro debe funcionar en tiempo real mientras el usuario escribe
- Debe buscar en la columna de email personal que agregaste en el ejercicio anterior

**Pistas**:
- Busca dónde están los otros filtros (Nombre, Email, Teléfono)
- Revisa cómo funcionan los filtros existentes

---

#### Ejercicio 2.3: Agregar Botón de Exportar Email Personal
**Objetivo**: Agregar un botón que exporte solo los emails personales a un archivo de texto.

**Instrucciones**:
- Pantalla: Vista Employees (`/Employees`)
- Agrega un nuevo botón en la barra de herramientas de DataTables
- El botón debe exportar solo la columna de email personal a un archivo `.txt`
- El archivo debe tener un email por línea

**Pistas**:
- Busca dónde están los botones de exportación (Excel, PDF, Print)
- Revisa la documentación de DataTables Buttons para exportación personalizada

---

### Nivel 3: Avanzado (Específico - Botón/Funcionalidad)

En este nivel, debes identificar qué botón o funcionalidad modificar.

#### Ejercicio 3.1: Validar Email al Enviar por Email
**Objetivo**: Validar que el email del receptor sea válido antes de enviar.

**Instrucciones**:
- Botón: "Enviar Email" en la vista Employees
- Antes de mostrar el mensaje de éxito, valida que el email del receptor tenga formato válido
- Si el email no es válido, muestra un mensaje de error con SweetAlert2
- La validación debe verificar: formato básico, presencia de `@`, dominio válido

**Pistas**:
- Busca el evento `click` del botón "Enviar Email"
- Revisa cómo se valida actualmente el email
- Usa expresiones regulares o validación manual

---

#### Ejercicio 3.2: Agregar Validación de Salario Mínimo en Filtro
**Objetivo**: Validar que el salario mínimo sea menor que el salario máximo en los filtros.

**Instrucciones**:
- Funcionalidad: Filtros de salario (Mínimo y Máximo) en la vista Employees
- Agrega validación que verifique que el salario mínimo sea menor que el máximo
- Si el mínimo es mayor que el máximo, muestra un mensaje de error
- La validación debe ejecutarse cuando el usuario cambia cualquiera de los dos campos

**Pistas**:
- Busca los event listeners de los campos `filtroSalarioMin` y `filtroSalarioMax`
- Compara los valores numéricos (sin el símbolo $)

---

#### Ejercicio 3.3: Agregar Contador de Empleados Seleccionados
**Objetivo**: Mostrar cuántos empleados están seleccionados en tiempo real.

**Instrucciones**:
- Funcionalidad: Selección de empleados con checkboxes en la vista Employees
- Agrega un contador visual que muestre "X empleados seleccionados"
- El contador debe actualizarse automáticamente cuando se marca/desmarca un checkbox
- Debe aparecer cerca del botón "Enviar por Email"

**Pistas**:
- Busca dónde se manejan los eventos de los checkboxes
- Revisa el array `empleadosSeleccionados`
- Usa jQuery para actualizar el texto del contador

---

### Nivel 4: Experto (Funcionalidad Completa)

En este nivel, debes diseñar e implementar funcionalidades completas.

#### Ejercicio 4.1: Calcular y Mostrar Salario Anual en la Tabla
**Objetivo**: Agregar una nueva columna que muestre el salario anual calculado.

**Requisitos**:
- El salario anual se calcula multiplicando el salario mensual por 12
- Si el empleado tiene comisión, agregar una estimación de comisión anual
- Mostrar la columna en la tabla de empleados
- Formatear como moneda ($X,XXX.XX)
- Agregar filtro para buscar por rango de salario anual

**Pistas**:
- Usa el método `CalcularSalarioAnualEstimado()` que ya existe en el Service
- Agrega la propiedad al ViewModel
- Mapea en el Parseador
- Agrega columna en DataTables
- Agrega filtro personalizado

---

#### Ejercicio 4.2: Agregar Vista de Resumen de Empleados
**Objetivo**: Crear una nueva vista que muestre estadísticas de empleados.

**Requisitos**:
- Nueva ruta: `/Employees/Resumen`
- Mostrar estadísticas:
  - Total de empleados
  - Promedio de salario
  - Empleado con mayor salario
  - Empleado con mayor antigüedad
  - Distribución por departamento (gráfico o tabla)
- Los datos deben calcularse en el Service (no en el Controller)
- Usar Bootstrap Cards para mostrar las estadísticas

**Pistas**:
- Crea nuevo método en `IEmployeesService` y `EmployeesServiceOracle`
- Crea nuevo método en `EmployeesController` llamado `Resumen()`
- Crea nueva vista `Views/Employees/Resumen.cshtml`
- Agrega enlace en el menú de navegación

---

#### Ejercicio 4.3: Sistema de Notificaciones por Email
**Objetivo**: Implementar un sistema completo de notificaciones por email.

**Requisitos**:
- Agregar botón "Configurar Notificaciones" en la vista Employees
- Modal que permita:
  - Seleccionar eventos que activan notificaciones (nuevo empleado, cambio de salario, etc.)
  - Ingresar email del destinatario
  - Configurar frecuencia (inmediata, diaria, semanal)
- Guardar configuración (por ahora en memoria, después en base de datos)
- Mostrar lista de notificaciones pendientes
- Simular envío de emails (mostrar en consola o SweetAlert)

**Pistas**:
- Crea nuevo modelo `NotificacionConfig` en ModelosComunes
- Crea Service para manejar notificaciones
- Crea Controller para endpoints de configuración
- Usa JavaScript para manejar el modal y las configuraciones
- Implementa lógica de simulación de envío

---

### Nivel 5: Maestro (Nuevas Funcionalidades Complejas)

En este nivel, debes crear funcionalidades completamente nuevas desde cero.

#### Ejercicio 5.1: Sistema de Historial de Cambios
**Objetivo**: Rastrear todos los cambios realizados a los empleados.

**Requisitos**:
- Crear modelo `EmployeeHistorial` que almacene:
  - ID del empleado
  - Campo modificado
  - Valor anterior
  - Valor nuevo
  - Fecha de cambio
  - Usuario que hizo el cambio
- Agregar botón "Ver Historial" en la columna de acciones
- Modal que muestre tabla con todos los cambios del empleado
- Los cambios deben registrarse automáticamente cuando se modifica un empleado

**Pistas**:
- Crea nuevo modelo en ModelosComunes
- Crea Repository para historial
- Crea Service para manejar historial
- Modifica métodos de actualización para registrar cambios
- Crea endpoint en Controller para obtener historial
- Crea modal en la vista con tabla de historial

---

#### Ejercicio 5.2: Dashboard de Métricas en Tiempo Real
**Objetivo**: Crear un dashboard interactivo con métricas de empleados.

**Requisitos**:
- Nueva ruta: `/Employees/Dashboard`
- Mostrar gráficos (usar Chart.js o similar):
  - Distribución de salarios (histograma)
  - Empleados por departamento (gráfico de pastel)
  - Antigüedad promedio por año (gráfico de líneas)
  - Tendencias de contratación (gráfico de barras)
- Los datos deben actualizarse automáticamente cada 30 segundos
- Permitir filtrar por rango de fechas
- Exportar reporte del dashboard a PDF

**Pistas**:
- Crea nuevos métodos en el Service para calcular métricas
- Crea endpoint en Controller que retorne datos en formato JSON
- Usa JavaScript para hacer peticiones AJAX periódicas
- Integra librería de gráficos (Chart.js desde CDN)
- Usa DataTables o similar para exportar a PDF

---

#### Ejercicio 5.3: Sistema de Permisos y Roles
**Objetivo**: Implementar un sistema básico de permisos para diferentes acciones.

**Requisitos**:
- Crear modelo `Usuario` y `Rol` en ModelosComunes
- Roles: Administrador, Supervisor, Usuario
- Permisos:
  - Ver empleados (todos)
  - Editar empleados (Administrador, Supervisor)
  - Eliminar empleados (solo Administrador)
  - Exportar datos (todos)
  - Ver dashboard (Administrador, Supervisor)
- Agregar atributos `[Authorize]` en los Controllers
- Ocultar/mostrar botones según permisos del usuario
- Simular autenticación (por ahora hardcodeado, después implementar login real)

**Pistas**:
- Investiga `[Authorize]` de ASP.NET Core
- Crea servicio de autenticación/autorización
- Usa ViewBag o ViewData para pasar permisos a las vistas
- Usa JavaScript para mostrar/ocultar elementos según permisos
- Implementa lógica de roles y permisos en el Service

---

## 📝 Notas para Resolver los Ejercicios

### Consejos Generales

1. **Lee el código existente primero**: Antes de agregar algo nuevo, entiende cómo funciona lo que ya existe.

2. **Sigue los patrones existentes**: Si ves que algo se hace de cierta manera, hazlo igual para mantener consistencia.

3. **Prueba incrementalmente**: No intentes hacer todo de una vez. Haz un cambio, prueba, luego continúa.

4. **Usa la documentación**: Revisa `ESTRUCTURA_VISTAS.md` para entender cómo se comunican las capas.

5. **Depura con paciencia**: Usa `console.log()` en JavaScript y `Console.WriteLine()` en C# para ver qué está pasando.

### Comandos Útiles

```bash
# Compilar el proyecto
dotnet build

# Ejecutar la aplicación
cd src/AdministracionFlotillas.Web
dotnet run

# Ver errores de compilación
dotnet build 2>&1 | grep -i error

# Verificar referencias entre proyectos
dotnet list src/AdministracionFlotillas.Web/AdministracionFlotillas.Web.csproj reference
```

### Recursos de Referencia

- **Estructura de Vistas**: [ESTRUCTURA_VISTAS.md](./ESTRUCTURA_VISTAS.md)
- **Estado del Proyecto**: [ESTADO_PROYECTO.md](./ESTADO_PROYECTO.md)
- **Arquitectura**: [ARQUITECTURA.md](./ARQUITECTURA.md)
- **Comandos Útiles**: [COMANDOS_UTILES.md](./COMANDOS_UTILES.md)

---

**Última actualización**: Enero 2026
