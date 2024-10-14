import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../components/Text';

type Review = {
  reviewer: string;
  rating: number;
  comment: string;
};

const ReviewCard = ({review}: {review: Review}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.profileImage}
            />
            <Text style={styles.reviewerName}>{review.reviewer}</Text>
          </View>
          <View style={styles.rightSection}>
            <Icon name="star" size={14} color="#EA1B83" />
            <Text style={{marginLeft: 4, fontSize: 14}}>{review.rating}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.comment}>{review.comment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderColor: '#F0F0F0',
    borderWidth: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#4E4E4E',
  },
  comment: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default ReviewCard;
