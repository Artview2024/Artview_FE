import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
  useScrollToTop,
} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

import GlobalStyle from '../../styles/GlobalStyle';
import CommunityCard from '../../components/Community/CommunityCard';
import FilterTabs from '../../components/FilterTabs';

import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';

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
      require('../../assets/images/carousel1.png'),
      require('../../assets/images/recommend1.png'),
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
      require('../../assets/images/carousel7.jpg'),
      require('../../assets/images/recommend1.png'),
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
      require('../../assets/images/carousel5.jpg'),
      require('../../assets/images/recommend1.png'),
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
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    if (route.params?.newPost) {
      setPosts([...posts, route.params.newPost]);
    }
  }, [route.params?.newPost]);

  return (
    <View style={GlobalStyle.container}>
      <ScrollView
        style={{flex: 1}}
        showsHorizontalScrollIndicator={false}
        ref={ref}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={GlobalStyle.header}>소통</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <SearchIcon width={24} height={24} style={{marginRight: 10}} />
            <NotificationIcon width={24} height={25} />
          </View>
        </View>
        <FilterTabs activeTab={activeTab} onSelectTab={setActiveTab} />
        <FlatList
          style={{paddingBottom: 27}}
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
