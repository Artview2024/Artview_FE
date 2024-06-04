import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import CommunityCard from '../components/CommunityCard';

const Posts = [
  {
    key: '1',
    user: '',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/recommend1.png'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    emotion: [],
    rating: '',
  },
  {
    key: '2',
    user: '',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/recommend1.png'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    emotion: [],
    rating: '',
  },
  {
    key: '3',
    user: '',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/recommend1.png'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',

    emotion: [],
    rating: '',
  },
];

export default function CommunityScreen() {
  return (
    <ScrollView style={GlobalStyle.container}>
      <Text style={GlobalStyle.header}>소통</Text>
      <FlatList
        data={Posts}
        keyExtractor={item => item.key}
        renderItem={({item}) => <CommunityCard Posts={item} />}
      />
    </ScrollView>
  );
}
