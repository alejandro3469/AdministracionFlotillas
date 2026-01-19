-- ============================================================================
-- Script: Insertar Datos Mock en Todas las Tablas
-- Descripción: Inserta datos de prueba realistas en todas las tablas
-- Schema: CO (Customer Orders)
-- Usuario: FLOTILLAS_APP
-- ============================================================================

-- Conectar como usuario FLOTILLAS_APP o con permisos suficientes
-- ALTER SESSION SET CURRENT_SCHEMA = CO;

-- ============================================================================
-- 1. INSERTAR DATOS MOCK EN CHAINS (25 registros)
-- ============================================================================
INSERT INTO CO.CHAINS (CHAIN_NAME, BUSINESS_NAME, RFC, NUMBER_OF_STORES, CREDIT_LIMIT, CREDIT_DAYS, STATUS, REGISTRATION_DATE, CONTACT_EMAIL, CONTACT_PHONE, ADDRESS, CITY, STATE, POSTAL_CODE, COUNTRY, TOTAL_ORDERS, TOTAL_SALES) VALUES
('Cadena 01 S.A. de C.V.', 'Razón Social 01', 'CAD01234567ABC', 15, 500000, 30, 'ACTIVE', SYSDATE - 1800, 'contacto01@cadena01.com', '55-1234-5678', 'Calle Falsa 101', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 450, 2500000),
('Cadena 02 S.A. de C.V.', 'Razón Social 02', 'CAD02234567ABC', 8, 300000, 45, 'ACTIVE', SYSDATE - 1500, 'contacto02@cadena02.com', '55-2345-6789', 'Calle Falsa 102', 'Guadalajara', 'Jalisco', '44100', 'México', 320, 1800000),
('Cadena 03 S.A. de C.V.', 'Razón Social 03', 'CAD03234567ABC', 25, 800000, 60, 'ACTIVE', SYSDATE - 1200, 'contacto03@cadena03.com', '55-3456-7890', 'Calle Falsa 103', 'Monterrey', 'Nuevo León', '64000', 'México', 680, 4200000),
('Cadena 04 S.A. de C.V.', 'Razón Social 04', 'CAD04234567ABC', 5, 150000, 30, 'ACTIVE', SYSDATE - 900, 'contacto04@cadena04.com', '55-4567-8901', 'Calle Falsa 104', 'Puebla', 'Puebla', '72000', 'México', 180, 850000),
('Cadena 05 S.A. de C.V.', 'Razón Social 05', 'CAD05234567ABC', 12, 400000, 30, 'INACTIVE', SYSDATE - 2000, 'contacto05@cadena05.com', '55-5678-9012', 'Calle Falsa 105', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 0, 0),
('Cadena 06 S.A. de C.V.', 'Razón Social 06', 'CAD06234567ABC', 18, 600000, 45, 'ACTIVE', SYSDATE - 800, 'contacto06@cadena06.com', '55-6789-0123', 'Calle Falsa 106', 'Guadalajara', 'Jalisco', '44100', 'México', 520, 3100000),
('Cadena 07 S.A. de C.V.', 'Razón Social 07', 'CAD07234567ABC', 3, 100000, 15, 'SUSPENDED', SYSDATE - 600, 'contacto07@cadena07.com', '55-7890-1234', 'Calle Falsa 107', 'Monterrey', 'Nuevo León', '64000', 'México', 0, 0),
('Cadena 08 S.A. de C.V.', 'Razón Social 08', 'CAD08234567ABC', 30, 1000000, 90, 'ACTIVE', SYSDATE - 500, 'contacto08@cadena08.com', '55-8901-2345', 'Calle Falsa 108', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 850, 5500000),
('Cadena 09 S.A. de C.V.', 'Razón Social 09', 'CAD09234567ABC', 7, 250000, 30, 'ACTIVE', SYSDATE - 400, 'contacto09@cadena09.com', '55-9012-3456', 'Calle Falsa 109', 'Puebla', 'Puebla', '72000', 'México', 290, 1400000),
('Cadena 10 S.A. de C.V.', 'Razón Social 10', 'CAD10234567ABC', 20, 700000, 60, 'ACTIVE', SYSDATE - 300, 'contacto10@cadena10.com', '55-0123-4567', 'Calle Falsa 110', 'Guadalajara', 'Jalisco', '44100', 'México', 640, 3800000),
('Cadena 11 S.A. de C.V.', 'Razón Social 11', 'CAD11234567ABC', 4, 120000, 30, 'INACTIVE', SYSDATE - 1900, 'contacto11@cadena11.com', '55-1234-5678', 'Calle Falsa 111', 'Monterrey', 'Nuevo León', '64000', 'México', 0, 0),
('Cadena 12 S.A. de C.V.', 'Razón Social 12', 'CAD12234567ABC', 22, 750000, 45, 'ACTIVE', SYSDATE - 200, 'contacto12@cadena12.com', '55-2345-6789', 'Calle Falsa 112', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 720, 4100000),
('Cadena 13 S.A. de C.V.', 'Razón Social 13', 'CAD13234567ABC', 9, 350000, 30, 'ACTIVE', SYSDATE - 100, 'contacto13@cadena13.com', '55-3456-7890', 'Calle Falsa 113', 'Puebla', 'Puebla', '72000', 'México', 380, 2100000),
('Cadena 14 S.A. de C.V.', 'Razón Social 14', 'CAD14234567ABC', 16, 550000, 60, 'ACTIVE', SYSDATE - 50, 'contacto14@cadena14.com', '55-4567-8901', 'Calle Falsa 114', 'Guadalajara', 'Jalisco', '44100', 'México', 580, 3400000),
('Cadena 15 S.A. de C.V.', 'Razón Social 15', 'CAD15234567ABC', 6, 200000, 30, 'SUSPENDED', SYSDATE - 700, 'contacto15@cadena15.com', '55-5678-9012', 'Calle Falsa 115', 'Monterrey', 'Nuevo León', '64000', 'México', 0, 0),
('Cadena 16 S.A. de C.V.', 'Razón Social 16', 'CAD16234567ABC', 28, 900000, 75, 'ACTIVE', SYSDATE - 25, 'contacto16@cadena16.com', '55-6789-0123', 'Calle Falsa 116', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 920, 5800000),
('Cadena 17 S.A. de C.V.', 'Razón Social 17', 'CAD17234567ABC', 11, 450000, 45, 'ACTIVE', SYSDATE - 15, 'contacto17@cadena17.com', '55-7890-1234', 'Calle Falsa 117', 'Puebla', 'Puebla', '72000', 'México', 420, 2400000),
('Cadena 18 S.A. de C.V.', 'Razón Social 18', 'CAD18234567ABC', 14, 500000, 30, 'ACTIVE', SYSDATE - 10, 'contacto18@cadena18.com', '55-8901-2345', 'Calle Falsa 118', 'Guadalajara', 'Jalisco', '44100', 'México', 480, 2700000),
('Cadena 19 S.A. de C.V.', 'Razón Social 19', 'CAD19234567ABC', 19, 650000, 60, 'ACTIVE', SYSDATE - 5, 'contacto19@cadena19.com', '55-9012-3456', 'Calle Falsa 119', 'Monterrey', 'Nuevo León', '64000', 'México', 660, 3900000),
('Cadena 20 S.A. de C.V.', 'Razón Social 20', 'CAD20234567ABC', 2, 80000, 15, 'INACTIVE', SYSDATE - 1800, 'contacto20@cadena20.com', '55-0123-4567', 'Calle Falsa 120', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 0, 0),
('Cadena 21 S.A. de C.V.', 'Razón Social 21', 'CAD21234567ABC', 24, 850000, 90, 'ACTIVE', SYSDATE - 3, 'contacto21@cadena21.com', '55-1234-5678', 'Calle Falsa 121', 'Puebla', 'Puebla', '72000', 'México', 880, 5200000),
('Cadena 22 S.A. de C.V.', 'Razón Social 22', 'CAD22234567ABC', 10, 380000, 30, 'ACTIVE', SYSDATE - 2, 'contacto22@cadena22.com', '55-2345-6789', 'Calle Falsa 122', 'Guadalajara', 'Jalisco', '44100', 'México', 360, 2000000),
('Cadena 23 S.A. de C.V.', 'Razón Social 23', 'CAD23234567ABC', 17, 580000, 45, 'ACTIVE', SYSDATE - 1, 'contacto23@cadena23.com', '55-3456-7890', 'Calle Falsa 123', 'Monterrey', 'Nuevo León', '64000', 'México', 600, 3500000),
('Cadena 24 S.A. de C.V.', 'Razón Social 24', 'CAD24234567ABC', 13, 480000, 30, 'ACTIVE', SYSDATE, 'contacto24@cadena24.com', '55-4567-8901', 'Calle Falsa 124', 'Ciudad de México', 'Ciudad de México', '01000', 'México', 440, 2500000),
('Cadena 25 S.A. de C.V.', 'Razón Social 25', 'CAD25234567ABC', 26, 950000, 90, 'ACTIVE', SYSDATE, 'contacto25@cadena25.com', '55-5678-9012', 'Calle Falsa 125', 'Puebla', 'Puebla', '72000', 'México', 960, 6000000);

