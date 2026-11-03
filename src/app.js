import http from "http"

import config from './config/env.config.js';
import { ServiceManager } from './managers/ServiceManager.js';

console.log(`Iniciando app en modo ${config.nodeEnv} en puerto ${config.port}...`);

const serviceManager = new ServiceManager();

try {
  // 1. Crear un servicio
  console.log('--- 1. Creando servicio ---');
  const nuevoServicio = serviceManager.addService({
    name: 'Corte de Cabello',
    description: 'Corte clásico con lavado',
    duration: 30,
    price: 1500,
    category: 'Peluquería',
    available: true,
  });
  console.log('Servicio creado:', nuevoServicio);

  // 2. Obtener todos los servicios
  console.log('\n--- 2. Listando todos los servicios ---');
  console.log(serviceManager.getServices());

  // 3. Buscar por ID
  console.log('\n--- 3. Buscando por ID ---');
  const encontrado = serviceManager.getServiceById(nuevoServicio.id);
  console.log('Encontrado:', encontrado);

  // 4. Actualizar servicio
  console.log('\n--- 4. Actualizando servicio ---');
  const actualizado = serviceManager.updateService(nuevoServicio.id, {
    price: 1800,
    description: 'Corte clásico + peinado',
  });
  console.log('Actualizado:', actualizado);

  // 5. Eliminar servicio
  console.log('\n--- 5. Eliminando servicio ---');
  const eliminado = serviceManager.deleteService(nuevoServicio.id);
  console.log('Eliminado:', eliminado);

  console.log('\n--- Servicios restantes ---');
  console.log(serviceManager.getServices());
} catch (error) {
  console.error('Error durante la ejecución:', error.message);
}
