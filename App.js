import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigation/AppNav';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>
  );
}
