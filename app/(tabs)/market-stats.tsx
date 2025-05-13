import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, useColorScheme, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import ErrorMessage from '@/components/ErrorMessage';
import { getThemeColors } from '@/utils/theme';
import { useMarketStats } from '@/hooks/useMarketStats';

// Secciones
import MarketSummarySection from '@/components/marketStats/MarketSummarySection';
import MarketDominanceSection from '@/components/marketStats/MarketDominanceSection';
import MarketActivitySection from '@/components/marketStats/MarketActivitySection';
import MarketAllTimeHighsSection from '@/components/marketStats/MarketAllTimeHighsSection';

export default function MarketStatsScreen() {
  const {
    marketStats,
    isLoading,
    isRefreshing,
    error,
    loadMarketStats,
    handleRefresh
  } = useMarketStats();
  
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);

  if (isLoading && !isRefreshing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen 
          options={{ 
            title: 'Estadísticas del Mercado',
            headerTitleStyle: { color: theme.text },
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
          }} 
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      </View>
    );
  }

  if (error && !marketStats) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen 
          options={{ 
            title: 'Estadísticas del Mercado',
            headerTitleStyle: { color: theme.text },
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
          }} 
        />
        <ErrorMessage 
          message={error || 'No se pudieron cargar las estadísticas del mercado'}
          onRetry={loadMarketStats} 
          theme={theme} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{ 
          title: 'Estadísticas del Mercado',
          headerTitleStyle: { color: theme.text },
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
        }} 
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#1E88E5']}
            tintColor={theme.tint}
          />
        }
      >
        <MarketSummarySection marketStats={marketStats} theme={theme} />
        <MarketDominanceSection marketStats={marketStats} theme={theme} />
        <MarketActivitySection marketStats={marketStats} theme={theme} />
        <MarketAllTimeHighsSection marketStats={marketStats} theme={theme} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  }
});