COMMIT;

-- ============================================================================
-- 2. INSERTAR DATOS MOCK EN SALESPERSONS (25 registros)
-- ============================================================================
INSERT INTO CO.SALESPERSONS (FULL_NAME, EMAIL, PHONE, COVERAGE_ZONE, BASE_COMMISSION, VARIABLE_COMMISSION, STATUS, HIRE_DATE, TOTAL_ORDERS, TOTAL_SALES, TOTAL_COMMISSIONS, ASSIGNED_CHAINS) VALUES
('Vendedor 01 Apellido 01', 'vendedor01@empresa.com', '55-1000-0001', 'Norte', 5.0, 2.0, 'ACTIVE', SYSDATE - 1500, 580, 1500000, 105000, 5),
('Vendedor 02 Apellido 02', 'vendedor02@empresa.com', '55-2000-0002', 'Sur', 4.5, 1.5, 'ACTIVE', SYSDATE - 1200, 520, 1300000, 78000, 4),
('Vendedor 03 Apellido 03', 'vendedor03@empresa.com', '55-3000-0003', 'Centro', 6.0, 2.5, 'ACTIVE', SYSDATE - 1000, 680, 1800000, 144000, 6),
('Vendedor 04 Apellido 04', 'vendedor04@empresa.com', '55-4000-0004', 'Este', 4.0, 1.0, 'ACTIVE', SYSDATE - 800, 480, 1200000, 60000, 3),
('Vendedor 05 Apellido 05', 'vendedor05@empresa.com', '55-5000-0005', 'Oeste', 5.5, 2.0, 'INACTIVE', SYSDATE - 2000, 0, 0, 0, 0),
('Vendedor 06 Apellido 06', 'vendedor06@empresa.com', '55-6000-0006', 'Metropolitana', 6.5, 3.0, 'ACTIVE', SYSDATE - 600, 720, 2000000, 190000, 7),
('Vendedor 07 Apellido 07', 'vendedor07@empresa.com', '55-7000-0007', 'Norte', 4.5, 1.5, 'ACTIVE', SYSDATE - 500, 540, 1400000, 81000, 5),
('Vendedor 08 Apellido 08', 'vendedor08@empresa.com', '55-8000-0008', 'Sur', 5.0, 2.0, 'ON_LEAVE', SYSDATE - 400, 0, 0, 0, 0),
('Vendedor 09 Apellido 09', 'vendedor09@empresa.com', '55-9000-0009', 'Centro', 5.5, 2.5, 'ACTIVE', SYSDATE - 300, 600, 1600000, 128000, 6),
('Vendedor 10 Apellido 10', 'vendedor10@empresa.com', '55-0100-0010', 'Este', 4.0, 1.0, 'ACTIVE', SYSDATE - 200, 460, 1100000, 55000, 3),
('Vendedor 11 Apellido 11', 'vendedor11@empresa.com', '55-1100-0011', 'Oeste', 6.0, 3.0, 'ACTIVE', SYSDATE - 100, 660, 1700000, 153000, 5),
('Vendedor 12 Apellido 12', 'vendedor12@empresa.com', '55-1200-0012', 'Metropolitana', 5.0, 2.0, 'ACTIVE', SYSDATE - 50, 560, 1450000, 98000, 4),
('Vendedor 13 Apellido 13', 'vendedor13@empresa.com', '55-1300-0013', 'Norte', 4.5, 1.5, 'ACTIVE', SYSDATE - 25, 500, 1250000, 75000, 4),
('Vendedor 14 Apellido 14', 'vendedor14@empresa.com', '55-1400-0014', 'Sur', 5.5, 2.5, 'ACTIVE', SYSDATE - 15, 620, 1650000, 136000, 6),
('Vendedor 15 Apellido 15', 'vendedor15@empresa.com', '55-1500-0015', 'Centro', 6.0, 3.0, 'ACTIVE', SYSDATE - 10, 700, 1900000, 171000, 7),
('Vendedor 16 Apellido 16', 'vendedor16@empresa.com', '55-1600-0016', 'Este', 4.0, 1.0, 'INACTIVE', SYSDATE - 1900, 0, 0, 0, 0),
('Vendedor 17 Apellido 17', 'vendedor17@empresa.com', '55-1700-0017', 'Oeste', 5.0, 2.0, 'ACTIVE', SYSDATE - 5, 580, 1500000, 105000, 5),
('Vendedor 18 Apellido 18', 'vendedor18@empresa.com', '55-1800-0018', 'Metropolitana', 6.5, 3.5, 'ACTIVE', SYSDATE - 3, 740, 2100000, 203000, 8),
('Vendedor 19 Apellido 19', 'vendedor19@empresa.com', '55-1900-0019', 'Norte', 4.5, 1.5, 'ACTIVE', SYSDATE - 2, 520, 1300000, 78000, 4),
('Vendedor 20 Apellido 20', 'vendedor20@empresa.com', '55-2000-0020', 'Sur', 5.5, 2.5, 'ACTIVE', SYSDATE - 1, 640, 1700000, 144000, 6),
('Vendedor 21 Apellido 21', 'vendedor21@empresa.com', '55-2100-0021', 'Centro', 5.0, 2.0, 'ON_LEAVE', SYSDATE - 800, 0, 0, 0, 0),
('Vendedor 22 Apellido 22', 'vendedor22@empresa.com', '55-2200-0022', 'Este', 6.0, 3.0, 'ACTIVE', SYSDATE, '600', 1600000, 144000, 6),
('Vendedor 23 Apellido 23', 'vendedor23@empresa.com', '55-2300-0023', 'Oeste', 4.5, 1.5, 'ACTIVE', SYSDATE, 540, 1400000, 81000, 5),
('Vendedor 24 Apellido 24', 'vendedor24@empresa.com', '55-2400-0024', 'Metropolitana', 5.5, 2.5, 'ACTIVE', SYSDATE, 620, 1650000, 136000, 6),
('Vendedor 25 Apellido 25', 'vendedor25@empresa.com', '55-2500-0025', 'Norte', 6.0, 3.0, 'ACTIVE', SYSDATE, 680, 1800000, 153000, 7);

