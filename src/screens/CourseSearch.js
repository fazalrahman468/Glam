import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';

export default function CourseTutorial() {
  return (
    <View style={styles.cont}>
      <AppInput placeholder="Search" />
      <View style={styles.imgView}>
        <View style={styles.img}>
          <Text style={styles.videoText}>Video Tutorials</Text>
        </View>
        <View style={styles.img}>
          <Text style={styles.videoText}>Video Tutorials</Text>
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
  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  img: {
    width: 164,
    height: 200,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    marginTop: 20,
  },
  videoText: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    color: Colors.blackDark,
  },
});
