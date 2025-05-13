import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import { CryptocurrencyService } from '@/services/CryptocurrencyService';
import { FavoritesService } from '@/services/FavoritesService';
import { CryptocurrencyDetails } from '@/models/CryptocurrencyDetails';
import { SocialStats } from '@/models/SocialStats';
import ErrorMessage from '@/components/ErrorMessage';
import ExternalLinkButton from '@/components/ExternalLinkButton';
import { getThemeColors } from '@/utils/theme';
import CryptoHeader from '@/components/cryptoDetail/CryptoHeader';
import PriceSection from '@/components/cryptoDetail/PriceSection';
import MarketDataCard from '@/components/cryptoDetail/MarketDataCard';
import PriceChangesCard from '@/components/cryptoDetail/PriceChangesCard';
import SocialStatsCard from '@/components/cryptoDetail/SocialStatsCard';
import LoadingState from '@/components/cryptoDetail/LoadingState';

export default function CryptoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [crypto, setCrypto] = useState<CryptocurrencyDetails | null>(null);
  const [socialStats, setSocialStats] = useState<SocialStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSocialLoading, setIsSocialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);
  
  const cryptoService = new CryptocurrencyService();
  const favoritesService = new FavoritesService();

  const loadCryptoDetails = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const cryptoId = Array.isArray(id) ? id[0] : id;
      const details = await cryptoService.getCryptocurrencyDetails(cryptoId);
      setCrypto(details);
      
      const isFav = await favoritesService.isFavorite(cryptoId);
      setIsFavorite(isFav);
      
      // Cargar las estadísticas sociales
      loadSocialStats(cryptoId);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error al cargar los detalles de la criptomoneda. Por favor, inténtalo de nuevo.';
      setError(errorMessage);
      console.error('Error al cargar detalles de criptomoneda:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadSocialStats = async (cryptoId: string) => {
    try {
      setIsSocialLoading(true);
      const stats = await cryptoService.getCryptocurrencySocialStats(cryptoId);
      setSocialStats(stats);
    } catch (err) {
      console.error('Error al cargar estadísticas sociales:', err);
      // No establecemos error global para no bloquear la pantalla completa
      // si solo fallan las estadísticas sociales
    } finally {
      setIsSocialLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!crypto) return;
    
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(crypto.id);
      } else {
        await favoritesService.addFavorite(crypto.id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error al cambiar favorito:', err);
    }
  };

  useEffect(() => {
    loadCryptoDetails();
  }, [id]);

  if (isLoading) {
    return <LoadingState theme={theme} />;
  }

  if (error || !crypto) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ headerShown: true, title: 'Error' }} />
        <ErrorMessage 
          message={error || 'Criptomoneda no encontrada'} 
          onRetry={loadCryptoDetails}
          theme={theme} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: crypto.name,
          headerTitleStyle: { color: theme.text },
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <Star 
                size={24} 
                color={isFavorite ? '#FFD700' : theme.text} 
                fill={isFavorite ? '#FFD700' : 'transparent'} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CryptoHeader crypto={crypto} theme={theme} />
        
        <PriceSection 
          priceUsd={crypto.priceUsd} 
          percentChange24h={crypto.percentChange24h} 
          theme={theme} 
        />
        
        <MarketDataCard 
          marketCapUsd={crypto.marketCapUsd}
          volume24={crypto.volume24}
          volume24a={crypto.volume24a}
          circulatingSupply={crypto.circulatingSupply}
          maxSupply={crypto.maxSupply}
          totalSupply={crypto.totalSupply}
          symbol={crypto.symbol}
          priceBtc={crypto.priceBtc}
          theme={theme}
        />
        
        <PriceChangesCard 
          percentChange1h={crypto.percentChange1h}
          percentChange24h={crypto.percentChange24h}
          percentChange7d={crypto.percentChange7d}
          percentChange30d={crypto.percentChange30d}
          theme={theme}
        />
        
        <SocialStatsCard 
          socialStats={socialStats}
          isLoading={isSocialLoading}
          theme={theme}
        />
      </ScrollView>
      
      <ExternalLinkButton 
        name={crypto.name}
        nameid={crypto.nameid}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  favoriteButton: {
    padding: 8,
  },
});