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

export default function ExhibitionDetailScreen() {
  const navigation = useNavigation<ExhibitionDetailScreenNavigationProp>();
  const route = useRoute<ExhibitionDetailRouteProp>();
  const exhibitionId = route.params?.exhibitionId;
  const isOnlineExhibition = route.params?.isOnlineExhibition;

  const [exhibitionData, setExhibitionData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const infoResponse = await customAxios.get(
          `/exhibition/detail/info/${exhibitionId}`,
        );
        setExhibitionData(infoResponse.data);
        console.log(infoResponse.data);

        const reviewResponse = await customAxios.get(
          `/exhibition/detail/review/${exhibitionId}`,
        );
        setReviews(reviewResponse.data);
      } catch (error: any) {
        console.error('Error:', error.response?.data);
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
    return <Text>전시회 정보 불러오기에 실패하였습니다.</Text>;
  }

  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        <ExhibitionInfo
          exhibitionData={exhibitionData}
          isOnlineExhibition={isOnlineExhibition}
        />
        <RatingBox rating={3.2} participants={3} />
        <View style={{paddingVertical: 24}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>관람 후기</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReviewsAll', {exhibitionId})}>
              <Text style={styles.viewAllText}>더보기 &gt;</Text>
            </TouchableOpacity>
          </View>
          {reviews.length === 0 ? (
            <View style={styles.noReviewsContainer}>
              <Text style={styles.noReviewsText}>
                아직 등록된 후기가 없습니다.
              </Text>
            </View>
          ) : (
            reviews.slice(0, 3).map((review, index) => (
              <ReviewCard
                key={index}
                review={{
                  reviewer: review.userName,
                  rating: parseFloat(review.rate),
                  comment: review.content,
                  userImageUrl: review.userImageUrl,
                }}
              />
            ))
          )}
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
  noReviewsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
  },
});
