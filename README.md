# Odontobot

Odontobot es un proyecto diseñado para apoyar las habilidades y competencias de los estudiantes de la carrera de Odontologia de la Universidad Valparaíso. Este repositorio contiene el código fuente y la documentación necesaria para implementar y utilizar el sistema.

## Características

- **Interactividad**: Permite a los usuarios interactuar con un chatbot para obtener información sobre temas dentales.
- **Tecnología avanzada**: Utiliza [tecnologías Node.js, Angular y MySQL para brindar una experiencia fluida y eficiente.
- **Base de datos integrada**: Se almacena información sobre pacientes y casos clínicos en una base de datos MySQL.
- **Accesibilidad**: Diseñado para ser accesible desde diferentes dispositivos, incluyendo móviles y de escritorio.
- **Actualizaciones en tiempo real**: [Si aplicable, menciona cómo se actualizan los datos o información en tiempo real].
  
## Requisitos del Sistema

Node.js: v14 o superior
NPM: v6 o superior
Angular CLI: v16.0.0 o compatible
Navegador: Última versión de Chrome, Firefox, Safari o Edge
Sistema Operativo: Linux, macOS o Windows

## Dependencias Clave Frontend:
- Angular: Utiliza Angular 14, que requiere Node.js y npm específicos.
- Cypress: Para pruebas end-to-end.

## Backend
- Express: Framework para construir aplicaciones web.
- MySQL: Base de datos relacional.
- Nodemon: Para reiniciar automáticamente el servidor durante el desarrollo.
- Mocha: Framework de pruebas.

### Paso a Paso de Instalación

1. **Clonar el Repositorio**

   Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone https://github.com/AndresLopez420/Odontobot_Proyecto.git
   ```

2. **Navegar al Directorio del Proyecto**

   Cambia al directorio del proyecto:

   ```bash
   cd Odontobot_Proyecto
   ```

3. **Instalar Dependencias**

   Instala las dependencias necesarias utilizando npm:

   ```bash
   npm install
   ```

4. **Configurar la Base de Datos MySQL**

   - Crea una base de datos en MySQL con el nombre que prefieras (por ejemplo, `odontobot`).
   - Importa cualquier archivo SQL que tengas para crear las tablas necesarias (si corresponde).
   - Asegúrate de actualizar la configuración de conexión a la base de datos en el archivo de configuración del proyecto (por ejemplo, `config.js` o similar).

5. **Iniciar el Servidor**

   Una vez que todo esté configurado, inicia el servidor con el siguiente comando:

   ```bash
   npm start
   ```

6. **Acceder a la Aplicación**

   Abre tu navegador y visita `http://localhost:4200` (o el puerto que hayas configurado) para acceder a la aplicación.

   Este proyecto está bajo la Licencia del **Universidad de Valparaíso, Escuela de Ingeniería Civil Informática**. Se permite el uso, modificación y distribución del código bajo las siguientes condiciones:

- El uso del código debe ser exclusivamente para fines académicos.
- Cualquier modificación o mejora realizada debe ser documentada y comunicada a la comunidad de la Universidad de Valparaíso.