COMMIT;

-- ============================================================================
-- 3. INSERTAR DATOS MOCK EN ROUTES (20 registros)
-- ============================================================================
INSERT INTO CO.ROUTES (ROUTE_NAME, DESCRIPTION, GEOGRAPHIC_ZONE, ESTIMATED_TIME, MAX_CAPACITY, STATUS, ASSIGNED_DRIVER, ASSIGNED_DRIVER_ID, CREATION_DATE, TOTAL_DELIVERIES, AVERAGE_DELIVERY_TIME, EFFICIENCY) VALUES
('Ruta 01 - Norte', 'Ruta de entrega para la zona Norte con características especiales.', 'Norte', 180, 25, 'ACTIVE', 'Repartidor 01', 1, SYSDATE - 1000, 450, 175.5, 92.5),
('Ruta 02 - Sur', 'Ruta de entrega para la zona Sur con características especiales.', 'Sur', 240, 30, 'ACTIVE', 'Repartidor 02', 2, SYSDATE - 900, 520, 235.0, 88.0),
('Ruta 03 - Centro', 'Ruta de entrega para la zona Centro con características especiales.', 'Centro', 120, 20, 'ACTIVE', 'Repartidor 03', 3, SYSDATE - 800, 380, 115.0, 95.0),
('Ruta 04 - Este', 'Ruta de entrega para la zona Este con características especiales.', 'Este', 300, 35, 'ACTIVE', 'Repartidor 04', 4, SYSDATE - 700, 600, 290.0, 85.0),
('Ruta 05 - Oeste', 'Ruta de entrega para la zona Oeste con características especiales.', 'Oeste', 200, 28, 'INACTIVE', 'Repartidor 05', 5, SYSDATE - 2000, 0, 0, 0),
('Ruta 06 - Metropolitana', 'Ruta de entrega para la zona Metropolitana con características especiales.', 'Metropolitana', 150, 22, 'ACTIVE', 'Repartidor 06', 6, SYSDATE - 600, 420, 145.0, 93.0),
('Ruta 07 - Periferia', 'Ruta de entrega para la zona Periferia con características especiales.', 'Periferia', 360, 40, 'ACTIVE', 'Repartidor 07', 7, SYSDATE - 500, 720, 350.0, 80.0),
('Ruta 08 - Norte', 'Ruta de entrega para la zona Norte con características especiales.', 'Norte', 180, 25, 'ACTIVE', 'Repartidor 08', 8, SYSDATE - 400, 440, 175.0, 92.0),
('Ruta 09 - Sur', 'Ruta de entrega para la zona Sur con características especiales.', 'Sur', 240, 30, 'MAINTENANCE', 'Repartidor 09', 9, SYSDATE - 300, 0, 0, 0),
('Ruta 10 - Centro', 'Ruta de entrega para la zona Centro con características especiales.', 'Centro', 120, 20, 'ACTIVE', 'Repartidor 10', 10, SYSDATE - 200, 360, 115.0, 95.0),
('Ruta 11 - Este', 'Ruta de entrega para la zona Este con características especiales.', 'Este', 300, 35, 'ACTIVE', 'Repartidor 11', 11, SYSDATE - 100, 580, 285.0, 86.0),
('Ruta 12 - Oeste', 'Ruta de entrega para la zona Oeste con características especiales.', 'Oeste', 200, 28, 'ACTIVE', 'Repartidor 12', 12, SYSDATE - 50, 480, 195.0, 90.0),
('Ruta 13 - Metropolitana', 'Ruta de entrega para la zona Metropolitana con características especiales.', 'Metropolitana', 150, 22, 'ACTIVE', 'Repartidor 13', 13, SYSDATE - 25, 400, 145.0, 93.0),
('Ruta 14 - Periferia', 'Ruta de entrega para la zona Periferia con características especiales.', 'Periferia', 360, 40, 'ACTIVE', 'Repartidor 14', 14, SYSDATE - 15, 700, 345.0, 81.0),
('Ruta 15 - Norte', 'Ruta de entrega para la zona Norte con características especiales.', 'Norte', 180, 25, 'ACTIVE', 'Repartidor 15', 15, SYSDATE - 10, 430, 175.0, 92.0),
('Ruta 16 - Sur', 'Ruta de entrega para la zona Sur con características especiales.', 'Sur', 240, 30, 'INACTIVE', 'Repartidor 16', 16, SYSDATE - 1900, 0, 0, 0),
('Ruta 17 - Centro', 'Ruta de entrega para la zona Centro con características especiales.', 'Centro', 120, 20, 'ACTIVE', 'Repartidor 17', 17, SYSDATE - 5, 370, 115.0, 95.0),
('Ruta 18 - Este', 'Ruta de entrega para la zona Este con características especiales.', 'Este', 300, 35, 'ACTIVE', 'Repartidor 18', 18, SYSDATE - 3, 590, 290.0, 85.0),
('Ruta 19 - Oeste', 'Ruta de entrega para la zona Oeste con características especiales.', 'Oeste', 200, 28, 'ACTIVE', 'Repartidor 19', 19, SYSDATE - 2, 470, 195.0, 90.0),
('Ruta 20 - Metropolitana', 'Ruta de entrega para la zona Metropolitana con características especiales.', 'Metropolitana', 150, 22, 'ACTIVE', 'Repartidor 20', 20, SYSDATE, 410, 145.0, 93.0);

