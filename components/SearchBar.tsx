import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  theme: ThemeColors;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Buscar criptomonedas...',
  theme
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch(text);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer, 
        { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        }
      ]}>
        <Search size={20} color={theme.secondaryText} style={styles.searchIcon} />
        
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.secondaryText}
          value={query}
          onChangeText={handleChangeText}
        />
        
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={20} color={theme.secondaryText} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
});