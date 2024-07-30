import React from 'react';
import {View, Text} from 'react-native';

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>Login Screen</Text>
    </View>
  );
}
