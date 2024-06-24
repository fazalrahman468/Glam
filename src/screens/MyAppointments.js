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
import axios from 'axios';
import {Fonts} from '../assets/fonts/Fonts';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTkyMTMyODh9.9vC2u8nJB2YCbgTj6TdOdBVogoIdC2exAhbGw-9MbLA';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          'https://glamparlor.onrender.com/api/appointment/all',
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

  const renderAppointment = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date || item.service?.date}</Text>
      <Text style={styles.cell}>{item.time || item.service?.time}</Text>
      <Text style={styles.cell}>{item.service?.name || 'No Service Name'}</Text>
      <Text style={styles.cell}>{item.status || item.service?.status}</Text>
    </View>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.header}>My Appointments</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} />
      ) : (
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Time</Text>
            <Text style={styles.headerCell}>Service</Text>
            <Text style={styles.headerCell}>Status</Text>
          </View>
          <FlatList
            data={appointments}
            keyExtractor={item =>
              item.id
                ? item.id.toString()
                : item._id
                ? item._id.toString()
                : Math.random().toString()
            }
            renderItem={renderAppointment}
          />
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.blueDark,
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
});
