import app from './app.js';
import config from './config/env.config.js';

const PORT = config.PORT || 8080;

app.listen(PORT, () => {
    console.log(`--------------------------------------------------`);
    console.log(` Servidor Express escuchando en el puerto ${PORT}`);
    console.log(` Entorno de ejecución: ${config.NODE_ENV}`);
    console.log(`--------------------------------------------------`);
});