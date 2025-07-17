const axios = require('axios');
const holdedConfig = require('../config/holded.config');
const logger = require('../utils/logger');

class HoldedService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: holdedConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'key': holdedConfig.apiKey
      }
    });
  }

  async getContacts() {
    try {
      const response = await this.axiosInstance.get(holdedConfig.endpoints.contacts);
      return response.data;
    } catch (error) {
      logger.error('Error fetching contacts from Holded', error);
      throw error;
    }
  }

  async getContactById(contactId) {
    try {
      const response = await this.axiosInstance.get(`${holdedConfig.endpoints.contacts}/${contactId}`);
      return response.data;
    } catch (error) {
      logger.error(`Error fetching contact ${contactId} from Holded`, error);
      throw error;
    }
  }

  async createContact(contactData) {
    try {
      const response = await this.axiosInstance.post(holdedConfig.endpoints.contacts, contactData);
      return response.data;
    } catch (error) {
      logger.error('Error creating contact in Holded', error);
      throw error;
    }
  }

  async getServices() {
    try {
      const response = await this.axiosInstance.get(holdedConfig.endpoints.services);
      return response.data;
    } catch (error) {
      logger.error('Error fetching services from Holded', error);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const response = await this.axiosInstance.get(`${holdedConfig.endpoints.services}/${serviceId}`);
      return response.data;
    } catch (error) {
      logger.error(`Error fetching service ${serviceId} from Holded`, error);
      throw error;
    }
  }

  async createAppointment(appointmentData) {
    try {
      // In Holded, appointments are created as calendar events
      const response = await this.axiosInstance.post(
        holdedConfig.endpoints.calendar,
        appointmentData
      );
      return response.data;
    } catch (error) {
      logger.error('Error creating appointment in Holded', error);
      throw error;
    }
  }

  async getAppointments() {
    try {
      const response = await this.axiosInstance.get(holdedConfig.endpoints.calendar);
      return response.data;
    } catch (error) {
      logger.error('Error fetching appointments from Holded', error);
      throw error;
    }
  }

  async getAppointmentById(appointmentId) {
    try {
      const response = await this.axiosInstance.get(
        `${holdedConfig.endpoints.calendar}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      logger.error(`Error fetching appointment ${appointmentId} from Holded`, error);
      throw error;
    }
  }

  async updateAppointment(appointmentId, updateData) {
    try {
      const response = await this.axiosInstance.put(
        `${holdedConfig.endpoints.calendar}/${appointmentId}`,
        updateData
      );
      return response.data;
    } catch (error) {
      logger.error(`Error updating appointment ${appointmentId} in Holded`, error);
      throw error;
    }
  }

  async deleteAppointment(appointmentId) {
    try {
      const response = await this.axiosInstance.delete(
        `${holdedConfig.endpoints.calendar}/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      logger.error(`Error deleting appointment ${appointmentId} from Holded`, error);
      throw error;
    }
  }
}

module.exports = new HoldedService();