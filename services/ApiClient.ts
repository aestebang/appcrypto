/**
 * Base API client for making HTTP requests
 * Implements the Singleton pattern to ensure a single instance is used throughout the app
 */
export class ApiClient {
  private static instance: ApiClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = 'https://api.coinlore.net/api';
  }

  /**
   * Get the singleton instance of ApiClient
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Make a GET request to the specified endpoint
   */
  public async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    try {
      let url = `${this.baseUrl}${endpoint}`;
      
      // Add query parameters if provided
      if (params) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, value);
        });
        url += `?${queryParams.toString()}`;
      }
      
      console.log(`Realizando petición GET a: ${url}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Obtener el texto de la respuesta primero
      const responseText = await response.text();
      
      // Validar que tenemos contenido antes de intentar analizar como JSON
      if (!responseText || responseText.trim() === '') {
        console.error('Respuesta vacía recibida de la API');
        throw new Error('La API devolvió una respuesta vacía');
      }
      
      try {
        // Intentar analizar el texto como JSON
        return JSON.parse(responseText) as T;
      } catch (parseError: any) {
        console.error('Error al analizar respuesta JSON:', parseError);
        console.error('Respuesta recibida:', responseText.substring(0, 200) + '...');
        throw new SyntaxError(`Error al analizar JSON: ${parseError.message}. Respuesta recibida: ${responseText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
  
  /**
   * Verificar si un exchange existe antes de intentar obtener sus detalles
   */
  public async checkExchangeExists(id: string): Promise<boolean> {
    try {
      // Primero intentamos obtener la lista de todos los exchanges
      const exchanges = await this.get<any>('/exchanges/');
      
      // Verificar si el ID está en la lista de exchanges
      if (Array.isArray(exchanges)) {
        return exchanges.some(exchange => exchange.id === id);
      } else if (typeof exchanges === 'object') {
        return Object.values(exchanges).some((exchange: any) => exchange.id === id);
      }
      
      return false;
    } catch (error) {
      console.error(`Error al verificar si existe el exchange con ID ${id}:`, error);
      return false;
    }
  }
}