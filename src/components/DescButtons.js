import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../store/CounterSlice';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function DescButtons() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.cont}>
      <TouchableOpacity
        onPress={() => dispatch(decrement())}
        style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity
        onPress={() => dispatch(increment())}
        style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.blackDark,
    marginHorizontal: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight, // Adjust color as needed
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    color: Colors.blackDark,
    fontFamily: Fonts.bold,
  },
});
