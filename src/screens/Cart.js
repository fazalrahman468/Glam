import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CartComp from '../components/CartComp';
import CartButton from '../components/CartButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppInput from '../components/AppInput';
import axios from 'axios';

export default function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTkyMTMyODh9.9vC2u8nJB2YCbgTj6TdOdBVogoIdC2exAhbGw-9MbLA';

  useEffect(() => {
    if (route.params?.item && route.params?.quantity) {
      setCartItems(prevItems => [
        ...prevItems,
        {
          item: route.params.item,
          quantity: route.params.quantity,
          productId: route.params.productId,
        },
      ]);
    }
  }, [route.params?.item, route.params?.quantity]);

  const getTotal = () => {
    return cartItems.reduce(
      (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  const removeItem = index => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const renderItem = ({item, index}) => (
    <CartComp
      image={{uri: item.item.image}}
      title={item.item.name}
      subTitle={`$${item.item.price} x ${item.quantity}`}
      onRemove={() => removeItem(index)}
    />
  );

  const handleCheckout = async () => {
    const cartData = cartItems.map(cartItem => ({
      product: cartItem.productId,
      quantity: cartItem.quantity.toString(),
      amount: (cartItem.item.price * cartItem.quantity).toString(),
    }));

    const orderData = {
      cartData,
      totalamount: getTotal().toFixed(2).toString(),
      address,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        'https://glamparlor.onrender.com/api/order/create',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Order created successfully');
        setCartItems([]);
        setAddress('');
        navigation.navigate('Shopping');
      } else {
        Alert.alert('Error', 'There was an error creating the order');
      }
    } catch (error) {
      console.error('Error response:', error.response);
      Alert.alert(
        'Error',
        `There was an error creating the order: ${
          error.response?.data?.message || error.message
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>{cartItems.length} items in Cart</Text>
      <View style={styles.cartView}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.text}>Total :</Text>
        <Text style={styles.total}>${getTotal().toFixed(2)}</Text>
      </View>
      <AppInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.btnView}>
        <CartButton title="checkout" onPress={handleCheckout} />
        <TouchableOpacity onPress={() => navigation.navigate('Shopping')}>
          <Text style={styles.catalog}>Back to Catalog</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
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
    flex: 1,
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
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
