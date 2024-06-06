import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';

export default function LogOut() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <AppButton title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
