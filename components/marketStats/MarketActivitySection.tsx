import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatsCard from '@/components/StatsCard';
import { formatNumber } from '@/utils/formatters';
import { MarketStats } from '@/models/MarketStats';

interface MarketActivitySectionProps {
  marketStats: MarketStats | null;
  theme: any;
}

export default function MarketActivitySection({ marketStats, theme }: MarketActivitySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Actividad del Mercado</Text>
      
      <StatsCard 
        title="Monedas Activas" 
        value={formatNumber(marketStats?.activeCryptocurrencies || 0)}
        theme={theme}
      />
      
      <StatsCard 
        title="Mercados Activos" 
        value={formatNumber(marketStats?.activeExchanges || 0)}
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