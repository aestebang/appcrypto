import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemeColors } from '@/utils/theme';

interface LoadingViewProps {
  theme: ThemeColors;
  message?: string;
}

export default function LoadingView({ theme, message }: LoadingViewProps) {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primary || "#1E88E5"} />
      <Text style={[styles.loadingText, { color: theme.text }]}>
        {message || 'Cargando...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
}); 