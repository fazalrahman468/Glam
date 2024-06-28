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
import MyAppointments from '../screens/MyAppointments';
import MyOrders from '../screens/MyOrders';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Image source={require('../assets/images/Prof.png')} />
        <Text style={styles.headerText}>Jabbar Ahmad</Text>
        <Text style={styles.email}>acde@gmail.com</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('PasswordSaved')}
        style={styles.icon}>
        <Image source={require('../assets/images/Password.png')} />
        <Text style={styles.mail}>Password saved</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Notifications')}
        style={styles.icon}>
        <Image source={require('../assets/images/Noti.png')} />
        <Text style={styles.mail}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MyAppointments')}
        style={styles.icon}>
        <Image source={require('../assets/images/App.png')} />
        <Text style={styles.mail}>My Appointments</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MyOrders')}
        style={styles.icon}>
        <Image source={require('../assets/images/Ord.png')} />
        <Text style={styles.mail}>My Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('LogOut')}
        style={[styles.icon, {marginTop: 40}]}>
        <Image source={require('../assets/images/Logout.png')} />
        <Text style={styles.logoutText}>Logout</Text>
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
      <Drawer.Screen name="MyAppointments" component={MyAppointments} />
      <Drawer.Screen name="MyOrders" component={MyOrders} />
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
    fontFamily: Fonts.osSemiBold,
    fontSize: 24,
    marginTop: 16,
  },
  logoutText: {
    color: Colors.black,
    fontFamily: Fonts.osBold,
    fontSize: 20,
    marginLeft: 12,
  },
  email: {
    color: Colors.black,
    fontFamily: Fonts.osRegular,
    fontSize: 20,
    marginTop: 10,
  },
  mail: {
    color: Colors.black,
    fontFamily: Fonts.osRegular,
    fontSize: 20,
    marginTop: 6,
    marginLeft: 12,
  },

  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
