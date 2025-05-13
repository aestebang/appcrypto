import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface PriceSectionProps {
  priceUsd: number;
  percentChange24h: number;
  theme: any;
}

export default function PriceSection({ priceUsd, percentChange24h, theme }: PriceSectionProps) {
  const priceChangeColor = percentChange24h >= 0 ? theme.success : theme.error;

  return (
    <View style={styles.priceSection}>
      <Text style={[styles.price, { color: theme.text }]}>
        {formatCurrency(priceUsd)}
      </Text>
      <View style={styles.priceChangeContainer}>
        {percentChange24h >= 0 ? (
          <TrendingUp size={20} color={priceChangeColor} />
        ) : (
          <TrendingDown size={20} color={priceChangeColor} />
        )}
        <Text style={[styles.priceChange, { color: priceChangeColor }]}>
          {formatPercentage(percentChange24h)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priceSection: {
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 