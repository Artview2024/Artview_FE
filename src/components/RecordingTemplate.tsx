import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import GlobalStyle from '../styles/GlobalStyle';

const cameraIcon = require('../assets/icons/camera-icon.png');

type RecordingTemplateProps = {
  imageUri: string;
  title: string;
  artist: string;
  memo: string;
  toggleCheckBox: boolean;
  requestCameraPermission: () => void;
  handleCheckBoxChange: (newValue: boolean) => void;
  setTitle: (text: string) => void;
  setArtist: (text: string) => void;
  setMemo: (text: string) => void;
};

const RecordingTemplate: React.FC<RecordingTemplateProps> = ({
  imageUri,
  title,
  artist,
  memo,
  toggleCheckBox,
  requestCameraPermission,
  handleCheckBoxChange,
  setTitle,
  setArtist,
  setMemo,
}) => {
  const PAGE_WIDTH = Dimensions.get('window').width - 40;

  return (
    <View>
      <TouchableOpacity
        style={{
          width: PAGE_WIDTH,
          height: PAGE_WIDTH * (4 / 3),
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={requestCameraPermission}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        ) : (
          <Image source={cameraIcon} style={styles.cameraIcon} />
        )}
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={handleCheckBoxChange}
          tintColors={{true: '#000', false: '#ccc'}}
        />
        <Text style={styles.checkboxLabel}>이전 작품 불러오기</Text>
      </View>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 16}]}
        placeholder="작품명"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 16}]}
        placeholder="작가"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 16, height: 130}]}
        placeholder="메모"
        value={memo}
        onChangeText={setMemo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RecordingTemplate;
