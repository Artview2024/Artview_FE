import {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const uri =
            response.assets && response.assets[0].uri
              ? response.assets[0].uri
              : '';
          const base64 =
            response.assets && response.assets[0].base64
              ? response.assets[0].base64
              : '';
          setImageUri(uri);
          setImageBase64(base64);
        }
      },
    );
  };

  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri =
            response.assets && response.assets[0].uri
              ? response.assets[0].uri
              : '';
          const base64 =
            response.assets && response.assets[0].base64
              ? response.assets[0].base64
              : '';
          setImageUri(uri);
          setImageBase64(base64);
        }
      },
    );
  };

  return {
    imageUri,
    imageBase64,
    handleTakePhoto,
    handleSelectImage,
    setImageUri,
    setImageBase64,
  };
};
