import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function CheckOutComp({title, value, subTitle, time}) {
  return (
    <View style={styles.cont}>
      <View style={{alignItems: 'flex-end'}}>
        <Image source={require('../assets/images/Cross.png')} />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{value}</Text>
      </View>
      <View style={styles.subTitleView}>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.subTitle}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 25,
    color: Colors.black,
  },
  subTitleView: {
    paddingLeft: 15,
  },
  subTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 25,
    color: Colors.gray2,
  },
});