COMMIT;

-- ============================================================================
-- 4. INSERTAR DATOS MOCK EN ADDENDUMS (15 registros)
-- ============================================================================
INSERT INTO CO.ADDENDUMS (CHAIN_ID, ADDENDUM_NAME, SPECIAL_DISCOUNT, CREDIT_DAYS, START_DATE, END_DATE, STATUS, SPECIAL_CONDITIONS, CREATION_DATE, AUTO_RENEWAL, MINIMUM_ORDER_AMOUNT) VALUES
(1, 'Adenda Especial 2024 - Cadena 01', 10.0, 60, SYSDATE - 365, SYSDATE + 365, 'ACTIVE', 'Descuento especial del 10% en pedidos mayores a $50,000', SYSDATE - 365, 'Y', 50000),
(2, 'Adenda Especial 2024 - Cadena 02', 8.0, 45, SYSDATE - 300, SYSDATE + 300, 'ACTIVE', 'Descuento del 8% y crédito extendido a 45 días', SYSDATE - 300, 'Y', 30000),
(3, 'Adenda Especial 2024 - Cadena 03', 12.0, 90, SYSDATE - 200, SYSDATE + 200, 'ACTIVE', 'Descuento del 12% y crédito extendido a 90 días', SYSDATE - 200, 'Y', 100000),
(4, 'Adenda Especial 2024 - Cadena 04', 5.0, 30, SYSDATE - 150, SYSDATE + 150, 'ACTIVE', 'Descuento del 5% en pedidos mayores a $20,000', SYSDATE - 150, 'N', 20000),
(6, 'Adenda Especial 2024 - Cadena 06', 9.0, 60, SYSDATE - 100, SYSDATE + 100, 'ACTIVE', 'Descuento del 9% y crédito extendido a 60 días', SYSDATE - 100, 'Y', 40000),
(8, 'Adenda Especial 2024 - Cadena 08', 15.0, 120, SYSDATE - 50, SYSDATE + 50, 'ACTIVE', 'Descuento del 15% y crédito extendido a 120 días', SYSDATE - 50, 'Y', 150000),
(9, 'Adenda Especial 2024 - Cadena 09', 7.0, 45, SYSDATE - 40, SYSDATE + 40, 'ACTIVE', 'Descuento del 7% en pedidos mayores a $25,000', SYSDATE - 40, 'N', 25000),
(10, 'Adenda Especial 2024 - Cadena 10', 11.0, 75, SYSDATE - 30, SYSDATE + 30, 'ACTIVE', 'Descuento del 11% y crédito extendido a 75 días', SYSDATE - 30, 'Y', 80000),
(12, 'Adenda Especial 2024 - Cadena 12', 10.0, 60, SYSDATE - 20, SYSDATE + 20, 'ACTIVE', 'Descuento del 10% y crédito extendido a 60 días', SYSDATE - 20, 'Y', 60000),
(13, 'Adenda Especial 2024 - Cadena 13', 6.0, 30, SYSDATE - 15, SYSDATE + 15, 'ACTIVE', 'Descuento del 6% en pedidos mayores a $30,000', SYSDATE - 15, 'N', 30000),
(14, 'Adenda Especial 2024 - Cadena 14', 9.0, 60, SYSDATE - 10, SYSDATE + 10, 'ACTIVE', 'Descuento del 9% y crédito extendido a 60 días', SYSDATE - 10, 'Y', 50000),
(16, 'Adenda Especial 2024 - Cadena 16', 13.0, 90, SYSDATE - 5, SYSDATE + 5, 'ACTIVE', 'Descuento del 13% y crédito extendido a 90 días', SYSDATE - 5, 'Y', 120000),
(17, 'Adenda Especial 2024 - Cadena 17', 8.0, 45, SYSDATE - 3, SYSDATE + 3, 'ACTIVE', 'Descuento del 8% en pedidos mayores a $35,000', SYSDATE - 3, 'N', 35000),
(18, 'Adenda Especial 2023 - Cadena 18', 10.0, 60, SYSDATE - 400, SYSDATE - 100, 'EXPIRED', 'Adenda expirada - Descuento del 10%', SYSDATE - 400, 'N', 50000),
(21, 'Adenda Especial 2024 - Cadena 21', 14.0, 105, SYSDATE, SYSDATE + 365, 'ACTIVE', 'Descuento del 14% y crédito extendido a 105 días', SYSDATE, 'Y', 180000);

