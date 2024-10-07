import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';

interface Exhibition {
  id: number;
  title: string;
  date: string;
  gallery: string;
  image: {uri: string};
}

interface ExhibitionListProps {
  exhibitions: Exhibition[];
}

const ExhibitionList: React.FC<ExhibitionListProps> = ({exhibitions}) => (
  <View>
    {exhibitions.map(exhibition => (
      <View key={exhibition.id} style={styles.exhibitionWrapper}>
        <TouchableOpacity style={styles.exhibitionContainer}>
          {exhibition.image ? (
            <Image source={exhibition.image} style={styles.exhibitionImage} />
          ) : (
            <Image
              source={require('../../assets/images/thumbnail_basic.png')}
              style={styles.exhibitionImage}
            />
          )}
          <View style={styles.exhibitionInfo}>
            <Text style={styles.title}>{exhibition.title}</Text>
            <Text style={styles.date}>📅 {exhibition.date}</Text>
            <Text style={styles.gallery}>📍 {exhibition.gallery}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  exhibitionWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  exhibitionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exhibitionImage: {
    width: 75,
    height: undefined,
    aspectRatio: 3 / 4,
    borderRadius: 5,
    marginRight: 15,
  },
  exhibitionInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  gallery: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ExhibitionList;
