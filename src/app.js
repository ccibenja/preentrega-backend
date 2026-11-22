import express from 'express';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);


app.use((err, req, res, next) => {
    console.error("Error detectado:", err.message);
    res.status(500).json({ error: "Hubo un error interno en el servidor" });
});

export default app;