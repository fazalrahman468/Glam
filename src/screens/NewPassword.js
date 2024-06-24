import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import Back from '../assets/images/Back.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import ContactComp from '../components/ContactComp';
import AppButton from '../components/AppButton';
import {Fonts} from '../assets/fonts/Fonts';
import PasswordInput from '../components/PasswordInput';

const API_URL = 'https://glamparlor.onrender.com';

export default function NewPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params.token;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Both fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/api/users/update-password`, {
        password: newPassword,
        token: token,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Password updated successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to update password');
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
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <PasswordInput
        text="Confirm Password"
        placeholder="********"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.passwordText}>
        Password must be at least 6 characters
      </Text>
      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <AppButton title="SAVE" onPress={handleSave} />
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
