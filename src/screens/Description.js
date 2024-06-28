import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../assets/colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Fonts} from '../assets/fonts/Fonts';
import Star from '../components/Star';
import DescButtons from '../components/DescButtons';
import CartButton from '../components/CartButton';

export default function Description() {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalPrice = item.price * quantity;

  return (
    <View style={styles.cont}>
      <ImageBackground source={{uri: item.image}} style={styles.img}>
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
        <View style={styles.descButtons}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.about}>About</Text>
        <Text style={styles.det}>{item.description}</Text>
      </View>
      <View style={styles.btnView}>
        <CartButton
          title={`Add to cart | $${totalPrice.toFixed(2)}`}
          onPress={() =>
            navigation.navigate('Cart', {item, quantity, productId: item._id})
          }
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
    fontFamily: Fonts.osBold,
    fontSize: 30,
    color: Colors.balckLight,
  },
  cont1: {
    marginLeft: 20,
  },
  descButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 30,
    fontFamily: Fonts.osBold,
    color: Colors.balckLight,
    marginHorizontal: 20,
  },
  quantityText: {
    fontSize: 30,
    fontFamily: Fonts.osBold,
    color: Colors.balckLight,
  },
  about: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 25,
    color: Colors.black1,
  },
  det: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 20,
    color: Colors.black1,
    lineHeight: 30,
    marginTop: 20,
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
