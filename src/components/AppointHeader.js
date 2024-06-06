import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function AppointHeader() {
  return (
    <View style={styles.cont}>
      <Image source={require('../assets/images/Group23.png')} />
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
