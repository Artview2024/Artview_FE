import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Text from '../Text';

type Exhibition = {
  key: string;
  title: string;
  date: string;
  gallery: string;
  image: any;
};

type Props = {
  data: Exhibition[];

  title: string;
  small?: boolean;
};

export default function FlatListExhibitions({
  data,
  small = false,
  title = '추천전시',
}: Props) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
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
          <View style={small ? styles.smallItem : styles.recommendedItem}>
            <Image
              source={item.image}
              style={small ? styles.smallImage : styles.recommendedImage}
            />
            <Text style={styles.recommendedText}>{item.title}</Text>
            <Text style={styles.recommendedSubText}>📅 {item.date}</Text>
            <Text style={styles.recommendedSubText}>📍{item.gallery}</Text>
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
    marginBottom: 15,
  },
  recommendedItem: {
    width: 180,
    marginRight: 8,
  },
  smallItem: {
    width: 140,
  },
  recommendedImage: {
    width: 180,
    height: 240,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  smallImage: {
    width: 120,
    height: 160,
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
