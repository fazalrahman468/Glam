import React, {useRef, useState} from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';
import Beauty from '../assets/images/Beauty.svg';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import OnBoardComp from '../components/OnBoardComp';

export default function OnBoard() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPress = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => setCurrentIndex(index)}
        scrollEnabled={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}>
        <View style={styles.cont}>
          <ImageBackground
            source={require('../assets/images/OnBo.png')}
            style={styles.img}>
            <OnBoardComp
              title="APPOINTMENTS:"
              subTitle="BOOK IN ADVANCE TO SECURE YOUR SPOT."
            />
            <OnBoardComp
              title="CANCELLATION:"
              subTitle="NOTIFY US AT LEAST ONE DAY AHEAD TO AVOID A FEE."
            />
            <OnBoardComp
              title="LATE ARRIVALS:"
              subTitle="WE'LL TRY TO ACCOMMODATE, BUT SERVICES MAY BE SHORTENED."
            />
            <OnBoardComp
              title="CHILDREN:"
              subTitle="ONLY BRING KIDS WITH APPOINTMENTS FOR PEACE AND SAFETY."
            />
            <OnBoardComp
              title="PERSONAL BELONGINGS:"
              subTitle="KEEP TRACK OF YOUR ITEMS. WE'RE NOT RESPONSIBLE FOR LOST OR STOLEN BELONGINGS"
            />
            <OnBoardComp
              title="PAYMENT:"
              subTitle="PAY AT THE END. WE ACCEPT CASH, CARDS, AND ELECTRONIC PAYMENTS."
            />
            <OnBoardComp
              title="FEEDBACK:"
              subTitle="SHARE YOUR THOUGHTS FOR IMPROVEMENT"
            />
            <Text style={styles.salText}>
              Customers Agree To Terms{' '}
              <Text style={styles.salPolicyText}>Salon Policy</Text>
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.cont1}>
          <ImageBackground
            source={require('../assets/images/OnBo.png')}
            style={styles.img1}>
            <View style={styles.imgView}>
              <Beauty />
            </View>
            <View style={styles.textView}>
              <Text style={styles.salText}>
                Glam Guide{' '}
                <Text style={styles.salPolicyText}>provide services</Text> to
                customers
              </Text>
            </View>
            <View style={styles.loginBtnView}>
              <AppButton
                title="LOG IN"
                onPress={() => navigation.navigate('Login')}
              />
              <AppButton
                title="SIGN UP"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          </ImageBackground>
        </View>
      </Swiper>
      {currentIndex === 0 && (
        <View style={styles.btnContainer}>
          <AppButton title="Next" onPress={handleNextPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  img: {
    flex: 1,
    padding: 20,
  },
  salText: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    color: Colors.black,
    marginHorizontal: 20,
    marginTop: 20,
  },
  salPolicyText: {
    color: 'blue',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    alignItems: 'center',
    width: '25%',
    marginHorizontal: 160,
  },
  cont1: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  img1: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgView: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  textView: {
    flex: 0.4,
    justifyContent: 'space-evenly',
  },
  dotStyle: {
    backgroundColor: Colors.gray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    marginBottom: 130,
  },
  activeDotStyle: {
    backgroundColor: Colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    marginBottom: 130,
  },
  loginBtnView: {
    width: '100%',
    flex: 0.2,
    marginBottom: 10,
  },
});
