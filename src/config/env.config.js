import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
};

if (!config.PORT || !config.NODE_ENV) {
    console.error("❌ Error CRÍTICO: Faltan variables de entorno requeridas (PORT o NODE_ENV). Verifica tu archivo .env");
    process.exit(1); 
}

export default config;