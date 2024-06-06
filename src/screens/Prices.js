import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import PriceComp from '../components/PriceComp';
import CartButton from '../components/CartButton';
import {useNavigation} from '@react-navigation/native';

export default function Prices() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <Image source={require('../assets/images/Rectangle13.png')} />
      <View style={styles.cont1}>
        <Text style={styles.text}>Makeup</Text>
        <View style={{justifyContent: 'space-between', height: '40%'}}>
          <PriceComp title="Party makeover" subTitle="$ 150" />
          <PriceComp title="Bride makeover" subTitle="$ 500" />
          <PriceComp title="Normal makeover" subTitle="$ 100" />
        </View>
      </View>
      <View style={styles.btnView}>
        <CartButton
          title="Continue"
          onPress={() => navigation.navigate('BookingCheckOut')}
        />
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
    flex: 1,
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  btnView: {
    padding: 20,
  },
});
