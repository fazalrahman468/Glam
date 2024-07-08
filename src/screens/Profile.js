import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Colors} from '../assets/colors/Colors';
import {CartContext} from '../components/CartContext';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import Picker from '../components/Picker';
import {storage} from '../firebase/Firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();
  const {user, setUser} = useContext(CartContext);
  const {fullName, email, mobileNumber, profileImage} = user;

  const [name, setName] = useState(fullName);
  const [imageUri, setImageUri] = useState(profileImage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setName(parsedUser.fullName);
          setImageUri(parsedUser.profileImage);
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    };

    loadUser();
  }, [setUser]);

  const handleSaveChanges = async () => {
    if (!name) {
      Alert.alert('Validation Error', 'Name field cannot be empty');
      return;
    }
    if (!imageUri) {
      Alert.alert('Validation Error', 'Please select an image');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = imageUri;
      if (imageUri && imageUri !== profileImage) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `profileImages/${fileName}`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.put(
        'https://glamparlor.onrender.com/api/users/update-user',
        {
          name: name,
          profilePicture: imageUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );

      setUser(response.data.user);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      Alert.alert('Success', 'Profile updated successfully');
      setName('');
      setImageUri(null);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/ArrowBack.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.prof}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <Picker
            onImagesSelected={images => setImageUri(images[0])}
            clearImage={imageUri === null}
          />
        )}
      </View>
      <View style={styles.inputView}>
        <AppInput
          text="Username"
          image={require('../assets/images/User.png')}
          placeholder="Change Name"
          value={name}
          onChangeText={setName}
        />
        <AppInput
          text="Email"
          image={require('../assets/images/Mail.png')}
          placeholder="Email"
          editable={false}
          selectTextOnFocus={false}
        />
        <AppInput
          text="Phone Number"
          image={require('../assets/images/Mobile.png')}
          placeholder="Phone Number"
          editable={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <AppButton title="Save Changes" onPress={handleSaveChanges} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.gray1,
    paddingBottom: 20,
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.osSemiBold,
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  prof: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputView: {
    justifyContent: 'space-around',
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
