import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { ThemeColors } from '@/utils/theme';

interface ExternalLinkButtonProps {
  name: string;
  nameid: string;
  theme: ThemeColors;
}

export default function ExternalLinkButton({ name, nameid, theme }: ExternalLinkButtonProps) {
  const handlePress = async () => {
    const url = `https://coinlore.com/coin/${nameid}/`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.cardBackground }]} 
      onPress={handlePress}
    >
      <ExternalLink size={20} color={theme.text} />
      <Text style={[styles.text, { color: theme.text }]}>
        Ver más información sobre {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
}); 