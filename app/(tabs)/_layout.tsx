import { Tabs } from 'expo-router';
import { Home, Star, LineChart, Building } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E88E5',
        tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: '',
        }}
      />
          <Tabs.Screen
        name="exchanges"
        options={{
          title: 'Exchanges',
          tabBarIcon: ({ color, size }) => <Building size={size} color={color} />,
          headerTitle: '',
        }}
      />
      <Tabs.Screen
        name="market-stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <LineChart size={size} color={color} />,
          headerTitle: '',
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Star size={size} color={color} />,
          headerTitle: '',
        }}
      />
    </Tabs>
  );
}