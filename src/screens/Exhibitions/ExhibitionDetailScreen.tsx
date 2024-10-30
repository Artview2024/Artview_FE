import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/My/Header';
import ExhibitionInfo from '../../components/Exhibitions/ExhibitionInfo';
import ReviewCard from '../../components/Exhibitions/ReviewCard';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import {StackNavigationProp} from '@react-navigation/stack'; // StackNavigationProp 추가
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList'; // StackParamList 추가
import RatingBox from '../../components/Exhibitions/RatingBox';

// 네비게이션 타입 지정
type ExhibitionDetailScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'ExhibitionDetail'
>;

const mockReviews = [
  {
    reviewer: '김민주',
    rating: 4.7,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...',
  },
  {
    reviewer: '이진서',
    rating: 4.2,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...',
  },
];

export default function ExhibitionDetailScreen() {
  const navigation = useNavigation<ExhibitionDetailScreenNavigationProp>(); // 네비게이션 타입 사용

  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        <ExhibitionInfo />
        <RatingBox rating={3.2} participants={3} />
        <View style={{paddingVertical: 24}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>관람 후기</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ReviewsAll')}>
              <Text style={styles.viewAllText}>더보기 &gt;</Text>
            </TouchableOpacity>
          </View>
          {mockReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 12,
    color: '#4E4E4E',
    paddingLeft: 10,
  },
});
