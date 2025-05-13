import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency, formatLargeNumber } from '@/utils/formatters';

interface MarketDataCardProps {
  marketCapUsd: number;
  volume24: number;
  volume24a?: number;
  circulatingSupply: number;
  maxSupply?: number;
  totalSupply?: number;
  symbol: string;
  priceBtc: number;
  theme: any;
}

export default function MarketDataCard({ 
  marketCapUsd, 
  volume24,
  volume24a, 
  circulatingSupply, 
  maxSupply,
  totalSupply, 
  symbol,
  priceBtc,
  theme 
}: MarketDataCardProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Datos de Mercado</Text>
      <View style={[styles.dataCard, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Capitalización de Mercado</Text>
          <Text style={[styles.dataValue, { color: theme.text }]}>
            {formatCurrency(marketCapUsd)}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Precio (BTC)</Text>
          <Text style={[styles.dataValue, { color: theme.text }]}>
            {priceBtc} BTC
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Volumen (24h)</Text>
          <Text style={[styles.dataValue, { color: theme.text }]}>
            {formatCurrency(volume24)}
          </Text>
        </View>
        {volume24a && (
          <View style={styles.dataRow}>
            <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Volumen Alt (24h)</Text>
            <Text style={[styles.dataValue, { color: theme.text }]}>
              {formatCurrency(volume24a)}
            </Text>
          </View>
        )}
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Suministro Circulante</Text>
          <Text style={[styles.dataValue, { color: theme.text }]}>
            {formatLargeNumber(circulatingSupply)} {symbol}
          </Text>
        </View>
        {totalSupply && (
          <View style={styles.dataRow}>
            <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Suministro Total</Text>
            <Text style={[styles.dataValue, { color: theme.text }]}>
              {formatLargeNumber(totalSupply)} {symbol}
            </Text>
          </View>
        )}
        {maxSupply && (
          <View style={styles.dataRow}>
            <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>Suministro Máximo</Text>
            <Text style={[styles.dataValue, { color: theme.text }]}>
              {formatLargeNumber(maxSupply)} {symbol}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  dataCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  dataLabel: {
    fontSize: 16,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 