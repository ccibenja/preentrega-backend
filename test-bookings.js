const testBookings = async () => {
    try {
        console.log("1. Creando una nueva reserva vacía...");
        const resPost = await fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientName: "Juan Pérez",
                clientEmail: "juan@ejemplo.com",
                date: "2026-11-15",
                time: "10:30"
            })
        });
        const nuevaReserva = await resPost.json();
        console.log("Respuesta:", nuevaReserva);

        const bookingId = nuevaReserva.id;
        // Asumimos que tienes el servicio con ID 1 (Corte de Cabello) de tus pruebas anteriores
        const serviceId = 1; 

        console.log(`\n2. Agregando el servicio con ID ${serviceId} a la reserva ${bookingId}...`);
        const resAdd1 = await fetch(`http://localhost:8080/api/bookings/${bookingId}/services/${serviceId}`, {
            method: 'POST'
        });
        console.log("Reserva actualizada:", await resAdd1.json());

        console.log(`\n3. Agregando EL MISMO servicio (ID ${serviceId}) para probar que sume la cantidad...`);
        const resAdd2 = await fetch(`http://localhost:8080/api/bookings/${bookingId}/services/${serviceId}`, {
            method: 'POST'
        });
        console.log("Reserva final con cantidad sumada:", await resAdd2.json());

        console.log(`\n4. Buscando la reserva por ID mediante GET...`);
        const resGet = await fetch(`http://localhost:8080/api/bookings/${bookingId}`);
        console.log("Datos obtenidos:", await resGet.json());

    } catch (error) {
        console.error("Error en la prueba:", error);
    }
};

testBookings();