import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigation/AppNav';
import {CartProvider} from './src/components/CartContext';
import {StripeProvider} from '@stripe/stripe-react-native';
import '@react-native-firebase/app';
import '@react-native-firebase/storage';

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51OmihGKrwIK1eqtU8ydcT9TwRX52UWtAWa0kUwQMFa7Y42bICDZcgYIJWijeQf8CGHlUE7BlFXrHWjL7Ksv4EwEY00FPfW750r"
      urlScheme="your-url-scheme">
    <CartProvider>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </CartProvider>
    </StripeProvider>
  );
}
