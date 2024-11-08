import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/My/Header';
import ExhibitionInfo from '../../components/Exhibitions/ExhibitionInfo';
import ReviewCard from '../../components/Exhibitions/ReviewCard';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import RatingBox from '../../components/Exhibitions/RatingBox';
import customAxios from '../../services/customAxios';

type ExhibitionDetailScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'ExhibitionDetail'
>;

type ExhibitionDetailRouteProp = RouteProp<StackParamList, 'ExhibitionDetail'>;

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
  const navigation = useNavigation<ExhibitionDetailScreenNavigationProp>();
  const route = useRoute<ExhibitionDetailRouteProp>();
  const exhibitionId = route.params?.exhibitionId;

  const [exhibitionData, setExhibitionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const response = await customAxios.get(
          `/exhibition/detail/info/${exhibitionId}`,
        );
        setExhibitionData(response.data);
      } catch (error: any) {
        console.error('Failed to fetch exhibition info:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitionData();
  }, [exhibitionId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!exhibitionData) {
    return <Text>Exhibition data not available</Text>;
  }

  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        <ExhibitionInfo exhibitionData={exhibitionData} />
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
