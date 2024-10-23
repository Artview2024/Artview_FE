import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Header from '../../components/My/Header';
import GlobalStyle from '../../styles/GlobalStyle';
import Text from '../../components/Text';
import customAxios from '../../services/customAxios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

const MyEditScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [userName, setUserName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Mock data
  const [nickname, setNickname] = useState('메롱');
  const [gender, setGender] = useState(''); // 성별 선택을 위해 초기값을 빈 문자열로 설정
  const [birthday, setBirthday] = useState(new Date('1995-08-15'));
  const [interests, setInterests] = useState(['사진', '과학기술']);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await customAxios.get('/user/myPage/userInfo');
        const data = response.data;
        setUserName(data.userName);
        setImageUrl(data.userImageUrl);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
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

  const handleConfirmDate = (selectedDate: Date) => {
    setBirthday(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <View style={[GlobalStyle.container]}>
      <Header title={'프로필 수정'} />

      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Image
          source={{uri: imageUrl}}
          style={{width: 80, height: 80, borderRadius: 40}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
          {userName}
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#EA1B83', marginTop: 5}}>프로필 사진 변경</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>닉네임</Text>
      <TextInput
        value={nickname}
        onChangeText={setNickname}
        style={[styles.inputBox, {color: '#000'}]}
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor="#828282"
      />

      <Text style={styles.label}>이름</Text>
      <TextInput
        value={userName}
        style={[styles.inputBox, {color: '#000'}]}
        placeholder="이름을 입력해주세요"
        placeholderTextColor="#828282"
        editable={false}
      />

      <Text style={styles.label}>성별</Text>
      <View style={[styles.inputBox, {paddingLeft: 0}]}>
        <Picker
          selectedValue={gender}
          onValueChange={value => setGender(value)}
          style={styles.picker}>
          <Picker.Item label="성별을 선택해주세요" value="" />
          <Picker.Item label="여성" value="여성" />
          <Picker.Item label="남성" value="남성" />
          <Picker.Item label="선택 안 함" value="선택 안 함" />
        </Picker>
      </View>

      <Text style={styles.label}>생년월일</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.inputBox, {justifyContent: 'center'}]}>
        <Text>{birthday.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          modal
          mode="date"
          open={showDatePicker}
          date={birthday}
          onConfirm={handleConfirmDate}
          onCancel={() => setShowDatePicker(false)}
        />
      )}

      <Text style={[styles.label, {marginBottom: 0}]}>관심 분야</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 15,
          paddingLeft: 8,
        }}>
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
        <TouchableOpacity
          style={[styles.confirmButton, {backgroundColor: '#000'}]}>
          <Text style={GlobalStyle.buttonText}>확인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  picker: {
    color: '#000',
    fontSize: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 11,
    paddingLeft: 10,
    fontWeight: 'regular',
  },
  interestBox: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
});

export default MyEditScreen;
