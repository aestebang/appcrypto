import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { Exchange } from '@/models/Exchange';
import { ThemeColors } from '@/utils/theme';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface ExchangeListItemProps {
  exchange: Exchange;
  theme: ThemeColors;
  onPress: (id: string) => void;
}

export default function ExchangeListItem({ exchange, theme, onPress }: ExchangeListItemProps) {
  return (
    <TouchableOpacity 
      style={[styles.exchangeItem, { backgroundColor: theme.cardBackground }]}
      onPress={() => onPress(exchange.id)}
    >
      <View style={styles.exchangeHeader}>
        <Text style={[styles.exchangeName, { color: theme.text }]}>
          {exchange.name}
        </Text>
        {exchange.country && (
          <Text style={[styles.exchangeCountry, { color: theme.secondaryText }]}>
            {exchange.country}
          </Text>
        )}
      </View>
      
      <View style={styles.exchangeDetails}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.secondaryText }]}>
            Volumen 24h
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {formatCurrency(exchange.volumeUsd24h)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.secondaryText }]}>
            Pares Activos
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {formatNumber(exchange.activePairs)}
          </Text>
        </View>
      </View>
      
      {exchange.url && (
        <View style={[styles.websiteLink, { borderTopColor: theme.border || 'rgba(0,0,0,0.05)' }]}>
          <ExternalLink size={16} color={theme.primary} />
          <Text style={[styles.websiteText, { color: theme.primary }]} numberOfLines={1}>
            {exchange.url.replace(/https?:\/\/(www\.)?/, '')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  exchangeItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exchangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exchangeName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  exchangeCountry: {
    fontSize: 14,
    marginLeft: 8,
  },
  exchangeDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  websiteText: {
    marginLeft: 6,
    fontSize: 14,
  },
}); 