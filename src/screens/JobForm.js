import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import CartButton from '../components/CartButton';
import AppButton from '../components/AppButton';
import JobComp from '../components/JobComp';

export default function JobForm() {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Job Application Form</Text>
      <AppInput text="First Name" placeholder="Rabia" />
      <AppInput text="Last Name" placeholder="Safdar" />
      <AppInput text="Email Address" placeholder="Rabia@gmail.com" />
      <AppInput
        text="Your Message"
        placeholder="Enter your question or message"
      />
      <CartButton title="Select Your Job Title" />
      <View style={styles.titleView}>
        <JobComp title="Bridal makeup" />
        <JobComp title="Manicure Pedicure" />
        <JobComp title="Hair Stylist" />
        <JobComp title="Party Makeup" />
      </View>
      <AppButton title="SUBMIT" />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.blackDark,
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
