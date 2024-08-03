import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Exhibition = {
  key: string;
  title: string;
  date: string;
  gallery: string;
  image: any;
};

type Props = {
  data: Exhibition[];
};

export default function RecommendedExhibitions({data}: Props) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingLeft: 20}}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>추천전시</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>전체보기 &gt;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.sectionFlatList}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.recommendedItem}>
            <Image source={item.image} style={styles.recommendedImage} />
            <Text style={styles.recommendedText}>{item.title}</Text>
            <Text style={styles.recommendedSubText}>{item.date}</Text>
            <Text style={styles.recommendedSubText}>{item.gallery}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
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
  sectionFlatList: {
    margin: 0,
  },
  recommendedItem: {
    width: 180,
    marginRight: 8,
  },
  recommendedImage: {
    width: 180,
    height: 240,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recommendedText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000',
  },
  recommendedSubText: {
    fontSize: 14,
    color: '#000',
  },
});
