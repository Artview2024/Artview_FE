import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';

import GlobalStyle from '../styles/GlobalStyle';
import CommunityCard from '../components/CommunityCard';
import FilterTabs from '../components/FilterTabs';

type CommunityScreenRouteProp = RouteProp<StackParamList, 'Community'>;

const initialPosts = [
  {
    key: '1',
    user: '포도',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/carousel6.jpg'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    emotion: ['아름다운', '어려운'],
    rating: '4.0',
  },
  {
    key: '2',
    user: '파인애플',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/carousel7.jpg'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    emotion: ['아름다운', '어려운'],
    rating: '4.5',
  },
  {
    key: '3',
    user: '수박',
    profile: '',
    title: 'SERIOUS',
    date: '2024.05.14',
    gallery: '성남 갤러리홀',
    image: [
      require('../assets/images/carousel5.jpg'),
      require('../assets/images/recommend1.png'),
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',

    emotion: ['아름다운', '어려운'],
    rating: '2.0',
  },
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const [posts, setPosts] = useState(initialPosts);
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<CommunityScreenRouteProp>();

  useEffect(() => {
    if (route.params?.newPost) {
      setPosts([...posts, route.params.newPost]);
    }
  }, [route.params?.newPost]);

  return (
    <View style={GlobalStyle.container}>
      <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false}>
        <Text style={GlobalStyle.header}>소통</Text>
        <FilterTabs activeTab={activeTab} onSelectTab={setActiveTab} />
        <FlatList
          data={[...posts].reverse()}
          keyExtractor={item => item.key}
          renderItem={({item}) => <CommunityCard Posts={item} />}
        />
      </ScrollView>
      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('PostingStart')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
