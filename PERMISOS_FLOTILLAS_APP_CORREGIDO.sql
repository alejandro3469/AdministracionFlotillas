-- =============================================
-- Script para Otorgar Permisos a FLOTILLAS_APP
-- ⚠️ IMPORTANTE: Verificar el schema correcto antes de ejecutar
-- =============================================
-- 
-- INSTRUCCIONES:
-- 1. Verificar en qué schema están los objetos (CO o ADMIN)
-- 2. Reemplazar [SCHEMA] con el schema correcto
-- 3. Ejecutar como usuario con permisos DBA (ADMIN o CO)
-- =============================================

-- =============================================
-- PASO 1: VERIFICAR SCHEMA
-- =============================================
-- Ejecutar esto primero para ver dónde están los objetos
SELECT owner, object_name, object_type 
FROM all_objects 
WHERE object_name IN ('ORDERS', 'PKG_ORDERS')
ORDER BY owner, object_name;

-- =============================================
-- PASO 2: OTOGAR PERMISOS
-- =============================================
-- ⚠️ REEMPLAZAR [SCHEMA] con el schema correcto (CO o ADMIN)

-- 1. Otorgar permisos para ejecutar stored procedures en PKG_ORDERS
GRANT EXECUTE ON [SCHEMA].PKG_ORDERS TO FLOTILLAS_APP;

-- 2. Otorgar permisos para leer/escribir en la tabla ORDERS
GRANT SELECT, INSERT, UPDATE, DELETE ON [SCHEMA].ORDERS TO FLOTILLAS_APP;

-- 3. (Opcional) Crear sinónimos para facilitar el acceso
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR [SCHEMA].ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR [SCHEMA].PKG_ORDERS;

-- =============================================
-- PASO 3: VERIFICAR PERMISOS
-- =============================================
-- Verificar permisos otorgados
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';
SELECT * FROM DBA_SYNONYMS WHERE owner = 'FLOTILLAS_APP';

-- =============================================
-- EJEMPLO SI EL SCHEMA ES "CO"
-- =============================================
/*
GRANT EXECUTE ON CO.PKG_ORDERS TO FLOTILLAS_APP;
GRANT SELECT, INSERT, UPDATE, DELETE ON CO.ORDERS TO FLOTILLAS_APP;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR CO.ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR CO.PKG_ORDERS;
*/

-- =============================================
-- EJEMPLO SI EL SCHEMA ES "ADMIN"
-- =============================================
/*
GRANT EXECUTE ON ADMIN.PKG_ORDERS TO FLOTILLAS_APP;
GRANT SELECT, INSERT, UPDATE, DELETE ON ADMIN.ORDERS TO FLOTILLAS_APP;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR ADMIN.ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR ADMIN.PKG_ORDERS;
*/
