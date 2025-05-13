import { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ExchangeService } from '@/services/ExchangeService';
import { ExchangeDetails } from '@/models/ExchangeDetails';

export function useExchangeDetails(id?: string) {
  const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  const router = useRouter();
  const exchangeService = new ExchangeService();

  const loadExchangeDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo(null);
      
      if (!id) {
        setError('ID de exchange no válido');
        setIsLoading(false);
        return;
      }
      
      console.log(`Cargando detalles para exchange ID: ${id}`);
      const exchangeId = Array.isArray(id) ? id[0] : id;
      const details = await exchangeService.getExchangeDetails(exchangeId);
      
      console.log(`Detalles obtenidos: ${details.name}, pares: ${details.tradingPairs?.length || 0}`);
      setExchange(details);
      
      setDebugInfo(`Exchange: ${details.name}, ${details.tradingPairs?.length || 0} pares de trading cargados`);
    } catch (err: any) {
      const errorMessage = err?.message || 'Error desconocido';
      setError(`Error al cargar los detalles del exchange: ${errorMessage}`);
      console.error('Error al cargar detalles del exchange:', err);
      setDebugInfo(`Error técnico: ${JSON.stringify(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openExchangeWebsite = async (url: string) => {
    if (!url) return;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error al abrir enlace:', error);
    }
  };
  
  const showDebugInfo = () => {
    if (debugInfo) {
      Alert.alert('Información de depuración', debugInfo);
    }
  };
  
  const goBack = () => {
    router.push('/');
  };

  useEffect(() => {
    loadExchangeDetails();
  }, [id]);

  return {
    exchange,
    isLoading,
    error,
    debugInfo,
    loadExchangeDetails,
    openExchangeWebsite,
    showDebugInfo,
    goBack
  };
} 