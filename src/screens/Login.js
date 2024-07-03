import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import Glam from '../assets/images/Glam.svg';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import LoginComp from '../components/LoginComp';
import PasswordInput from '../components/PasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIBASEURL } from '../utils/constants';


export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both email and password must be filled');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${APIBASEURL}/api/auth`, {
        email: email.trim().toLocaleLowerCase(),
        password,
      });

      const {token,user} = response.data;

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('image', user?.profilePicture||"");
      await AsyncStorage.setItem('name', user.name);
      await AsyncStorage.setItem('email', user.email);
      await AsyncStorage.setItem('phone', user.phone);

      navigation.navigate('Home');
    } catch (error) {
      ToastAndroid.show(error.response.data.message,ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <View style={styles.glamView}>
        <Glam />
      </View>
      <ScrollView>
        <LoginComp title="Welcome back, Log in to your account" />
        <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
        <PasswordInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <View style={styles.rememberMeContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={toggleRememberMe}
              style={styles.checkbox}>
              {rememberMe && (
                <Image
                  source={require('../assets/images/tick.png')}
                  style={styles.tick}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.remText}>Remember me</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('RecoverPassword')}>
            <Text style={styles.forText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <AppButton loading={loading} title="LOG IN" onPress={loginUser} />
        </View>
        <Text style={styles.accText}>
          Don't have an account yet?{' '}
          <Text
            style={styles.signText}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  glamView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  tick: {
    height: 16,
    width: 16,
  },
  remText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.grayDark,
  },
  forText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.blueDark,
  },
  btnView: {
    marginTop: 10,
  },
  accText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.gray,
    marginTop: 10,
    textAlign: 'center',
  },
  signText: {
    color: Colors.black,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
