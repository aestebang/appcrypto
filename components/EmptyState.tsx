import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star, Search, AlertCircle } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: 'star' | 'search' | 'alert';
  theme: ThemeColors;
}

export default function EmptyState({ title, message, icon, theme }: EmptyStateProps) {
  const renderIcon = () => {
    const size = 64;
    const color = theme.secondary;
    
    switch (icon) {
      case 'star':
        return <Star size={size} color={color} />;
      case 'search':
        return <Search size={size} color={color} />;
      case 'alert':
        return <AlertCircle size={size} color={color} />;
      default:
        return <Star size={size} color={color} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      
      <Text style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.message, { color: theme.secondaryText }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
  },
});