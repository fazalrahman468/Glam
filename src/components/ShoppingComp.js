import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function ShoppingComp({image, title, onPress, selected}) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}>
      <ImageBackground
        source={require('../assets/images/Rectangle14.png')}
        style={styles.imageBackground}>
        <Image source={{uri: image}} style={styles.image} />
      </ImageBackground>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    alignItems: 'center',
    marginRight: 10,
    height: 120,
  },
  selectedContainer: {
    backgroundColor: Colors.blueDark,
    borderRadius: 10,
    padding: 8,
    height: 120,
  },
  imageBackground: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  selectedText: {
    color: Colors.white,
  },
});
