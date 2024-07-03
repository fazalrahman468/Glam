import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function AppButton({title, onPress,loading=false}) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={styles.cont}>
      {loading?
        <ActivityIndicator size="small" color={Colors.white} />:
        <Text style={styles.text}>{title}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.blueButton,
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: Colors.yellow,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
