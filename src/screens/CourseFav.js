import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function CourseFav() {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Favorite Videos</Text>
      <View style={styles.img}>
        <View style={styles.imgView}>
          <Image source={require('../assets/images/Black.png')} />
        </View>
        <Text style={styles.videoText}>Video Tutorials</Text>
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
  img: {
    width: 164,
    height: 200,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    marginTop: 20,
  },
  imgView: {
    alignItems: 'flex-end',
  },
  videoText: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    color: Colors.blackDark,
  },
});
