import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderComp from '../components/OrderComp';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://glamparlor.onrender.com';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${API_URL}/api/order/all`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'There was an error fetching the orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderProduct = ({item, status}) => (
    <OrderComp
      image={item.product.image}
      title={item.product.name}
      description={item.product.description}
      price={item.product.price}
      totalAmount={item.amount}
      status={status}
    />
  );

  const renderOrder = ({item}) => (
    <View style={styles.orderContainer}>
      {/* <Text style={styles.statusText}>Status: {item.status}</Text> */}
      <Text style={styles.statusText}>Order List</Text>
      {item.cartData.map(cartItem => (
        <View key={cartItem._id}>
          {renderProduct({item: cartItem, status: item.status})}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Back.png')} />
        </TouchableOpacity>
        <View style={styles.orderView}>
          <Text style={styles.header}>My Orders</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        <ScrollView>
          {orders.map((order, index) => (
            <View key={index.toString()}>
              {renderOrder({item: order})}
              <View style={styles.separator} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderView: {
    flex: 1,
    marginLeft: 20,
  },
  header: {
    fontSize: 32,
    fontFamily: Fonts.osBold,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 20,
  },
  noOrdersText: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  orderContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.black,
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 10,
  },
});
