import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwMDEwOGJmODYwZGNhOWNhYzRlNDYiLCJ0eXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MTkzODQyMjV9.PR98bYKOChlTiuWE4Z9XRSohDlOKs5qlSnyY3f9aqT8';

  const handleSubmit = async () => {
    // Email validation regex
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
        <AppButton title="Submit" onPress={handleSubmit} />
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
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
  ratingView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.black,
    marginLeft: 12,
  },
  btnView: {
    width: '100%',
    marginTop: 20,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
