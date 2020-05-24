-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-05-23 00:09:57.097

-- tables
-- Table: excurcion
CREATE TABLE excurcion (
    plan_id_plan int NOT NULL,
    name varchar(30) NOT NULL,
    tipo_excurcion varchar(30) NOT NULL,
    CONSTRAINT excurcion_pk PRIMARY KEY (plan_id_plan)
);

-- Table: hospedaje
CREATE TABLE hospedaje (
    plan_id_plan int NOT NULL,
    direccion varchar(30) NOT NULL,
    tipo_hospedaje varchar(30) NOT NULL,
    CONSTRAINT hospedaje_pk PRIMARY KEY (plan_id_plan)
);

-- Table: plan
CREATE TABLE plan (
    id_plan int NOT NULL,
    categoria char(1) NOT NULL,
    travel_id_travel int NOT NULL,
    ciudad_origen varchar(30) NOT NULL,
    fecha_comienzo date NOT NULL,
    fecha_fin date NOT NULL,
    CONSTRAINT plan_pk PRIMARY KEY (id_plan)
);

-- Table: transporte
CREATE TABLE transporte (
    plan_id_plan int NOT NULL,
    destino varchar(30) NOT NULL,
    tipo_transporte varchar(30) NOT NULL,
    CONSTRAINT transporte_pk PRIMARY KEY (plan_id_plan)
);

-- Table: traslado_principal
CREATE TABLE traslado_principal (
    id_transporte int NOT NULL,
    numero_vuelo int NULL,
    compania_aerea varchar(30) NULL,
    transbordo varchar(30) NULL,
    asiento int NULL,
    codigo_reserva int NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    ciudad_origen varchar(30) NOT NULL,
    ciudad_destino varchar(30) NOT NULL,
    CONSTRAINT traslado_principal_pk PRIMARY KEY (id_transporte)
);

-- Table: travel
CREATE TABLE travel (
    id_travel int NOT NULL,
    nombre varchar(30) NOT NULL,
    descripcion text NOT NULL,
    usuario_id_usuario int NOT NULL,
    transporte_principal_id_transporte int NOT NULL,
    CONSTRAINT travel_pk PRIMARY KEY (id_travel)
);

-- Table: usuario
CREATE TABLE usuario (
    id_usuario int NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    nombre_usuario varchar(30) NOT NULL,
    password char(30) NOT NULL,
    is_premium bool NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);

-- foreign keys
-- Reference: alojamiento_plan (table: hospedaje)
ALTER TABLE hospedaje ADD CONSTRAINT alojamiento_plan FOREIGN KEY alojamiento_plan (plan_id_plan)
    REFERENCES plan (id_plan);

-- Reference: excurcion_plan (table: excurcion)
ALTER TABLE excurcion ADD CONSTRAINT excurcion_plan FOREIGN KEY excurcion_plan (plan_id_plan)
    REFERENCES plan (id_plan);

-- Reference: plan_travel (table: plan)
ALTER TABLE plan ADD CONSTRAINT plan_travel FOREIGN KEY plan_travel (travel_id_travel)
    REFERENCES travel (id_travel);

-- Reference: translado_plan (table: transporte)
ALTER TABLE transporte ADD CONSTRAINT translado_plan FOREIGN KEY translado_plan (plan_id_plan)
    REFERENCES plan (id_plan);

-- Reference: travel_transporte_principal (table: travel)
ALTER TABLE travel ADD CONSTRAINT travel_transporte_principal FOREIGN KEY travel_transporte_principal (transporte_principal_id_transporte)
    REFERENCES traslado_principal (id_transporte);

-- Reference: travel_usuario (table: travel)
ALTER TABLE travel ADD CONSTRAINT travel_usuario FOREIGN KEY travel_usuario (usuario_id_usuario)
    REFERENCES usuario (id_usuario);

-- End of file.

