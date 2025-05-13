import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface ExchangeErrorViewProps {
  error: string | null;
  theme: ThemeColors;
  onRetry: () => void;
  onGoBack: () => void;
  onShowDebugInfo: () => void;
}

export default function ExchangeErrorView({
  error,
  theme,
  onRetry,
  onGoBack,
  onShowDebugInfo
}: ExchangeErrorViewProps) {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.errorIconContainer}>
        <AlertTriangle size={50} color={theme.error} />
      </View>
      
      <Text style={[styles.errorTitle, { color: theme.error }]}>
        No se pudo cargar el exchange
      </Text>
      
      <Text style={[styles.errorDescription, { color: theme.text }]}>
        {error || 'No se pudo cargar la información del exchange'}
      </Text>
      
      <View style={styles.errorActionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.primary }]} 
          onPress={onRetry}
        >
          <Text style={styles.actionButtonText}>Reintentar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.cardBackground }]} 
          onPress={onGoBack}
        >
          <Text style={[styles.actionButtonText, { color: theme.primary }]}>Volver a la lista</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.debugButton} onPress={onShowDebugInfo}>
        <Text style={[styles.debugButtonText, {color: theme.primary}]}>
          Mostrar información técnica
        </Text>
      </TouchableOpacity>
      
      <Text style={[styles.errorTip, { color: theme.secondaryText }]}>
        Consejo: Es posible que este exchange no esté disponible en la API o tenga un formato no compatible.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorIconContainer: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorActionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  debugButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  debugButtonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  errorTip: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
}); 