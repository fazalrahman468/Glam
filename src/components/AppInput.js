import React, {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function AppInput({text, icon, image, ...otherProps}) {
  const textInputRef = useRef(null);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <TouchableOpacity
      style={styles.touchable}
      activeOpacity={1}
      onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.cont}>
        {image && <Image source={image} />}

        <TextInput
          {...otherProps}
          placeholderTextColor="grey"
          style={{color: 'black'}}
          ref={textInputRef}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
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
});