COMMIT;

-- ============================================================================
-- 5. INSERTAR DATOS MOCK EN ORDER_CHANNELS (8 registros)
-- ============================================================================
INSERT INTO CO.ORDER_CHANNELS (CHANNEL_NAME, CHANNEL_TYPE, DESCRIPTION, STATUS, TOTAL_ORDERS, CONVERSION_RATE, AVERAGE_ORDER_VALUE, CREATION_DATE, LAST_ORDER_DATE, ORDERS_TODAY, ORDERS_THIS_MONTH, EFFICIENCY) VALUES
('App Móvil iOS', 'MOBILE', 'Aplicación móvil para dispositivos iOS', 'ACTIVE', 850, 75.5, 2500.00, SYSDATE - 1000, SYSDATE, 12, 180, 92.0),
('App Móvil Android', 'MOBILE', 'Aplicación móvil para dispositivos Android', 'ACTIVE', 1200, 78.0, 2300.00, SYSDATE - 950, SYSDATE, 18, 240, 94.0),
('Call Center', 'CALL_CENTER', 'Centro de llamadas para recepción de pedidos', 'ACTIVE', 650, 65.0, 2800.00, SYSDATE - 900, SYSDATE - 1, 8, 130, 88.0),
('Email', 'EMAIL', 'Recepción de pedidos por correo electrónico', 'ACTIVE', 320, 55.0, 2100.00, SYSDATE - 800, SYSDATE - 2, 3, 64, 82.0),
('Portal Web', 'WEB', 'Portal web para pedidos en línea', 'ACTIVE', 980, 72.0, 2700.00, SYSDATE - 700, SYSDATE, 15, 196, 90.0),
('App Móvil Windows', 'MOBILE', 'Aplicación móvil para dispositivos Windows', 'INACTIVE', 0, 0, 0, SYSDATE - 600, NULL, 0, 0, 0),
('WhatsApp Business', 'MOBILE', 'Canal de pedidos a través de WhatsApp Business', 'ACTIVE', 450, 68.0, 1900.00, SYSDATE - 500, SYSDATE, 6, 90, 85.0),
('Telegram Bot', 'MOBILE', 'Bot de Telegram para recepción de pedidos', 'MAINTENANCE', 0, 0, 0, SYSDATE - 400, NULL, 0, 0, 0);

