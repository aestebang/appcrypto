import React from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getThemeColors } from '@/utils/theme';
import { useExchangeDetails } from '@/hooks/useExchangeDetails';

// Componentes modulares
import ExchangeInfoCard, { 
  ExchangeMarketInfoCard, 
  ExchangeDescriptionCard 
} from '@/components/exchange/ExchangeInfoCard';
import TradingPairsList from '@/components/exchange/TradingPairsList';
import ExchangeErrorView from '@/components/exchange/ExchangeErrorView';
import LoadingView from '@/components/exchange/LoadingView';

export default function ExchangeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);
  
  const {
    exchange,
    isLoading,
    error,
    loadExchangeDetails,
    openExchangeWebsite,
    showDebugInfo,
    goBack
  } = useExchangeDetails(id);

  // Configuración de la pantalla común para todas las vistas
  const screenOptions = { 
    headerTitleStyle: { color: theme.text },
    headerStyle: { backgroundColor: theme.background },
    headerTintColor: theme.text,
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen 
          options={{ 
            title: 'Cargando...',
            ...screenOptions
          }} 
        />
        <LoadingView theme={theme} message="Cargando detalles del exchange..." />
      </View>
    );
  }

  if (error || !exchange) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen 
          options={{ 
            title: 'Error',
            ...screenOptions
          }} 
        />
        <ExchangeErrorView 
          error={error}
          theme={theme}
          onRetry={loadExchangeDetails}
          onGoBack={goBack}
          onShowDebugInfo={showDebugInfo}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{ 
          title: exchange.name,
          ...screenOptions
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Información básica del exchange */}
        <ExchangeInfoCard 
          exchange={exchange}
          theme={theme}
          onOpenWebsite={openExchangeWebsite}
          onShowDebugInfo={showDebugInfo}
        />
        
        {/* Información del mercado */}
        <ExchangeMarketInfoCard 
          exchange={exchange}
          theme={theme}
          onOpenWebsite={openExchangeWebsite}
        />
        
        {/* Descripción del exchange */}
        <ExchangeDescriptionCard 
          exchange={exchange}
          theme={theme}
        />
        
        {/* Lista de pares de trading */}
        {exchange.tradingPairs && exchange.tradingPairs.length > 0 && (
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <TradingPairsList 
              pairs={exchange.tradingPairs}
              theme={theme}
              maxPairs={20}
            />
          </View>
        )}
      </ScrollView>
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
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
}); 