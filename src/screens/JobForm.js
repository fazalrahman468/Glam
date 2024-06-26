import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import CartButton from '../components/CartButton';
import AppButton from '../components/AppButton';
import JobComp from '../components/JobComp';
import {useNavigation} from '@react-navigation/native';

export default function JobForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3ZTlmNTBhODlkZWNmNzVjZTUxZGUiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MTkyMTMyODh9.9vC2u8nJB2YCbgTj6TdOdBVogoIdC2exAhbGw-9MbLA';

  const handleJobTitleSelect = title => {
    setSelectedJobTitle(title);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !message || !selectedJobTitle) {
      Alert.alert('Error', 'Please fill all fields and select a job title.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://glamparlor.onrender.com/api/jobform/create',
        {
          fname: firstName,
          lname: lastName,
          email,
          message,
          job: selectedJobTitle,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Your application has been submitted.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        setSelectedJobTitle('');
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
      <Text style={styles.text}>Job Application Form</Text>
      <AppInput
        text="First Name"
        placeholder="Rabia"
        value={firstName}
        onChangeText={setFirstName}
      />
      <AppInput
        text="Last Name"
        placeholder="Safdar"
        value={lastName}
        onChangeText={setLastName}
      />
      <AppInput
        text="Email Address"
        placeholder="Rabia@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <AppInput
        text="Your Message"
        placeholder="Enter your question or message"
        value={message}
        onChangeText={setMessage}
      />
      <CartButton title="Select Your Job Title" />

      <View style={styles.titleView}>
        {[
          'Bridal makeup',
          'Manicure Pedicure',
          'Hair Stylist',
          'Party Makeup',
        ].map(title => (
          <JobComp
            key={title}
            title={title}
            selected={selectedJobTitle === title}
            onPress={() => handleJobTitleSelect(title)}
          />
        ))}
      </View>
      <AppButton title="SUBMIT" onPress={handleSubmit} />
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
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.blackDark,
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
