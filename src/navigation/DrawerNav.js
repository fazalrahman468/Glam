import React, { useEffect, useState } from 'react';
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
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import Home from '../screens/Home';
import MyAppointments from '../screens/MyAppointments';
import MyOrders from '../screens/MyOrders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const getUserData=async()=>{
   const username= await AsyncStorage.getItem('name');
   const image= await AsyncStorage.getItem('image');
   console.log(image)
   setName(username)
   setImage(image)
  }

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <View style={styles.cont}>
      <TouchableOpacity  style={styles.header} onPress={() => navigation.navigate('Profile')}>
        <Image source={image?{uri:image}:require('../assets/images/user.png')} style={{width:40,height:40,borderRadius:20}}/>
        <Text style={styles.headerText}>{name}</Text>
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
        onPress={async() => {
          await AsyncStorage.clear()
          navigation.navigate('Login')
        }}
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
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  cont: {
    padding: 20,
  },
  header: {
    flexDirection:'row',
    alignItems:'center'
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.osSemiBold,
    fontSize: 20,
    marginLeft:5
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
});