COMMIT;

-- ============================================================================
-- 6. INSERTAR DATOS MOCK EN INVOICES (100 registros - basados en órdenes existentes)
-- ============================================================================
-- Nota: Este script asume que existen órdenes en CO.ORDERS
-- Se generan facturas para las primeras 100 órdenes
INSERT INTO CO.INVOICES (ORDER_ID, FOLIO, UUID, ISSUER_RFC, RECEIVER_RFC, ISSUE_DATE, SUBTOTAL, TAX, TOTAL, STATUS, PAYMENT_METHOD, PAYMENT_FORM, CURRENCY)
SELECT 
    O.ORDER_ID,
    'FAC-' || LPAD(O.ORDER_ID, 8, '0') AS FOLIO,
    SYS_GUID() AS UUID,
    'RFCEMPRESA123' AS ISSUER_RFC,
    'RFC' || LPAD(O.CUSTOMER_ID, 10, '0') AS RECEIVER_RFC,
    O.ORDER_TMS AS ISSUE_DATE,
    NVL(SUM(OI.SUBTOTAL), 0) AS SUBTOTAL,
    NVL(SUM(OI.TAX), 0) AS TAX,
    NVL(SUM(OI.TOTAL), 0) AS TOTAL,
    CASE 
        WHEN O.ORDER_STATUS = 'COMPLETE' THEN 'STAMPED'
        WHEN O.ORDER_STATUS = 'CANCELLED' THEN 'CANCELLED'
        ELSE 'DRAFT'
    END AS STATUS,
    'PUE' AS PAYMENT_METHOD,
    '03' AS PAYMENT_FORM,
    'MXN' AS CURRENCY
