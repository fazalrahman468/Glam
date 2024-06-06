import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import ShoppingComp from '../components/ShoppingComp';

export default function Shopping() {
  const data = [
    {
      id: '1',
      title: 'Item 1',
      image: require('../assets/images/Group18.png'),
    },
    {
      id: '2',
      title: 'Item 2',
      image: require('../assets/images/Group16.png'),
    },
    {
      id: '3',
      title: 'Item 3',
      image: require('../assets/images/Group18.png'),
    },
    {
      id: '4',
      title: 'Item 4',
      image: require('../assets/images/Group16.png'),
    },
    {
      id: '5',
      title: 'Item 5',
      image: require('../assets/images/Group18.png'),
    },
    {
      id: '6',
      title: 'Item 6',
      image: require('../assets/images/Group16.png'),
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        marginTop: 20,
        marginLeft: 10,
      }}>
      <Image source={item.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Catalog</Text>
      <AppInput placeholder="Search" />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ShoppingComp
          title="All"
          image={require('../assets/images/Rectangle12.png')}
        />
        <ShoppingComp
          title="Hair"
          image={require('../assets/images/Rectangle11.png')}
        />
        <ShoppingComp
          title="Facials"
          image={require('../assets/images/Rectangle9.png')}
        />
        <ShoppingComp
          title="Nail Paints"
          image={require('../assets/images/Rectangle10.png')}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
});
