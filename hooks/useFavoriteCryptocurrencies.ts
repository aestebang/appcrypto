import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { FavoritesService } from '@/services/FavoritesService';
import { CryptocurrencyService } from '@/services/CryptocurrencyService';
import { Cryptocurrency } from '@/models/Cryptocurrency';

export const useFavoriteCryptocurrencies = () => {
  const [favorites, setFavorites] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const favoritesService = new FavoritesService();
  const cryptoService = new CryptocurrencyService();

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtener IDs de favoritos
      const favoriteIds = await favoritesService.getFavorites();
      
      if (favoriteIds.length === 0) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }
      
      // Obtener detalles de cada favorito
      const favoritesData = await cryptoService.getCryptocurrenciesByIds(favoriteIds);
      setFavorites(favoritesData);
    } catch (err) {
      setError('Error al cargar favoritos. Por favor, inténtelo de nuevo.');
      console.error('Error al cargar favoritos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleFavorite = useCallback(async (id: string, newValue: boolean) => {
    try {
      // Si estamos en la página de favoritos y se desmarca, eliminar inmediatamente
      if (!newValue) {
        // Actualizar la UI eliminando el elemento
        setFavorites(prev => prev.filter(crypto => crypto.id !== id));
        // Luego actualizar el almacenamiento
        await favoritesService.removeFavorite(id);
      }
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
      // Si ocurre un error, recargar los favoritos
      loadFavorites();
    }
  }, [loadFavorites]);

  // Suscribirse a cambios en favoritos
  useEffect(() => {
    loadFavorites();
    
    const unsubscribe = favoritesService.subscribe(() => {
      loadFavorites();
    });
    
    return () => unsubscribe();
  }, [loadFavorites]);

  // Recargar favoritos cuando el componente recibe el foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return {
    favorites,
    isLoading,
    error,
    loadFavorites,
    handleToggleFavorite
  };
}; 