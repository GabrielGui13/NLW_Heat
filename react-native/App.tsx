import React from 'react';
import { Home } from './src/screens/Home'

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading'; //manter a tela carregando
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  }); //carregamento da fonte eh assincrono

  if (!fontsLoaded) { //se as fontes nao forem carregadas, o app loading fica rodando
    return <AppLoading />
  }

  return ( //deixar icones da status bar branco
    <>
      <StatusBar style="light" /> 
      <Home />
    </>
  );
}