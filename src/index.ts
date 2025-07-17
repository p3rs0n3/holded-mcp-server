#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios, { AxiosInstance } from 'axios';

// Holded API Client
class HoldedClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.holded.com/api/',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'key': apiKey,
      },
    });
  }

  // Contacts
  async getContacts(page: number = 1) {
    const response = await this.client.get(`invoicing/v1/contacts?page=${page}`);
    return response.data;
  }

  async getContact(contactId: string) {
    const response = await this.client.get(`invoicing/v1/contacts/${contactId}`);
    return response.data;
  }

  async createContact(contactData: any) {
    const response = await this.client.post('invoicing/v1/contacts', contactData);
    return response.data;
  }

  async updateContact(contactId: string, contactData: any) {
    const response = await this.client.put(`invoicing/v1/contacts/${contactId}`, contactData);
    return response.data;
  }

  async deleteContact(contactId: string) {
    const response = await this.client.delete(`invoicing/v1/contacts/${contactId}`);
    return response.data;
  }

  // Products
  async getProducts(page: number = 1) {
    const response = await this.client.get(`invoicing/v1/products?page=${page}`);
    return response.data;
  }

  async getProduct(productId: string) {
    const response = await this.client.get(`invoicing/v1/products/${productId}`);
    return response.data;
  }

  async createProduct(productData: any) {
    const response = await this.client.post('invoicing/v1/products', productData);
    return response.data;
  }

  async updateProduct(productId: string, productData: any) {
    const response = await this.client.put(`invoicing/v1/products/${productId}`, productData);
    return response.data;
  }

  async deleteProduct(productId: string) {
    const response = await this.client.delete(`invoicing/v1/products/${productId}`);
    return response.data;
  }

  async updateProductStock(productId: string, stockData: any) {
    const response = await this.client.post(`invoicing/v1/products/${productId}/stock`, stockData);
    return response.data;
  }

  // Documents
  async getDocuments(docType: string, page: number = 1) {
    const response = await this.client.get(`invoicing/v1/documents/${docType}?page=${page}`);
    return response.data;
  }

  async getDocument(docType: string, documentId: string) {
    const response = await this.client.get(`invoicing/v1/documents/${docType}/${documentId}`);
    return response.data;
  }

  async createDocument(docType: string, documentData: any) {
    const response = await this.client.post(`invoicing/v1/documents/${docType}`, documentData);
    return response.data;
  }

  async updateDocument(docType: string, documentId: string, documentData: any) {
    const response = await this.client.put(`invoicing/v1/documents/${docType}/${documentId}`, documentData);
    return response.data;
  }

  async deleteDocument(docType: string, documentId: string) {
    const response = await this.client.delete(`invoicing/v1/documents/${docType}/${documentId}`);
    return response.data;
  }

  async sendDocument(docType: string, documentId: string, emailData: any) {
    const response = await this.client.post(`invoicing/v1/documents/${docType}/${documentId}/send`, emailData);
    return response.data;
  }

  // Invoices (documentos de tipo invoice)
  async getInvoices(page: number = 1) {
    return this.getDocuments('invoice', page);
  }

  async getInvoice(invoiceId: string) {
    return this.getDocument('invoice', invoiceId);
  }

  async createInvoice(invoiceData: any) {
    return this.createDocument('invoice', invoiceData);
  }

  async updateInvoice(invoiceId: string, invoiceData: any) {
    return this.updateDocument('invoice', invoiceId, invoiceData);
  }

  async deleteInvoice(invoiceId: string) {
    return this.deleteDocument('invoice', invoiceId);
  }

  async sendInvoice(invoiceId: string, emailData: any) {
    return this.sendDocument('invoice', invoiceId, emailData);
  }

  // Estimates/Quotes
  async getEstimates(page: number = 1) {
    return this.getDocuments('estimate', page);
  }

  async createEstimate(estimateData: any) {
    return this.createDocument('estimate', estimateData);
  }

  // Purchase Orders
  async getPurchaseOrders(page: number = 1) {
    return this.getDocuments('purchaseorder', page);
  }

  async createPurchaseOrder(purchaseData: any) {
    return this.createDocument('purchaseorder', purchaseData);
  }

  // Bookings
  async getBookingLocations() {
    const response = await this.client.get('crm/v1/bookings/locations');
    return response.data;
  }

  async getBookingSlots(locationId: string, serviceId?: string, day?: string) {
    let url = `crm/v1/bookings/locations/${locationId}/slots`;
    const params = new URLSearchParams();
    
    if (serviceId) {
      params.append('serviceId', serviceId);
    }
    if (day) {
      params.append('day', day);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await this.client.get(url);
    return response.data;
  }

  async getBookings(page: number = 1) {
    const response = await this.client.get(`crm/v1/bookings?page=${page}`);
    return response.data;
  }

  async getBooking(bookingId: string) {
    const response = await this.client.get(`crm/v1/bookings/${bookingId}`);
    return response.data;
  }

  async createBooking(bookingData: any) {
    const response = await this.client.post('crm/v1/bookings', bookingData);
    return response.data;
  }

  async updateBooking(bookingId: string, bookingData: any) {
    const response = await this.client.put(`crm/v1/bookings/${bookingId}`, bookingData);
    return response.data;
  }

  async deleteBooking(bookingId: string) {
    const response = await this.client.delete(`crm/v1/bookings/${bookingId}`);
    return response.data;
  }

  // Services (necesario para bookings)
  async getServices(page: number = 1) {
    const response = await this.client.get(`invoicing/v1/services?page=${page}`);
    return response.data;
  }

  async getService(serviceId: string) {
    const response = await this.client.get(`invoicing/v1/services/${serviceId}`);
    return response.data;
  }

  async createService(serviceData: any) {
    const response = await this.client.post('invoicing/v1/services', serviceData);
    return response.data;
  }
}

