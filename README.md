# TrackEval - Evaluacion de seguimiento

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
</p>

## Tabla de Contenido

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)

## Descripción


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Un clon de Kahoot que permite la gestión de cuestionarios, administración de usuarios y juegos en tiempo real.

## Características

- CRUD para cuestionarios.
- Gestión de usuarios con autenticación JWT y roles.
- Módulo de juego en tiempo real utilizando WebSockets.
- Despliegue fácil con Docker.

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [TypeORM](https://typeorm.io/)

## Instalación

1. Clona el repositorio:
   ```ps
   $ git clone https://github.com/danny0406/TrackEval-NestJS_Project.git
   $ cd TrackEval-NestJS_Project
   ```

2. Instalar las dependencias necesarias:

   ```ps
   $ npm install
   ```

3. Crea un archivo **`.env`** basado en el archivo **`.env.example`** y configura las variables de entorno.

4. Construye y levanta los contenedores Docker:
   ```ps
    $ docker compose up -d
   ```

5. La aplicación estará disponible en **http://localhost:5005**

    ***Observacion:***
El puerto dependera del asignado en la variable de entorno`NODE_PORT=`**`5005`** del archivo `.env`


## Uso
Instrucciones básicas para usar la aplicación.


- Accede a `http://localhost:5005/api` para ver la documentación de la API generada con Swagger.
- Utiliza las rutas de la API para gestionar cuestionarios.
- Para usar los eventos de websockets debe usar la herramienta de *Postman* u otra con la cual pueda simular al cliente.

