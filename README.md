Barbería - Sistema de Gestión de Turnos

Descripción del proyecto

Este proyecto consiste en el desarrollo de un sistema backend para una barbería, orientado a la gestión de sus servicios y preparado para incorporar funcionalidades de turnos y reservas.

El objetivo es desarrollar una aplicación que permita administrar los servicios que ofrece la barbería, consultar sus características, agregar nuevos servicios, modificar su información y eliminarlos.

Cada servicio contará con un identificador, nombre, descripción, duración, precio, categoría y disponibilidad.

Tecnologías utilizadas

* Node.js v24: entorno de ejecución que permite ejecutar JavaScript del lado del servidor.
* JavaScript: lenguaje utilizado para desarrollar la lógica de la aplicación.
* ES Modules (ESM): sistema de módulos que permite organizar el código mediante import y export.
* dotenv: dependencia utilizada para gestionar las variables de entorno.
* JSON: formato utilizado para almacenar inicialmente los datos de los servicios.
* npm: administrador de paquetes utilizado para instalar dependencias y ejecutar scripts.
* Git y GitHub: herramientas utilizadas para el control de versiones y el almacenamiento del proyecto.

Requisitos

Para ejecutar el proyecto se necesita:

* Node.js v24.
* npm.
* Visual Studio Code (recomendado).

Instalación

1. Clonar el repositorio:

git clone URL_DEL_REPOSITORIO

2. Ingresar a la carpeta del proyecto:

cd turnero-backend

3. Instalar las dependencias:

npm install

4. Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=8080
NODE_ENV=development

Ejecución

Para iniciar la aplicación, ejecutar:

npm start

Variables de entorno

El proyecto requiere las siguientes variables de entorno, definidas en el archivo .env.example:

Variable	Descripción
PORT	Puerto en el que se ejecutará la aplicación.
NODE_ENV	Entorno de ejecución de la aplicación.

El archivo .env contiene la configuración local y no debe subirse al repositorio.

Recurso: Services

El recurso services representa los servicios que ofrece la barbería.

Cada servicio tendrá la siguiente estructura:

* id: identificador único del servicio.
* name: nombre del servicio.
* description: descripción del servicio.
* duration: duración estimada en minutos.
* price: precio del servicio.
* category: categoría del servicio.
* available: disponibilidad del servicio.

Métodos de ServiceManager

La clase ServiceManager permitirá gestionar los servicios mediante los siguientes métodos:

* getServices(): obtiene todos los servicios disponibles.
* getServiceById(id): busca un servicio por su identificador.
* addService(serviceData): agrega un nuevo servicio y genera automáticamente su identificador.
* updateService(id, updatedData): actualiza la información de un servicio existente.
* deleteService(id): elimina un servicio existente.

Autor

Proyecto realizado como parte de la formación en Programación Backend 1 - Coderhouse.