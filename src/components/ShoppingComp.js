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
        <Image source={{uri: image}} style={styles.image} />
      </ImageBackground>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 30,
    alignItems: 'center',
    marginRight: 10,
    height: 200,
  },
  img: {width: 75, height: 75, alignItems: 'center', justifyContent: 'center'},
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    fontFamily: Fonts.osBold,
    fontSize: 15,
    color: Colors.grayLight,
    marginTop: 10,
  },
});
