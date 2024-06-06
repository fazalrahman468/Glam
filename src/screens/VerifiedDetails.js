import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import Verify from '../assets/images/Verify.svg';
import ContactComp from '../components/ContactComp';
import MessageComp from '../components/MessageComp';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';

export default function VerifiedDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <View style={styles.imgView}>
        <Verify />
      </View>
      <View style={styles.textView}>
        <ContactComp
          title="Verified Successfully!"
          image={require('../assets/images/Happy.png')}
          subTitle="We have verified your contact details. Don't forget to verify your ID before making a deal."
        />
        <MessageComp
          image={require('../assets/images/Phone.png')}
          title="Via SMS:"
          subTitle="*** *******61"
        />
        <MessageComp
          image={require('../assets/images/Email.png')}
          title="Via Email:"
          subTitle="***ic16@gmail.com"
        />
        <AppButton
          title="GO TO HOME"
          onPress={() => navigation.navigate('RecoverPassword')}
        />
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
    flex: 0.45,
  },
  textView: {
    padding: 20,
    flex: 0.55,
  },
});
