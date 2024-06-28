import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import ShoppingComp from '../components/ShoppingComp';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Booking() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get(
        'https://glamparlor.onrender.com/api/service/all',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response?.data) {
        setCategories(response?.data?.services);
      }
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  return (
    <View style={styles.cont}>
      <View style={styles.imgView}>
        <ImageBackground
          source={require('../assets/images/Rectangle40.png')}
          style={styles.img}>
          <Text style={styles.glamText}>Glam Guide</Text>
          <View style={styles.locView}>
            <Image source={require('../assets/images/Location.png')} />
            <View>
              <Text style={styles.locText}>
                123 Main Boulevard, DHA Phase 5,
              </Text>
              <Text style={styles.locText}>Lahore 54000, Pakistan</Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <Image source={require('../assets/images/Clock.png')} />
            <Text style={styles.locText}>9 AM To 6 PM</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.serText}>Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <ShoppingComp
              key={category._id}
              title={category.name}
              image={category.image}
              onPress={() =>
                navigation.navigate('Prices', {
                  title: category.name,
                  image: category.image,
                  price: category.price,
                  serviceId: category._id,
                })
              }
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  imgView: {
    width: '100%',
    height: '40%',
  },
  img: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  glamText: {
    fontFamily: Fonts.osBold,
    fontSize: 32,
    color: Colors.white,
    marginLeft: 20,
  },
  locView: {
    flexDirection: 'row',
  },
  locText: {
    fontFamily: Fonts.osBold,
    fontSize: 18,
    color: Colors.white,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginRight: 10,
  },
  cont1: {
    padding: 20,
  },
  serText: {
    fontFamily: Fonts.osBold,
    fontSize: 32,
    color: Colors.blackDark,
  },
});
