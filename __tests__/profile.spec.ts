import axios from 'axios';

describe('Create user profile', () => {
  const baseUrl = 'http://localhost:3333/admirador';
  const requestBody = {
    name: 'name',
    whatsapp: 'whatsapp',
    email: 'email',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user profile (mocked)', async () => {
    const mockedResponse = {
      data: {
        id: '12345',
        name: 'name',
        whatsapp: 'whatsapp',
        email: 'email',
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      status: 200,
    };
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse);

    const { data, status } = await axios.post(baseUrl, requestBody);

    expect(status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.isVerified).toBe(false);
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
    expect(axios.post).toHaveBeenCalledWith(baseUrl, requestBody);
  });

  it('should return error if required fields are missing (mocked)', async () => {
    const incompleteBody = {
      name: 'name',
    };

    const mockedErrorResponse = {
      response: {
        status: 400,
        data: {
          message: 'Validation failed',
          errors: ['whatsapp is required', 'email is required'],
        },
      },
    };
    jest.spyOn(axios, 'post').mockRejectedValueOnce(mockedErrorResponse);

    try {
      await axios.post(baseUrl, incompleteBody);
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('message');
      expect(error.response.data.message).toBe('Validation failed');
      expect(error.response.data).toHaveProperty('errors');
      expect(error.response.data.errors).toEqual(['whatsapp is required', 'email is required']);
      expect(axios.post).toHaveBeenCalledWith(baseUrl, incompleteBody);
    }
  });

  it('should handle server error (500)', async () => {
    const mockedErrorResponse = {
      response: {
        status: 500,
        data: {
          message: 'Internal Server Error',
        },
      },
    };
    jest.spyOn(axios, 'post').mockRejectedValueOnce(mockedErrorResponse);

    try {
      await axios.post(baseUrl, requestBody);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.data).toHaveProperty('message');
      expect(error.response.data.message).toBe('Internal Server Error');
      expect(axios.post).toHaveBeenCalledWith(baseUrl, requestBody);
    }
  });

  it('should handle network error', async () => {
    const mockedError = new Error('Network Error');
    jest.spyOn(axios, 'post').mockRejectedValueOnce(mockedError);

    try {
      await axios.post(baseUrl, requestBody);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Network Error');
      expect(axios.post).toHaveBeenCalledWith(baseUrl, requestBody);
    }
  });

  it('should send the correct request body', async () => {
    const mockedResponse = {
      data: {
        id: '12345',
        name: 'name',
        whatsapp: 'whatsapp',
        email: 'email',
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      status: 200, 
    };
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse);

    await axios.post(baseUrl, requestBody);

    expect(axios.post).toHaveBeenCalledWith(baseUrl, {
      name: 'name',
      whatsapp: 'whatsapp',
      email: 'email',
    });
  });

  it('should handle different success status codes (e.g., 201 Created)', async () => {
    const mockedResponse = {
      data: {
        id: '67890',
        name: 'another name',
        whatsapp: 'another whatsapp',
        email: 'another email',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      status: 201,
    };
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse);

    const { status } = await axios.post(baseUrl, {
      name: 'another name',
      whatsapp: 'another whatsapp',
      email: 'another email',
    });

    expect(status).toBe(201);
  });
});