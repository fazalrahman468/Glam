import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function AppointmentComp({service, date, time, status}) {
  return (
    <View style={styles.card}>
      <View style={styles.textView}>
        <Text style={styles.title}>{service.name || 'No Service Name'}</Text>
        <Text style={styles.date}>Date: {date}</Text>
        <Text style={styles.time}>Time: {time}</Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textView: {
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.black,
  },
  date: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
  time: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
  status: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
});
