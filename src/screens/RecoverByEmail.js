import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import ContactComp from '../components/ContactComp';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AppButton from '../components/AppButton';

const API_URL = 'https://glamparlor.onrender.com';

export default function RecoverByEmail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const token = route.params?.token;

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/users/verify-otp/forget-password`,
        {code: otp, token},
      );

      if (response.data.success) {
        Alert.alert('Success', 'OTP verified successfully');
        navigation.navigate('NewPassword', {token});
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.cont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <ContactComp
          title="Recovery Code"
          image={require('../assets/images/Light.png')}
          subTitle="The recovery code was sent to your email. Code expiration time is 120s. Please enter the code."
        />
        <OTPInputView
          style={styles.otp}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={setOtp}
        />
        <View style={styles.btnView}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <AppButton title="NEXT" onPress={verifyOtp} />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
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
