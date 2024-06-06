import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../assets/fonts/Fonts';
import Star from '../components/Star';
import DescButtons from '../components/DescButtons';
import CartButton from '../components/CartButton';

export default function Description() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <ImageBackground
        source={require('../assets/images/Nails.png')}
        style={styles.img}>
        <TouchableOpacity
          style={styles.arrowView}
          onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Arrow.png')} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.qtyView}>
        <Star />
      </View>
      <View style={styles.cont1}>
        <Text style={styles.qtyText}>Quantity</Text>
        <DescButtons />
        <Text style={styles.about}>About</Text>
        <Text style={styles.det}>
          nail polish is a lacquer that can be applied to the human fingernail
          or toenails to decorate and protect the nail plates.
        </Text>
      </View>
      <View style={styles.btnView}>
        <CartButton
          title="Add to cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {backgroundColor: Colors.white, flex: 1},
  img: {width: '100%', height: 350, backgroundColor: 'red'},
  arrowView: {
    backgroundColor: Colors.white,
    padding: 10,
    margin: 20,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyView: {
    backgroundColor: Colors.white,
    alignItems: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
  },
  qtyText: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.balckLight,
  },
  cont1: {
    marginLeft: 20,
  },
  about: {
    fontFamily: Fonts.semiBold,
    fontSize: 25,
    color: Colors.black1,
  },
  det: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.black1,
    lineHeight: 30,
    marginTop: 20,
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '95%',
    marginHorizontal: 10,
  },
});
