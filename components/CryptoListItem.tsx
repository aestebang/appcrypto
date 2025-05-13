import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, TrendingUp, TrendingDown } from 'lucide-react-native';
import { Cryptocurrency } from '@/models/Cryptocurrency';
import { ThemeColors } from '@/utils/theme';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface CryptoListItemProps {
  crypto: Cryptocurrency;
  isFavorite?: boolean;
  theme: ThemeColors;
  onToggleFavorite?: (id: string, newValue: boolean) => void;
}

export default function CryptoListItem({ crypto, isFavorite = false, theme, onToggleFavorite }: CryptoListItemProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/crypto/${crypto.id}`);
  };
  
  const handleFavoritePress = (e: React.MouseEvent | any) => {
    e.stopPropagation && e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(crypto.id, !isFavorite);
    }
  };
  
  // Determine color for price change
  const priceChangeColor = crypto.percentChange24h >= 0 ? theme.success : theme.error;
  
  // Logo URL for the cryptocurrency
  const logoUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.cardBackground }]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankText, { color: theme.secondary }]}>
            {crypto.rank}
          </Text>
        </View>
        
        <Image 
          source={{ uri: logoUrl }} 
          style={styles.logo}
          defaultSource={require('@/assets/images/crypto-placeholder.png')}
        />
        
        <View style={styles.nameContainer}>
          <Text style={[styles.symbol, { color: theme.text }]}>
            {crypto.symbol}
          </Text>
          <Text style={[styles.name, { color: theme.secondaryText }]}>
            {crypto.name}
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={[styles.price, { color: theme.text }]}>
          {formatCurrency(crypto.priceUsd)}
        </Text>
        
        <View style={styles.changeContainer}>
          {crypto.percentChange24h >= 0 ? (
            <TrendingUp size={16} color={priceChangeColor} />
          ) : (
            <TrendingDown size={16} color={priceChangeColor} />
          )}
          
          <Text style={[styles.changeText, { color: priceChangeColor }]}>
            {formatPercentage(crypto.percentChange24h)}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteIcon} activeOpacity={0.7}>
        <Star size={20} color={isFavorite ? '#FFD700' : theme.secondaryText} fill={isFavorite ? '#FFD700' : 'transparent'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  favoriteIcon: {
    marginLeft: 8,
  },
});