import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { UserProvider } from '@/contexts/UserContext';
import { JobProvider } from '@/contexts/JobContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SwipeControllerProvider } from '@/contexts/SwipeControllerContext';
import React, { createContext, useContext, useState } from 'react';

SplashScreen.preventAutoHideAsync();

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageProvider>
          <UserProvider>
            <JobProvider>
              <SwipeControllerProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="profile" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="profile-summary" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="profile/edit" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="contact" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="filter" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="applications" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="offers" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </SwipeControllerProvider>
            </JobProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}