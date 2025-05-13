import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TradingPair } from '@/models/ExchangeDetails';
import { ThemeColors } from '@/utils/theme';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface TradingPairsListProps {
  pairs: TradingPair[];
  theme: ThemeColors;
  maxPairs?: number;
}

export default function TradingPairsList({ pairs, theme, maxPairs = 20 }: TradingPairsListProps) {
  if (!pairs || pairs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          No hay pares de trading disponibles
        </Text>
      </View>
    );
  }

  // Ordenar los pares por volumen y tomar solo los primeros N
  const sortedPairs = [...pairs]
    .sort((a, b) => b.volumeUsd24h - a.volumeUsd24h)
    .slice(0, maxPairs);

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Principales Pares de Trading ({pairs.length})
      </Text>
      
      {sortedPairs.map((pair, index) => (
        <View 
          key={`${pair.base}-${pair.quote || 'unknown'}-${index}`} 
          style={[
            styles.pairRow,
            { borderBottomColor: theme.border || 'rgba(0,0,0,0.05)' },
            index === sortedPairs.length - 1 && styles.lastRow
          ]}
        >
          <View style={styles.pairInfo}>
            <Text style={[styles.pairName, { color: theme.text }]}>
              {pair.base}{pair.quote ? `/${pair.quote}` : ''}
            </Text>
            <Text style={[styles.pairVolume, { color: theme.secondaryText }]}>
              Vol: {formatCurrency(pair.volumeUsd24h)}
            </Text>
          </View>
          <View style={styles.pairPriceCol}>
            <Text style={[styles.pairPrice, { color: theme.text }]}>
              {formatCurrency(pair.priceUsd || pair.price)}
            </Text>
            <Text style={[styles.volumePercent, { color: theme.secondaryText }]}>
              {pair.volumePercent ? formatPercentage(pair.volumePercent) : ''}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  pairRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  pairInfo: {
    flex: 1,
  },
  pairName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  pairVolume: {
    fontSize: 14,
  },
  pairPriceCol: {
    alignItems: 'flex-end',
  },
  pairPrice: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  volumePercent: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
}); 