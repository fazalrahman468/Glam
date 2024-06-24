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
import CartButton from '../components/CartButton';
import {useNavigation} from '@react-navigation/native';

export default function Booking() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTg4NzI3OTB9.jFX7-viPGVlzbSZV8RJrKRfV8hQnMuYT6tS4UV-4MGk';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://glamparlor.onrender.com/api/service/all',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
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
            <Text style={styles.locText}>
              123 Main Boulevard, DHA Phase 5, Lahore 54000, Pakistan
            </Text>
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
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.white,
    marginLeft: 20,
  },
  locView: {
    flexDirection: 'row',
  },
  locText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
    textAlign: 'auto',
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
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
});
