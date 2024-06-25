import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function JobComp({title, selected, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cont, selected && styles.selectedCont]}>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
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
  selectedCont: {
    backgroundColor: Colors.black,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.black,
  },
  selectedText: {
    color: Colors.white,
  },
});
