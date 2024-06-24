import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import Recover from '../assets/images/Recover.svg';
import AppButton from '../components/AppButton';
import ContactComp from '../components/ContactComp';
import AppInput from '../components/AppInput';

const API_URL = 'https://glamparlor.onrender.com';

export default function RecoverPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendRecoveryCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/users/forget-password`,
        {email},
      );
      const token = response.data.token;
      Alert.alert('Success', 'OTP has been sent to your email');
      navigation.navigate('RecoverByEmail', {token});
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
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <View style={styles.imgView}>
        <Recover />
      </View>

      <ContactComp
        title="Recover Your Password"
        image={require('../assets/images/Face.png')}
        subTitle="Select mobile number or email to verify by sending code."
      />

      <AppInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <AppButton title="NEXT" onPress={sendRecoveryCode} />
        )}
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
  imgView: {
    alignItems: 'center',
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    left: 20,
  },
});
