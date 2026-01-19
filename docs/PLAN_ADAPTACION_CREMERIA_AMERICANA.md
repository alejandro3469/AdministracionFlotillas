# Plan de Adaptación - Cremería Americana

**Fecha**: 2026-01-27  
**Objetivo**: Adaptar requerimientos de Cremería Americana a AdministracionFlotillas sin revelar datos sensibles, creando un sistema funcional y escalable para enseñanza.

---

## 📋 Resumen Ejecutivo

Este plan adapta los requerimientos del sistema POS de Cremería Americana a nuestra arquitectura actual, creando módulos especializados que reflejen la complejidad del negocio real sin exponer información sensible.

### Principios de Adaptación

1. **Sin Datos Sensibles**: Todos los datos serán mock/anónimos
2. **Arquitectura Actual**: Mantener estructura de módulos y capas existente
3. **Escalabilidad**: Diseñar para integración futura con datos reales
4. **Funcionalidad Real**: Implementar reglas de negocio complejas
5. **Enseñanza**: Código claro y documentado para aprendizaje

---

## 🎯 Módulos a Implementar

### 1. Módulo de Cadenas (Chains) ⭐
**Equivalente**: Clientes corporativos grandes (1-117 cadenas)

**Funcionalidades**:
- CRUD de cadenas comerciales
- Gestión de múltiples sucursales por cadena
- Límites de crédito y condiciones comerciales
- Historial de pedidos por cadena
- Dashboard de métricas por cadena

**Estructura**:
```
Chains/
├── Controllers/ChainsController.cs
├── Views/Chains/
│   ├── Index.cshtml
│   ├── _ChainsGrid.cshtml
│   └── _ModalCadena.cshtml
├── ViewModels/ChainViewModel.cs
├── Parseador/ChainParseador.cs
└── wwwroot/js/Chains/Chains.js
```

**Datos Mock**:
- 10-15 cadenas comerciales anónimas
- Nombres genéricos: "Cadena Comercial Norte", "Supermercados del Sur", etc.
- Datos de contacto, límites de crédito, condiciones

---

### 2. Módulo de Vendedores (Salespersons) ⭐
**Equivalente**: Vendedores como intermediarios

**Funcionalidades**:
- CRUD de vendedores
- Asignación de vendedor a cliente/cadena
- Comisiones y métricas de ventas
- Historial de pedidos por vendedor
- Dashboard de rendimiento

**Estructura**:
```
Salespersons/
├── Controllers/SalespersonsController.cs
├── Views/Salespersons/
│   ├── Index.cshtml
│   ├── _SalespersonsGrid.cshtml
│   └── _ModalVendedor.cshtml
├── ViewModels/SalespersonViewModel.cs
├── Parseador/SalespersonParseador.cs
└── wwwroot/js/Salespersons/Salespersons.js
```

**Datos Mock**:
- 20-30 vendedores con nombres genéricos
- Zonas de cobertura
- Comisiones y rendimiento

---

### 3. Módulo de Rutas (Routes) ⭐
**Equivalente**: Rutas de reparto

**Funcionalidades**:
- CRUD de rutas de reparto
- Asignación de repartidores a rutas
- Optimización de rutas
- Seguimiento de entregas
- Dashboard de eficiencia de rutas

**Estructura**:
```
Routes/
├── Controllers/RoutesController.cs
├── Views/Routes/
│   ├── Index.cshtml
│   ├── _RoutesGrid.cshtml
│   └── _ModalRuta.cshtml
├── ViewModels/RouteViewModel.cs
├── Parseador/RouteParseador.cs
└── wwwroot/js/Routes/Routes.js
```

**Datos Mock**:
- 15-20 rutas con nombres genéricos
- Zonas geográficas
- Tiempos estimados de entrega

---

### 4. Módulo de Adendas (Addendums) ⭐
**Equivalente**: Contratos especiales para clientes grandes

**Funcionalidades**:
- CRUD de adendas
- Asociación de adendas a cadenas/clientes
- Condiciones especiales (descuentos, plazos, etc.)
- Vigencia y renovación
- Dashboard de adendas activas

**Estructura**:
```
Addendums/
├── Controllers/AddendumsController.cs
├── Views/Addendums/
│   ├── Index.cshtml
│   ├── _AddendumsGrid.cshtml
│   └── _ModalAdenda.cshtml
├── ViewModels/AddendumViewModel.cs
├── Parseador/AddendumParseador.cs
└── wwwroot/js/Addendums/Addendums.js
```

