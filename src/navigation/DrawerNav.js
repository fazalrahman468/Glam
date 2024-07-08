import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PasswordSaved from '../screens/PasswordSaved';
import Notifications from '../screens/Notifications';
import Home from '../screens/Home';
import MyAppointments from '../screens/MyAppointments';
import MyOrders from '../screens/MyOrders';
import Profile from '../screens/Profile';
import LogOut from '../screens/LogOut';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import {CartContext} from '../components/CartContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  const {user, setUser} = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get(
          'https://glamparlor.onrender.com/api/users/me',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          },
        );

        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  if (loading) {
    return (
      <View style={[styles.cont, styles.loading]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const {name, email, profilePicture} = user;

  return (
    <View style={styles.cont}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.header}>
        <Image source={{uri: profilePicture}} style={styles.profileImage} />
        <Text style={styles.headerText}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('PasswordSaved')}
        style={styles.icon}>
        <Image source={require('../assets/images/Password.png')} />
        <Text style={styles.mail}>Password Saved</Text>
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
      <Drawer.Screen name="Profile" component={Profile} />
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
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.osSemiBold,
    fontSize: 18,
    marginLeft: 16,
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginTop: 10,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
