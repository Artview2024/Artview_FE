import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type RatingBoxProps = {
  rating: number;
  participants: number;
};

const RatingBox: React.FC<RatingBoxProps> = ({rating, participants}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>아트뷰어 평점 &nbsp;</Text>
        <Text style={styles.participantsText}>{participants}명 참여</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingTextContainer}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.outOfText}> / 5</Text>
        </View>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name="star"
              size={18}
              color={index < Math.round(rating) ? '#EA1B83' : '#C4C4C4'}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#EA1B83',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  participantsText: {
    fontSize: 12,
    color: '#828282',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  ratingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EA1B83',
  },
  outOfText: {
    fontSize: 24,
    color: '#C4C4C4',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
});

export default RatingBox;
