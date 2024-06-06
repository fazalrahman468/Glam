import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CheckOutComp from '../components/CheckOutComp';
import TotalComp from '../components/TotalComp';
import CartButton from '../components/CartButton';

export default function BookingCheckOut() {
  return (
    <View style={styles.cont}>
      <View style={styles.cont1}>
        <Text style={styles.text}>Booking Info</Text>
        <Text style={styles.serText}>Services</Text>
        <CheckOutComp
          title="Party Makeover"
          value=" $ 150"
          subTitle="9 January 2024"
          time="10:00 AM"
        />
        <CheckOutComp
          title="Facials"
          value=" $ 50"
          subTitle="9 January 2024"
          time="02:00 PM"
        />
      </View>
      <View style={styles.cont2}>
        <Text style={styles.serText}>Total Pay</Text>
        <TotalComp
          title="Services"
          value="$200"
          taxTitle="Tax"
          tax="$5"
          subTitle="Subtotal"
          subValue="$205"
        />
        <Text style={styles.serText}>Payment Method</Text>
        <CartButton title="Confirm Booking" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 10,
  },
  cont1: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.black,
    textAlign: 'center',
  },
  serText: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.black,
  },
  cont2: {
    padding: 20,
  },
});