**Datos Mock**:
- 5-10 adendas activas
- Condiciones comerciales variadas
- Fechas de vigencia

---

### 5. Módulo de Canales de Pedidos (Order Channels) ⭐
**Equivalente**: Múltiples canales de recepción de pedidos

**Funcionalidades**:
- Gestión de canales (Móvil, Call Center, Email, Web)
- Métricas por canal
- Conversión y eficiencia
- Dashboard comparativo
- Configuración de canales

**Estructura**:
```
OrderChannels/
├── Controllers/OrderChannelsController.cs
├── Views/OrderChannels/
│   ├── Index.cshtml
│   ├── _OrderChannelsGrid.cshtml
│   └── _ModalCanal.cshtml
├── ViewModels/OrderChannelViewModel.cs
├── Parseador/OrderChannelParseador.cs
└── wwwroot/js/OrderChannels/OrderChannels.js
```

**Datos Mock**:
- 4 canales principales
- Estadísticas de uso
- Métricas de conversión

---

### 6. Módulo de Facturación SAT/CFDI (Invoicing) ⭐
**Equivalente**: Sistema de facturación electrónica

**Funcionalidades**:
- Generación de CFDI
- Validación de datos fiscales
- Emisión y cancelación
- Historial de facturas
- Dashboard de facturación
- Integración simulada con SAT

**Estructura**:
```
Invoicing/
├── Controllers/InvoicingController.cs
├── Views/Invoicing/
│   ├── Index.cshtml
│   ├── _InvoicesGrid.cshtml
│   └── _ModalFactura.cshtml
├── ViewModels/InvoiceViewModel.cs
├── Parseador/InvoiceParseador.cs
└── wwwroot/js/Invoicing/Invoicing.js
```

**Datos Mock**:
- Facturas generadas (sin datos reales)
- Estados de facturación
- UUIDs simulados

---

## 🔄 Reglas de Negocio Complejas

### 1. Modelo de Venta Dual
- **Venta Ad-hoc**: Pedidos directos sin planificación
- **Venta Planificada**: Pedidos recurrentes con calendario

**Implementación**:
- Campo `TipoVenta` en Orders
- Lógica de cálculo diferente según tipo
- Validaciones específicas por tipo

### 2. Cálculo de Comisiones
- Comisión base por vendedor
- Comisión variable por volumen
- Bonificaciones por objetivos

**Implementación**:
- Servicio `ComisionesService`
- Cálculos en capa de reglas de negocio
- Dashboard de comisiones

### 3. Optimización de Rutas
- Algoritmo básico de optimización
- Consideración de distancias
- Restricciones de capacidad

**Implementación**:
- Servicio `RouteOptimizationService`
- Algoritmo simple (puede mejorarse después)
- Visualización en mapa (opcional)

### 4. Validación SAT/CFDI
- Validación de RFC
- Validación de datos fiscales
- Generación de UUID
- Estructura XML básica

**Implementación**:
- Servicio `CFDIService`
- Validaciones en capa de negocio
- Generación de XML simulado

### 5. Gestión de Adendas
- Aplicación automática de condiciones
- Validación de vigencia
- Renovación automática

**Implementación**:
- Servicio `AddendumService`
- Aplicación en cálculo de pedidos
- Alertas de vencimiento

---

## 📊 Estructura de Datos Mock

### Chains (Cadenas)
```json
{
  "IdCadena": 1,
  "NombreCadena": "Cadena Comercial Norte",
  "RazonSocial": "Comercial Norte S.A. de C.V.",
  "RFC": "CON123456ABC",
  "NumeroSucursales": 15,
  "LimiteCredito": 500000.00,
  "DiasCredito": 30,
  "Estado": "ACTIVE",
  "FechaRegistro": "2024-01-15"
}
```

### Salespersons (Vendedores)
```json
{
  "IdVendedor": 1,
  "NombreCompleto": "Juan Pérez García",
  "Email": "juan.perez@empresa.com",
  "Telefono": "+52 55 1234 5678",
  "ZonaCobertura": "Norte",
  "ComisionBase": 5.0,
  "ComisionVariable": 2.5,
  "Estado": "ACTIVE",
  "FechaContratacion": "2023-06-01"
}
```

