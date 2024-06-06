import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import AppInput from '../components/AppInput';
import {useNavigation} from '@react-navigation/native';

export default function Search() {
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      title: 'Item 1',
      image: require('../assets/images/Group18.png'),
      screen: 'Description',
    },
    {
      id: '2',
      title: 'Item 2',
      image: require('../assets/images/Group16.png'),
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        marginTop: 20,
        marginLeft: 10,
      }}
      onPress={() => item.screen && navigation.navigate(item.screen)}>
      <Image source={item.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.cont}>
      <AppInput placeholder="Search" />
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
});
