import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import {useNavigation} from '@react-navigation/native';
import ContactComp from '../components/ContactComp';
import MessageComp from '../components/MessageComp';

export default function Verify() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <ContactComp
        title="Verify Contact Details!"
        image={require('../assets/images/Face.png')}
        subTitle="Select a mobile number or an email address to 
        verify your contact information by sending a verification code."
      />
      <MessageComp
        image={require('../assets/images/Phone.png')}
        title="Via SMS:"
        subTitle="*** *******61"
        onPress={() => navigation.navigate('VerifyMobile')}
      />
      <MessageComp
        image={require('../assets/images/Email.png')}
        title="Via Email:"
        subTitle="***ic16@gmail.com"
        onPress={() => navigation.navigate('VerifyEmail')}
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
