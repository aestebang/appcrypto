import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users, MessageCircle, Twitter } from 'lucide-react-native';
import { SocialStats } from '@/models/SocialStats';
import { ThemeColors } from '@/utils/theme';

interface SocialStatsCardProps {
  socialStats: SocialStats | null;
  isLoading: boolean;
  theme: ThemeColors;
}

export default function SocialStatsCard({ socialStats, isLoading, theme }: SocialStatsCardProps) {
  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Estadísticas Sociales</Text>
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Cargando...</Text>
      </View>
    );
  }

  if (!socialStats) {
    return null;
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>Estadísticas Sociales</Text>
      
      <View style={styles.statsContainer}>
        {/* Reddit Stats */}
        <View style={styles.platformContainer}>
          <View style={styles.platformHeader}>
            <MessageCircle size={18} color={theme.accent} />
            <Text style={[styles.platformTitle, { color: theme.text }]}>Reddit</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Suscriptores:</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {socialStats.redditSubscribers ? socialStats.redditSubscribers.toLocaleString() : 'N/A'}
            </Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Usuarios activos:</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {socialStats.redditActiveUsers ? socialStats.redditActiveUsers.toLocaleString() : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Twitter Stats */}
        <View style={styles.platformContainer}>
          <View style={styles.platformHeader}>
            <Twitter size={18} color={theme.accent} />
            <Text style={[styles.platformTitle, { color: theme.text }]}>Twitter</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Seguidores:</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {socialStats.twitterFollowers ? socialStats.twitterFollowers.toLocaleString() : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  statsContainer: {
    gap: 12,
  },
  platformContainer: {
    marginBottom: 8,
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  platformTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 