import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import ShoppingComp from '../components/ShoppingComp';
import {useNavigation} from '@react-navigation/native';

export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTg4NzI3OTB9.jFX7-viPGVlzbSZV8RJrKRfV8hQnMuYT6tS4UV-4MGk';

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://glamparlor.onrender.com/api/product/all',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
        },
      );
      if (response?.data) {
        setProducts(response?.data?.products);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://glamparlor.onrender.com/api/cat/all/1',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Description', {item})}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Catalog</Text>
      <AppInput placeholder="Search" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <ShoppingComp
            key={category._id}
            title={category.name}
            image={category.image}
          />
        ))}
      </ScrollView>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  itemTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.blackDark,
    marginTop: 10,
  },
  itemPrice: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.blackDark,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: Colors.black,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 20,
    lineHeight: 20,
  },
});
