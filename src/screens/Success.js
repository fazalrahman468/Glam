import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import ContactComp from '../components/ContactComp';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';

export default function Success() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <Image
        source={require('../assets/images/Success.png')}
        style={styles.img}
      />
      <View style={styles.contentView}>
        <ContactComp
          title="Password Successfully Created"
          image={require('../assets/images/Well.png')}
          subTitle="Your new password has been created successfully!"
        />
        <View style={styles.btnView}>
          <AppButton
            title="LOG IN"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.gray,
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginBottom: -40,
    zIndex: 1,
  },
  contentView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.white,
    padding: 10,
    paddingTop: 40,
    borderRadius: 20,
  },
  btnView: {
    width: '70%',
  },
});
