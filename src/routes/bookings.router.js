import { Router } from 'express';
import BookingManager from '../managers/BookingManager.js';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const bookingManager = new BookingManager();
const serviceManager = new ServiceManager(); 


router.post('/', async (req, res) => {
    try {
        const { clientName, clientEmail, date, time } = req.body;
        

        if (!clientName || !clientEmail || !date || !time) {
            return res.status(400).json({ error: "Faltan datos obligatorios para la reserva" });
        }

        const newBooking = await bookingManager.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:bid', async (req, res) => {
    try {
        const id = parseInt(req.params.bid);
        if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser numérico" });

        const booking = await bookingManager.getBookingById(id);
        
        if (!booking) return res.status(404).json({ error: "Reserva no encontrada" });
        
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/:bid/services/:sid', async (req, res) => {
    try {
        const bookingId = parseInt(req.params.bid);
        const serviceId = parseInt(req.params.sid);

        if (isNaN(bookingId) || isNaN(serviceId)) {
            return res.status(400).json({ error: "Los IDs deben ser números válidos" });
        }


        const booking = await bookingManager.getBookingById(bookingId);
        if (!booking) return res.status(404).json({ error: "La reserva indicada no existe" });


        const service = await serviceManager.getServiceById(serviceId);
        if (!service) return res.status(404).json({ error: "El servicio indicado no existe" });


        const updatedBooking = await bookingManager.addServiceToBooking(bookingId, serviceId);
        
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;