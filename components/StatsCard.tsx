import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  theme: ThemeColors;
}

export default function StatsCard({ title, value, change, theme }: StatsCardProps) {
  // Determine if change should be displayed
  const showChange = change !== undefined;
  
  // Determine change color
  const changeColor = !showChange ? theme.text : 
    change >= 0 ? theme.success : theme.error;
  
  // Format change percentage
  const formattedChange = showChange 
    ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` 
    : null;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.secondaryText }]}>
        {title}
      </Text>
      
      <Text style={[styles.value, { color: theme.text }]}>
        {value}
      </Text>
      
      {showChange && (
        <View style={styles.changeContainer}>
          {change >= 0 ? (
            <TrendingUp size={16} color={changeColor} style={styles.icon} />
          ) : (
            <TrendingDown size={16} color={changeColor} style={styles.icon} />
          )}
          
          <Text style={[styles.changeText, { color: changeColor }]}>
            {formattedChange}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
});