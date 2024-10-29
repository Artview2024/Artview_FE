import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigator/StackParamList';
import Text from '../Text';
import Calendar from 'react-native-vector-icons/AntDesign';
import LocationPin from 'react-native-vector-icons/EvilIcons';

type Props = {
  data: {
    key: string;
    title: string;
    date: string;
    gallery: string;
    image: any;
  }[];
  title: string;
  small?: boolean;
};

type NavigationProp = StackNavigationProp<StackParamList, 'ExhibitionDetail'>;

export default function FlatListExhibitions({
  data,
  small = false,
  title = '추천전시',
}: Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ExhibitionsAll', {title})}>
          <Text style={styles.viewAllText}>전체보기 &gt;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.sectionFlatList}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ExhibitionDetail')}
            style={small ? styles.smallItem : styles.recommendedItem}>
            <Image
              source={item.image}
              style={small ? styles.smallImage : styles.recommendedImage}
            />
            <Text style={styles.recommendedText}>{item.title}</Text>
            <Text style={styles.recommendedSubText}>
              <Calendar name="calendar" size={15} />
              &nbsp;
              {item.date}
            </Text>
            <Text style={styles.recommendedSubText}>
              <LocationPin name="location" size={16} />
              &nbsp;
              {item.gallery}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionFlatList: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 20,
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
