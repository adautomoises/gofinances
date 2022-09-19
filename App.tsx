import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import theme from './src/global/styles/theme'
import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const { userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  if(fontsLoaded){
    SplashScreen.hideAsync();
  }
  if(!fontsLoaded || userStorageLoading){
    return null
  }
  return (
    <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
  )
}