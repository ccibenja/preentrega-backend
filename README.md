# Administrador de Servicios y Reservas

Proyecto backend en Node.js para gestionar servicios y reservas de un sistema de turnos, utilizando Express, ESM y FileSystem.

## Descripción
Este proyecto implementa una API REST con Express que expone endpoints para la gestión de servicios (CRUD) y reservas. La lógica de negocio y persistencia en archivos JSON es manejada por las clases `ServiceManager` y `BookingManager`.

## Requisitos previos e Instalación
- Node.js instalado (v16 o superior)
1. Clonar repo: `git clone <url-de-tu-repo>`
2. Instalar dependencias: `npm install`
3. Renombrar `.env.example` a `.env` y configurar `PORT=8080`.
4. Ejecutar: `npm start`

---

## API REST - Servicios (`/api/services`)

### 1. Obtener todos los servicios
- **Método:** `GET`
- **Ruta:** `/api/services`
- **Query Params opcionales:** `?category=String` , `?available=Boolean`

### 2. Obtener servicio por ID
- **Método:** `GET`
- **Ruta:** `/api/services/:sid`

### 3. Crear un nuevo servicio
- **Método:** `POST`
- **Ruta:** `/api/services`
- **Body esperado:** JSON con `name`, `description`, `duration`, `price`, `category`, `available`. *(No enviar ID)*.

### 4. Actualizar un servicio
- **Método:** `PUT`
- **Ruta:** `/api/services/:sid`
- **Body esperado:** JSON con los campos a modificar. *(No modificar ID)*.

### 5. Eliminar un servicio
- **Método:** `DELETE`
- **Ruta:** `/api/services/:sid`

---

## API REST - Reservas (`/api/bookings`)

### 1. Crear una nueva reserva
- **Método:** `POST`
- **Ruta:** `/api/bookings`
- **Body esperado:** 
  ```json
  {
    "clientName": "Juan Pérez",
    "clientEmail": "juan@ejemplo.com",
    "date": "2026-11-15",
    "time": "10:30"
  }