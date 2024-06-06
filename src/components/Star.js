import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function Star() {
  return (
    <View style={styles.cont}>
      <Image source={require('../assets/images/Rate.png')} />
      <Text style={styles.text}>4.8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.blackDark,
    flexDirection: 'row',
    width: '28%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 24,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {fontFamily: Fonts.semiBold, fontSize: 25, color: Colors.white},
});
