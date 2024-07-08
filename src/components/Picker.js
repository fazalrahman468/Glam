import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors} from '../assets/colors/Colors';
import {Fonts} from '../assets/fonts/Fonts';

export default function Picker({title, onImagesSelected, clearImage}) {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (clearImage) {
      setImageUri(null);
    }
  }, [clearImage]);

  const onSelectImage = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      if (images.length > 0) {
        setImageUri(images[0].path);
        onImagesSelected(images.map(image => image.path));
      }
    });
  };

  return (
    <View>
      <View style={styles.cont}>
        <Text style={styles.picker}>{title}</Text>
        <TouchableOpacity style={styles.buttonView} onPress={onSelectImage}>
          <Image source={require('../assets/images/Upload.png')} />
          {/* <Text style={styles.button}>Choose file here</Text> */}
        </TouchableOpacity>
      </View>

      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'space-between',
    // marginVertical: 10,
  },
  picker: {
    color: Colors.black,
    fontFamily: Fonts.osSemiBold,
    fontSize: 24,
    // margin: 5,
  },
  buttonView: {
    backgroundColor: Colors.gray1,
    // padding: 10,
    // borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // flexDirection: 'row',
    // marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  button: {
    fontSize: 18,
    fontFamily: Fonts.osRegular,
    color: Colors.white,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
