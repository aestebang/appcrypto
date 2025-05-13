import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { getThemeColors } from '@/utils/theme';
import { Bitcoin } from 'lucide-react-native';
import { Text, useColorScheme } from 'react-native';
export default function RootLayout() {
  useFrameworkReady();
  
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme);
  
  return (
   <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: true,
      headerTitle: () => (
        <Bitcoin size={49} color="#F7931A" />
        
      ),
      headerStyle: { backgroundColor: theme.background },
      headerTintColor: theme.text,
      headerRight: () => (<Text style={{ color: theme.text, fontSize: 20, fontWeight: 'bold' ,width: 110}}>APPCRYPTO</Text>)
    }} />
   </Stack>
  );
}
