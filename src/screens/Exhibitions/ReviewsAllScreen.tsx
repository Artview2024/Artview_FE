import React from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/My/Header';
import ExhibitionSimpleInfo from '../../components/Exhibitions/ExhibitionSimpleInfo';
import ReviewCard from '../../components/Exhibitions/ReviewCard';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';

// mock 리뷰 데이터
const mockReviews = [
  {
    reviewer: '최나은',
    rating: 4.7,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has something.',
  },
  {
    reviewer: '이진서',
    rating: 4.2,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ... 더보기',
  },
  {
    reviewer: '최영은',
    rating: 3.7,
    comment: 'Lorem Ipsum is simply dummy text of the printing industry...',
  },
];

export default function ReviewsAllScreen() {
  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        <ExhibitionSimpleInfo />
        <View style={{paddingVertical: 24}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>관람 후기</Text>
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
    paddingVertical: 18,
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
