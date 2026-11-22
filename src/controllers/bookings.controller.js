import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
    const { clientName, clientEmail, date, time } = req.body;
    
    if (!clientName || !clientEmail || !date || !time) {
        return res.status(400).json({ error: "Faltan datos obligatorios para la reserva" });
    }

    const newBooking = await bookingManager.createBooking(req.body);
    res.status(201).json(newBooking);
};

export const getBookingById = async (req, res) => {
    const id = parseInt(req.params.bid);
    if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser numérico" });

    const booking = await bookingManager.getBookingById(id);
    if (!booking) return res.status(404).json({ error: "Reserva no encontrada" });
    
    res.status(200).json(booking);
};

export const addServiceToBooking = async (req, res) => {
    const bookingId = parseInt(req.params.bid);
    const serviceId = parseInt(req.params.sid);

    if (isNaN(bookingId) || isNaN(serviceId)) {
        return res.status(400).json({ error: "Los IDs deben ser números válidos" });
    }

    const booking = await bookingManager.getBookingById(bookingId);
    if (!booking) return res.status(404).json({ error: "La reserva indicada no existe" });

    const service = await serviceManager.getServiceById(serviceId);
    if (!service) return res.status(404).json({ error: "El servicio indicado no existe" });
    
    if (!service.available) {
        return res.status(400).json({ error: "El servicio no está disponible en este momento" });
    }

    const updatedBooking = await bookingManager.addServiceToBooking(bookingId, serviceId);
    res.status(200).json(updatedBooking);
};