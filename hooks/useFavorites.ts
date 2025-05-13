import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { FavoritesService } from '@/services/FavoritesService';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const favoritesService = new FavoritesService();

  const loadFavorites = useCallback(async () => {
    const ids = await favoritesService.getFavorites();
    setFavoriteIds(ids);
  }, []);

  const handleToggleFavorite = useCallback(async (id: string, newValue: boolean) => {
    try {
      if (newValue) {
        setFavoriteIds(prev => [...prev, id]);
        await favoritesService.addFavorite(id);
      } else {
        setFavoriteIds(prev => prev.filter(favId => favId !== id));
        await favoritesService.removeFavorite(id);
      }
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
      loadFavorites();
    }
  }, [loadFavorites]);

  useEffect(() => {
    loadFavorites();
    const unsubscribe = favoritesService.subscribe(() => {
      loadFavorites();
    });
    return () => unsubscribe();
  }, [loadFavorites]);

  // Recargar los favoritos cuando el componente recibe el foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return {
    favoriteIds,
    loadFavorites,
    handleToggleFavorite
  };
}; 