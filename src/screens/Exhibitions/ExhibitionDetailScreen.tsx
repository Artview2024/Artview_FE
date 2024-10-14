import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/My/Header';
import ExhibitionInfo from '../../components/Exhibitions/ExhibitionInfo';
import ReviewCard from '../../components/Exhibitions/ReviewCard';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';

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
  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        <ExhibitionInfo />
        <View style={{paddingVertical: 24}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>관람 후기</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>전체보기 &gt;</Text>
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
