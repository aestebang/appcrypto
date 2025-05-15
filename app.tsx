import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Redirect } from 'expo-router';
import SafeView from './app/components/SafeView';

function SplashScreen() {
  return (
    <SafeView style={styles.splashContainer}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        {/* Aquí puedes poner tu logo o animación */}
        <Text style={styles.splashText}>AppCrypto</Text>
        <ActivityIndicator size="large" color="#1E88E5" style={{ marginTop: 24 }} />
      </View>
    </SafeView>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 segundos de splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <Redirect href="/" />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  splashText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
