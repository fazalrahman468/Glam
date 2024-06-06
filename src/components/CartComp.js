import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function CartComp({image, title, subTitle}) {
  return (
    <View style={styles.cont}>
      <ImageBackground
        source={require('../assets/images/Rectangle17.png')}
        style={styles.img}>
        <Image source={image} />
      </ImageBackground>
      <View style={styles.textView}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{subTitle}</Text>
      </View>
      <Image source={require('../assets/images/Cross.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    marginTop: 30,
  },
  img: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.blackDark,
  },
});
