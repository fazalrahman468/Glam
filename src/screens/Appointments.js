import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Calendar} from 'react-native-calendars';
import AppointHeader from '../components/AppointHeader';
import {Fonts} from '../assets/fonts/Fonts';
import Time from '../components/Time';

export default function Appointments() {
  return (
    <View style={styles.cont}>
      <AppointHeader />
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
        }}
      />
      <View style={styles.cont1}>
        <Text style={styles.text}>Available Slot Fr, 9 Jan 2024</Text>
        <Text style={styles.text}>Morning</Text>
        <View style={styles.timeView}>
          <Time title="9:00 AM" />
          <Time title="10:00 AM" />
          <Time title="11:00 AM" />
          <Time title="11:50 AM" />
        </View>
        <Text style={styles.text}>Afternoon:</Text>
        <View style={styles.timeView}>
          <Time title="12:00 PM" />
          <Time title="02:00 PM" />
          <Time title="04:00 PM" />
          <Time title="06:00 PM" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  cont1: {
    padding: 20,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.black,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});
