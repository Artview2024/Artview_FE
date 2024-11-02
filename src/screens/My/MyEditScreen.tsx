import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import Header from '../../components/My/Header';
import GlobalStyle from '../../styles/GlobalStyle';
import Text from '../../components/Text';
import customAxios from '../../services/customAxios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useCameraPermission} from '../../hooks/useCameraPermissions';

const MyEditScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [userName, setUserName] = useState('');
  const [interests, setInterests] = useState(['사진', '과학기술']);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const {imageUri, handleTakePhoto, handleSelectImage, setImageUri} =
    useImagePicker();
  const {requestCameraPermission} = useCameraPermission(handleTakePhoto);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await customAxios.get('/user/myPage/userInfo');
        const data = response.data;
        setUserName(data.userName);
        setImageUri(data.userImageUrl);
      } catch (error: any) {
        console.error('Failed to fetch user info:', error.response.data);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleImageChange = () => {
    Alert.alert(
      '사진 변경',
      '어떻게 사진을 변경하시겠습니까?',
      [
        {
          text: '카메라로 촬영',
          onPress: requestCameraPermission,
        },
        {
          text: '갤러리에서 선택',
          onPress: handleSelectImage,
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSubmit = async () => {
    try {
      const updatedData: any = {};
      if (userName) updatedData.userName = userName;
      if (imageUri) updatedData.userImageUrl = imageUri;
      if (interests.length > 0) updatedData.usersInterest = interests;

      await customAxios.patch('/user/myPage/modify', updatedData);
      Alert.alert('성공', '프로필이 성공적으로 수정되었습니다.');
      navigation.goBack();
    } catch (error: any) {
      console.error(error.response?.data);
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <Header title="프로필 수정" />

      <View style={styles.profileContainer}>
        <Image
          source={{uri: imageUri || 'https://example.com/default-image.jpg'}}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleImageChange}>
          <Text style={styles.changeImageText}>프로필 사진 변경</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>닉네임</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        style={[styles.inputBox, {color: '#000'}]}
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor="#828282"
      />

      <Text style={[styles.label, {marginBottom: 0}]}>관심 분야</Text>
      <View style={styles.interestsContainer}>
        {interests.map((interest, index) => (
          <View key={index} style={styles.interestBox}>
            <Text>{interest}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.interestBox}
          onPress={() => navigation.navigate('InterestSelection')}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={GlobalStyle.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changeImageText: {
    color: '#EA1B83',
    marginTop: 5,
  },
  inputBox: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
    fontSize: 15,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 11,
    paddingLeft: 10,
    fontWeight: 'regular',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    paddingLeft: 8,
  },
  interestBox: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
  },
  confirmButton: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default MyEditScreen;
