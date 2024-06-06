import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoard from '../screens/OnBoard';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Verify from '../screens/Verify';
import VerifyMobile from '../screens/VerifyMobile';
import VerifyEmail from '../screens/VerifyEmail';
import VerifiedDetails from '../screens/VerifiedDetails';
import RecoverPassword from '../screens/RecoverPassword';
import RecoverByMobile from '../screens/RecoverByMobile';
import RecoverByEmail from '../screens/RecoverByEmail';
import CodeMatch from '../screens/CodeMatch';
import NewPassword from '../screens/NewPassword';
import Welcome from '../screens/Welcome';
import Success from '../screens/Success';
import Home from '../screens/Home';
import DrawerNav from './DrawerNav';
import BottomTab from './BottomTab';
import Description from '../screens/Description';
import Feedback from '../screens/Feedback';
import JobForm from '../screens/JobForm';
import CourseTutorial from '../screens/CourseTutorial';
import BottomNav from './BottomNav';
import Booking from '../screens/Booking';
import Prices from '../screens/Prices';
import Appointments from '../screens/Appointments';
import BookingCheckOut from '../screens/BookingCheckOut';

const Stack = createNativeStackNavigator();

export default function AppNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="OnBoard" component={OnBoard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="VerifyMobile" component={VerifyMobile} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="VerifiedDetails" component={VerifiedDetails} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="RecoverByMobile" component={RecoverByMobile} />
      <Stack.Screen name="RecoverByEmail" component={RecoverByEmail} />
      <Stack.Screen name="CodeMatch" component={CodeMatch} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Home" component={DrawerNav} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Description" component={Description} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="JobForm" component={JobForm} />
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="Prices" component={Prices} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="BookingCheckOut" component={BookingCheckOut} />
    </Stack.Navigator>
  );
}