### Routes (Rutas)
```json
{
  "IdRuta": 1,
  "NombreRuta": "Ruta Norte - Zona 1",
  "Descripcion": "Cobertura norte de la ciudad",
  "ZonaGeografica": "Norte",
  "TiempoEstimado": 120,
  "CapacidadMaxima": 50,
  "Estado": "ACTIVE",
  "RepartidorAsignado": "María González"
}
```

### Addendums (Adendas)
```json
{
  "IdAdenda": 1,
  "IdCadena": 1,
  "NombreAdenda": "Contrato Anual 2024",
  "DescuentoEspecial": 10.0,
  "DiasCredito": 45,
  "FechaInicio": "2024-01-01",
  "FechaFin": "2024-12-31",
  "Estado": "ACTIVE",
  "CondicionesEspeciales": "Descuento del 10% en productos seleccionados"
}
```

### Order Channels (Canales)
```json
{
  "IdCanal": 1,
  "NombreCanal": "Aplicación Móvil",
  "TipoCanal": "MOBILE",
  "Descripcion": "Pedidos desde aplicación móvil",
  "Estado": "ACTIVE",
  "TotalPedidos": 1250,
  "ConversionRate": 85.5
}
```

### Invoices (Facturas)
```json
{
  "IdFactura": 1,
  "IdOrden": 1001,
  "Folio": "FAC-2024-0001",
  "UUID": "550e8400-e29b-41d4-a716-446655440000",
  "RFCEmisor": "EMP123456ABC",
  "RFCReceptor": "CON123456ABC",
  "FechaEmision": "2024-01-15T10:30:00",
  "Subtotal": 10000.00,
  "IVA": 1600.00,
  "Total": 11600.00,
  "Estado": "TIMBRADA",
  "MetodoPago": "PUE"
}
```

---

## 🏗️ Arquitectura de Implementación

### Capa de Modelos Comunes
```
ModelosComunes/
├── Chain.cs
├── Salesperson.cs
├── Route.cs
├── Addendum.cs
├── OrderChannel.cs
└── Invoice.cs
```

### Capa de Acceso a Datos
```
AccesoDatos/Repositorios/
├── IChainsRepository.cs
├── ChainsRepository.cs (con datos mock)
├── ISalespersonsRepository.cs
├── SalespersonsRepository.cs (con datos mock)
├── IRoutesRepository.cs
├── RoutesRepository.cs (con datos mock)
├── IAddendumsRepository.cs
├── AddendumsRepository.cs (con datos mock)
├── IOrderChannelsRepository.cs
├── OrderChannelsRepository.cs (con datos mock)
├── IInvoicingRepository.cs
└── InvoicingRepository.cs (con datos mock)
```

### Capa de Reglas de Negocio
```
ReglasNegocio/Servicios/
├── IChainsService.cs
├── ChainsService.cs
├── ISalespersonsService.cs
├── SalespersonsService.cs
├── IRoutesService.cs
├── RoutesService.cs
├── IAddendumsService.cs
├── AddendumsService.cs
├── IOrderChannelsService.cs
├── OrderChannelsService.cs
├── IInvoicingService.cs
├── InvoicingService.cs
├── IComisionesService.cs
├── ComisionesService.cs
├── ICFDIService.cs
└── CFDIService.cs
```

### Capa Web
```
Web/
├── Controllers/
│   ├── ChainsController.cs
│   ├── SalespersonsController.cs
│   ├── RoutesController.cs
│   ├── AddendumsController.cs
│   ├── OrderChannelsController.cs
│   └── InvoicingController.cs
├── ViewModels/
│   ├── ChainViewModel.cs
│   ├── SalespersonViewModel.cs
│   ├── RouteViewModel.cs
│   ├── AddendumViewModel.cs
│   ├── OrderChannelViewModel.cs
│   └── InvoiceViewModel.cs
├── Parseador/
│   ├── ChainParseador.cs
│   ├── SalespersonParseador.cs
│   ├── RouteParseador.cs
│   ├── AddendumParseador.cs
│   ├── OrderChannelParseador.cs
│   └── InvoiceParseador.cs
└── Views/
    ├── Chains/
    ├── Salespersons/
    ├── Routes/
    ├── Addendums/
    ├── OrderChannels/
    └── Invoicing/
```

---

## 📅 Plan de Implementación por Fases

