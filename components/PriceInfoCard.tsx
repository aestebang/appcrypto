import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface PriceInfoCardProps {
  price: string;
  priceChange: number;
  theme: ThemeColors;
}

export default function PriceInfoCard({ price, priceChange, theme }: PriceInfoCardProps) {
  // Determine price change color
  const changeColor = priceChange >= 0 ? theme.success : theme.error;

  // Format price change percentage
  const formattedChange = `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
        Current Price
      </Text>
      
      <Text style={[styles.price, { color: theme.text }]}>
        {price}
      </Text>
      
      <View style={styles.changeContainer}>
        {priceChange >= 0 ? (
          <TrendingUp size={20} color={changeColor} style={styles.icon} />
        ) : (
          <TrendingDown size={20} color={changeColor} style={styles.icon} />
        )}
        
        <Text style={[styles.changeText, { color: changeColor }]}>
          {formattedChange} (24h)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});