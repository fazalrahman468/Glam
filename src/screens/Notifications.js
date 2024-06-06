import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import NotificationComp from '../components/NotificationComp';
import {Fonts} from '../assets/fonts/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function Notifications() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <View style={styles.no}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/Back.png')} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.text}>Notifications</Text>
        </View>
      </View>
      <NotificationComp
        title="Mention"
        subTitle="Someone mentioned you"
        image={require('../assets/images/At.png')}
      />
      <NotificationComp
        title="People"
        subTitle="Someone followed you"
        image={require('../assets/images/People.png')}
      />
      <NotificationComp
        title="Like"
        subTitle="Someone liked you"
        image={require('../assets/images/Red.png')}
      />
      <NotificationComp
        title="Shop"
        subTitle="Shopping items"
        image={require('../assets/images/Bag.png')}
      />
      <NotificationComp
        title="Appointments"
        subTitle="Today's appointments"
        image={require('../assets/images/Appo.png')}
      />
      <NotificationComp
        title="Courses"
        subTitle="Course Tutorials"
        image={require('../assets/images/Cou.png')}
      />
      <NotificationComp
        title="Jobs"
        subTitle="Jobs forms"
        image={require('../assets/images/Job.png')}
      />
      <NotificationComp
        title="Feedback"
        subTitle="Feedback "
        image={require('../assets/images/Feedback.png')}
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
  no: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.black,
    textAlign: 'center',
  },
});
