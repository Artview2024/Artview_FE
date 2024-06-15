import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import GlobalStyle from '../styles/GlobalStyle';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigator/StackParamList';
import * as ImagePicker from 'react-native-image-picker';

const cameraIcon = require('../assets/icons/camera-icon.png');

type RecordingScreenProps = StackNavigationProp<StackParamList, 'Recording'>;

export default function RecordingScreen() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation<RecordingScreenProps>();

  const PAGE_WIDTH = Dimensions.get('window').width - 40;
  async function checkCameraPermissions() {
    const cameraGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    const storageGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return cameraGranted && storageGranted;
  }

  async function requestCameraPermission() {
    const hasPermission = await checkCameraPermissions();
    if (!hasPermission) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Camera and storage permissions granted');
          handleTakePhoto(); // 권한이 허용되면 사진 촬영 함수 실행
        } else {
          console.log('Camera permission denied');
          Alert.alert(
            'Permissions Denied',
            'You need to grant camera permissions to use this feature.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      handleTakePhoto(); // 권한이 이미 허용된 상태라면 바로 사진 촬영
    }
  }

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(
      {mediaType: 'photo', saveToPhotos: true},
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const uri =
            response.assets && response.assets[0].uri
              ? response.assets[0].uri
              : null;
          setImageUri(uri);
        }
      },
    );
  };

  // 이미지 선택 함수
  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri =
          response.assets && response.assets[0].uri
            ? response.assets[0].uri
            : null;
        setImageUri(uri);
      }
    });
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon
            name="chevron-back"
            size={24}
            color={'black'}
            style={{paddingRight: 3, paddingTop: 18}}
          />
        </TouchableOpacity>
        {/* <Text style={GlobalStyle.sectionTitle}>{exhibitionName}</Text> */}
        <Text
          style={[
            GlobalStyle.sectionTitle,
            {paddingTop: 10, paddingBottom: 0},
          ]}>
          전시회명
        </Text>
        {/* <Text
        style={styles.dateLocation}>{`${exhibitionDate} | ${gallery}`}</Text> */}
        <Text style={{paddingTop: 7, paddingBottom: 13}}>
          2024-05-28 | 서울미술관
        </Text>
        <TouchableOpacity
          style={{
            width: PAGE_WIDTH,
            height: PAGE_WIDTH * (4 / 3),
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 16,
            justifyContent: 'center', // 이미지와 텍스트 중앙 정렬
            alignItems: 'center', // 이미지와 텍스트 중앙 정렬
          }}
          onPress={handleTakePhoto}>
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
            onValueChange={newValue => setToggleCheckBox(newValue)}
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  photoUploadBox: {
    height: 240, // 4:3 비율
    width: 320,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
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
  uploadPrompt: {
    color: '#888',
    fontSize: 16,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  leftButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  rightButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  endTourButton: {
    paddingHorizontal: 130,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
});
