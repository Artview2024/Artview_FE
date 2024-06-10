import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import '../navigator/AppNavigator';

import GlobalStyle from '../styles/GlobalStyle';

const myRecords = [
  {
    id: 1,
    name: '김민형 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel4.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
    ],
  },
  {
    id: 2,
    name: '모던',
    date: '2023.11.11',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel4.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
    ],
  },
  {
    id: 3,
    name: '끝없는 계단',
    date: '2022.10.28',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel4.jpg'),
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg'),
        title: '뉴욕거리',
        artist: '김민형',
        contents: '좋다. ',
      },
    ],
  },
];

export default function RecordsScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  const handleRecordSelect = (id: number) => {
    setSelectedRecord(id);
    handleStartViewing(id);
  };

  const handleStartViewing = (id: number) => {
    const record = myRecords.find(record => record.id === id);
    if (record) {
      navigation.navigate('RecordDetail', {record});
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 11}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exhibitionList}>
          {myRecords.map(record => (
            <View key={record.id} style={styles.exhibitionWrapper}>
              <TouchableOpacity onPress={() => handleRecordSelect(record.id)}>
                <Image
                  source={record.mainImage}
                  style={[
                    styles.exhibitionImage,
                    selectedRecord === record.id &&
                      styles.selectedExhibitionImage,
                  ]}
                />
                <View style={{paddingTop: 7}}>
                  <Text style={GlobalStyle.mainText}>{record.name}</Text>
                  <Text style={GlobalStyle.subText}>{record.date}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  exhibitionWrapper: {
    width: '46%',
    paddingTop: 10,
    marginVertical: 10,
    marginHorizontal: '2%',
  },

  selectedExhibitionItem: {
    backgroundColor: 'black',
    opacity: 0.6,
  },
  exhibitionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  selectedExhibitionImage: {
    opacity: 0.6,
  },
});
