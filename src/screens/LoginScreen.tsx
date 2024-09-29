import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebViewNavigation} from 'react-native-webview';
import Text from '../components/Text';
import KakaoLogin from '../assets/images/kakao_login.svg';
import CheckBoxCircle from '../assets/icons/checkbox-circle-icon.jsx';
import {KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList.js';

export default function LoginScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // Kakao OAuth URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  // WebView의 네비게이션 상태가 바뀔 때
  const handleWebViewNavigationStateChange = (navState: WebViewNavigation) => {
    const {url} = navState; // 현재 WebView의 URL

    // 리다이렉트 URI로 리다이렉션 되었는지 확인
    if (url.startsWith(KAKAO_REDIRECT_URI)) {
      // URL에서 인증 코드 추출
      const code = url.split('code=')[1];
      if (code) {
        // 인증 코드가 존재하면 WebView를 닫고, 이후 서버에서 토큰 처리
        setWebViewVisible(false);

        // 로그인 후 홈 화면으로 이동
        navigation.navigate('Tabs', {screen: 'Home'});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      {/* 아이디 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        placeholderTextColor="#ccc"
      />

      {/* 비밀번호 입력 필드 */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
        />
      </View>

      {/* 로그인 상태 유지 체크박스 */}
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

      {/* 카카오 로그인 버튼 */}
      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={() => setWebViewVisible(true)}>
        <KakaoLogin
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </TouchableOpacity>

      {/* WebView 모달 */}
      <Modal
        visible={isWebViewVisible}
        onRequestClose={() => setWebViewVisible(false)}>
        {' '}
        {/* 모달 닫기 */}
        <WebView
          source={{uri: KAKAO_AUTH_URL}} // Kakao OAuth URL 로드
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      </Modal>

      {/* 일반 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 하단 링크 */}
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
