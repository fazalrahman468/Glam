import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function OrderComp({
  image,
  title,
  description,
  price,
  totalAmount,
  status,
}) {
  return (
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.productImage} />
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text style={styles.totalAmount}>Total: ${totalAmount}</Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
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
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.black,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.gray,
  },
  price: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.black,
  },
  totalAmount: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.black,
  },
  status: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
});
