import {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string>('');

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
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
          setImageUri(uri);
        }
      },
    );
  };

  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
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
          setImageUri(uri);
        }
      },
    );
  };

  return {
    imageUri,
    handleTakePhoto,
    handleSelectImage,
    setImageUri,
  };
};
