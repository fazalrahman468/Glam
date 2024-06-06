import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function JobComp({title}) {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    marginRight: 10,
    marginVertical: 10,
    width: '45%',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.black,
  },
});
