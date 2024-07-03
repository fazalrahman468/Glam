import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import ContactComp from '../components/ContactComp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppButton from '../components/AppButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIBASEURL } from '../utils/constants';

export default function VerifyEmail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {fullName, email, mobileNumber, password} = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit code');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending OTP verification request:', {email, code: otp});
      const response = await axios.post(
        `${APIBASEURL}/api/users/verify-otp/registration`,
        {
          email:email.trim().toLocaleLowerCase(),
          code: otp,
        },
      );

      if (response.data.success) {
        const registerResponse = await axios.post(
          `${APIBASEURL}/api/users/signup`,
          {
            name: fullName,
            email:email.trim().toLocaleLowerCase(),
            phone: mobileNumber,
            password,
          },
        );

        await AsyncStorage.setItem('userToken', registerResponse.data.token);
        await AsyncStorage.setItem('name', fullName);
        await AsyncStorage.setItem('image', "");
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phone', mobileNumber);
  

        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      const errorMessage =
        error.response && error.response.data
          ? typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data)
          : 'Network Error';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <ContactComp
        title="Verify Code"
        image={require('../assets/images/Light.png')}
        subTitle="The verification code was sent to your email. Code expiration time is 120s. Please enter the code."
      />
      <OTPInputView
        style={styles.otp}
        pinCount={6}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        keyboardAppearance="default"
        keyboardType="number-pad"
        onCodeChanged={setOtp}
      />
      <View style={styles.btnView}>
          <AppButton loading={loading} title="Verify" onPress={verifyOtp} />
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
