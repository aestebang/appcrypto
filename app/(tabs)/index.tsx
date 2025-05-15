import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import CryptoListItem from '@/components/CryptoListItem';
import FilterOptions from '@/components/FilterOptions';
import ErrorMessage from '@/components/ErrorMessage';
import { getThemeColors } from '@/utils/theme';
import { Redirect } from 'expo-router';
import { useCryptocurrencies } from '@/hooks/useCryptocurrencies';
import { useFavorites } from '@/hooks/useFavorites';
import SafeView from '../../app/components/SafeView';

export default function MarketScreen() {
  const {
    filteredCryptos,
    isLoading,
    isRefreshing,
    error,
    sortBy,
    sortOrder,
    loadCryptos,
    handleRefresh,
    handleSearch,
    handleSortChange
  } = useCryptocurrencies();
  
  const { favoriteIds, handleToggleFavorite } = useFavorites();
  
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);

  return (
    <SafeView style={[styles.container, { backgroundColor: theme.background }]}>
      
      <SearchBar onSearch={handleSearch} theme={theme} />
      <FilterOptions 
        sortBy={sortBy} 
        sortOrder={sortOrder} 
        onSortChange={handleSortChange}
        theme={theme}
      />
      
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      ) : error ? (
        <ErrorMessage 
          message={error} 
          onRetry={loadCryptos} 
          theme={theme}
        />
      ) : filteredCryptos.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.noResultsText, { color: theme.text }]}>
            No se encontraron criptomonedas
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCryptos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CryptoListItem 
              crypto={item} 
              theme={theme} 
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#1E88E5']}
              tintColor={theme.tint}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeView>
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
  listContent: {
    paddingBottom: 20,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export function Index() {
  return <Redirect href="/(tabs)" />;
}