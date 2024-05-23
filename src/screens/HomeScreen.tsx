import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import CarouselParallax from '../components/CarouselParallax';
import {StackParamList} from '../navigator/AppNavigator';
import GlobalStyle from '../styles/GlobalStyle';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const carouselData = [
  {
    key: '1',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel7.jpg'),
  },
  {
    key: '2',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel5.jpg'),
  },
  {
    key: '3',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel4.jpg'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setBackgroundIndex(index);
  };

  return (
    <View style={styles.container}>
      <Image
        source={carouselData[backgroundIndex % carouselData.length].image}
        style={[
          styles.backgroundImage,
          {width: PAGE_WIDTH, height: PAGE_HEIGHT * 0.63},
        ]}
        blurRadius={15}
      />
      <ScrollView style={{flex: 1}}>
        <View style={GlobalStyle.header}>
          <Image
            source={require('../assets/icons/ArtviewLogo.png')}
            style={GlobalStyle.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>내 전시기록</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Records')}>
            <Text style={styles.viewAllText}>전체보기 &gt;</Text>
          </TouchableOpacity>
        </View>
        <CarouselParallax
          data={carouselData}
          onIndexChange={handleIndexChange}
        />
      </ScrollView>
      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('Recording')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 기록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    paddingTop: 2,
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
    backgroundColor: 'lime',
  },
  recommendedItem: {
    width: 180,
    marginHorizontal: 8,
  },
  recommendedImage: {
    width: 180,
    height: 240,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  recommendedText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  recommendedSubText: {
    fontSize: 12,
    color: '#888',
  },
});
