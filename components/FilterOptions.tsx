import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';
import { useSortOptions } from '@/hooks/useSortOptions';

interface FilterOptionsProps {
  sortBy: 'rank' | 'price' | 'change';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'rank' | 'price' | 'change') => void;
  theme: ThemeColors;
}

export default function FilterOptions({ 
  sortBy, 
  sortOrder, 
  onSortChange,
  theme 
}: FilterOptionsProps) {
  const { isSortActive, handleSortChange } = useSortOptions({
    sortBy,
    sortOrder,
    onSortChange
  });
  
  const renderSortButton = (
    label: string, 
    value: 'rank' | 'price' | 'change'
  ) => {
    const isActive = isSortActive(value);
    
    return (
      <TouchableOpacity
        style={[
          styles.sortButton,
          isActive && { backgroundColor: theme.primary + '20' }, // Add transparency
        ]}
        onPress={() => handleSortChange(value)}
      >
        <Text style={[
          styles.sortButtonText, 
          { color: isActive ? theme.primary : theme.secondaryText }
        ]}>
          {label}
        </Text>
        
        {isActive && (
          sortOrder === 'asc' ? 
            <ArrowUp size={16} color={theme.primary} /> : 
            <ArrowDown size={16} color={theme.primary} />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.secondaryText }]}>Ordenar por:</Text>
      
      <View style={styles.buttonsContainer}>
        {renderSortButton('Ranking', 'rank')}
        {renderSortButton('Precio', 'price')}
        {renderSortButton('Cambio (24h)', 'change')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});