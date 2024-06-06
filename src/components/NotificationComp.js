import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function NotificationComp({title, subTitle, image}) {
  return (
    <View style={styles.cont}>
      <Image source={image} />
      <View style={styles.menView}>
        <Text style={styles.menText}>{title}</Text>
        <Text style={styles.subText}>{subTitle}</Text>
      </View>
      <Image source={require('../assets/images/Dir.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  menView: {
    flex: 1,
    marginLeft: 15,
  },
  menText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.black,
  },
  subText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.black,
  },
});
