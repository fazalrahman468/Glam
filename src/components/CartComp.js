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

export default function CartComp({image, title, subTitle, onRemove}) {
  return (
    <View style={styles.cont}>
      <ImageBackground
        source={require('../assets/images/Rectangle17.png')}
        style={styles.img}>
        <Image source={image} style={styles.productImage} />
      </ImageBackground>
      <View style={styles.textView}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{subTitle}</Text>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <Image
          source={require('../assets/images/Cross.png')}
          style={styles.crossIcon}
        />
      </TouchableOpacity>
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
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textView: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  text: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 20,
    color: Colors.blackDark,
  },
  crossIcon: {
    width: 24,
    height: 24,
  },
});
