import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ServiceManager } from '../managers/ServiceManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceManager = new ServiceManager(path.resolve(__dirname, '../data/services.json'));

export const getServices = async (req, res) => {
  try {
    let services = await serviceManager.getServices();
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
};

export const getServiceById = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await serviceManager.getServiceById(sid);

    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = await serviceManager.addService(req.body);
    return res.status(201).json({ status: 'success', data: newService });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { sid } = req.params;
    const updatedService = await serviceManager.updateService(sid, req.body);

    if (!updatedService) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', data: updatedService });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { sid } = req.params;
    const deletedService = await serviceManager.deleteService(sid);

    if (!deletedService) {
      return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    }

    return res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
