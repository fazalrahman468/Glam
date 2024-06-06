import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function ContactComp({image, title, subTitle}) {
  return (
    <View style={styles.cont}>
      <View style={styles.verifyView}>
        <Text style={styles.title}>{title}</Text>
        {image && (
          <Image
            source={image}
            style={{width: 24, height: 24, marginLeft: 10}}
          />
        )}
      </View>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    // backgroundColor: Colors.black,
    marginVertical: 30,
  },
  verifyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.blueDark,
  },
  subTitle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
    marginTop: 16,
  },
});
