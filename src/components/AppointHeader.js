import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function AppointHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/Group23.png')} />
      </TouchableOpacity>
      <Text style={styles.text}>Schedule Appointment</Text>
      <Image source={require('../assets/images/Group24.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.blackDark,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 25,
    color: Colors.white,
  },
});
