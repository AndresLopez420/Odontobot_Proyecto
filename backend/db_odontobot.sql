CREATE DATABASE db_odontobot;

USE db_odontobot;

-- Creación de la tabla usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    rut VARCHAR(20) UNIQUE NOT NULL,  -- RUT sin puntos, guiones ni dígito verificador
    password VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'profesor', 'estudiante') NOT NULL
);

-- Creación de la tabla administrador
CREATE TABLE administrador (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nombre_admin VARCHAR(255),
    apellidom_admin VARCHAR(255),
    apellidop_admin VARCHAR(255),
    rut VARCHAR(20) UNIQUE NOT NULL,  -- RUT sin puntos, guiones ni dígito verificador
    FOREIGN KEY (rut) REFERENCES usuarios(rut) ON DELETE CASCADE
);

-- Creación de la tabla profesor
CREATE TABLE profesor (
    id_profesor INT PRIMARY KEY AUTO_INCREMENT,
    nombre_profesor VARCHAR(255),
    apellidom_profesor VARCHAR(255),
    apellidop_profesor VARCHAR(255),
    rut VARCHAR(20) UNIQUE NOT NULL,  -- RUT sin puntos, guiones ni dígito verificador
    FOREIGN KEY (rut) REFERENCES usuarios(rut) ON DELETE CASCADE
);

-- Creación de la tabla estudiante
CREATE TABLE estudiante (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    rut VARCHAR(20) UNIQUE NOT NULL,  -- RUT sin puntos, guiones ni dígito verificador
    nombre_est VARCHAR(255),
    apellidom_est VARCHAR(255),
    apellidop_est VARCHAR(255),
    FOREIGN KEY (rut) REFERENCES usuarios(rut) ON DELETE CASCADE
);

-- Creación de la tabla grupo
CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    id_profesor INT,
    num_integrantes INT,
    integrantes TEXT,
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor)
);

-- Creación de la tabla caso_clinico
CREATE TABLE caso_clinico (
    id_caso INT PRIMARY KEY AUTO_INCREMENT,
    id_profesor INT,
    nombre_caso VARCHAR(255),
    dificultad VARCHAR(255),
    instancia VARCHAR(255),
    modulo VARCHAR(255),
    clase VARCHAR(255),
    patologia VARCHAR(255),
    motivo_consulta TEXT,
    ultima_visita DATE,
    anamnesis_proxima TEXT,
    anamnesis_remota TEXT,
    examenes TEXT,
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor)
);

ALTER TABLE caso_clinico ADD COLUMN id_instancia INT;
ALTER TABLE caso_clinico ADD FOREIGN KEY (id_instancia) REFERENCES instancia(id_instancia);


-- Creación de la tabla paciente_virtual
CREATE TABLE paciente_virtual (
    id_pv INT PRIMARY KEY AUTO_INCREMENT,
    id_caso INT,
    nombre_pv VARCHAR(255),
    fecha_nacimiento DATE,
    nacionalidad VARCHAR(255),
    telefono VARCHAR(20),
    actividad VARCHAR(255),
    genero VARCHAR(20),
    direccion VARCHAR(255),
    rut VARCHAR(20),  -- RUT sin puntos, guiones ni dígito verificador
    FOREIGN KEY (id_caso) REFERENCES caso_clinico(id_caso)
);

-- Creación de la tabla instancia
CREATE TABLE instancia (
    id_instancia INT PRIMARY KEY AUTO_INCREMENT,
    id_profesor INT,
    id_pv INT,
    nombre_instancia VARCHAR(255),
    tipo_instancia VARCHAR(255),
    descripcion TEXT,
    practicas_minimas INT,
    intentos INT,
    entrega DATE,
    estado VARCHAR(255),
    modalidad VARCHAR(255),
    fecha_inicio DATE,
    fecha_termino DATE,
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor),
    FOREIGN KEY (id_pv) REFERENCES paciente_virtual(id_pv)
);

ALTER TABLE instancia ADD COLUMN id_caso INT;
ALTER TABLE instancia ADD FOREIGN KEY (id_caso) REFERENCES caso_clinico(id_caso);


-- Creación de la tabla chat
CREATE TABLE chat (
    id_chat INT PRIMARY KEY AUTO_INCREMENT,
    id_pv INT,
    id_estudiante INT,
    FOREIGN KEY (id_pv) REFERENCES paciente_virtual(id_pv),
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante)
);

-- Creación de la tabla mensaje
CREATE TABLE mensaje (
    id_mensaje INT PRIMARY KEY AUTO_INCREMENT,
    id_chat INT,
    contenido_mensaje TEXT,
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat)
);

-- Creación de la tabla historial
CREATE TABLE historial (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante INT,
    total_ev INT,
    tasa_aprobacion FLOAT,
    total_practicas INT,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante)
);

-- Creación de la tabla retroalimentacion
CREATE TABLE retroalimentacion (
    id_retroal INT PRIMARY KEY AUTO_INCREMENT,
    id_profesor INT,
    id_chat INT,
    comentario_general TEXT,
    comentario_esp TEXT,
    FOREIGN KEY (id_profesor) REFERENCES profesor(id_profesor),
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat)
);

-- Creación de la tabla rubrica
CREATE TABLE rubrica (
    id_rubrica INT PRIMARY KEY AUTO_INCREMENT,
    id_caso INT,
    criterio_ev VARCHAR(255),
    puntaje INT,
    calidad_insuficiente INT,
    calidad_regular INT,
    calidad_bueno INT,
    calidad_excelente INT,
    FOREIGN KEY (id_caso) REFERENCES caso_clinico(id_caso)
);
