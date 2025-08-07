import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View } from 'react-native';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}
      initialRouteName={!isAuthenticated ? '(auth)/onboarding' : undefined}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="(auth)/onboarding" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
        </>
      ) : (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <View style={{ flex: 1, paddingVertical: 24 }}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}