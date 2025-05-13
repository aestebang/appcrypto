import { Cryptocurrency } from '@/models/Cryptocurrency';
import { CryptocurrencyDetails } from '@/models/CryptocurrencyDetails';
import { Market } from '@/models/Market';
import { SocialStats } from '@/models/SocialStats';
import { ApiClient } from './ApiClient';

// const API_BASE_URL = "https://api.coinlore.net/api";

/**
 * Service for retrieving cryptocurrency data from the Coinlore API
 */
export class CryptocurrencyService {
  private apiClient: ApiClient;
  
  constructor() {
    this.apiClient = ApiClient.getInstance();
  }
  
  /**
   * Get a list of top cryptocurrencies
   * @param start Starting index (default: 0)
   * @param limit Number of results to return (default: 20)
   * @returns Promise resolving to an array of Cryptocurrency objects
   */
  async getTopCryptocurrencies(start: number = 0, limit: number = 20): Promise<Cryptocurrency[]> {
    try {
      const response = await this.apiClient.get<any>('/tickers/', { 
        start: start.toString(),
        limit: limit.toString()
      });
      
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error("Error fetching crypto data");
      }
      
      return Cryptocurrency.fromApiResponseArray(response.data);
    } catch (error) {
      console.error('Error getting top cryptocurrencies:', error);
      throw error;
    }
  }
  
  /**
   * Get detailed information about a specific cryptocurrency
   * @param id Cryptocurrency ID
   * @returns Promise resolving to a CryptocurrencyDetails object
   */
  async getCryptocurrencyDetails(id: string): Promise<CryptocurrencyDetails> {
    try {
      const response = await this.apiClient.get<any[]>('/ticker/', { id });
      
      if (!response || !Array.isArray(response) || response.length === 0) {
        throw new Error(`Cryptocurrency with ID ${id} not found`);
      }
      
      return CryptocurrencyDetails.fromApiResponse(response[0]);
    } catch (error) {
      console.error(`Error getting cryptocurrency details for ID ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Get multiple cryptocurrencies by their IDs
   * @param ids Array of cryptocurrency IDs
   * @returns Promise resolving to an array of Cryptocurrency objects
   */
  async getCryptocurrenciesByIds(ids: string[]): Promise<Cryptocurrency[]> {
    try {
      if (ids.length === 0) {
        return [];
      }
      
      const idParam = ids.join(',');
      const response = await this.apiClient.get<any[]>('/ticker/', { id: idParam });
      
      if (!response || !Array.isArray(response) || response.length === 0) {
        return [];
      }
      
      return Cryptocurrency.fromApiResponseArray(response);
    } catch (error) {
      console.error('Error getting cryptocurrencies by IDs:', error);
      throw error;
    }
  }
  
  /**
   * Search for cryptocurrencies by name or symbol
   * @param query Search query string
   * @returns Promise resolving to an array of Cryptocurrency objects
   */
  async searchCryptocurrencies(query: string): Promise<Cryptocurrency[]> {
    try {
      const allCryptos = await this.getTopCryptocurrencies(0, 100);
      const lowercaseQuery = query.toLowerCase();
      
      return allCryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(lowercaseQuery) || 
        crypto.symbol.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error);
      throw error;
    }
  }
  
  /**
   * Obtener los mercados de una criptomoneda específica
   * @param id ID de la criptomoneda
   * @returns Promise que resuelve a un array de objetos Market
   */
  async getCryptocurrencyMarkets(id: string): Promise<Market[]> {
    try {
      const response = await this.apiClient.get<any>('/coin/markets/', { id });
      
      if (!response || !Array.isArray(response)) {
        throw new Error(`No se pudieron recuperar los mercados para la criptomoneda con ID ${id}`);
      }
      
      return Market.fromApiResponseArray(response);
    } catch (error) {
      console.error(`Error al obtener mercados para la criptomoneda con ID ${id}:`, error);
      throw new Error('Error al recuperar datos de mercados');
    }
  }
  
  /**
   * Obtener estadísticas sociales de una criptomoneda específica
   * @param id ID de la criptomoneda
   * @returns Promise que resuelve a un objeto SocialStats
   */
  async getCryptocurrencySocialStats(id: string): Promise<SocialStats> {
    try {
      const response = await this.apiClient.get<any>('/coin/social_stats/', { id });
      
      if (!response) {
        throw new Error(`No se pudieron recuperar las estadísticas sociales para la criptomoneda con ID ${id}`);
      }
      
      return SocialStats.fromApiResponse(response);
    } catch (error) {
      console.error(`Error al obtener estadísticas sociales para la criptomoneda con ID ${id}:`, error);
      throw new Error('Error al recuperar datos de estadísticas sociales');
    }
  }
}