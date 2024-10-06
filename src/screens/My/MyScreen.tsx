import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/Text';
import {useScrollToTop} from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import UserInfo from '../../components/My/userInfo';
import Tabs from '../../components/My/Tabs';
import PostingList from '../../components/My/PostingList';

const posting = [
  {
    id: 1,
    name: '이경준 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    image: require('../../assets/images/artList3.jpg'),
    rating: '4.5',
    imageList: [
      require('../../assets/images/artList3.jpg'),
      require('../../assets/images/artList2.jpg'),
      require('../../assets/images/artList1.jpg'),
    ],
  },
  {
    id: 2,
    name: '인상주의의 출현',
    date: '2023.11.11',
    gallery: '서울미술관',
    image: require('../../assets/images/carousel4.jpg'),
    rating: '4.0',
    imageList: [
      require('../../assets/images/carousel4.jpg'),
      require('../../assets/images/carousel4.jpg'),
      require('../../assets/images/carousel4.jpg'),
    ],
  },
  {
    id: 3,
    name: '2021 SF:오디세이 서울',
    date: '2022.10.28',
    gallery: '서울미술관',
    image: require('../../assets/images/carousel7.jpg'),
    rating: '3.8',
    imageList: [
      require('../../assets/images/carousel4.jpg'),
      require('../../assets/images/carousel4.jpg'),
    ],
  },
  {
    id: 4,
    name: '디미 전시회',
    date: '2024.06.17',
    gallery: '서울여대',
    image: require('../../assets/images/android.png'),
    rating: '3.8',
    imageList: [
      require('../../assets/images/carousel4.jpg'),
      require('../../assets/images/carousel4.jpg'),
    ],
  },
];

export default function MyScreen() {
  const ref = useRef(null);
  const following = '12';
  const follower = '31';
  const enjoyed = '29';
  const [activeTab, setActiveTab] = useState('게시물');
  useScrollToTop(ref);

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView ref={ref}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalStyle.header}>마이</Text>
        </View>

        <UserInfo following={following} follower={follower} enjoyed={enjoyed} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <PostingList postings={posting} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
