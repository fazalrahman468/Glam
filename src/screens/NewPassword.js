import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import {useNavigation} from '@react-navigation/native';
import ContactComp from '../components/ContactComp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import {Fonts} from '../assets/fonts/Fonts';
import PasswordInput from '../components/PasswordInput';

export default function NewPassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <ContactComp
        title="New Password"
        image={require('../assets/images/Lock.png')}
        subTitle="Your new password must be different from previously used passwords."
      />
      <PasswordInput
        text="New Password"
        placeholder="********"
        secureTextEntry
      />
      <PasswordInput
        text="Confirm Password"
        placeholder="********"
        secureTextEntry
      />
      <Text style={styles.passwordText}>
        Password must be at least 6 character
      </Text>
      <View style={styles.btnView}>
        <AppButton
          title="SAVE"
          onPress={() => navigation.navigate('Success')}
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
  passwordText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.gray,
    marginTop: 10,
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    left: 20,
  },
});
