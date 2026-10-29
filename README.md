# Administrador de Servicios (Turnos y Reservas)

Proyecto backend en Node.js para gestionar servicios de un sistema de turnos, desarrollado utilizando ESM y File System.

## Descripción
Este proyecto implementa una clase `ServiceManager` que permite crear, leer, actualizar y eliminar servicios (CRUD) almacenándolos en un archivo JSON. Cada servicio contiene información sobre duración, precio, categoría y disponibilidad.

## Requisitos previos
- Node.js instalado (v16 o superior)

## Cómo instalar
1. Clona este repositorio:
   git clone <url-de-tu-repo>

2. Instala las dependencias:
   npm install

3. Renombra el archivo `.env.example` a `.env` y asegúrate de que tenga los valores:
   PORT=8080
   NODE_ENV=development

## Cómo ejecutar
Ejecuta el siguiente comando para iniciar la aplicación de prueba:
npm start

## Recurso: Services
El modelo de datos de un servicio es el siguiente:
{
  "id": 1,
  "name": "Masaje Descontracturante",
  "description": "Masaje de espalda de 45 min",
  "duration": 45,
  "price": 3000,
  "category": "Spa",
  "available": true
}
*Nota: El campo id es generado automáticamente por el sistema al crearlo.*

## Uso de métodos (Ejemplos)
- getServices(): Retorna un array con todos los servicios guardados.
- getServiceById(id): Retorna un servicio coincidente con el ID ingresado.
- addService(serviceData): Crea un servicio validando que vengan todos los campos obligatorios.
- updateService(id, data): Actualiza propiedades de un servicio sin modificar su ID.
- deleteService(id): Elimina el servicio especificado.