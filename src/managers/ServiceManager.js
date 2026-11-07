import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/services.json');

export default class ServiceManager {
    
    
    async #readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
    
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    
    async #writeData(data) {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getServices() {
        return await this.#readData();
    }

    async getServiceById(id) {
        const services = await this.#readData();
        const service = services.find(s => s.id === id);
        return service || null;
    }

    async addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        
        if (!name || !description || !duration || !price || !category || available === undefined) {
            throw new Error("Faltan campos requeridos. Asegúrate de incluir: name, description, duration, price, category y available.");
        }

        const services = await this.#readData();
        
        const id = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;

        const newService = {
            id,
            name,
            description,
            duration,
            price,
            category,
            available
        };

        services.push(newService);
        await this.#writeData(services);
        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.#readData();
        const index = services.findIndex(s => s.id === id);

        if (index === -1) return null;

        
        const { id: _, ...dataToUpdate } = updatedData;

        services[index] = { ...services[index], ...dataToUpdate };
        await this.#writeData(services);
        return services[index];
    }

    async deleteService(id) {
        const services = await this.#readData();
        const index = services.findIndex(s => s.id === id);

        if (index === -1) return null;

        const [deletedService] = services.splice(index, 1);
        await this.#writeData(services);
        return deletedService;
    }
}