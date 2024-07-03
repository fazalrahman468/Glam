import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Colors} from '../assets/colors/Colors';
import AppInput from '../components/AppInput';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { APIBASEURL } from '../utils/constants';
import { Fonts } from '../assets/fonts/Fonts';

export default function Search() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search=='') {
      fetchProducts("");
    }
  }, [search]);

  const fetchProducts = async (arg) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `${APIBASEURL}/api/product/all/${arg}`,
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
  }

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
      <AppInput 
      value={search} 
      onChangeText={setSearch} 
      placeholder="Search"
      onSubmitEditing={()=>fetchProducts(search)}
       />
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
