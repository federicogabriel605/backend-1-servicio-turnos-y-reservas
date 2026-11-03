import crypto from 'node:crypto';

export class ServiceManager {
  constructor() {
    this.services = [];
  }

  // Devuelve todos los servicios
  getServices() {
    return this.services;
  }

  // Busca un servicio por id
  getServiceById(id) {
    const service = this.services.find((s) => s.id === id);
    if (!service) {
      return null;
    }
    return service;
  }

  // Agrega un nuevo servicio con validaciones e id autogenerado
  addService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

    // Validación de campos obligatorios
    if (
      !name ||
      !description ||
      duration === undefined ||
      price === undefined ||
      !category ||
      available === undefined
    ) {
      throw new Error('Todos los campos son obligatorios: name, description, duration, price, category, available.');
    }

    const newService = {
      id: crypto.randomUUID(),
      name,
      description,
      duration,
      price,
      category,
      available,
    };

    this.services.push(newService);
    return newService;
  }

  // Actualiza los campos de un servicio sin modificar su id
  updateService(id, updatedData) {
    const serviceIndex = this.services.findIndex((s) => s.id === id);

    if (serviceIndex === -1) {
      return null;
    }

    // Aseguramos que el id no se modifique
    const { id: _, ...dataToUpdate } = updatedData;

    this.services[serviceIndex] = {
      ...this.services[serviceIndex],
      ...dataToUpdate,
    };

    return this.services[serviceIndex];
  }

  // Elimina un servicio por id
  deleteService(id) {
    const serviceIndex = this.services.findIndex((s) => s.id === id);

    if (serviceIndex === -1) {
      return null;
    }

    const [deletedService] = this.services.splice(serviceIndex, 1);
    return deletedService;
  }
}
