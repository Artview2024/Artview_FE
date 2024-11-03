import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import RecordingStartScreen from '../screens/Recording/RecordingStartScreen';
import RecordingScreen from '../screens/Recording/RecordingScreen';
import RecordsScreen from '../screens/Records/RecordsScreen';
import RecordDetailScreen from '../screens/Records/RecordDetailScreen';
import PostingStartScreen from '../screens/Posting/PostingStartScreen';
import PostingScreen from '../screens/Posting/PostingScreen';
import MyScreen from '../screens/My/MyScreen';
import MyFollowScreen from '../screens/My/MyFollowScreen';
import MyEditScreen from '../screens/My/MyEditScreen';
import ExhibitionDetailScreen from '../screens/Exhibitions/ExhibitionDetailScreen';
import ExhibitionsAllScreen from '../screens/Exhibitions/ExhibitionsAllScreen';
import ReviewsAllScreen from '../screens/Exhibitions/ReviewsAllScreen';
import {StackParamList} from './StackParamList';
import CommunityDetailScreen from '../screens/Community/CommunityDetailScreen';
import useAutoLogin from '../hooks/useAutoLogin';
import InterestSelectionScreen from '../screens/Interests/InterestsSelectionScreen';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  useAutoLogin();
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
      <Stack.Screen
        name="CommunityDetail"
        component={CommunityDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyFollowScreen"
        component={MyFollowScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyEdit"
        component={MyEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InterestSelection"
        component={InterestSelectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExhibitionDetail"
        component={ExhibitionDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExhibitionsAll"
        component={ExhibitionsAllScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewsAll"
        component={ReviewsAllScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
