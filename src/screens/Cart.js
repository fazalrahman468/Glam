import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CartComp from '../components/CartComp';
import CartButton from '../components/CartButton';
import {useNavigation} from '@react-navigation/native';

export default function Cart() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>2 items in Cart</Text>
      <View style={styles.cartView}>
        <CartComp
          image={require('../assets/images/Hair.png')}
          title="Hairs Colors"
          subTitle="$ 20"
        />
        <CartComp
          image={require('../assets/images/FacePro.png')}
          title="Faxials Creams"
          subTitle="$ 15"
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.text}>Total :</Text>
        <Text style={styles.total}>$ 35</Text>
      </View>
      <View style={styles.btnView}>
        <CartButton title="checkout" />
        <TouchableOpacity onPress={() => navigation.navigate('Shopping')}>
          <Text style={styles.catalog}>Back to Catalog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  cartView: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: Colors.black,
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  total: {
    fontFamily: Fonts.semiBold,
    fontSize: 25,
    color: Colors.blackDark,
  },
  btnView: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  catalog: {
    fontFamily: Fonts.regular,
    fontSize: 25,
    color: Colors.black,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
