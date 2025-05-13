import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import CryptoListItem from '@/components/CryptoListItem';
import EmptyState from '@/components/EmptyState';
import { getThemeColors } from '@/utils/theme';
import { useFavoriteCryptocurrencies } from '@/hooks/useFavoriteCryptocurrencies';

export default function FavoritesScreen() {
  const { favorites, isLoading, error, handleToggleFavorite } = useFavoriteCryptocurrencies();
  
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{ 
          title: 'Criptomonedas Favoritas',
          headerTitleStyle: { color: theme.text },
          headerStyle: { backgroundColor: theme.background },
        }} 
      />
      
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
        </View>
      ) : favorites.length === 0 ? (
        <EmptyState 
          title="Sin Favoritos Aún"
          message="Agrega criptomonedas a tus favoritos para seguirlas aquí"
          icon="star"
          theme={theme}
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CryptoListItem 
              crypto={item} 
              isFavorite={true}
              theme={theme}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
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
  },
  listContent: {
    paddingBottom: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});