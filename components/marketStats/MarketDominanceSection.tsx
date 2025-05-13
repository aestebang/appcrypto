import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatsCard from '@/components/StatsCard';
import { formatPercentage } from '@/utils/formatters';
import { MarketStats } from '@/models/MarketStats';

interface MarketDominanceSectionProps {
  marketStats: MarketStats | null;
  theme: any;
}

export default function MarketDominanceSection({ marketStats, theme }: MarketDominanceSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Dominancia del Mercado</Text>
      
      <StatsCard 
        title="Dominancia BTC" 
        value={formatPercentage(marketStats?.btcDominance || 0)}
        theme={theme}
      />

      <StatsCard 
        title="Dominancia ETH" 
        value={formatPercentage(marketStats?.ethDominance || 0)}
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