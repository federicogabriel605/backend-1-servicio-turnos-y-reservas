import { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const bookingManager = new BookingManager(path.resolve(__dirname, '../data/bookings.json'));
const serviceManager = new ServiceManager(path.resolve(__dirname, '../data/services.json'));

// POST /api/bookings - Crear reserva
router.post('/', async (req, res) => {
  try {
    const newBooking = await bookingManager.createBooking(req.body);
    return res.status(201).json({ status: 'success', data: newBooking });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
});

// GET /api/bookings/:bid - Obtener reserva por ID
router.get('/:bid', async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingManager.getBookingById(bid);

    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ status: 'success', data: booking });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/bookings/:bid/services/:sid - Agregar servicio a reserva
router.post('/:bid/services/:sid', async (req, res) => {
  try {
    const { bid, sid } = req.params;

    const service = await serviceManager.getServiceById(sid);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
    if (!updatedBooking) {
      return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ status: 'success', data: updatedBooking });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
