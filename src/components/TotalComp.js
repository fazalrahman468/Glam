import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function TotalComp({
  title,
  value,
  subTitle,
  subValue,
  taxTitle,
  tax,
}) {
  return (
    <View style={styles.cont}>
      <View style={styles.titleView}>
        <Text style={styles.subTitle}>{title}</Text>
        <Text style={styles.subTitle}>{value}</Text>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.subTitle}>{taxTitle}</Text>
        <Text style={styles.subTitle}>{tax}</Text>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>{subTitle}</Text>
        <Text style={styles.title}>{subValue}</Text>
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
