import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import LoginComp from '../components/LoginComp';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import PasswordInput from '../components/PasswordInput';

const API_URL = 'https://glamparlor.onrender.com';

export default function SignUp() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUpUser = async () => {
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/users/send-code`, {
        name: fullName,
        email,
        phone: mobileNumber,
        password,
      });
      navigation.navigate('VerifyEmail', {
        fullName,
        email,
        mobileNumber,
        password,
      });
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
    <KeyboardAvoidingView style={styles.cont}>
      <ScrollView
        contentContainerStyle={styles.scrollCont}
        keyboardShouldPersistTaps="never">
        <View style={styles.glamView}>
          <Text style={styles.glamText}>Glam Guide</Text>
        </View>
        <View style={styles.cont1}>
          <LoginComp title="Welcome back, Sign up to your account" />
          <AppInput
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
          <AppInput
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
          <Text style={styles.passwordText}>
            Password must be at least 6 characters
          </Text>
          <View style={styles.btnView}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <AppButton title="Sign Up" onPress={signUpUser} />
            )}
          </View>
          <View style={styles.signin}>
            <Text style={styles.signinText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollCont: {
    flexGrow: 1,
  },
  glamView: {
    alignItems: 'center',
    height: '25%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
  },
  glamText: {
    fontFamily: Fonts.semiBold,
    fontSize: 36,
    color: Colors.white,
  },
  cont1: {
    padding: 20,
    flex: 1,
  },
  passwordText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.gray,
    marginTop: 10,
  },
  btnView: {
    marginTop: 10,
  },
  signin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signinText: {
    color: Colors.gray,
  },
  signinLink: {
    color: Colors.primary,
    marginLeft: 5,
  },
});
