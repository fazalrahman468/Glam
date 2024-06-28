import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import axios from 'axios';
import {Fonts} from '../assets/fonts/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppointmentComp from '../components/AppointmentComp';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://glamparlor.onrender.com';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`${API_URL}/api/appointment/all`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
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

  const renderAppointment = ({item}) => (
    <AppointmentComp
      service={item.service || {}}
      date={item.date}
      time={item.time}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Back.png')} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.header}>My Appointments</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : appointments.length === 0 ? (
        <Text style={styles.noAppointmentsText}>No appointments found.</Text>
      ) : (
        <ScrollView>
          {appointments.map((appointment, index) => (
            <View key={index.toString()}>
              {renderAppointment({item: appointment})}
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
  backText: {
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 20,
  },
  noAppointmentsText: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 10,
  },
});
