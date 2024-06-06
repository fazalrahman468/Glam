import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

export default function Feedback() {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>
        Overall, how would you rate your experience?
      </Text>
      <View style={styles.ratingView}>
        <Image source={require('../assets/images/Round.png')} />
        <Text style={styles.ratingText}>Excellent</Text>
      </View>
      <View style={styles.ratingView}>
        <Image source={require('../assets/images/Round.png')} />
        <Text style={styles.ratingText}>Average</Text>
      </View>
      <View style={styles.ratingView}>
        <Image source={require('../assets/images/Round.png')} />
        <Text style={styles.ratingText}>Poor</Text>
      </View>
      <Text style={styles.text}>How can we improve our services?</Text>
      <AppInput placeholder="Type Here..." />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.btnView}>
          <AppButton title="Submit" />
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
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  ratingView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.black,
    marginLeft: 12,
  },
  btnView: {
    width: '40%',
    marginTop: 20,
  },
});
