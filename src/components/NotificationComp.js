import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function NotificationComp({title, subTitle, seen, createdAt}) {
  return (
    <View style={styles.cont}>
      <Text style={styles.menText}>{title}</Text>
      <Text style={styles.subText}>{subTitle}</Text>
      <Text style={styles.dateText}>
        {new Date(createdAt).toLocaleString()}
      </Text>
      <Text
        style={[styles.seenText, {color: seen ? Colors.green : Colors.red}]}>
        {seen ? 'Seen' : 'Unseen'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 20,
  },
  menText: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.black,
  },
  subText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.gray,
    marginTop: 5,
  },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.gray,
    marginTop: 5,
  },
  seenText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 5,
  },
});
