import { useState, useEffect, useCallback } from 'react';
import { CryptocurrencyService } from '@/services/CryptocurrencyService';
import { Cryptocurrency } from '@/models/Cryptocurrency';

type SortBy = 'rank' | 'price' | 'change';
type SortOrder = 'asc' | 'desc';

export const useCryptocurrencies = () => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const cryptoService = new CryptocurrencyService();

  const loadCryptos = useCallback(async () => {
    try {
      setError(null);
      const data = await cryptoService.getTopCryptocurrencies();
      setCryptos(data);
      applyFilters(data, searchQuery, sortBy, sortOrder);
    } catch (err) {
      setError('Error al cargar datos de criptomonedas. Por favor, inténtelo de nuevo.');
      console.error('Error al cargar criptomonedas:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, sortBy, sortOrder]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadCryptos();
  }, [loadCryptos]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    applyFilters(cryptos, query, sortBy, sortOrder);
  }, [cryptos, sortBy, sortOrder]);

  const handleSortChange = useCallback((newSortBy: SortBy) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    applyFilters(cryptos, searchQuery, newSortBy, newSortOrder);
  }, [cryptos, searchQuery, sortBy, sortOrder]);

  const applyFilters = useCallback((
    data: Cryptocurrency[], 
    query: string, 
    currentSortBy: SortBy,
    currentSortOrder: SortOrder
  ) => {
    let result = [...data];
    
    // Aplicar filtro de búsqueda
    if (query) {
      result = result.filter(
        crypto => 
          crypto.name.toLowerCase().includes(query.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Aplicar ordenamiento
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (currentSortBy) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'price':
          comparison = a.priceUsd - b.priceUsd;
          break;
        case 'change':
          comparison = a.percentChange24h - b.percentChange24h;
          break;
      }
      
      return currentSortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredCryptos(result);
  }, []);

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

  return {
    cryptos,
    filteredCryptos,
    isLoading,
    isRefreshing,
    error,
    searchQuery,
    sortBy,
    sortOrder,
    loadCryptos,
    handleRefresh,
    handleSearch,
    handleSortChange
  };
}; 