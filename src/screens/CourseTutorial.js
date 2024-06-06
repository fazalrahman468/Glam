import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';

export default function CourseTutorial() {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Course Tutorials</Text>
      <AppInput placeholder="Search" />
      <View style={styles.imgView}>
        <View style={styles.img}>
          <Image source={require('../assets/images/Hart.png')} />
          <View style={{width: '100%', marginBottom: 20}}>
            <Text style={styles.videoText}>Video Tutorials</Text>
          </View>
          <Image source={require('../assets/images/Pls.png')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  imgView: {
    marginTop: 20,
  },
  img: {
    width: 164,
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.gray1,
    borderRadius: 10,
  },
  videoText: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    color: Colors.blackDark,
  },
});
