import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { MarketService } from '@/services/MarketService';
import { MarketStats } from '@/models/MarketStats';

export const useMarketStats = () => {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const marketService = new MarketService();

  const loadMarketStats = useCallback(async () => {
    try {
      if (!isRefreshing) setIsLoading(true);
      setError(null);
      
      const stats = await marketService.getGlobalMarketStats();
      setMarketStats(stats);
    } catch (err) {
      setError('No se pudieron cargar las estadísticas del mercado. Inténtalo de nuevo');
      console.error('Error al cargar estadísticas del mercado:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadMarketStats();
  }, [loadMarketStats]);

  useEffect(() => {
    loadMarketStats();
  }, [loadMarketStats]);
  
  // Recargar los datos cuando la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      loadMarketStats();
    }, [loadMarketStats])
  );

  return {
    marketStats,
    isLoading,
    isRefreshing,
    error,
    loadMarketStats,
    handleRefresh
  };
}; 