# README - Microservicio de Paquetería

## Descripción

Este proyecto es un microservicio de paquetería que proporciona diversas funcionalidades para gestionar paquetes. Las principales características del microservicio incluyen la creación de paquetes, el cálculo del costo de envío, la actualización del estado de los paquetes, la obtención de todos los paquetes, y la eliminación y actualización de los datos de los paquetes. El sistema está diseñado para ser altamente escalable y eficiente, utilizando brokers de MQTT y colas de comunicación entre microservicios.

## Funcionalidades

1. **Crear Paquetes**: Permite la creación de un nuevo paquete con detalles específicos como el peso, dimensiones, dirección de origen y destino, entre otros.
2. **Calcular Costo de Envío**: Calcula el costo de envío basado en el peso, dimensiones y la distancia entre el origen y el destino.
3. **Actualizar Estado de Paquetes**: Actualiza el estado del paquete en el sistema (por ejemplo, en tránsito, entregado, etc.).
4. **Obtener Todos los Paquetes**: Recupera una lista de todos los paquetes registrados en el sistema.
5. **Eliminar Paquetes**: Permite la eliminación de paquetes del sistema.
6. **Actualizar Datos de Paquetes**: Permite la actualización de la información de un paquete existente.

## Tecnologías Utilizadas

- **Lenguaje de Programación**: TypeScript
- **Broker de Mensajería**: MQTT
- **Colas de Mensajería**: RabbitMQ/Kafka
- **Base de Datos**: MySQL/PostgreSQL/MongoDB
- **Framework Web**: Express
- **CI/CD**: Jenkins/GitHub Actions/GitLab CI

## Instalación

1. Clone el repositorio:
    ```bash
    git clone https://github.com/Gsuscrist/SOA-90minutos-colaborative-proyect-package-microservice
    cd SOA-90minutos-colaborative-proyect-package-microservice
    ```

2. Instale las dependencias:
    ```bash
    npm install
    ```
> **Warning**: Asegúrese de configurar correctamente las variables de entorno antes de iniciar el servicio.
> Cree un archivo .env con las credenciales de base de datos, apikey de google maps, colas y datos de broker(s)
> Para conectarse al servicio de aws debes tener instalado AWS CLI y configurar las credenciales de acceso

  ```bash
    aws -- version
    aws configure()
    secretKey=*****
    publicKey=*****
    region= *****
  ```

3. Configure las variables de entorno necesarias en un archivo `.env`.

## Uso

1. Compile el código TypeScript a JavaScript:
    ```bash
    npm run build
    npm run start
    ```
3. Inicie el servicio:
    ```bash
    npm start
    ```
   Para el modo de desarrollo:
   moda desarrollo, con watch para analizar los cambios y auto compilación tras cambios
   ```bash
    npm run dev
    ```

4. Acceda a la colección de Postman para probar los endpoints localmente. El enlace a la colección de Postman es [Postman Collection](http://localhost:3000/postman-collection).

## Endpoints

- **Crear Paquete**: `POST /`
- **Actualizar Estado de Paquete**: `PATCH /package/v1/updateStatus`
- **Obtener Todos los Paquetes**: `GET /package/v1/get`
- **Eliminar Paquete**: `DELETE /package/v1/get/:id`
- **Actualizar Datos de Paquete**: `PUT /pakage/:id`

## Desarrollo y CI/CD

Este proyecto sigue los principios de CI/CD para asegurar una integración y entrega continuas. Cada commit dispara un pipeline de Jenkins/GitHub Actions/GitLab CI que realiza pruebas automatizadas, análisis de código y despliegue.


## Contribución

Para contribuir al proyecto, por favor, siga los siguientes pasos:

1. Haga un fork del repositorio.
2. Cree una rama nueva (`git checkout -b feature-nueva-funcionalidad`).
3. Realice los cambios necesarios y haga commit (`git commit -am '[etiqueta]Añadida nueva funcionalidad'`)(etiquetas como add, fix, clean).
4. Haga push a la rama (`git push origin feature-nueva-funcionalidad`).
5. Cree un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo `LICENSE` para más detalles.

## Collección de postman.
https://documenter.getpostman.com/view/32558223/2sA3XY7J1o#a369ce1d-8acd-4af8-8f01-ddf1b504379f

> **Warning**: Algunos endpoints cambiaran debido a que solo seran accesibles a traves de la api GATEWAY
