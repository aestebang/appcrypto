import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatPercentage } from '@/utils/formatters';

interface PriceChangesCardProps {
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d?: number | null;
  theme: any;
}

export default function PriceChangesCard({ 
  percentChange1h, 
  percentChange24h, 
  percentChange7d, 
  percentChange30d, 
  theme 
}: PriceChangesCardProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Cambios de Precio</Text>
      <View style={[styles.dataCard, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>1 hora</Text>
          <Text style={[
            styles.dataValue, 
            { color: percentChange1h >= 0 ? theme.success : theme.error }
          ]}>
            {formatPercentage(percentChange1h)}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>24 horas</Text>
          <Text style={[
            styles.dataValue, 
            { color: percentChange24h >= 0 ? theme.success : theme.error }
          ]}>
            {formatPercentage(percentChange24h)}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>7 días</Text>
          <Text style={[
            styles.dataValue, 
            { color: percentChange7d >= 0 ? theme.success : theme.error }
          ]}>
            {formatPercentage(percentChange7d)}
          </Text>
        </View>
        {percentChange30d !== null && percentChange30d !== undefined && (
          <View style={styles.dataRow}>
            <Text style={[styles.dataLabel, { color: theme.secondaryText }]}>30 días</Text>
            <Text style={[
              styles.dataValue, 
              { color: percentChange30d >= 0 ? theme.success : theme.error }
            ]}>
              {formatPercentage(percentChange30d)}
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