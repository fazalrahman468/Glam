import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';

const data = [
  {
    id: '1',
    image: require('../assets/images/Makeup.png'),
    link: 'https://www.youtube.com/watch?v=pfVyPRtXQTM',
  },
  {
    id: '2',
    image: require('../assets/images/Hair.png'),
    link: 'https://www.youtube.com/watch?v=qE0gHrPHuPA',
  },
  {
    id: '3',
    image: require('../assets/images/Rectangle12.png'),
    link: 'https://www.youtube.com/watch?v=USns7q86V4M',
  },
  {
    id: '4',
    image: require('../assets/images/www.png'),
    link: 'https://www.youtube.com/watch?v=SbJeW5-rRRU',
  },
  {
    id: '5',
    image: require('../assets/images/Makeup.png'),
    link: 'https://www.youtube.com/watch?v=pfVyPRtXQTM',
  },
  {
    id: '6',
    image: require('../assets/images/Hair.png'),
    link: 'https://www.youtube.com/watch?v=qE0gHrPHuPA',
  },
  {
    id: '7',
    image: require('../assets/images/Rectangle12.png'),
    link: 'https://www.youtube.com/watch?v=USns7q86V4M',
  },
  {
    id: '8',
    image: require('../assets/images/www.png'),
    link: 'https://www.youtube.com/watch?v=SbJeW5-rRRU',
  },
];

export default function CourseTutorial() {
  const handleLinkPress = link => {
    Linking.openURL(link);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.itemImage} />
      <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
        <Text style={styles.itemLink}>Watch on YouTube</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Course Tutorials</Text>
      <AppInput
        image={require('../assets/images/Sea.png')}
        placeholder="Search"
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
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
  imgView: {
    marginTop: 20,
  },
  img: {
    width: 164,
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.gray1,
    borderRadius: 10,
  },
  videoText: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    color: Colors.blackDark,
  },
  list: {
    marginTop: 20,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  itemLink: {
    marginTop: 10,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.black,
  },
});
