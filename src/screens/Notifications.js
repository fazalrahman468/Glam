import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../assets/colors/Colors';
import NotificationComp from '../components/NotificationComp';
import {Fonts} from '../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notifications() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Error', 'No token found');
          return;
        }

        const response = await axios.get(
          'https://glamparlor.onrender.com/api/notifications/all',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          },
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async id => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      await axios.delete(
        `https://glamparlor.onrender.com/api/notifications/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      setNotifications(
        notifications.filter(notification => notification._id !== id),
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.notificationContainer}>
      <NotificationComp
        title={item.title}
        subTitle={item.description}
        seen={item.seen}
        createdAt={item.createdAt}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}>
        <Image
          source={require('../assets/images/Delete.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.cont}>
      <View style={styles.no}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Back.png')} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.text}>Notifications</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
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
  no: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.black,
    textAlign: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 30,
    height: 30,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
});
