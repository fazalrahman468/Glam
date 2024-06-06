import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function OnBoardComp({title, subTitle}) {
  return (
    <View style={styles.cont}>
      <Text style={styles.title}>
        {title}
        <Text style={styles.sub}>{subTitle}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.blueText,
  },
  sub: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.black,
  },
});
