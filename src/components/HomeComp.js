import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function HomeComp({title, onPress}) {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginTop: 40,
    borderWidth: 1,
    borderColor: Colors.blueButton,
    borderRadius: 12,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.blueButton,
  },
});
