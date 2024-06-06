import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function ShoppingComp({image, title, onPress}) {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <ImageBackground
        source={require('../assets/images/Rectangle14.png')}
        style={styles.img}>
        <Image source={image} />
      </ImageBackground>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 30,
    alignItems: 'center',
  },
  img: {width: 75, height: 75, alignItems: 'center', justifyContent: 'center'},
  text: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.grayLight,
    marginTop: 10,
  },
});
