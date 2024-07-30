import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import RecordingStartScreen from '../screens/RecordingStartScreen';
import RecordingScreen from '../screens/RecordingScreen';
import RecordsScreen from '../screens/RecordsScreen';
import RecordDetailScreen from '../screens/RecordDetailScreen';
import PostingStartScreen from '../screens/PostingStartScreen';
import PostingScreen from '../screens/PostingScreen';
import {StackParamList} from './StackParamList';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Records"
        component={RecordsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordDetail"
        component={RecordDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecordingStart"
        component={RecordingStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostingStart"
        component={PostingStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Posting"
        component={PostingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
