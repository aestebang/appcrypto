import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface ErrorMessageProps {
  message: string | null;
  onRetry?: () => void;
  theme: ThemeColors;
}

export default function ErrorMessage({ message, onRetry, theme }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color={theme.error} style={styles.icon} />
      
      <Text style={[styles.message, { color: theme.text }]}>
        {message || 'Ha ocurrido un error'}
      </Text>
      
      {onRetry && (
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.primary }]} 
          onPress={onRetry}
        >
          <RefreshCw size={20} color="#FFFFFF" style={styles.retryIcon} />
          <Text style={styles.retryText}>Intentar de nuevo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});