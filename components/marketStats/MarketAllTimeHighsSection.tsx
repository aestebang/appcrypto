import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatsCard from '@/components/StatsCard';
import { formatCurrency } from '@/utils/formatters';
import { MarketStats } from '@/models/MarketStats';

interface MarketAllTimeHighsSectionProps {
  marketStats: MarketStats | null;
  theme: any;
}

export default function MarketAllTimeHighsSection({ marketStats, theme }: MarketAllTimeHighsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Máximos Históricos</Text>
      
      <StatsCard 
        title="Capitalización Máxima" 
        value={formatCurrency(marketStats?.marketCapATH || 0)}
        theme={theme}
      />
      
      <StatsCard 
        title="Volumen Máximo" 
        value={formatCurrency(marketStats?.volumeATH || 0)}
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