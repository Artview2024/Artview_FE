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
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../styles/GlobalStyle';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';
import * as ImagePicker from 'react-native-image-picker';

const cameraIcon = require('../assets/icons/camera-icon.png');

type RecordingScreenRouteProp = RouteProp<StackParamList, 'Recording'>;

export default function RecordingScreen() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // 상태 타입을 명시적으로 정의
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [artIndex, setArtIndex] = useState(0);

  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RecordingScreenRouteProp>();

  const {exhibitionName, exhibitionDate, gallery, artList = []} = route.params;

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
          console.log('카메라, 저장소 권한');
          handleTakePhoto();
        } else {
          console.log('Camera permission denied');
          Alert.alert(
            '권한이 거절되었습니다.',
            '해당 기능을 사용하기 위해서는 카메라 권한이 허용되어야 합니다.',
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
          setImageUri(uri || ''); // null일 경우 빈 문자열로 설정
        }
      },
    );
  };

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
        setImageUri(uri || ''); // null일 경우 빈 문자열로 설정
      }
    });
  };

  const handleNext = () => {
    const newArt = {
      image: imageUri || '',
      title: title || '',
      artist: artist || '',
      memo: memo || '',
    };
    const updatedArtList = [...artList];
    if (artIndex < updatedArtList.length) {
      updatedArtList[artIndex] = newArt;
    } else {
      updatedArtList.push(newArt);
    }

    navigation.navigate('Recording', {
      exhibitionName,
      exhibitionDate,
      gallery,
      artList: updatedArtList,
      artIndex: artIndex + 1,
    });

    setTitle('');
    setArtist('');
    setMemo('');
    setImageUri(null); // null로 재설정
    setArtIndex(artIndex + 1);
  };

  const handlePrevious = () => {
    if (artIndex > 0) {
      const prevArt = artList[artIndex - 1];
      setTitle(prevArt.title);
      setArtist(prevArt.artist);
      setMemo(prevArt.memo);
      setImageUri(prevArt.image);
      setArtIndex(artIndex - 1);
    }
  };

  const handleEndTour = () => {
    const newArt = {
      image: imageUri || '',
      title: title,
      artist: artist,
      memo: memo,
    };
    const updatedArtList = [...artList];
    if (artIndex < updatedArtList.length) {
      updatedArtList[artIndex] = newArt;
    } else {
      updatedArtList.push(newArt);
    }

    const finalData = {
      id: 1,
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      mainImage: updatedArtList.length > 0 ? updatedArtList[0].image : null,
      rating: '5', // 추후 변경
      artList: updatedArtList,
    };
    console.log(finalData);
    // 관람 종료 후, 별점 모달
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18}}
            />
          </TouchableOpacity>
        </View>
        <Text style={[GlobalStyle.sectionTitle, {paddingBottom: 0}]}>
          {exhibitionName}
        </Text>
        <Text style={{paddingTop: 7, paddingBottom: 13}}>
          {exhibitionDate} | {gallery}
        </Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.leftButton]}
            onPress={handlePrevious}>
            <Text style={(GlobalStyle.buttonText, {color: 'black'})}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[GlobalStyle.activeButton, styles.rightButton]}
            onPress={handleNext}>
            <Text style={GlobalStyle.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[GlobalStyle.activeButton, styles.endTourButton]}
          onPress={handleEndTour}>
          <Text style={GlobalStyle.buttonText}>관람 종료</Text>
        </TouchableOpacity>
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
