import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function AppInput({text, icon, ...otherProps}) {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.cont}>
        <TextInput
          {...otherProps}
          placeholderTextColor="grey"
          style={{color: 'black'}}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: Colors.blueDark,
    fontFamily: Fonts.medium,
    fontSize: 14,
    margin: 5,
  },
  cont: {
    backgroundColor: Colors.white,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    height: 48,
    width: '100%',
  },
});
