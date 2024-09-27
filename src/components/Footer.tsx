import React from 'react';
import {View} from 'react-native';
import Text from '../components/Text';

export default function Footer() {
  return (
    <View style={{padding: 20, backgroundColor: '#F0F0F0', marginTop: 45}}>
      <Text
        style={{
          color: '#828282',
          fontSize: 24,
          fontWeight: 'bold',
          paddingLeft: 15,
        }}>
        Artview
      </Text>
      <Text
        style={{
          color: '#828282',
          fontSize: 12,
          fontWeight: 'medium',
          paddingLeft: 15,
          paddingBottom: 13,
          marginTop: 18,
          borderBottomWidth: 0.5,
          borderBottomColor: '#828282',
        }}>
        2024 Artview. All rights reserved.
      </Text>
      <Text
        style={{
          color: '#828282',
          fontSize: 12,
          fontWeight: 'medium',
          paddingLeft: 15,
          paddingVertical: 18,
        }}>
        사업자정보확인 | 개인정보취급약관 | 이용약관 | 고객센터
      </Text>
    </View>
  );
}
