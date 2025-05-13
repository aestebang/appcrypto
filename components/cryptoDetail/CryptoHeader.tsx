import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CryptocurrencyDetails } from '@/models/CryptocurrencyDetails';

interface CryptoHeaderProps {
  crypto: CryptocurrencyDetails;
  theme: any;
}

export default function CryptoHeader({ crypto, theme }: CryptoHeaderProps) {
  const logoUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

  return (
    <View style={styles.header}>
      <Image 
        source={{ uri: logoUrl }} 
        style={styles.logo}
        defaultSource={require('@/assets/images/crypto-placeholder.png')}
      />
      <View style={styles.headerInfo}>
        <Text style={[styles.symbol, { color: theme.text }]}>{crypto.symbol}</Text>
        <Text style={[styles.rank, { color: theme.secondary }]}>Rank #{crypto.rank}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rank: {
    fontSize: 16,
  },
}); 