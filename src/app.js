import config from './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';

console.log(`✅ Servidor configurado en el puerto: ${config.PORT}`);
console.log(`✅ Entorno de ejecución: ${config.NODE_ENV}`);
console.log("--------------------------------------------------");

const runTests = async () => {
    const manager = new ServiceManager();

    try {
        console.log("1. Agregando un nuevo servicio...");
        const newService = await manager.addService({
            name: "Corte de Cabello",
            description: "Corte clásico para hombre",
            duration: 30,
            price: 1500,
            category: "Peluquería",
            available: true
        });
        console.log("Servicio agregado:", newService);

        console.log("\n2. Obteniendo todos los servicios...");
        const allServices = await manager.getServices();
        console.log(allServices);

        console.log("\n3. Obteniendo servicio por ID (1)...");
        const service = await manager.getServiceById(1);
        console.log(service);

        console.log("\n4. Actualizando servicio...");
        const updated = await manager.updateService(1, { price: 1800, duration: 45 });
        console.log("Servicio actualizado:", updated);

        // Descomenta la siguiente línea para probar el borrado
        // console.log("\n5. Eliminando servicio...");
        // const deleted = await manager.deleteService(1);
        // console.log("Servicio eliminado:", deleted);

    } catch (error) {
        console.error("Error durante las pruebas:", error.message);
    }
};

runTests();