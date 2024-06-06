import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import Glam from '../assets/images/Glam.svg';
import {Fonts} from '../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.cont}>
      <View style={styles.imgView}>
        <Glam />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>TRANSFORM YOUR LOOK</Text>
        <Text style={styles.text}>TRANSFORM YOUR LIFE</Text>
      </View>
      <View>
        <Text style={styles.text}>WITH OUR APP</Text>
        <Text style={styles.text}>BY YOUR SIDE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
  },
  imgView: {
    flex: 0.6,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  textView: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 40,
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.white,
  },
});
