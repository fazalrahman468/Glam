import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import PasswordSaved from '../screens/PasswordSaved';
import Notifications from '../screens/Notifications';
import BottomTab from './BottomTab';
import LogOut from '../screens/LogOut';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Image source={require('../assets/images/Prof.png')} />
        <Text style={styles.headerText}>Jabbar Ahmad</Text>
        <Text style={styles.mail}>acde@gmail.com</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordSaved')}>
        <Text style={styles.mail}>Password saved</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.mail}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LogOut')}>
        <Text style={[styles.headerText, {marginTop: 40}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="PasswordSaved" component={PasswordSaved} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="LogOut" component={LogOut} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  cont: {
    padding: 20,
  },
  header: {
    height: '40%',
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    marginTop: 10,
  },
  mail: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: 20,
    marginTop: 6,
  },
});
