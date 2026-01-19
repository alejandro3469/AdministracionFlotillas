-- =============================================
-- Paquete de Stored Procedures para ORDERS
-- Base de Datos: AdministracionFlotillas
-- Schema: ADMIN
-- =============================================

-- Especificación del Paquete
CREATE OR REPLACE PACKAGE PKG_ORDERS AS
    -- Obtener todas las órdenes
    PROCEDURE SP_OBTENER_ORDERS(
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener una orden por ID
    PROCEDURE SP_OBTENER_ORDER_POR_ID(
        P_ORDER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Buscar órdenes con filtros opcionales
    PROCEDURE SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID IN NUMBER DEFAULT NULL,
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_FECHA_INICIO IN TIMESTAMP DEFAULT NULL,
        P_FECHA_FIN IN TIMESTAMP DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    );
    
    -- Obtener órdenes por rango de fechas
    PROCEDURE SP_OBTENER_ORDERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN TIMESTAMP,
        P_FECHA_FIN IN TIMESTAMP,
        P_RESULTADO OUT SYS_REFCURSOR
    );
END PKG_ORDERS;
/

-- Cuerpo del Paquete
CREATE OR REPLACE PACKAGE BODY PKG_ORDERS AS
    
    PROCEDURE SP_OBTENER_ORDERS(
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            ORDER BY O.ORDER_TMS DESC;
    END SP_OBTENER_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDER_POR_ID(
        P_ORDER_ID IN NUMBER,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            WHERE O.ORDER_ID = P_ORDER_ID;
    END SP_OBTENER_ORDER_POR_ID;
    
    PROCEDURE SP_BUSCAR_ORDERS(
        P_CUSTOMER_ID IN NUMBER DEFAULT NULL,
        P_STORE_ID IN NUMBER DEFAULT NULL,
        P_STATUS IN VARCHAR2 DEFAULT NULL,
        P_FECHA_INICIO IN TIMESTAMP DEFAULT NULL,
        P_FECHA_FIN IN TIMESTAMP DEFAULT NULL,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        -- Usar consulta estática que maneja NULLs correctamente
        -- Esto evita el error ORA-01006 con bind variables
        OPEN P_RESULTADO FOR
            SELECT 
                    O.ORDER_ID,
                    O.ORDER_TMS,
                    O.CUSTOMER_ID,
                    O.ORDER_STATUS,
                    O.STORE_ID
                  FROM ORDERS O
            WHERE (P_CUSTOMER_ID IS NULL OR O.CUSTOMER_ID = P_CUSTOMER_ID)
              AND (P_STORE_ID IS NULL OR O.STORE_ID = P_STORE_ID)
              AND (P_STATUS IS NULL OR O.ORDER_STATUS = P_STATUS)
              AND (P_FECHA_INICIO IS NULL OR O.ORDER_TMS >= P_FECHA_INICIO)
              AND (P_FECHA_FIN IS NULL OR O.ORDER_TMS <= P_FECHA_FIN)
            ORDER BY O.ORDER_TMS DESC;
    END SP_BUSCAR_ORDERS;
    
    PROCEDURE SP_OBTENER_ORDERS_POR_RANGO_FECHAS(
        P_FECHA_INICIO IN TIMESTAMP,
        P_FECHA_FIN IN TIMESTAMP,
        P_RESULTADO OUT SYS_REFCURSOR
    ) AS
    BEGIN
        OPEN P_RESULTADO FOR
            SELECT 
                O.ORDER_ID,
                O.ORDER_TMS,
                O.CUSTOMER_ID,
                O.ORDER_STATUS,
                O.STORE_ID
            FROM ORDERS O
            WHERE O.ORDER_TMS >= P_FECHA_INICIO
              AND O.ORDER_TMS <= P_FECHA_FIN
            ORDER BY O.ORDER_TMS DESC;
    END SP_OBTENER_ORDERS_POR_RANGO_FECHAS;
    
END PKG_ORDERS;
/
