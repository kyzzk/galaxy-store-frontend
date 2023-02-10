import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';


import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback } from 'react';

import Cafe from './screens/telaInicial'

export default function App() {
  let [fontsLoaded] = useFonts({
    "Mitr": require('./assets/fonts/Mitr.ttf')
  })
  if (!fontsLoaded) {
    return null;
  }

  return ( <Cafe/> );
}
