// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {Colors} from '../assets/colors/Colors';
// import {Fonts} from '../assets/fonts/Fonts';
// import CartComp from '../components/CartComp';
// import CartButton from '../components/CartButton';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import AppInput from '../components/AppInput';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'https://glamparlor.onrender.com';

// export default function Cart() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [cartItems, setCartItems] = useState([]);
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     AsyncStorage.getItem('userToken')
//       .then(token => {
//         if (token) {
//           setToken(token);
//         }
//       })
//       .catch(error => {
//         console.error('Error retrieving token from AsyncStorage:', error);
//       });

//     if (route.params?.item && route.params?.quantity) {
//       setCartItems(prevItems => [
//         ...prevItems,
//         {
//           item: route.params.item,
//           quantity: route.params.quantity,
//           productId: route.params.productId,
//         },
//       ]);
//     }
//   }, [route.params?.item, route.params?.quantity]);

//   const getTotal = () => {
//     return cartItems.reduce(
//       (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
//       0,
//     );
//   };

//   const removeItem = index => {
//     setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
//   };

//   const renderItem = ({item, index}) => (
//     <CartComp
//       image={{uri: item.item.image}}
//       title={item.item.name}
//       subTitle={`$${item.item.price} x ${item.quantity}`}
//       onRemove={() => removeItem(index)}
//     />
//   );

//   const handleCheckout = async () => {
//     const cartData = cartItems.map(cartItem => ({
//       product: cartItem.productId,
//       quantity: cartItem.quantity.toString(),
//       amount: (cartItem.item.price * cartItem.quantity).toString(),
//     }));

//     const orderData = {
//       cartData,
//       totalamount: getTotal().toFixed(2).toString(),
//       address,
//     };

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${API_URL}/api/order/create`,
//         orderData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         },
//       );

//       if (response.data.success) {
//         Alert.alert('Success', 'Order created successfully');
//         setCartItems([]);
//         setAddress('');
//         navigation.navigate('Shopping');
//       } else {
//         Alert.alert('Error', 'There was an error creating the order');
//       }
//     } catch (error) {
//       console.error('Error response:', error.response);
//       Alert.alert(
//         'Error',
//         `There was an error creating the order: ${
//           error.response?.data?.message || error.message
//         }`,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{cartItems.length} items in Cart</Text>
//       <View style={styles.cartList}>
//         <FlatList
//           data={cartItems}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalText}>Total :</Text>
//         <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
//       </View>
//       <AppInput
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//       />
//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size="large" color={Colors.primary} />
//         ) : (
//           <CartButton title="Checkout" onPress={handleCheckout} />
//         )}
//         <TouchableOpacity onPress={() => navigation.navigate('Shopping')}>
//           <Text style={styles.backToCatalog}>Back to Catalog</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     padding: 20,
//   },
//   header: {
//     fontFamily: Fonts.osBold,
//     fontSize: 32,
//     color: Colors.blackDark,
//   },
//   cartList: {
//     flex: 1,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.black,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   totalText: {
//     fontFamily: Fonts.osSemiBold,
//     fontSize: 25,
//     color: Colors.blackDark,
//   },
//   totalAmount: {
//     fontFamily: Fonts.osSemiBold,
//     fontSize: 25,
//     color: Colors.blackDark,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//   },
//   backToCatalog: {
//     fontFamily: Fonts.osRegular,
//     fontSize: 25,
//     color: Colors.blueButton,
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
// });

//2ND ATTEMPT

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CartComp from '../components/CartComp';
import CartButton from '../components/CartButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppInput from '../components/AppInput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from '../components/CartContext'; // Import useCart

const API_URL = 'https://glamparlor.onrender.com';

export default function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const {cartItems, setCartItems} = useCart(); // Use cart context
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(token => {
        if (token) {
          setToken(token);
        }
      })
      .catch(error => {
        console.error('Error retrieving token from AsyncStorage:', error);
      });

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
        `${API_URL}/api/order/create`,
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
    <View style={styles.container}>
      <Text style={styles.header}>{cartItems.length} items in Cart</Text>
      <View style={styles.cartList}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total :</Text>
        <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
      </View>
      <AppInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <CartButton title="Checkout" onPress={handleCheckout} />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Shopping')}>
          <Text style={styles.backToCatalog}>Back to Catalog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    fontFamily: Fonts.osBold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  cartList: {
    flex: 1,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalText: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 25,
    color: Colors.blackDark,
  },
  totalAmount: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 25,
    color: Colors.blackDark,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  backToCatalog: {
    fontFamily: Fonts.osRegular,
    fontSize: 25,
    color: Colors.blueButton,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
