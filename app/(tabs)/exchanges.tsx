import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, useColorScheme, RefreshControl, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { getThemeColors } from '@/utils/theme';
import ErrorMessage from '@/components/ErrorMessage';
import SearchBar from '@/components/SearchBar';
import { useExchanges } from '@/hooks/useExchanges';
import ExchangeListItem from '@/components/exchange/ExchangeListItem';

export default function ExchangesScreen() {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);
  
  const {
    filteredExchanges,
    isLoading,
    isRefreshing,
    error,
    loadExchanges,
    handleRefresh,
    handleSearch,
    navigateToExchangeDetails,
    showDebugInfo
  } = useExchanges();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{ 
          title: 'Exchanges',
          headerTitleStyle: { color: theme.text },
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
        }} 
      />
      
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Buscar exchanges..."
        theme={theme} 
      />
      
      {isLoading && !isRefreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <ErrorMessage 
            message={error} 
            onRetry={loadExchanges} 
            theme={theme} 
          />
          <TouchableOpacity style={styles.debugButton} onPress={showDebugInfo}>
            <Text style={[styles.debugButtonText, {color: theme.primary}]}>
              Mostrar información técnica
            </Text>
          </TouchableOpacity>
        </View>
      ) : filteredExchanges.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.noResultsText, { color: theme.text }]}>
            No se encontraron exchanges
          </Text>
          <TouchableOpacity style={styles.debugButton} onPress={showDebugInfo}>
            <Text style={[styles.debugButtonText, {color: theme.primary}]}>
              Mostrar información técnica
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredExchanges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExchangeListItem
              exchange={item}
              theme={theme}
              onPress={navigateToExchangeDetails}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#1E88E5']}
              tintColor={theme.tint}
            />
          }
        />
      )}
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
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  debugButton: {
    marginTop: 20,
    padding: 10,
  },
  debugButtonText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
}); 