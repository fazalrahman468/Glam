import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import CheckOutComp from '../components/CheckOutComp';
import TotalComp from '../components/TotalComp';
import CartButton from '../components/CartButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingCheckOut() {
  const navigation = useNavigation();
  const route = useRoute();
  const {date, time, selectedService} = route.params;
  const [services, setServices] = useState([selectedService]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to retrieve token from AsyncStorage', error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (selectedService) {
      setServices([selectedService]);
    }
  }, [selectedService]);

  const handleRemoveService = id => {
    setServices(services.filter(service => service.id !== id));
  };

  const calculateTotal = () => {
    const serviceTotal = services.reduce(
      (sum, service) => sum + service.price,
      0,
    );
    const tax = serviceTotal * 0.025;
    return serviceTotal + tax;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    console.log('payload', services, date, time);
    try {
      const payload = {
        serviceId: services[0].id,
        date,
        time,
      };
      const response = await axios.post(
        'https://glamparlor.onrender.com/api/appointment/create',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
        },
      );
      if (response.status === 201) {
        Alert.alert('Success', 'Appointment created successfully');
        navigation.navigate('Booking');
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', 'There was an error creating the appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <View style={styles.cont1}>
        <Text style={styles.text}>Booking Info</Text>
        <Text style={styles.serText}>Services</Text>
        <FlatList
          data={services}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <CheckOutComp
              title={item.title}
              value={`$ ${item.price.toFixed(2)}`}
              subTitle={date}
              time={time}
              onRemove={() => handleRemoveService(item.id)}
            />
          )}
        />
      </View>
      <View style={styles.cont2}>
        <Text style={styles.serText}>Total Pay</Text>
        <TotalComp
          title="Services"
          value={`$ ${services
            .reduce((sum, service) => sum + service.price, 0)
            .toFixed(2)}`}
          taxTitle="Tax"
          tax={`$ ${(
            services.reduce((sum, service) => sum + service.price, 0) * 0.025
          ).toFixed(2)}`}
          subTitle="Subtotal"
          subValue={`$ ${calculateTotal().toFixed(2)}`}
        />
      </View>
      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <CartButton title="Confirm Booking" onPress={handleConfirmBooking} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 10,
  },
  cont1: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: Colors.grayBorder,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.black,
    textAlign: 'center',
  },
  serText: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.blackDark,
    marginTop: 30,
  },
  cont2: {
    padding: 20,
    paddingTop: 30,
    flex: 1,
  },
  btnView: {
    padding: 20,
  },
});
