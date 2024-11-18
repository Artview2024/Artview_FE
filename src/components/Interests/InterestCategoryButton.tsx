import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import Text from '../Text';

interface InterestCategoryButtonProps {
  title: string;
  imageUrl: any; // require로 가져온 이미지 타입
  isSelected: boolean;
  onPress: () => void;
}

const InterestCategoryButton: React.FC<InterestCategoryButtonProps> = ({
  title,
  imageUrl,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.imageWrapper, isSelected && styles.selected]}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 5,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#EA1B83',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
});

export default InterestCategoryButton;
