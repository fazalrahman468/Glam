import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import {useNavigation} from '@react-navigation/native';
import ContactComp from '../components/ContactComp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppButton from '../components/AppButton';

export default function CodeMatch() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <ContactComp
        title="Code Matched!"
        image={require('../assets/images/Well.png')}
        subTitle="The recovery code was sent to your email. Code expiration time is 120s
        .Please enter the code."
      />
      <OTPInputView
        style={styles.otp}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <View style={styles.btnView}>
        <AppButton
          title="DONE"
          onPress={() => navigation.navigate('NewPassword')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  otp: {
    width: '100%',
    height: 80,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    left: 20,
  },
});
