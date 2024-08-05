import React, {useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import CommunityCard from '../../components/Community/CommunityCard';
import Comment from '../../components/Community/Comment';

export default function CommunityDetailScreen() {
  const ref = useRef(null);
  useScrollToTop(ref);

  const samplePost = {
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
  };

  const sampleComments = [
    {username: 'User1', content: '짱이다'},
    {username: 'User2', content: '저도 갈래요'},
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView ref={ref}>
        <CommunityCard Posts={samplePost} />
        <View style={{padding: 16}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Comments</Text>
          {sampleComments.map((comment, index) => (
            <Comment
              key={index}
              username={comment.username}
              content={comment.content}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
