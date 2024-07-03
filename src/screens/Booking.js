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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIBASEURL } from '../utils/constants';

export default function Booking() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchServices();
      fetchCategories()
    }, [])
  );
  const fetchServices = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.get(
        `${APIBASEURL}/api/service/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response?.data) {
        setServices(response?.data?.services);
      }
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.get(
        `${APIBASEURL}/api/cat/all/1`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response?.data) {
        setCategories(response?.data?.category);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchProductsByCategory = async categoryId => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.get(
        `${APIBASEURL}/api/service/${categoryId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response?.data) {
        setServices(response?.data?.services);
      }
    } catch (error) {
      console.log('Error fetching products by category:', error);
    }
  };

  const handleCategorySelect = categoryId => {
    if (categoryId === 'all') {
      fetchServices();
    } else {
      fetchProductsByCategory(categoryId);
    }
    setSelectedCategory(categoryId);
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={[
            styles.allCategoriesButton,
            selectedCategory == 'all' && styles.selectedContainer,
          ]}
          onPress={() => handleCategorySelect('all')}>
          <Image source={require('../assets/images/Rectangle12.png')} />
          <Text
            style={[styles.allCategoriesText, selectedCategory == 'all' && styles.selectedText]}>
            All
          </Text>
        </TouchableOpacity>
        {categories.map(category => (
          <ShoppingComp
            key={category?._id}
            title={category?.name}
            image={category?.image}
            onPress={() => handleCategorySelect(category._id)}
            selected={selectedCategory === category?._id}
          />
        ))}
      </ScrollView>
        <Text style={styles.serText}>Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {services.map(service => (
             <TouchableOpacity
             onPress={() =>
              navigation.navigate('Prices', {
                title: service.name,
                image: service.image,
                price: service.price,
                serviceId: service._id,
              })
            }
             key={service._id}
             style={[styles.servicecontainer]}>
             <Image source={{uri: service.image}} style={styles.image} />
             <Text numberOfLines={1} style={[styles.text]}>
               {service.name}
             </Text>
           </TouchableOpacity>
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
  allCategoriesButton: {
    backgroundColor: Colors.gray1,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    height: 110,
  },
  allCategoriesText: {
    fontFamily: Fonts.osBold,
    fontSize: 15,
    color: Colors.grayLight,
    marginTop: 10,
  },
  selectedText: {
    color: Colors.white,
  },
  selectedContainer: {
    backgroundColor: Colors.blueDark,
    borderRadius: 10,
    padding: 8,
    height: 110,
  },
  servicecontainer: {
    backgroundColor: Colors.gray1,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    fontFamily: Fonts.osBold,
    fontSize: 15,
    color: Colors.grayLight,
    marginTop: 10,
    textAlign:'center'
  },
});
