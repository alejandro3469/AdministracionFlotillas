-- =============================================
-- Script de Migración: Tabla FLOTILLAS
-- Base de Datos: Oracle Database
-- Fecha: 2024
-- Descripción: Crea la tabla principal para almacenar información de flotillas
-- =============================================

-- Eliminar tabla si existe (solo para desarrollo)
-- DROP TABLE FLOTILLAS CASCADE CONSTRAINTS;

-- Crear tabla FLOTILLAS
CREATE TABLE FLOTILLAS (
    ID NUMBER(10) NOT NULL,
    NOMBRE VARCHAR2(200) NOT NULL,
    DESCRIPCION VARCHAR2(1000),
    ESTADO VARCHAR2(50) NOT NULL,
    FECHA_CREACION DATE NOT NULL,
    FECHA_MODIFICACION DATE,
    USUARIO_CREACION VARCHAR2(100),
    USUARIO_MODIFICACION VARCHAR2(100),
    CONSTRAINT PK_FLOTILLAS PRIMARY KEY (ID),
    CONSTRAINT CHK_ESTADO CHECK (ESTADO IN ('Activo', 'Inactivo', 'En Mantenimiento'))
);

-- Crear secuencia para ID autoincremental
CREATE SEQUENCE SEQ_FLOTILLAS
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Crear trigger para autoincrementar ID
CREATE OR REPLACE TRIGGER TRG_FLOTILLAS_ID
    BEFORE INSERT ON FLOTILLAS
    FOR EACH ROW
BEGIN
    IF :NEW.ID IS NULL THEN
        :NEW.ID := SEQ_FLOTILLAS.NEXTVAL;
    END IF;
    
    IF :NEW.FECHA_CREACION IS NULL THEN
        :NEW.FECHA_CREACION := SYSDATE;
    END IF;
    
    :NEW.FECHA_MODIFICACION := SYSDATE;
END;
/

-- Crear índices para mejorar rendimiento
CREATE INDEX IDX_FLOTILLAS_ESTADO ON FLOTILLAS(ESTADO);
CREATE INDEX IDX_FLOTILLAS_FECHA_CREACION ON FLOTILLAS(FECHA_CREACION);
CREATE INDEX IDX_FLOTILLAS_NOMBRE ON FLOTILLAS(UPPER(NOMBRE));

-- Insertar datos iniciales (opcional, para desarrollo)
INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Norte - Logística Regional', 
 'Flotilla principal para distribución en la zona norte del país. Incluye vehículos de carga pesada y liviana.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -24), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Sur - Servicios Urbanos', 
 'Vehículos destinados a servicios de entrega urbana y mensajería en la zona metropolitana.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -18), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Este - Transporte Ejecutivo', 
 'Vehículos ejecutivos y de representación para clientes corporativos. Incluye mantenimiento premium.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -12), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Oeste - Carga Especializada', 
 'Vehículos especializados para transporte de materiales peligrosos y carga refrigerada.', 
 'En Mantenimiento', 
 ADD_MONTHS(SYSDATE, -30), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Centro - Servicios Express', 
 'Flotilla de respuesta rápida para entregas urgentes y servicios de emergencia.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -6), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Temporal - Proyecto Especial', 
 'Flotilla temporal asignada a proyecto especial de expansión. Programada para desactivación en 3 meses.', 
 'Inactivo', 
 ADD_MONTHS(SYSDATE, -3), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Internacional - Fronteras', 
 'Vehículos certificados para transporte internacional y cruce de fronteras. Cumplimiento aduanero.', 
 'Activo', 
 ADD_MONTHS(SYSDATE, -36), 
 'SISTEMA');

INSERT INTO FLOTILLAS (NOMBRE, DESCRIPCION, ESTADO, FECHA_CREACION, USUARIO_CREACION) VALUES
('Flotilla Respaldo - Emergencias', 
 'Flotilla de respaldo para situaciones de emergencia y picos de demanda estacional.', 
 'En Mantenimiento', 
 ADD_MONTHS(SYSDATE, -9), 
 'SISTEMA');

-- Confirmar transacción
COMMIT;

-- Verificar datos insertados
SELECT COUNT(*) AS TOTAL_FLOTILLAS FROM FLOTILLAS;
SELECT * FROM FLOTILLAS ORDER BY ID;

