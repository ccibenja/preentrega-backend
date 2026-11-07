import fs from 'fs/promises';
import path from 'path';

export default class BookingManager {
    constructor() {
        
        this.filePath = path.resolve('src', 'data', 'bookings.json');
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
        
            return [];
        }
    }

    async #writeFile(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    
    async createBooking(bookingData) {
        const bookings = await this.#readFile();
        
    
        const newId = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;
        
        const newBooking = {
            id: newId,
            clientName: bookingData.clientName,
            clientEmail: bookingData.clientEmail,
            date: bookingData.date,
            time: bookingData.time,
            status: bookingData.status || 'pending',
            services: [] 
        };

        bookings.push(newBooking);
        await this.#writeFile(bookings);
        return newBooking;
    }

    
    async getBookingById(id) {
        const bookings = await this.#readFile();
        return bookings.find(b => b.id === id);
    }

    
    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.#readFile();
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) return null; 

        const booking = bookings[bookingIndex];
        
        
        const serviceIndex = booking.services.findIndex(s => s.service === serviceId);

        if (serviceIndex !== -1) {
        
            booking.services[serviceIndex].quantity += 1;
        } else {
        
            booking.services.push({ service: serviceId, quantity: 1 });
        }

        
        await this.#writeFile(bookings);
        return booking;
    }
}