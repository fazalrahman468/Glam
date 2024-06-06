import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function Time({title}) {
  return (
    <View style={styles.subTextView}>
      <Text style={styles.subText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subTextView: {
    height: 29,
    shadowColor: Colors.gray,
    shadowOpacity: 0.7,
    shadowOffset: {width: -10, height: 10},
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  subText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.black,
  },
});
