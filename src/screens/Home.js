import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import HomeComp from '../components/HomeComp';
import {useNavigation} from '@react-navigation/native';
import {Screen} from 'react-native-screens';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <ImageBackground
        source={require('../assets/images/OnBo.png')}
        style={styles.img}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/images/Menu.png')} />
        </TouchableOpacity>
        <HomeComp
          title="SHOPPING"
          onPress={() => navigation.navigate('BottomTab', {screen: 'Shopping'})}
        />
        <HomeComp
          title="BOOKING"
          onPress={() => navigation.navigate('Booking')}
        />
        <HomeComp
          title="JOB FORMS"
          onPress={() => navigation.navigate('JobForm')}
        />
        <HomeComp
          title="COURSES TUTORIAL"
          onPress={() =>
            navigation.navigate('BottomNav', {screen: 'CourseTutorial'})
          }
        />
        <HomeComp
          title="FEEDBACK"
          onPress={() => navigation.navigate('Feedback')}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  img: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  menu: {
    width: '100%',
  },
});
