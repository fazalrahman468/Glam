import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Shopping from '../screens/Shopping';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0021F5',
        tabBarInactiveTintColor: '#424240',
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Shopping') {
            iconName = require('../assets/images/Hom.png');
          } else if (route.name === 'Search') {
            iconName = require('../assets/images/Search.png');
          } else if (route.name === 'Cart') {
            iconName = require('../assets/images/Shop.png');
          }

          return <Image source={iconName} style={{tintColor: color}} />;
        },
        tabBarLabel: () => null,
      })}>
      <Tab.Screen name="Shopping" component={Shopping} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
