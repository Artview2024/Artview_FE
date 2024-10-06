import {useEffect} from 'react';
import {useTokenStore} from './useTokenStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';

const useAutoLogin = () => {
  const {accessToken} = useTokenStore();
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  useEffect(() => {
    if (accessToken) {
      // 토큰이 있다면 자동으로 홈 화면으로 이동
      navigation.navigate('Tabs', {screen: 'Home'});
    }
  }, [accessToken, navigation]);
};

export default useAutoLogin;
