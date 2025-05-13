import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Service for managing favorite cryptocurrencies
 * Implements the Observer pattern to notify subscribers of changes
 */
export class FavoritesService {
  private static STORAGE_KEY = 'crypto_favorites';
  private subscribers: (() => void)[] = [];
  
  /**
   * Get all favorite cryptocurrency IDs
   * @returns Promise resolving to an array of cryptocurrency IDs
   */
  async getFavorites(): Promise<string[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FavoritesService.STORAGE_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }
  
  /**
   * Add a cryptocurrency to favorites
   * @param id Cryptocurrency ID to add
   * @returns Promise resolving when operation is complete
   */
  async addFavorite(id: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      
      if (!favorites.includes(id)) {
        favorites.push(id);
        await AsyncStorage.setItem(
          FavoritesService.STORAGE_KEY, 
          JSON.stringify(favorites)
        );
        this.notifySubscribers();
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw new Error('Failed to add to favorites');
    }
  }
  
  /**
   * Remove a cryptocurrency from favorites
   * @param id Cryptocurrency ID to remove
   * @returns Promise resolving when operation is complete
   */
  async removeFavorite(id: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
      
      await AsyncStorage.setItem(
        FavoritesService.STORAGE_KEY, 
        JSON.stringify(updatedFavorites)
      );
      this.notifySubscribers();
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw new Error('Failed to remove from favorites');
    }
  }
  
  /**
   * Check if a cryptocurrency is in favorites
   * @param id Cryptocurrency ID to check
   * @returns Promise resolving to a boolean indicating if the crypto is a favorite
   */
  async isFavorite(id: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.includes(id);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
  
  /**
   * Subscribe to changes in favorites
   * @param callback Function to call when favorites change
   * @returns Function to unsubscribe
   */
  subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }
  
  /**
   * Notify all subscribers of changes
   */
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }
}