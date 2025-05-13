import { ApiClient } from './ApiClient';
import { Exchange } from '@/models/Exchange';
import { ExchangeDetails } from '@/models/ExchangeDetails';

/**
 * Servicio para recuperar datos de intercambios de criptomonedas
 */
export class ExchangeService {
  private apiClient: ApiClient;
  
  constructor() {
    this.apiClient = ApiClient.getInstance();
  }
  
  /**
   * Obtener lista de todos los intercambios
   * @returns Promise que resuelve a un array de objetos Exchange
   */
  async getAllExchanges(): Promise<Exchange[]> {
    try {
      const response = await this.apiClient.get<any>('/exchanges/');
      
      // Manejar tanto arrays como objetos en la respuesta
      if (!response) {
        throw new Error('No se pudieron recuperar los datos de intercambios');
      }
      
      let exchangesArray: any[] = [];
      
      // Si la respuesta es un objeto con IDs como claves (como en el ejemplo proporcionado)
      if (!Array.isArray(response) && typeof response === 'object') {
        exchangesArray = Object.values(response);
      } 
      // Si la respuesta ya es un array
      else if (Array.isArray(response)) {
        exchangesArray = response;
      }
      else {
        throw new Error('Formato de respuesta de API no válido');
      }
      
      return Exchange.fromApiResponseArray(exchangesArray);
    } catch (error) {
      console.error('Error al obtener los intercambios:', error);
      throw new Error('Error al recuperar los datos de intercambios');
    }
  }
  
  /**
   * Obtener detalles de un intercambio específico
   * @param id ID del intercambio
   * @returns Promise que resuelve a un objeto ExchangeDetails
   */
  async getExchangeDetails(id: string): Promise<ExchangeDetails> {
    try {
      console.log(`Obteniendo detalles del exchange ID: ${id}`);
      
      // Validar ID antes de hacer la solicitud
      if (!id || id.trim() === '') {
        throw new Error('ID de exchange no válido');
      }
      
      // Verificar primero si el exchange existe
      const exists = await this.apiClient.checkExchangeExists(id);
      if (!exists) {
        console.warn(`El exchange con ID ${id} no existe en la lista de exchanges disponibles`);
        throw new Error(`El exchange con ID ${id} no se encuentra en la lista de exchanges disponibles`);
      }
      
      // Hacer la solicitud a la API, capturando específicamente errores de red
      let response;
      try {
        response = await this.apiClient.get<any>('/exchange/', { id });
      } catch (fetchError: any) {
        // Si el error es de análisis JSON, proporcionar un mensaje más claro
        if (fetchError instanceof SyntaxError && fetchError.message.includes('JSON')) {
          throw new Error(`La API devolvió una respuesta inválida para el exchange con ID ${id}. Este exchange podría no existir o tener un formato no compatible.`);
        }
        
        console.error(`Error de red al obtener exchange ${id}:`, fetchError);
        throw new Error(`Error de conexión: ${fetchError.message || 'No se pudo conectar con la API'}`);
      }
      
      // Validación básica de la respuesta
      if (!response) {
        throw new Error(`No se encontró el intercambio con ID ${id}`);
      }
      
      // Comprobar si la respuesta es una cadena vacía o nula
      if (response === '' || response === null) {
        throw new Error(`La API devolvió una respuesta vacía para el exchange con ID ${id}`);
      }
      
      // Imprimir solo las primeras 200 caracteres para evitar logs demasiado grandes
      const responsePreview = typeof response === 'string' 
        ? response.substring(0, 200) 
        : JSON.stringify(response).substring(0, 200);
      console.log(`Respuesta de API para exchange ${id} (primeros 200 caracteres):`, responsePreview + '...');
      
      // Verificar si es un exchange válido
      // Algunos IDs pueden no existir o tener formatos diferentes
      if (!response['0'] && !response.pairs) {
        // Revisar si es un objeto vacío o respuesta malformada
        if (Object.keys(response).length === 0 || typeof response !== 'object') {
          throw new Error(`Exchange con ID ${id} no encontrado o formato inválido`);
        }
        
        console.warn('Formato de respuesta no reconocido:', responsePreview);
        throw new Error(`Formato de respuesta no válido para el intercambio con ID ${id}`);
      }
      
      // Para asegurar que el ID se conserva en la respuesta
      const enrichedResponse = {
        ...response,
        id: id
      };
      
      return ExchangeDetails.fromApiResponse(enrichedResponse);
    } catch (error: any) {
      // Manejar específicamente errores de análisis JSON
      if (error instanceof SyntaxError && error.message.includes('JSON')) {
        console.error(`Error de análisis JSON para exchange ID ${id}:`, error);
        throw new Error(`Error al analizar la respuesta de la API: ${error.message}. El exchange con ID ${id} puede no existir o la API puede estar devolviendo datos inválidos.`);
      }
      
      console.error(`Error al obtener detalles del intercambio con ID ${id}:`, error);
      throw error instanceof Error ? error : new Error('Error desconocido al recuperar los detalles del intercambio');
    }
  }
} 