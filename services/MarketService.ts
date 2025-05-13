import { ApiClient } from './ApiClient';
import { MarketStats } from '@/models/MarketStats';

/**
 * Service for retrieving global market statistics
 */
export class MarketService {
  private apiClient: ApiClient;
  
  constructor() {
    this.apiClient = ApiClient.getInstance();
  }
  
  /**
   * Get global cryptocurrency market statistics
   * @returns Promise resolving to a MarketStats object
   */
  async getGlobalMarketStats(): Promise<MarketStats> {
    try {
      const response = await this.apiClient.get<any[]>('/global/');
      
      if (!response || !Array.isArray(response) || response.length === 0) {
        throw new Error('Global market data not available');
      }
      
      return MarketStats.fromApiResponse(response[0]);
    } catch (error) {
      console.error('Error getting global market stats:', error);
      throw new Error('Failed to fetch global market statistics');
    }
  }
}