// Create server
const server = new Server(
  {
    name: 'holded-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize Holded client
let holdedClient: HoldedClient;

// Get API key from environment
const apiKey = process.env.HOLDED_API_KEY;
if (!apiKey) {
  console.error('HOLDED_API_KEY environment variable is required');
  process.exit(1);
}

holdedClient = new HoldedClient(apiKey);

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Contact tools
      {
        name: 'get_contacts',
        description: 'Get all contacts from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_contact',
        description: 'Get a specific contact by ID',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
          },
          required: ['contactId'],
        },
      },
      {
        name: 'create_contact',
        description: 'Create a new contact',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Contact name',
            },
            email: {
              type: 'string',
              description: 'Contact email',
            },
            phone: {
              type: 'string',
              description: 'Contact phone',
            },
            address: {
              type: 'string',
              description: 'Contact address',
            },
            vatNumber: {
              type: 'string',
              description: 'VAT number',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_contact',
        description: 'Update an existing contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
            name: {
              type: 'string',
              description: 'Contact name',
            },
            email: {
              type: 'string',
              description: 'Contact email',
            },
            phone: {
              type: 'string',
              description: 'Contact phone',
            },
            address: {
              type: 'string',
              description: 'Contact address',
            },
            vatNumber: {
              type: 'string',
              description: 'VAT number',
            },
          },
          required: ['contactId'],
        },
      },
      {
        name: 'delete_contact',
        description: 'Delete a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
          },
          required: ['contactId'],
        },
      },
      
      // Product tools
      {
        name: 'get_products',
        description: 'Get all products from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_product',
        description: 'Get a specific product by ID',
        inputSchema: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
          },
          required: ['productId'],
        },
      },
      {
        name: 'create_product',
        description: 'Create a new product',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Product name',
            },
            sku: {
              type: 'string',
              description: 'Product SKU',
            },
            price: {
              type: 'number',
              description: 'Product price',
            },
            tax: {
              type: 'number',
              description: 'Tax percentage',
            },
            description: {
              type: 'string',
              description: 'Product description',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_product',
        description: 'Update an existing product',
        inputSchema: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
            name: {
              type: 'string',
              description: 'Product name',
            },
            sku: {
              type: 'string',
              description: 'Product SKU',
            },
            price: {
              type: 'number',
              description: 'Product price',
            },
            tax: {
              type: 'number',
              description: 'Tax percentage',
            },
            description: {
              type: 'string',
              description: 'Product description',
            },
          },
          required: ['productId'],
        },
      },
      {
        name: 'delete_product',
        description: 'Delete a product',
        inputSchema: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
          },
          required: ['productId'],
        },
      },
      {
        name: 'update_product_stock',
        description: 'Update product stock',
        inputSchema: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
            stock: {
              type: 'number',
              description: 'New stock quantity',
            },
            warehouseId: {
              type: 'string',
              description: 'Warehouse ID',
            },
          },
          required: ['productId', 'stock'],
        },
      },

      // Invoice tools
      {
        name: 'get_invoices',
        description: 'Get all invoices from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_invoice',
        description: 'Get a specific invoice by ID',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
            },
          },
          required: ['invoiceId'],
        },
      },
      {
        name: 'create_invoice',
        description: 'Create a new invoice',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
            items: {
              type: 'array',
              description: 'Invoice items',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  units: { type: 'number' },
                  price: { type: 'number' },
                  tax: { type: 'number' },
                  sku: { type: 'string' },
                },
              },
            },
            date: {
              type: 'string',
              description: 'Invoice date (YYYY-MM-DD)',
            },
            dueDate: {
              type: 'string',
              description: 'Due date (YYYY-MM-DD)',
            },
            notes: {
              type: 'string',
              description: 'Invoice notes',
            },
          },
          required: ['contactId', 'items'],
        },
      },
      {
        name: 'update_invoice',
        description: 'Update an existing invoice',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
            },
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
            items: {
              type: 'array',
              description: 'Invoice items',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  units: { type: 'number' },
                  price: { type: 'number' },
                  tax: { type: 'number' },
                  sku: { type: 'string' },
                },
              },
            },
            date: {
              type: 'string',
              description: 'Invoice date (YYYY-MM-DD)',
            },
            dueDate: {
              type: 'string',
              description: 'Due date (YYYY-MM-DD)',
            },
            notes: {
              type: 'string',
              description: 'Invoice notes',
            },
          },
          required: ['invoiceId'],
        },
      },
      {
        name: 'delete_invoice',
        description: 'Delete an invoice',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
            },
          },
          required: ['invoiceId'],
        },
      },
      {
        name: 'send_invoice',
        description: 'Send an invoice by email',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: {
              type: 'string',
              description: 'Invoice ID',
            },
            email: {
              type: 'string',
              description: 'Recipient email',
            },
            subject: {
              type: 'string',
              description: 'Email subject',
            },
            message: {
              type: 'string',
              description: 'Email message',
            },
          },
          required: ['invoiceId', 'email'],
        },
      },

      // Document tools
      {
        name: 'get_documents',
        description: 'Get documents by type (invoice, estimate, purchase, etc.)',
        inputSchema: {
          type: 'object',
          properties: {
            docType: {
              type: 'string',
              description: 'Document type: invoice, salesreceipt, creditnote, salesorder, proform, waybill, estimate, purchase, purchaseorder, purchaserefund',
            },
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
          required: ['docType'],
        },
      },
      {
        name: 'get_document',
        description: 'Get a specific document by type and ID',
        inputSchema: {
          type: 'object',
          properties: {
            docType: {
              type: 'string',
              description: 'Document type',
            },
            documentId: {
              type: 'string',
              description: 'Document ID',
            },
          },
          required: ['docType', 'documentId'],
        },
      },
      {
        name: 'create_document',
        description: 'Create a new document',
        inputSchema: {
          type: 'object',
          properties: {
            docType: {
              type: 'string',
              description: 'Document type',
            },
            documentData: {
              type: 'object',
              description: 'Document data',
            },
          },
          required: ['docType', 'documentData'],
        },
      },

      // Estimate tools
      {
        name: 'get_estimates',
        description: 'Get all estimates/quotes from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'create_estimate',
        description: 'Create a new estimate/quote',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID',
            },
            items: {
              type: 'array',
              description: 'Estimate items',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  units: { type: 'number' },
                  price: { type: 'number' },
                  tax: { type: 'number' },
                  sku: { type: 'string' },
                },
              },
            },
            date: {
              type: 'string',
              description: 'Estimate date (YYYY-MM-DD)',
            },
            validUntil: {
              type: 'string',
              description: 'Valid until date (YYYY-MM-DD)',
            },
            notes: {
              type: 'string',
              description: 'Estimate notes',
            },
          },
          required: ['contactId', 'items'],
        },
      },

      // Booking tools
      {
        name: 'get_booking_locations',
        description: 'Get all booking locations from Holded',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_booking_slots',
        description: 'Get available slots for a specific booking location',
        inputSchema: {
          type: 'object',
          properties: {
            locationId: {
              type: 'string',
              description: 'Location ID',
            },
            serviceId: {
              type: 'string',
              description: 'Specific service ID (optional)',
            },
            day: {
              type: 'string',
              description: 'Specific day in yyyy-mm-dd format (optional)',
            },
          },
          required: ['locationId'],
        },
      },
      {
        name: 'get_bookings',
        description: 'Get all bookings from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_booking',
        description: 'Get a specific booking by ID',
        inputSchema: {
          type: 'object',
          properties: {
            bookingId: {
              type: 'string',
              description: 'Booking ID',
            },
          },
          required: ['bookingId'],
        },
      },
      {
        name: 'create_booking',
        description: 'Create a new booking',
        inputSchema: {
          type: 'object',
          properties: {
            locationId: {
              type: 'string',
              description: 'Location ID for the booking',
            },
            contactId: {
              type: 'string',
              description: 'Contact ID for the booking',
            },
            serviceId: {
              type: 'string',
              description: 'Service ID for the booking',
            },
            startDate: {
              type: 'string',
              description: 'Start date and time (ISO format)',
            },
            endDate: {
              type: 'string',
              description: 'End date and time (ISO format)',
            },
            notes: {
              type: 'string',
              description: 'Booking notes',
            },
            status: {
              type: 'string',
              description: 'Booking status (confirmed, pending, cancelled)',
            },
          },
          required: ['locationId', 'contactId', 'serviceId', 'startDate', 'endDate'],
        },
      },
      {
        name: 'update_booking',
        description: 'Update an existing booking',
        inputSchema: {
          type: 'object',
          properties: {
            bookingId: {
              type: 'string',
              description: 'Booking ID',
            },
            locationId: {
              type: 'string',
              description: 'Location ID for the booking',
            },
            contactId: {
              type: 'string',
              description: 'Contact ID for the booking',
            },
            serviceId: {
              type: 'string',
              description: 'Service ID for the booking',
            },
            startDate: {
              type: 'string',
              description: 'Start date and time (ISO format)',
            },
            endDate: {
              type: 'string',
              description: 'End date and time (ISO format)',
            },
            notes: {
              type: 'string',
              description: 'Booking notes',
            },
            status: {
              type: 'string',
              description: 'Booking status (confirmed, pending, cancelled)',
            },
          },
          required: ['bookingId'],
        },
      },
      {
        name: 'delete_booking',
        description: 'Delete a booking',
        inputSchema: {
          type: 'object',
          properties: {
            bookingId: {
              type: 'string',
              description: 'Booking ID',
            },
          },
          required: ['bookingId'],
        },
      },

      // Service tools (needed for bookings)
      {
        name: 'get_services',
        description: 'Get all services from Holded',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
              default: 1,
            },
          },
        },
      },
      {
        name: 'get_service',
        description: 'Get a specific service by ID',
        inputSchema: {
          type: 'object',
          properties: {
            serviceId: {
              type: 'string',
              description: 'Service ID',
            },
          },
          required: ['serviceId'],
        },
      },
      {
        name: 'create_service',
        description: 'Create a new service',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Service name',
            },
            description: {
              type: 'string',
              description: 'Service description',
            },
            price: {
              type: 'number',
              description: 'Service price',
            },
            tax: {
              type: 'number',
              description: 'Tax percentage',
            },
            duration: {
              type: 'number',
              description: 'Service duration in minutes',
            },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // Contact operations
      case 'get_contacts':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getContacts((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_contact':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getContact((args as any)?.contactId), null, 2),
            },
          ],
        };

      case 'create_contact':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createContact(args), null, 2),
            },
          ],
        };

      case 'update_contact':
        const { contactId, ...updateData } = args as any;
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.updateContact(contactId, updateData), null, 2),
            },
          ],
        };

      case 'delete_contact':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.deleteContact((args as any)?.contactId), null, 2),
            },
          ],
        };

      // Product operations
      case 'get_products':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getProducts((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_product':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getProduct((args as any)?.productId), null, 2),
            },
          ],
        };

      case 'create_product':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createProduct(args), null, 2),
            },
          ],
        };

      case 'update_product':
        const { productId, ...productUpdateData } = args as any;
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.updateProduct(productId, productUpdateData), null, 2),
            },
          ],
        };

      case 'delete_product':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.deleteProduct((args as any)?.productId), null, 2),
            },
          ],
        };

      case 'update_product_stock':
        const { productId: stockProductId, stock, warehouseId } = args as any;
        const stockData = { stock: { warehouseId, stock } };
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.updateProductStock(stockProductId, stockData), null, 2),
            },
          ],
        };

      // Invoice operations
      case 'get_invoices':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getInvoices((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_invoice':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getInvoice((args as any)?.invoiceId), null, 2),
            },
          ],
        };

      case 'create_invoice':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createInvoice(args), null, 2),
            },
          ],
        };

      case 'update_invoice':
        const { invoiceId, ...invoiceUpdateData } = args as any;
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.updateInvoice(invoiceId, invoiceUpdateData), null, 2),
            },
          ],
        };

      case 'delete_invoice':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.deleteInvoice((args as any)?.invoiceId), null, 2),
            },
          ],
        };

      case 'send_invoice':
        const { invoiceId: sendInvoiceId, email, subject, message } = args as any;
        const emailData = { email, subject, message };
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.sendInvoice(sendInvoiceId, emailData), null, 2),
            },
          ],
        };

      // Document operations
      case 'get_documents':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getDocuments((args as any)?.docType, (args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_document':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getDocument((args as any)?.docType, (args as any)?.documentId), null, 2),
            },
          ],
        };

      case 'create_document':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createDocument((args as any)?.docType, (args as any)?.documentData), null, 2),
            },
          ],
        };

      // Estimate operations
      case 'get_estimates':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getEstimates((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'create_estimate':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createEstimate(args), null, 2),
            },
          ],
        };

      // Booking operations
      case 'get_booking_locations':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getBookingLocations(), null, 2),
            },
          ],
        };

      case 'get_booking_slots':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getBookingSlots(
                (args as any)?.locationId,
                (args as any)?.serviceId,
                (args as any)?.day
              ), null, 2),
            },
          ],
        };

      case 'get_bookings':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getBookings((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_booking':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getBooking((args as any)?.bookingId), null, 2),
            },
          ],
        };

      case 'create_booking':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createBooking(args), null, 2),
            },
          ],
        };

      case 'update_booking':
        const { bookingId: updateBookingId, ...bookingUpdateData } = args as any;
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.updateBooking(updateBookingId, bookingUpdateData), null, 2),
            },
          ],
        };

      case 'delete_booking':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.deleteBooking((args as any)?.bookingId), null, 2),
            },
          ],
        };

      // Service operations
      case 'get_services':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getServices((args as any)?.page || 1), null, 2),
            },
          ],
        };

      case 'get_service':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.getService((args as any)?.serviceId), null, 2),
            },
          ],
        };

      case 'create_service':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(await holdedClient.createService(args), null, 2),
            },
          ],
        };

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new McpError(
      ErrorCode.InternalError,
      `Holded API error: ${errorMessage}`
    );
  }
});

// Start server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Holded MCP server running on stdio');
}

runServer().catch(console.error);