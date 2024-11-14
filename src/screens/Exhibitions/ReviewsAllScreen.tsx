import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import Header from '../../components/My/Header';
import ExhibitionSimpleInfo from '../../components/Exhibitions/ExhibitionSimpleInfo';
import ReviewCard from '../../components/Exhibitions/ReviewCard';
import Text from '../../components/Text';
import GlobalStyle from '../../styles/GlobalStyle';
import RatingBox from '../../components/Exhibitions/RatingBox';
import customAxios from '../../services/customAxios';
import {useRoute, RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

type ReviewsAllRouteProp = RouteProp<StackParamList, 'ReviewsAll'>;

export default function ReviewsAllScreen() {
  const route = useRoute<ReviewsAllRouteProp>();
  const exhibitionId = route.params?.exhibitionId;

  const [exhibitionData, setExhibitionData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        // Exhibition 정보 가져오기
        const infoResponse = await customAxios.get(
          `/exhibition/detail/info/${exhibitionId}`,
        );
        setExhibitionData(infoResponse.data);

        // Reviews 가져오기
        const reviewResponse = await customAxios.get(
          `/exhibition/detail/review/${exhibitionId}`,
        );
        setReviews(reviewResponse.data);

        const ratingResponse = await customAxios.get(
          `/exhibition/average/${exhibitionId}`,
        );
        setAverageRating(parseFloat(ratingResponse.data.average));
        setParticipantsNumber(ratingResponse.data.participantsNumber);
      } catch (error: any) {
        console.error('Error fetching data:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitionData();
  }, [exhibitionId]);

  return (
    <View style={GlobalStyle.container}>
      <ScrollView>
        <Header title={''} />
        {exhibitionData && (
          <ExhibitionSimpleInfo exhibitionData={exhibitionData} />
        )}
        <View style={{paddingTop: 24}}>
          <RatingBox rating={averageRating} participants={participantsNumber} />
        </View>
        <View style={{paddingVertical: 24}}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>관람 후기</Text>
          </View>
          {loading ? (
            <Text>Loading...</Text>
          ) : reviews.length === 0 ? (
            <View style={styles.noReviewsContainer}>
              <Text style={styles.noReviewsText}>
                아직 등록된 후기가 없습니다.
              </Text>
            </View>
          ) : (
            reviews.map((review, index) => (
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
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  noReviewsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
  },
});
