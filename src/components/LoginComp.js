import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Fonts} from '../assets/fonts/Fonts';
import {Colors} from '../assets/colors/Colors';

export default function LoginComp({title}) {
  return (
    <View style={styles.cont}>
      <View style={styles.helloView}>
        <Text style={styles.hiText}>Hi There!</Text>
        <Image
          source={require('../assets/images/Hello.png')}
          style={{height: 24, width: 24}}
        />
      </View>
      <Text style={styles.welText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
  },
  helloView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-around',
  },
  hiText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.blueDark,
  },
  welText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.gray,
    marginTop: 10,
  },
});
