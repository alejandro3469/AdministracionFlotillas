# Guía de Git

Esta guía explica los conceptos básicos de Git y cómo trabajar con el repositorio del proyecto.

## Conceptos Básicos

### Repositorio

Un repositorio es un directorio que contiene el historial completo de cambios de un proyecto. Git guarda cada cambio realizado en los archivos, permitiendo volver a versiones anteriores cuando sea necesario.

### Commit

Un commit es una instantánea del estado del proyecto en un momento específico. Cada commit contiene:
- Los cambios realizados en los archivos
- Un mensaje que describe qué se cambió
- Información del autor y fecha

### Mensajes de Commit

Los mensajes de commit deben ser breves, claros y descriptivos. Se recomienda usar menos de 10 palabras para facilitar la lectura del historial.

**Principios para mensajes de commit:**
- Usar verbos en infinitivo o imperativo
- Ser específico sobre qué se cambió
- Evitar explicaciones largas
- Un commit por cambio lógico

**Ejemplos de mensajes correctos:**
```
Agregar validación de email
Corregir filtro de salario
Actualizar documentación
Eliminar código no usado
Refactorizar parseador
```

**Ejemplos de mensajes incorrectos:**
```
Arreglé el bug que tenía el filtro de salario porque no funcionaba correctamente cuando se ingresaban valores negativos
Cambios varios
Fix
```

## Comandos Básicos

### Verificar Estado del Repositorio

```bash
git status
```

Muestra qué archivos han sido modificados, agregados o eliminados. Indica si hay cambios pendientes de commit.

**Salida esperada:**
```
On branch main
Changes not staged for commit:
  modified:   src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs
```

### Agregar Archivos al Área de Staging

```bash
# Agregar un archivo específico
git add nombre-archivo.cs

# Agregar todos los archivos modificados
git add .

# Agregar todos los archivos de un directorio
git add src/AdministracionFlotillas.Web/Controllers/
```

El área de staging es una zona intermedia donde se preparan los cambios antes de crear un commit. Los archivos agregados con `git add` estarán incluidos en el próximo commit.

### Crear un Commit

```bash
git commit -m "Mensaje breve del cambio"
```

Crea un commit con los archivos que están en el área de staging. El mensaje debe describir claramente qué se cambió.

**Ejemplo:**
```bash
git add src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs
git commit -m "Agregar validación de ID empleado"
```

### Ver Historial de Commits

```bash
# Ver últimos commits
git log

# Ver commits de forma compacta
git log --oneline

# Ver últimos 10 commits
git log -10
```

El historial muestra todos los commits realizados, ordenados del más reciente al más antiguo. Cada commit tiene un identificador único (hash) que permite referenciarlo.

**Salida esperada:**
```
commit abc123def456
Author: Nombre <email@ejemplo.com>
Date:   Mon Jan 14 10:30:00 2024

    Agregar validación de email

commit 789ghi012jkl
Author: Nombre <email@ejemplo.com>
Date:   Mon Jan 14 09:15:00 2024

    Corregir filtro de salario
```

### Ver Diferencias

```bash
# Ver cambios en archivos modificados
git diff

# Ver cambios en un archivo específico
git diff nombre-archivo.cs

# Ver cambios de un commit específico
git show abc123
```

Muestra las diferencias entre el estado actual y el último commit. Útil para revisar qué se cambió antes de hacer commit.

## Flujo de Trabajo Recomendado

### 1. Verificar Estado

Antes de comenzar a trabajar, verificar qué archivos están modificados:

```bash
git status
```

### 2. Hacer Cambios

Realizar los cambios necesarios en los archivos del proyecto.

### 3. Revisar Cambios

Revisar qué se modificó antes de crear el commit:

```bash
git diff
```

### 4. Agregar Archivos al Staging

Agregar solo los archivos relacionados con un cambio lógico:

```bash
git add archivo1.cs archivo2.cs
```

### 5. Crear Commit

Crear un commit con un mensaje descriptivo y breve:

```bash
git commit -m "Agregar validación de email"
```

### 6. Repetir para Otros Cambios

Si hay otros cambios no relacionados, repetir los pasos 3-5 para cada cambio lógico.

## Buenas Prácticas

### Un Cambio por Commit

Cada commit debe representar un cambio lógico completo. Si se modifican múltiples archivos para implementar una funcionalidad, todos deben ir en el mismo commit.

**Ejemplo correcto:**
```bash
# Implementar filtro de fecha
git add src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs
git add src/AdministracionFlotillas.Web/Scripts/Employees/Employees.js
git commit -m "Agregar filtro por fecha contratación"
```

**Ejemplo incorrecto:**
```bash
# Mezclar cambios no relacionados
git add src/AdministracionFlotillas.Web/Controllers/EmployeesController.cs
git add src/AdministracionFlotillas.Web/docs/README.md
git commit -m "Cambios varios"
```

### Mensajes Descriptivos

El mensaje del commit debe permitir identificar rápidamente qué se cambió al leer el historial.

**Buenos mensajes:**
- "Agregar validación de email"
- "Corregir cálculo de antigüedad"
- "Actualizar documentación módulo Employees"
- "Eliminar código no usado"

**Malos mensajes:**
- "Cambios"
- "Fix"
- "Update"
- "Arreglo"

### Commits Frecuentes

Crear commits frecuentemente facilita identificar cuándo se introdujo un problema y permite deshacer cambios específicos sin afectar otros.

## Identificar Cambios en el Historial

### Buscar Commits por Mensaje

```bash
git log --grep="validación"
```

Busca commits cuyo mensaje contenga la palabra especificada.

### Ver Cambios de un Archivo

```bash
git log --follow -- nombre-archivo.cs
```

Muestra el historial de cambios de un archivo específico, útil para entender cómo evolucionó.

### Comparar Versiones

```bash
# Comparar dos commits
git diff commit1 commit2

# Comparar con la versión anterior
git diff HEAD~1 HEAD
```

Permite ver exactamente qué cambió entre dos versiones del proyecto.

## Resolver Problemas Comunes

### Deshacer Cambios No Commiteados

```bash
# Descartar cambios en un archivo
git checkout -- nombre-archivo.cs

# Descartar todos los cambios
git checkout -- .
```

Restaura los archivos al estado del último commit, descartando modificaciones no guardadas.

### Modificar el Último Commit

```bash
# Agregar archivos olvidados al último commit
git add archivo-olvidado.cs
git commit --amend -m "Mensaje corregido"
```

Modifica el último commit para incluir cambios adicionales o corregir el mensaje.

### Ver Qué Cambió en un Commit

```bash
git show abc123
```

Muestra los cambios realizados en un commit específico, útil para entender qué se modificó.

## Sincronización con Repositorio Remoto

### Verificar Estado de Sincronización

```bash
git status
```

Muestra si hay commits locales que no se han enviado al repositorio remoto.

### Enviar Commits al Repositorio Remoto

```bash
git push
```

Envía los commits locales al repositorio remoto, compartiendo los cambios con otros desarrolladores.

### Obtener Cambios del Repositorio Remoto

```bash
git pull
```

Descarga y aplica los cambios del repositorio remoto al repositorio local.

## Notas Importantes

- Los commits son permanentes una vez creados, aunque se pueden modificar con comandos específicos
- El historial de commits permite rastrear la evolución del proyecto
- Mensajes claros facilitan la colaboración y el mantenimiento
- Un commit debe representar un cambio lógico completo
- Es recomendable crear commits frecuentemente para facilitar la identificación de problemas
