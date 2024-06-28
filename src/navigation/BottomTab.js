import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Shopping from '../screens/Shopping';
import {useCart} from '../components/CartContext'; // Adjust the path as necessary
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

const Tab = createBottomTabNavigator();

const CartIconWithBadge = ({color}) => {
  const {cartItems} = useCart();

  return (
    <View>
      <Image
        source={require('../assets/images/Shop.png')}
        style={{tintColor: color}}
      />
      {cartItems.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItems.length}</Text>
        </View>
      )}
    </View>
  );
};

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
            return <CartIconWithBadge color={color} />;
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

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -20,
    top: -20,
    backgroundColor: Colors.blueButton,
    borderRadius: 6,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
