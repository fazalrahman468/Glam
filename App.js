import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigation/AppNav';
import {CartProvider} from './src/components/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </CartProvider>
  );
}
