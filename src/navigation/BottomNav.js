import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Shopping from '../screens/Shopping';
import CourseTutorial from '../screens/CourseTutorial';
import CourseSearch from '../screens/CourseSearch';
import CourseFav from '../screens/CourseFav';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0021F5', // Blue color for active tab
        tabBarInactiveTintColor: '#424240', // Black color for inactive tab
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'CourseTutorial') {
            iconName = require('../assets/images/Hom.png');
          } else if (route.name === 'CourseSearch') {
            iconName = require('../assets/images/Search.png');
          } else if (route.name === 'CourseFav') {
            iconName = require('../assets/images/Heart.png');
          }

          return (
            <Image
              source={iconName}
              style={{tintColor: color}} // Use the color prop to change the icon color
            />
          );
        },
        tabBarLabel: () => null, // Hide the label
      })}>
      <Tab.Screen name="CourseTutorial" component={CourseTutorial} />
      <Tab.Screen name="CourseSearch" component={CourseSearch} />
      <Tab.Screen name="CourseFav" component={CourseFav} />
    </Tab.Navigator>
  );
}
