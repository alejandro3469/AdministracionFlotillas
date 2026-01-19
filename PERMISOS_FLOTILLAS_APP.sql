-- =============================================
-- Script para Otorgar Permisos a FLOTILLAS_APP
-- Ejecutar como ADMIN en SQL Worksheet
-- =============================================

-- 1. Otorgar permisos para ejecutar stored procedures en PKG_ORDERS
GRANT EXECUTE ON ADMIN.PKG_ORDERS TO FLOTILLAS_APP;

-- 2. Otorgar permisos para leer/escribir en la tabla ORDERS
GRANT SELECT, INSERT, UPDATE, DELETE ON ADMIN.ORDERS TO FLOTILLAS_APP;

-- 3. (Opcional) Si necesitas crear objetos en el schema FLOTILLAS_APP
-- Ya tiene RESOURCE, así que puede crear sus propias tablas/procedimientos

-- 4. (Opcional) Si necesitas crear sinónimos para facilitar el acceso
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.ORDERS FOR ADMIN.ORDERS;
CREATE OR REPLACE SYNONYM FLOTILLAS_APP.PKG_ORDERS FOR ADMIN.PKG_ORDERS;

-- Verificar permisos otorgados
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'FLOTILLAS_APP';
