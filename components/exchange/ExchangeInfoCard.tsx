import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { ExchangeDetails } from '@/models/ExchangeDetails';
import { ThemeColors } from '@/utils/theme';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface ExchangeInfoCardProps {
  exchange: ExchangeDetails;
  theme: ThemeColors;
  onOpenWebsite: (url: string) => void;
  onShowDebugInfo: () => void;
}

export default function ExchangeInfoCard({ 
  exchange, 
  theme, 
  onOpenWebsite, 
  onShowDebugInfo 
}: ExchangeInfoCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.exchangeName, { color: theme.text }]}>{exchange.name}</Text>
        {exchange.country && (
          <Text style={[styles.country, { color: theme.secondaryText }]}>
            {exchange.country}
          </Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.websiteLink} 
        onPress={() => onOpenWebsite(exchange.url)}
        disabled={!exchange.url}
      >
        <ExternalLink size={16} color={theme.primary} />
        <Text style={[styles.websiteText, { color: theme.primary }]}>
          {exchange.url ? exchange.url.replace(/https?:\/\/(www\.)?/, '') : 'No disponible'}
        </Text>
      </TouchableOpacity>
      
      {/* Botón para mostrar depuración */}
      <TouchableOpacity style={styles.debugButton} onPress={onShowDebugInfo}>
        <Text style={[styles.debugButtonText, {color: theme.primary}]}>
          Info técnica
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function ExchangeMarketInfoCard({ 
  exchange, 
  theme, 
  onOpenWebsite 
}: Omit<ExchangeInfoCardProps, 'onShowDebugInfo'>) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Información del Mercado</Text>
      
      <View style={[styles.infoRow, { borderBottomColor: theme.border || 'rgba(0,0,0,0.05)' }]}>
        <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>Volumen (24h)</Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {formatCurrency(exchange.volumeUsd24h)}
        </Text>
      </View>
      
      <View style={[styles.infoRow, { borderBottomColor: theme.border || 'rgba(0,0,0,0.05)' }]}>
        <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>Pares Activos</Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {formatNumber(exchange.activePairs)}
        </Text>
      </View>
      
      {exchange.dateEstablished && (
        <View style={[styles.infoRow, { borderBottomColor: theme.border || 'rgba(0,0,0,0.05)' }]}>
          <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>Establecido</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {exchange.dateEstablished.getFullYear()}
          </Text>
        </View>
      )}
      
      {exchange.twitterUrl && (
        <TouchableOpacity 
          style={styles.twitterLink} 
          onPress={() => onOpenWebsite(exchange.twitterUrl)}
        >
          <Text style={[styles.twitterText, { color: theme.primary }]}>
            {exchange.twitterUrl.replace(/https?:\/\/(www\.)?twitter\.com\//, '@')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function ExchangeDescriptionCard({ 
  exchange, 
  theme 
}: Pick<ExchangeInfoCardProps, 'exchange' | 'theme'>) {
  if (!exchange.description) {
    return null;
  }
  
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción</Text>
      <Text style={[styles.description, { color: theme.text }]}>
        {exchange.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exchangeName: {
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
  },
  country: {
    fontSize: 16,
    marginLeft: 8,
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteText: {
    marginLeft: 6,
    fontSize: 14,
  },
  debugButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  debugButtonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  twitterLink: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  twitterText: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 