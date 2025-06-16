USE [db_odontobot]
GO
/****** Object:  Table [dbo].[administrador]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[administrador](
	[id_admin] [int] NOT NULL,
	[nombre_admin] [varchar](255) NULL,
	[apellidom_admin] [varchar](255) NULL,
	[apellidop_admin] [varchar](255) NULL,
	[correo_admin] [varchar](255) NULL,
	[password_admin] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_admin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[caso_clinico]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[caso_clinico](
	[id_caso] [int] NOT NULL,
	[id_profesor] [int] NULL,
	[nombre_caso] [varchar](255) NULL,
	[dificultad] [varchar](255) NULL,
	[instancia] [varchar](255) NULL,
	[modulo] [varchar](255) NULL,
	[clase] [varchar](255) NULL,
	[patologia] [varchar](255) NULL,
	[motivo_consulta] [text] NULL,
	[ultima_visita] [date] NULL,
	[anamnesis_proxima] [text] NULL,
	[anamnesis_remota] [text] NULL,
	[examenes] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_caso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat](
	[id_chat] [int] NOT NULL,
	[id_pv] [int] NULL,
	[id_estudiante] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_chat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudiante]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudiante](
	[id_estudiante] [int] NOT NULL,
	[rut_est] [varchar](20) NULL,
	[nombre_est] [varchar](255) NULL,
	[apellidom_est] [varchar](255) NULL,
	[apellidop_est] [varchar](255) NULL,
	[correo_est] [varchar](255) NULL,
	[password_est] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_estudiante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grupo]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grupo](
	[id_grupo] [int] NOT NULL,
	[id_profesor] [int] NULL,
	[num_integrantes] [int] NULL,
	[integrantes] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_grupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[historial]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[historial](
	[id_historial] [int] NOT NULL,
	[id_estudiante] [int] NULL,
	[total_ev] [int] NULL,
	[tasa_aprobacion] [float] NULL,
	[total_practicas] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_historial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[instancia]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[instancia](
	[id_instancia] [int] NOT NULL,
	[id_profesor] [int] NULL,
	[id_pv] [int] NULL,
	[nombre_instancia] [varchar](255) NULL,
	[tipo_instancia] [varchar](255) NULL,
	[descripcion] [text] NULL,
	[practicas_minimas] [int] NULL,
	[intentos] [int] NULL,
	[entrega] [date] NULL,
	[estado] [varchar](255) NULL,
	[modalidad] [varchar](255) NULL,
	[fecha_inicio] [date] NULL,
	[fecha_termino] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_instancia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mensaje]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mensaje](
	[id_mensaje] [int] NOT NULL,
	[id_chat] [int] NULL,
	[contenido_mensaje] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_mensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[paciente_virtual]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[paciente_virtual](
	[id_pv] [int] NOT NULL,
	[id_caso] [int] NULL,
	[nombre_pv] [varchar](255) NULL,
	[fecha_nacimiento] [date] NULL,
	[nacionalidad] [varchar](255) NULL,
	[telefono] [varchar](20) NULL,
	[actividad] [varchar](255) NULL,
	[genero] [varchar](20) NULL,
	[direccion] [varchar](255) NULL,
	[rut_pv] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profesor]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profesor](
	[id_profesor] [int] NOT NULL,
	[nombre_profesor] [varchar](255) NULL,
	[apellidom_profesor] [varchar](255) NULL,
	[apellidop_profesor] [varchar](255) NULL,
	[rut_profesor] [varchar](20) NULL,
	[correo_profesor] [varchar](255) NULL,
	[password_profesor] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_profesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[retroalimentacion]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[retroalimentacion](
	[id_retroal] [int] NOT NULL,
	[id_profesor] [int] NULL,
	[id_chat] [int] NULL,
	[comentario_general] [text] NULL,
	[comentario_esp] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_retroal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rubrica]    Script Date: 14-08-2024 2:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rubrica](
	[id_rubrica] [int] NOT NULL,
	[id_caso] [int] NULL,
	[criterio_ev] [varchar](255) NULL,
	[puntaje] [int] NULL,
	[calidad_insuficiente] [int] NULL,
	[calidad_regular] [int] NULL,
	[calidad_bueno] [int] NULL,
	[calidad_excelente] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_rubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[caso_clinico]  WITH CHECK ADD FOREIGN KEY([id_profesor])
REFERENCES [dbo].[profesor] ([id_profesor])
GO
ALTER TABLE [dbo].[chat]  WITH CHECK ADD FOREIGN KEY([id_estudiante])
REFERENCES [dbo].[estudiante] ([id_estudiante])
GO
ALTER TABLE [dbo].[chat]  WITH CHECK ADD FOREIGN KEY([id_pv])
REFERENCES [dbo].[paciente_virtual] ([id_pv])
GO
ALTER TABLE [dbo].[grupo]  WITH CHECK ADD FOREIGN KEY([id_profesor])
REFERENCES [dbo].[profesor] ([id_profesor])
GO
ALTER TABLE [dbo].[historial]  WITH CHECK ADD FOREIGN KEY([id_estudiante])
REFERENCES [dbo].[estudiante] ([id_estudiante])
GO
ALTER TABLE [dbo].[instancia]  WITH CHECK ADD FOREIGN KEY([id_profesor])
REFERENCES [dbo].[profesor] ([id_profesor])
GO
ALTER TABLE [dbo].[instancia]  WITH CHECK ADD FOREIGN KEY([id_pv])
REFERENCES [dbo].[paciente_virtual] ([id_pv])
GO
ALTER TABLE [dbo].[mensaje]  WITH CHECK ADD FOREIGN KEY([id_chat])
REFERENCES [dbo].[chat] ([id_chat])
GO
ALTER TABLE [dbo].[paciente_virtual]  WITH CHECK ADD FOREIGN KEY([id_caso])
REFERENCES [dbo].[caso_clinico] ([id_caso])
GO
ALTER TABLE [dbo].[retroalimentacion]  WITH CHECK ADD FOREIGN KEY([id_chat])
REFERENCES [dbo].[chat] ([id_chat])
GO
ALTER TABLE [dbo].[retroalimentacion]  WITH CHECK ADD FOREIGN KEY([id_profesor])
REFERENCES [dbo].[profesor] ([id_profesor])
GO
ALTER TABLE [dbo].[rubrica]  WITH CHECK ADD FOREIGN KEY([id_caso])
REFERENCES [dbo].[caso_clinico] ([id_caso])
GO
