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
      <Image source={{uri: image}} style={styles.image} />
      <Text numberOfLines={1} style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray1,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent:'center',
    height: 110,
  },
  selectedContainer: {
    backgroundColor: Colors.blueDark,
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
    width:65,
  },
  selectedText: {
    color: Colors.white,
  },
});
