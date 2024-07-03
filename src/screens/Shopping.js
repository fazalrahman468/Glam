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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIBASEURL } from '../utils/constants';

export default function Shopping({selected}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('userToken');
        if (savedToken) {
          setToken(savedToken);
          fetchProducts(savedToken);
          fetchCategories(savedToken);
        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);

  const fetchProducts = async token => {
    try {
      const response = await axios.get(
        `${APIBASEURL}/api/product/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
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

  const fetchCategories = async token => {
    try {
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
      const response = await axios.get(
        `${APIBASEURL}/api/product/${categoryId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response?.data) {
        setProducts(response?.data?.products);
      }
    } catch (error) {
      console.log('Error fetching products by category:', error);
    }
  };

  const handleCategorySelect = categoryId => {
    if (categoryId === 'all') {
      fetchProducts(token);
    } else {
      fetchProductsByCategory(categoryId);
    }
    setSelectedCategory(categoryId);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Description', {item})}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemPrice}>$<Text style={{fontWeight:'800'}}>{item.price}</Text></Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Catalog</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={[
            styles.allCategoriesButton,
            selected && styles.selectedContainer,
          ]}
          onPress={() => handleCategorySelect('all')}>
          <Image source={require('../assets/images/Rectangle12.png')} />
          <Text
            style={[styles.allCategoriesText, selected && styles.selectedText]}>
            All
          </Text>
        </TouchableOpacity>
        {categories.map(category => (
          <ShoppingComp
            key={category._id}
            title={category.name}
            image={category.image}
            onPress={() => handleCategorySelect(category._id)}
            selected={selectedCategory === category._id}
          />
        ))}
      </ScrollView>
      <FlatList
        data={products}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
    fontFamily: Fonts.osBold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  scroll: {
    marginTop: 30,
    height:170
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
    width: 140,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf:'center'
  },
  itemTitle: {
    fontFamily: Fonts.osSemiBold,
    fontSize: 18,
    color: Colors.blackDark,
    marginTop: 10,
  },
  itemPrice: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.blackDark,
    marginTop: 5,
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
    height: 120,
  },
});
