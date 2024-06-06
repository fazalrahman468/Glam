import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import ShoppingComp from '../components/ShoppingComp';
import CartButton from '../components/CartButton';
import {useNavigation} from '@react-navigation/native';

export default function Booking() {
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <View style={styles.imgView}>
        <ImageBackground
          source={require('../assets/images/Rectangle40.png')}
          style={styles.img}>
          <Text style={styles.glamText}>Glam Guide</Text>
          <View style={styles.locView}>
            <Image source={require('../assets/images/Location.png')} />
            <Text style={styles.locText}>
              123 Main Boulevard, DHA Phase 5, Lahore 54000, Pakistan
            </Text>
          </View>
          <View style={styles.timeView}>
            <Image source={require('../assets/images/Clock.png')} />
            <Text style={styles.locText}>9 AM To 6 PM</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.cont1}>
        <Text style={styles.serText}>Services</Text>
        <View style={styles.serView}>
          <ShoppingComp
            title="Makeup"
            image={require('../assets/images/Makeup.png')}
            onPress={() => navigation.navigate('Prices')}
          />
          <ShoppingComp
            title="Hair Colors"
            image={require('../assets/images/Hr.png')}
          />
          <ShoppingComp
            title="Facials"
            image={require('../assets/images/Facials.png')}
          />
          <ShoppingComp
            title="Hair Style"
            image={require('../assets/images/HairStyle.png')}
          />
          <ShoppingComp
            title="Hair Cut"
            image={require('../assets/images/HairCut.png')}
          />
          <ShoppingComp
            title="Pedicure"
            image={require('../assets/images/Pedicure.png')}
          />
          <ShoppingComp
            title="Manicure"
            image={require('../assets/images/Manicure.png')}
          />
          <ShoppingComp
            title="Mehndi"
            image={require('../assets/images/Mehndi.png')}
          />
        </View>
        <View style={styles.btnView}>
          <CartButton
            title="Book Appointment"
            onPress={() => navigation.navigate('Appointments')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  imgView: {
    width: '100%',
    height: '40%',
  },
  img: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  glamText: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.white,
    marginLeft: 20,
  },
  locView: {
    flexDirection: 'row',
  },
  locText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
    textAlign: 'auto',
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginRight: 10,
  },
  cont1: {
    padding: 20,
  },
  serText: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.blackDark,
  },
  serView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btnView: {
    marginTop: 20,
  },
});
