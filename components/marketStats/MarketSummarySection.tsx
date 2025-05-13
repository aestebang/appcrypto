import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatsCard from '@/components/StatsCard';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { MarketStats } from '@/models/MarketStats';

interface MarketSummarySectionProps {
  marketStats: MarketStats | null;
  theme: any;
}

export default function MarketSummarySection({ marketStats, theme }: MarketSummarySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Resumen del Mercado</Text>
      
      <StatsCard 
        title="Capitalización Total" 
        value={formatCurrency(marketStats?.totalMarketCap || 0)}
        change={marketStats?.marketCapChange24h || 0}
        theme={theme}
      />
      
      <StatsCard 
        title="Volumen 24h" 
        value={formatCurrency(marketStats?.total24hVolume || 0)}
        change={marketStats?.volumeChange24h || 0}
        theme={theme}
      />

      <StatsCard 
        title="Cambio Promedio (24h)" 
        value={formatPercentage(marketStats?.avgChangePercent || 0)}
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
}); 