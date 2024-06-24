import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function TotalComp({
  title,
  value,
  taxTitle,
  tax,
  subTitle,
  subValue,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>{taxTitle}</Text>
        <Text style={styles.text}>{tax}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subText}>{subTitle}</Text>
        <Text style={styles.subText}>{subValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.gray2,
  },
  subText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.black,
  },
});
