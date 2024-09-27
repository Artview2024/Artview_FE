import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../components/Text';
import KakaoLogin from '../assets/images/kakao_login.svg';
import CheckBoxCircle from '../assets/icons/checkbox-circle-icon.jsx';

export default function LoginScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        placeholderTextColor="#ccc"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
        />
        {/* <TouchableOpacity style={styles.eyeIcon}>
          <Text>👁️</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <CheckBoxCircle
            width={20}
            height={20}
            fill={isChecked ? '#000000' : '#828282'}
          />
        </TouchableOpacity>
        <Text
          style={{marginLeft: 10, color: isChecked ? '#000000' : '#828282'}}>
          로그인 상태 유지
        </Text>
      </View>

      <TouchableOpacity style={styles.kakaoButton}>
        <KakaoLogin
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.footerLinks}>
        <Text style={styles.footerLink}>이메일 가입</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.footerLink}>아이디 찾기</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.footerLink}>비밀번호 재설정</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 30,
    width: '100%',
  },
  kakaoButton: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#828282',
    marginHorizontal: 5,
  },
  separator: {
    color: '#828282',
  },
});