FROM CO.ORDERS O
LEFT JOIN CO.ORDER_ITEMS OI ON O.ORDER_ID = OI.ORDER_ID
WHERE O.ORDER_ID <= 100
GROUP BY O.ORDER_ID, O.ORDER_TMS, O.ORDER_STATUS, O.CUSTOMER_ID;

COMMIT;

-- ============================================================================
-- 7. INSERTAR DATOS MOCK EN CHAIN_SALESPERSON (Relaciones)
-- ============================================================================
-- Asignar vendedores a cadenas (relaciones muchos a muchos)
INSERT INTO CO.CHAIN_SALESPERSON (CHAIN_ID, SALESPERSON_ID, ASSIGNED_DATE, IS_PRIMARY) VALUES
(1, 1, SYSDATE - 1800, 'Y'),
(1, 2, SYSDATE - 1700, 'N'),
(2, 2, SYSDATE - 1500, 'Y'),
(2, 3, SYSDATE - 1400, 'N'),
(3, 3, SYSDATE - 1200, 'Y'),
(3, 4, SYSDATE - 1100, 'N'),
(3, 5, SYSDATE - 1000, 'N'),
(4, 4, SYSDATE - 900, 'Y'),
(6, 6, SYSDATE - 800, 'Y'),
(6, 7, SYSDATE - 700, 'N'),
(8, 8, SYSDATE - 500, 'Y'),
(8, 9, SYSDATE - 400, 'N'),
(8, 10, SYSDATE - 300, 'N'),
(9, 9, SYSDATE - 400, 'Y'),
(10, 10, SYSDATE - 300, 'Y'),
(10, 11, SYSDATE - 200, 'N'),
(12, 12, SYSDATE - 200, 'Y'),
(12, 13, SYSDATE - 100, 'N'),
(13, 13, SYSDATE - 100, 'Y'),
(14, 14, SYSDATE - 50, 'Y'),
(14, 15, SYSDATE - 40, 'N'),
(16, 15, SYSDATE - 25, 'Y'),
(16, 16, SYSDATE - 20, 'N'),
(17, 17, SYSDATE - 15, 'Y'),
(18, 18, SYSDATE - 10, 'Y'),
(19, 19, SYSDATE - 5, 'Y'),
(19, 20, SYSDATE - 3, 'N'),
(21, 18, SYSDATE - 3, 'Y'),
(21, 19, SYSDATE - 2, 'N'),
(22, 22, SYSDATE - 2, 'Y'),
(23, 23, SYSDATE - 1, 'Y'),
(24, 24, SYSDATE, 'Y'),
(25, 25, SYSDATE, 'Y');

COMMIT;

-- ============================================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================================================
SELECT 'CHAINS' AS TABLA, COUNT(*) AS REGISTROS FROM CO.CHAINS
UNION ALL
SELECT 'SALESPERSONS', COUNT(*) FROM CO.SALESPERSONS
UNION ALL
SELECT 'ROUTES', COUNT(*) FROM CO.ROUTES
UNION ALL
SELECT 'ADDENDUMS', COUNT(*) FROM CO.ADDENDUMS
UNION ALL
SELECT 'ORDER_CHANNELS', COUNT(*) FROM CO.ORDER_CHANNELS
UNION ALL
SELECT 'INVOICES', COUNT(*) FROM CO.INVOICES
UNION ALL
SELECT 'CHAIN_SALESPERSON', COUNT(*) FROM CO.CHAIN_SALESPERSON;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
