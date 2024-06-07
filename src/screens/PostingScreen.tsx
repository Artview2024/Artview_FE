import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../navigator/AppNavigator';
import '../navigator/AppNavigator';

import GlobalStyle from '../styles/GlobalStyle';

export default function PostingScreen({}) {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
