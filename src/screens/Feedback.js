import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to retrieve token from AsyncStorage', error);
      }
    };

    getToken();
  }, []);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !msg) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://glamparlor.onrender.com/api/feedback/create',
        {
          name,
          email,
          msg,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Your feedback has been submitted.');
        setName('');
        setEmail('');
        setMsg('');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <Text style={styles.text}>
        Overall, how would you rate your experience?
      </Text>

      <AppInput
        text="Name"
        placeholder="name"
        value={name}
        onChangeText={setName}
      />
      <AppInput
        text="Email"
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <AppInput
        text="Message"
        placeholder="message"
        value={msg}
        onChangeText={setMsg}
      />

      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <AppButton title="Submit" onPress={handleSubmit} />
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
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  btnView: {
    width: '100%',
    marginTop: 20,
  },
});