### Fase 1: Fundación (Día 1-2)
1. ✅ Crear rama `feature/cremeria-americana-adaptation`
2. ✅ Crear modelos comunes (Chain, Salesperson, Route, Addendum, OrderChannel, Invoice)
3. ✅ Crear repositorios con datos mock
4. ✅ Crear servicios básicos (CRUD)

### Fase 2: Módulos Básicos (Día 3-5)
1. ✅ Implementar módulo Chains
2. ✅ Implementar módulo Salespersons
3. ✅ Implementar módulo Routes
4. ✅ Homologar al formato de Orders

### Fase 3: Módulos Avanzados (Día 6-8)
1. ✅ Implementar módulo Addendums
2. ✅ Implementar módulo OrderChannels
3. ✅ Implementar módulo Invoicing
4. ✅ Integrar con Orders existente

### Fase 4: Reglas de Negocio (Día 9-10)
1. ✅ Implementar cálculo de comisiones
2. ✅ Implementar validación CFDI
3. ✅ Implementar aplicación de adendas
4. ✅ Implementar optimización de rutas básica

### Fase 5: Integración y Pulido (Día 11-12)
1. ✅ Integrar todos los módulos
2. ✅ Crear dashboard consolidado
3. ✅ Documentación completa
4. ✅ Testing básico

---

## 🔐 Consideraciones de Seguridad y Privacidad

### Datos Anonimizados
- Todos los nombres son genéricos
- RFCs son ficticios (formato válido pero no reales)
- Direcciones son genéricas
- Teléfonos son formatos válidos pero no reales

### Sin Información Sensible
- No se incluyen datos reales de clientes
- No se incluyen datos reales de empleados
- No se incluyen datos reales de facturación
- No se incluyen datos reales de transacciones

### Escalabilidad
- Estructura preparada para datos reales
- Interfaces claras para integración futura
- Separación de datos mock y lógica de negocio

---

## 📚 Documentación a Crear

1. **GUIA_ADAPTACION_CREMERIA_AMERICANA.md**
   - Mapeo de requerimientos originales a implementación
   - Decisiones de diseño
   - Limitaciones y mejoras futuras

2. **DATOS_MOCK.md**
   - Descripción de datos mock
   - Estructura de datos
   - Cómo reemplazar con datos reales

3. **REGLAS_NEGOCIO.md**
   - Reglas implementadas
   - Cálculos y fórmulas
   - Validaciones

4. **INTEGRACION_MODULOS.md**
   - Cómo se integran los módulos
   - Flujos de datos
   - Dependencias

---

## ✅ Checklist de Implementación

### Modelos y Repositorios
- [ ] Crear modelos comunes (6 modelos)
- [ ] Crear interfaces de repositorios (6 interfaces)
- [ ] Crear repositorios con datos mock (6 repositorios)
- [ ] Crear servicios básicos (6 servicios)

### Controladores y Vistas
- [ ] Crear controladores (6 controladores)
- [ ] Crear ViewModels (6 ViewModels)
- [ ] Crear Parseadores (6 parseadores)
- [ ] Crear vistas Index (6 vistas)
- [ ] Crear grids Syncfusion (6 grids)
- [ ] Crear modals (6 modals)

### JavaScript
- [ ] Crear archivos JS por módulo (6 archivos)
- [ ] Implementar funcionalidad de grids
- [ ] Implementar funcionalidad de modals
- [ ] Implementar filtros y búsqueda

### Reglas de Negocio
- [ ] Implementar cálculo de comisiones
- [ ] Implementar validación CFDI
- [ ] Implementar aplicación de adendas
- [ ] Implementar optimización de rutas

### Integración
- [ ] Integrar con Orders existente
- [ ] Crear dashboard consolidado
- [ ] Actualizar navegación
- [ ] Actualizar breadcrumbs

### Documentación
- [ ] Documentar adaptación
- [ ] Documentar datos mock
- [ ] Documentar reglas de negocio
- [ ] Documentar integración

---

## 🎯 Métricas de Éxito

1. **Funcionalidad**: Todos los módulos CRUD funcionando
2. **Homologación**: Todas las pantallas con formato consistente
3. **Reglas de Negocio**: Cálculos y validaciones implementados
4. **Documentación**: Completa y clara
5. **Escalabilidad**: Preparado para datos reales
6. **Sin Datos Sensibles**: Verificado

---

**Última actualización**: 2026-01-27  
**Estado**: Plan creado, listo para implementación
