import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';

export default function PasswordSaved() {
  return (
    <View style={styles.cont}>
      <Text>PasswordSaved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
