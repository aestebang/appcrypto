import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '@/utils/theme';

interface MarketDataRowProps {
  label: string;
  value: string;
  isPercentage?: boolean;
  theme: ThemeColors;
}

export default function MarketDataRow({ 
  label, 
  value, 
  isPercentage = false,
  theme 
}: MarketDataRowProps) {
  // For percentage values, determine color based on value
  const valueColor = isPercentage
    ? parseFloat(value) >= 0 
      ? theme.success 
      : theme.error
    : theme.text;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.secondaryText }]}>
        {label}
      </Text>
      
      <Text style={[styles.value, { color: valueColor }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});