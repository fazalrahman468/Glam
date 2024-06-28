import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CartButton from '../components/CartButton';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Prices() {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, image, price, serviceId} = route.params;

  return (
    <View style={styles.cont}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.cont1}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
      </View>
      <View style={styles.btnView}>
        <CartButton
          title="Continue"
          onPress={() =>
            navigation.navigate('Appointments', {
              selectedService: {title, price, serviceId},
            })
          }
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
  },
  text: {
    fontFamily: Fonts.osBold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  price: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 25,
    color: Colors.blackDark,
    marginTop: 10,
  },
  btnView: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
