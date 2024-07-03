import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function CartButton({title, onPress,loading=false}) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} style={styles.cont}>
      {loading?
        <ActivityIndicator size="large" color={Colors.primary} />:
        <Text style={styles.text}>{title}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.blackDark,
    width: '100%',
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.osBold,
    fontSize: 27,
  },
});
