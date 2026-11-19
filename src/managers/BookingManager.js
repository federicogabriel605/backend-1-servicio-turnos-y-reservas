import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export class BookingManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getBookings() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getBookingById(id) {
    const bookings = await this.getBookings();
    const cleanId = String(id).trim();
    const booking = bookings.find((b) => String(b.id).trim() === cleanId);
    return booking || null;
  }

  async createBooking(bookingData) {
    const { clientName, clientEmail, date, time } = bookingData;

    if (!clientName || !clientEmail || !date || !time) {
      throw new Error('Todos los campos son obligatorios: clientName, clientEmail, date, time.');
    }

    const bookings = await this.getBookings();

    const newBooking = {
      id: crypto.randomUUID(),
      clientName: String(clientName).trim(),
      clientEmail: String(clientEmail).trim(),
      date: String(date).trim(),
      time: String(time).trim(),
      status: 'pending',
      services: [],
    };

    bookings.push(newBooking);
    await fs.writeFile(this.path, JSON.stringify(bookings, null, 2), 'utf-8');
    return newBooking;
  }

  async addServiceToBooking(bookingId, serviceId) {
    const bookings = await this.getBookings();
    const cleanBid = String(bookingId).trim();
    const cleanSid = String(serviceId).trim();

    const bookingIndex = bookings.findIndex((b) => String(b.id).trim() === cleanBid);
    if (bookingIndex === -1) {
      return null;
    }

    const booking = bookings[bookingIndex];
    if (!Array.isArray(booking.services)) {
      booking.services = [];
    }

    const serviceIndex = booking.services.findIndex((s) => String(s.service).trim() === cleanSid);

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({
        service: cleanSid,
        quantity: 1,
      });
    }

    bookings[bookingIndex] = booking;
    await fs.writeFile(this.path, JSON.stringify(bookings, null, 2), 'utf-8');
    return booking;
  }
}
