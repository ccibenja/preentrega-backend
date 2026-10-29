import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager();

// GET  Devuelve todos los servicios (acepta filtros por query params)
router.get('/', async (req, res) => {
    try {
        let services = await manager.getServices();
        const { category, available } = req.query;

        if (category) {
            services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }

        if (available) {
            const isAvailable = available === 'true'; 
            services = services.filter(s => s.available === isAvailable);
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET  Devuelve un servicio por ID
router.get('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const service = await manager.getServiceById(id);
        
        if (!service) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST  Crea un nuevo servicio
router.post('/', async (req, res) => {
    try {
        const { name, description, duration, price, category, available } = req.body;

        if (!name || !description || !duration || !price || !category || available === undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios en el body" });
        }

        const newService = await manager.addService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT  Actualiza un servicio existente
router.put('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const updatedService = await manager.updateService(id, req.body);

        if (!updatedService) {
            return res.status(404).json({ error: "Servicio no encontrado para actualizar" });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE 
router.delete('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const deletedService = await manager.deleteService(id);

        if (!deletedService) {
            return res.status(404).json({ error: "Servicio no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Servicio eliminado", servicio: deletedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;