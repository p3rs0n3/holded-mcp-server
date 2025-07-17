const request = require('supertest');
const app = require('../src/app');
const holdedService = require('../src/services/holded.service');

jest.mock('../src/services/holded.service');

describe('Appointments API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/appointments', () => {
    it('should fetch all appointments', async () => {
      const mockAppointments = [
        { id: '1', title: 'Meeting', startDate: '2023-01-01T10:00:00Z' }
      ];
      holdedService.getAppointments.mockResolvedValue(mockAppointments);

      const response = await request(app).get('/api/appointments');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it('should handle errors when fetching appointments', async () => {
      holdedService.getAppointments.mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/api/appointments');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error fetching appointments');
    });
  });

  describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
      const newAppointment = {
        title: 'New Meeting',
        startDate: '2023-01-01T10:00:00Z',
        endDate: '2023-01-01T11:00:00Z'
      };
      holdedService.createAppointment.mockResolvedValue({ id: '2', ...newAppointment });

      const response = await request(app)
        .post('/api/appointments')
        .send(newAppointment);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: '2', ...newAppointment });
    });

    it('should validate appointment data', async () => {
      const invalidAppointment = {
        title: '', // Invalid empty title
        startDate: 'invalid-date'
      };

      const response = await request(app)
        .post('/api/appointments')
        .send(invalidAppointment);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  // Add more tests for other endpoints
});