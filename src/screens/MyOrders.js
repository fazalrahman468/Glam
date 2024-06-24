import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import axios from 'axios';
import {Fonts} from '../assets/fonts/Fonts';

export default function MyOrders() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTkyMTMyODh9.9vC2u8nJB2YCbgTj6TdOdBVogoIdC2exAhbGw-9MbLA';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          'https://glamparlor.onrender.com/api/order/all',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${token}`,
            },
          },
        );
        console.log(response.data);
        setAppointments(response.data.orders);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'There was an error fetching the appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const renderProduct = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.product.name}</Text>
      <Text style={styles.cell}>{item.product.description}</Text>
      <Text style={styles.cell}>{item.product.price}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  const renderAppointment = ({item}) => (
    <View style={styles.orderContainer}>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <FlatList
        data={item.cartData}
        keyExtractor={item => item._id}
        renderItem={renderProduct}
      />
    </View>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.header}>My Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : (
        <ScrollView>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Product Name</Text>
              <Text style={styles.headerCell}>Description</Text>
              <Text style={styles.headerCell}>Price</Text>
              <Text style={styles.headerCell}>Amount</Text>
            </View>
            <FlatList
              data={appointments}
              keyExtractor={item => item._id}
              renderItem={renderAppointment}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 20,
    marginVertical: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.blueDark,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.blueDark,
    backgroundColor: Colors.lightGray,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.blueDark,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomColor: Colors.blueDark,
    borderRadius: 2,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.blueDark,
    color: Colors.black,
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
});
