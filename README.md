# Sistema Backend de Turnos y Reservas

API REST desarrollada con Node.js, Express y FileSystem para gestionar servicios y reservas de un sistema de turnos, organizada en una arquitectura de tres capas.

## Arquitectura del Proyecto
El proyecto separa responsabilidades en tres capas principales:
- **Routes (`src/routes/`):** Definen únicamente los endpoints y los conectan con su controlador correspondiente. No contienen lógica de negocio.
- **Controllers (`src/controllers/`):** Reciben `req.params`, `req.query` y `req.body`, validan los datos de entrada, invocan a los managers y devuelven la respuesta HTTP (`res.status().json()`).
- **Managers (`src/managers/`):** Encapsulan la lógica de datos y la persistencia asíncrona en archivos JSON (`fs/promises`), sin utilizar `req` ni `res`.

## Estructura de Carpetas
```text
src/
├── config/
│   └── env.config.js
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
├── managers/
│   ├── ServiceManager.js
│   └── BookingManager.js
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
├── data/
│   ├── services.json
│   └── bookings.json
├── app.js
└── server.js
.env.example
.gitignore
package.json
README.md


### 2. Verificar el repositorio y subir los cambios
Antes de hacer push, revisa rápidamente en tu carpeta de GitHub (en el navegador) o en VS Code que:
* Exista la carpeta `src/controllers/` con ambos archivos.
* Existan `src/data/services.json` y `src/data/bookings.json`.
* Esté `.env.example`, y **no** estén subidos `.env` ni `node_modules`.