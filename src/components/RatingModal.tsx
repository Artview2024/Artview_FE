import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Text from '../components/Text';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            관람하신 전시회의 {'\n'} 별점을 남겨주세요.
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={30}
                  color="#000"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
            <Text style={styles.ratingText}>{rating}/5</Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              onSubmit(rating);
              onClose();
            }}>
            <Text style={styles.submitButtonText}>등록</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: Dimensions.get('window').width - 40,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RatingModal;
