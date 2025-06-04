# Simulador de Propagación de la Cochinilla en Cultivos de Olivo

Este proyecto es un simulador de propagación de la cochinilla que permite visualizar y analizar el comportamiento de la cochinilla en cultivos de olivo. Está compuesto por un **frontend** desarrollado en React y un **backend** desarrollado en Python y desplegable mediante Docker.

---

## 🚀 Puesta en marcha

### 🧠 Requisitos

- Tener instalado [Docker](https://www.docker.com)
- Tener instalado [Node.js y npm](https://nodejs.org/)


### Backend

Para ejecutar el backend del simulador localmente:

1. Asegúrese de tener Docker instalado.
2. Abra una terminal y ejecute el siguiente comando para descargar la imagen desde Docker Hub:

   ```bash
   docker pull tomiimonn/backend-sim-tfi:latest

3. Una vez descargada la imagen, cree y ejecute un contenedor utilizando el siguiente comando:
    ```bash
    docker run -d -p 8080:80 tomiimonn/backend-sim-tfi
Esto levantará el servicio del backend en el puerto 8080 de su máquina local, dejándolo disponible para su uso inmediato.

### Frontend

Una vez iniciado el backend, es posible ejecutar la interfaz web del simulador siguiendo estos pasos:

1. Acceda al repositorio del cliente desde el siguiente enlace: [client-simulacion](https://github.com/milagrossachetti/client-simulacion.git)
2. Haga clic en el botón “Code” y seleccione la opción “Download ZIP”. Una vez descargado el archivo, descomprímalo en su sistema local.
3. A través de una terminal, diríjase al directorio raíz del proyecto frontend descomprimido.
4. Ejecute el siguiente comando para iniciar la aplicación (requiere tener Node.js y npm previamente instalados):
    ```bash
    npm run dev
5. Una vez iniciado el servidor de desarrollo, acceda al enlace que se muestra en la consola (habitualmente http://localhost:5173 o similar) para interactuar con el simulador.







