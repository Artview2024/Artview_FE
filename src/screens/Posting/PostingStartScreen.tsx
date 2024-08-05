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
import {StackParamList} from '../../navigator/StackParamList';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import '../../navigator/AppNavigator';

import GlobalStyle from '../../styles/GlobalStyle';

const exhibitions = [
  {
    id: 1,
    name: '이경준 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    image: require('../assets/images/artList3.jpg'),
    rating: '4.5',
    imageList: [
      require('../assets/images/artList3.jpg'),
      require('../assets/images/artList2.jpg'),
      require('../assets/images/artList1.jpg'),
    ],
  },
  {
    id: 2,
    name: '인상주의의 출현',
    date: '2023.11.11',
    gallery: '서울미술관',
    image: require('../assets/images/carousel4.jpg'),
    rating: '4.0',
    imageList: [
      require('../assets/images/carousel4.jpg'),
      require('../assets/images/carousel4.jpg'),
      require('../assets/images/carousel4.jpg'),
    ],
  },
  {
    id: 3,
    name: '2021 SF:오디세이 서울',
    date: '2022.10.28',
    gallery: '서울미술관',
    image: require('../assets/images/carousel7.jpg'),
    rating: '3.8',
    imageList: [
      require('../assets/images/carousel4.jpg'),
      require('../assets/images/carousel4.jpg'),
    ],
  },
];

export default function PostingStartScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [selectedExhibition, setSelectedExhibition] = useState<number | null>(
    null,
  );

  const handleExhibitionSelect = (id: number) => {
    setSelectedExhibition(id);
  };

  const handleStartViewing = () => {
    if (selectedExhibition !== null) {
      const exhibition = exhibitions.find(
        exhibition => exhibition.id === selectedExhibition,
      );
      if (exhibition) {
        navigation.navigate('Posting', {exhibition});
      }
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
          <Text style={GlobalStyle.header}>기록 선택</Text>
        </View>
        <View style={styles.exhibitionList}>
          {exhibitions.map(exhibition => (
            <View key={exhibition.id} style={styles.exhibitionWrapper}>
              <TouchableOpacity
                onPress={() => handleExhibitionSelect(exhibition.id)}>
                <Image
                  source={exhibition.image}
                  style={[
                    styles.exhibitionImage,
                    selectedExhibition === exhibition.id &&
                      styles.selectedExhibitionImage,
                  ]}
                />
                <View style={{paddingTop: 7}}>
                  <Text style={GlobalStyle.mainText}>{exhibition.name}</Text>
                  <Text style={GlobalStyle.subText}>{exhibition.date}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedExhibition === exhibition.id &&
                    styles.selectedSelectButton,
                ]}
                onPress={() => handleExhibitionSelect(exhibition.id)}>
                <Text>
                  {selectedExhibition === exhibition.id ? (
                    <Icon name="checkcircle" size={20} color="#4E4E4E" />
                  ) : (
                    <Icon name="checkcircleo" size={20} color="#FFFF" />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          GlobalStyle.button,
          selectedExhibition !== null
            ? GlobalStyle.activeButton
            : GlobalStyle.inactiveButton,
        ]}
        disabled={selectedExhibition === null}
        onPress={handleStartViewing}>
        <Text style={[GlobalStyle.buttonText]}>전시 선택</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exhibitionWrapper: {
    width: '46%',
    marginVertical: 10,
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
  selectButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 5,
  },
  selectedSelectButton: {
    backgroundColor: 'none',
  },
});
