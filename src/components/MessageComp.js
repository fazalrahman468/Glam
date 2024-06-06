import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function MessageComp({image, title, subTitle, onPress}) {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <Image source={image} />
      <View style={styles.magView}>
        <Text style={styles.msgText}>{title}</Text>
        <Text style={styles.msgText}>{subTitle}</Text>
      </View>
      <Image source={require('../assets/images/Circle.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    padding: 20,
    marginBottom: 20,
  },
  magView: {
    flex: 1,
    marginLeft: 20,
  },
  msgText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.blueDark,
  },
});
