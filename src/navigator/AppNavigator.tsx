import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import RecordingStartScreen from '../screens/RecordingStartScreen';
import RecordingScreen from '../screens/RecordingScreen';
import RecordsScreen from '../screens/RecordsScreen';
import PostingStartScreen from '../screens/PostingStartScreen';
import PostingScreen from '../screens/PostingScreen';

export type StackParamList = {
  Tabs: undefined;
  Records: undefined;
  Recording: {
    exhibitionName: string;
    exhibitionDate: string;
    gallery: string;
    rating: string;
    artworks: Array<{
      image: string;
      title: string;
      artist: string;
      memo: string;
    }>;
  };
  RecordingStart: undefined;
  Posting: {
    exhibition: {
      id: number;
      name: string;
      date: string;
      gallery: string;
      image: any;
      rating: string;
      imageList: any[];
    };
  };
  PostingStart: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
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
