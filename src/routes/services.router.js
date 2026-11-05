import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

// GET /api/services (con soporte de ?category=... y ?available=true/false)
router.get('/', (req, res) => {
  try {
    let services = serviceManager.getServices();
    const { category, available } = req.query;

    if (category) {
      services = services.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (available !== undefined) {
      const isAvailable = available === 'true';
      services = services.filter((s) => s.available === isAvailable);
    }

    return res.status(200).json({ status: 'success', data: services });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/services/:sid
router.get('/:sid', (req, res) => {
  try {
    const { sid } = req.params;
    const service = serviceManager.getServiceById(sid);

    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/services
router.post('/', (req, res) => {
  try {
    const newService = serviceManager.addService(req.body);
    return res.status(201).json({ status: 'success', data: newService });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
});

// PUT /api/services/:sid
router.put('/:sid', (req, res) => {
  try {
    const { sid } = req.params;
    const updatedService = serviceManager.updateService(sid, req.body);

    if (!updatedService) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', data: updatedService });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
});

// DELETE /api/services/:sid
router.delete('/:sid', (req, res) => {
  try {
    const { sid } = req.params;
    const deletedService = serviceManager.deleteService(sid);

    if (!deletedService) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
