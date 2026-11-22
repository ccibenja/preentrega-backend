import ServiceManager from '../managers/ServiceManager.js';

const manager = new ServiceManager();

export const getServices = async (req, res) => {
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
};

export const getServiceById = async (req, res) => {
    const id = parseInt(req.params.sid);
    if (isNaN(id)) return res.status(400).json({ error: "El parámetro ID debe ser un número válido" });

    const service = await manager.getServiceById(id);
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" });
    
    res.status(200).json(service);
};

export const createService = async (req, res) => {
    const { name, description, duration, price, category, available } = req.body;

    if (!name || !description || !duration || !price || !category || available === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios en el body" });
    }

    const newService = await manager.addService(req.body);
    res.status(201).json(newService);
};

export const updateService = async (req, res) => {
    const id = parseInt(req.params.sid);
    
    if (isNaN(id)) return res.status(400).json({ error: "El parámetro ID debe ser un número válido" });
    if (Object.keys(req.body).length === 0) return res.status(400).json({ error: "No se enviaron datos para actualizar" });
    if (req.body.id) return res.status(400).json({ error: "No está permitido modificar el ID del servicio" });

    const updatedService = await manager.updateService(id, req.body);
    if (!updatedService) return res.status(404).json({ error: "Servicio no encontrado para actualizar" });

    res.status(200).json(updatedService);
};

export const deleteService = async (req, res) => {
    const id = parseInt(req.params.sid);
    if (isNaN(id)) return res.status(400).json({ error: "El parámetro ID debe ser un número válido" });

    const deletedService = await manager.deleteService(id);
    if (!deletedService) return res.status(404).json({ error: "Servicio no encontrado para eliminar" });

    res.status(200).json({ mensaje: "Servicio eliminado", servicio: deletedService });
};