import {View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, ActivityIndicator} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from '../assets/colors/Colors';
import {CartContext} from '../components/CartContext';
import {Fonts} from '../assets/fonts/Fonts';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIBASEURL } from '../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

export default function Profile() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const getUserData=async()=>{
    const username= await AsyncStorage.getItem('name');
    const image= await AsyncStorage.getItem('image');
    const useremail= await AsyncStorage.getItem('email');
    const userphone= await AsyncStorage.getItem('phone');
    setName(username)
    setImage(image)
    setPhone(userphone)
    setEmail(useremail)
   }
 
   useFocusEffect(
     React.useCallback(() => {
       getUserData();
     }, [])
   );
   

  const uploadImage = async () => {
    setUploadingImage(true);
    
    try {
    const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      })
      if (!image.path) return;
      const filename = `images/${new Date()
        .toISOString()
        .replace(/[.:-]+/g, '_')}`;

        const storageRef = storage().ref(filename);
      await storageRef.putFile(image.path);
      const url = await storageRef.getDownloadURL();
      console.log(url)
      setImage(url);
      ToastAndroid.show('Image uploaded successfully',ToastAndroid.BOTTOM);
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Upload Again',ToastAndroid.BOTTOM);
      setUploadingImage(false);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.put(
        `${APIBASEURL}/api/users/update-user`,
        {
          profilePicture:image, name:name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
          },
        },
      );
      
      if (response.data.success) {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('image', image||"");
        ToastAndroid.show('User updated successfully',ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Something went wrong. Please try again.',ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.cont}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/Back.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImage} style={styles.profView}>
        {uploadingImage?
        <ActivityIndicator/>:
        <Image source={image?{uri:image}:require('../assets/images/user.png')} style={styles.prof}/>
        }
        {/* <Image
          source={require('../assets/images/Prof.png')}
          style={styles.prof}
        /> */}
      </TouchableOpacity>
      <AppInput
        text="Name"
        placeholder="name"
        value={name}
        onChangeText={setName}
      />

      <AppInput
        text="Email"
        placeholder="Email"
        value={email}
        editable={false}
        selectTextOnFocus={false}
      />


      <AppInput
        text="Phone"
        placeholder="Phone"
        value={phone}
        editable={false}
        selectTextOnFocus={false}
      />

      <View style={styles.btnView}>
        <AppButton loading={loading} onPress={handleSubmit} title="Save Changes" />
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
  profView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
  },
  prof: {
    width: 100,
    height: 100,
    borderRadius:50
  },
  headerText: {
    color: Colors.black,
    fontFamily: Fonts.osSemiBold,
    fontSize: 24,
    marginTop: 4,
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
