import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export class ServiceManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getServices() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getServiceById(id) {
    const services = await this.getServices();
    const cleanId = String(id).trim();
    const service = services.find((s) => String(s.id).trim() === cleanId);
    return service || null;
  }

  async addService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

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

    const services = await this.getServices();

    const newService = {
      id: crypto.randomUUID(),
      name: String(name).trim(),
      description: String(description).trim(),
      duration: Number(duration),
      price: Number(price),
      category: String(category).trim(),
      available: Boolean(available),
    };

    services.push(newService);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return newService;
  }

  async updateService(id, updatedData) {
    const services = await this.getServices();
    const cleanId = String(id).trim();
    const index = services.findIndex((s) => String(s.id).trim() === cleanId);

    if (index === -1) {
      return null;
    }

    const { id: _, ...dataToUpdate } = updatedData;

    services[index] = {
      ...services[index],
      ...dataToUpdate,
    };

    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return services[index];
  }

  async deleteService(id) {
    const services = await this.getServices();
    const cleanId = String(id).trim();
    const index = services.findIndex((s) => String(s.id).trim() === cleanId);

    if (index === -1) {
      return null;
    }

    const [deletedService] = services.splice(index, 1);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), 'utf-8');
    return deletedService;
  }
}
