import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

import Eye from '../assets/images/Eye.png';
import EyeOff from '../assets/images/EyeOff.png';

export default function PasswordInput({text, secureTextEntry, ...otherProps}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.cont}>
        <TextInput
          {...otherProps}
          placeholderTextColor="grey"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          style={styles.input}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={togglePasswordVisibility}>
            <Image
              source={isPasswordVisible ? Eye : EyeOff}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.blueDark,
    fontFamily: Fonts.medium,
    fontSize: 14,
    margin: 5,
  },
  cont: {
    backgroundColor: Colors.white,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    flex: 1,
  },
  icon: {
    padding: 5,
  },
  iconImage: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
  },
});
