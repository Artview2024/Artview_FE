import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import RecordingStartScreen from '../screens/Recording/RecordingStartScreen';
import RecordingScreen from '../screens/Recording/RecordingScreen';
import RecordsScreen from '../screens/Records/RecordsScreen';
import RecordDetailScreen from '../screens/Records/RecordDetailScreen';
import PostingStartScreen from '../screens/Posting/PostingStartScreen';
import PostingScreen from '../screens/Posting/PostingScreen';
import {StackParamList} from './StackParamList';
import CommunityDetailScreen from '../screens/Community/CommunityDetailScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityDetail"
        component={CommunityDetailScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      /> */}
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
