import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ExchangeService } from '@/services/ExchangeService';
import { Exchange } from '@/models/Exchange';

export function useExchanges() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [filteredExchanges, setFilteredExchanges] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  const router = useRouter();
  const exchangeService = new ExchangeService();

  const loadExchanges = useCallback(async () => {
    try {
      setError(null);
      setDebugInfo(null);
      if (!isRefreshing) setIsLoading(true);
      
      console.log("Iniciando carga de exchanges...");
      const data = await exchangeService.getAllExchanges();
      console.log(`Obtenidos ${data.length} exchanges`);
      
      // Verificar si hay datos válidos
      if (!data || data.length === 0) {
        setDebugInfo("La API devolvió datos pero el array está vacío");
        setError('No se pudieron cargar los exchanges. La API no devolvió datos válidos.');
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }
      
      // Log para depuración
      setDebugInfo(`Cargados ${data.length} exchanges correctamente`);
      
      // Ordenar por volumen
      const sortedExchanges = data.sort((a, b) => b.volumeUsd24h - a.volumeUsd24h);
      
      setExchanges(sortedExchanges);
      applyFilters(sortedExchanges, searchQuery);
    } catch (err: any) {
      const errorMessage = err?.message || 'Error desconocido';
      console.error('Error al cargar exchanges:', err);
      setError(`Error al cargar datos de exchanges: ${errorMessage}`);
      setDebugInfo(`Error técnico: ${JSON.stringify(err)}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, isRefreshing]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadExchanges();
  }, [loadExchanges]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    applyFilters(exchanges, query);
  }, [exchanges]);

  const applyFilters = useCallback((data: Exchange[], query: string) => {
    if (!query) {
      setFilteredExchanges(data);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = data.filter(exchange => 
      exchange.name.toLowerCase().includes(lowercaseQuery) || 
      (exchange.country && exchange.country.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredExchanges(filtered);
  }, []);

  const navigateToExchangeDetails = useCallback((id: string) => {
    router.push({
      pathname: "/exchange/[id]",
      params: { id }
    });
  }, [router]);
  
  const showDebugInfo = useCallback(() => {
    if (debugInfo) {
      Alert.alert('Información de depuración', debugInfo);
    }
  }, [debugInfo]);

  useEffect(() => {
    loadExchanges();
  }, [loadExchanges]);

  return {
    exchanges,
    filteredExchanges,
    isLoading,
    isRefreshing,
    error,
    searchQuery,
    debugInfo,
    loadExchanges,
    handleRefresh,
    handleSearch,
    navigateToExchangeDetails,
    showDebugInfo
  };
} 