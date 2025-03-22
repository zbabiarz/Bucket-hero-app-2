import { useEffect } from 'react';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { useAuthStore } from '@/store/auth';

export default function RootLayout() {
  useFrameworkReady();
  const { user, loading, loadUser } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null while fonts are loading to prevent layout flash
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Show loading state while checking authentication
  if (loading) {
    return <Slot />;
  }

  // Always render a Slot or Stack.Screen to ensure proper navigation
  return (
    <>
      {user ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        // Use Slot for the auth flow
        <Slot />
      )}
      <StatusBar style="auto" />
    </>
  );
}