import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import CarouselParallax from '../components/CarouselParallax';
import {StackParamList} from '../navigator/StackParamList';
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

const recommendedExhibitions = [
  {
    key: '1',
    title: 'SERIOUS',
    date: '2024.05.14~05.30',
    gallery: '성남 갤러리홀',
    image: require('../assets/images/recommend1.png'),
  },
  {
    key: '2',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../assets/images/recommend2.png'),
  },
  {
    key: '3',
    title: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../assets/images/carousel1.png'),
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
      <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 1}}>
        <Image
          source={carouselData[backgroundIndex % carouselData.length].image}
          style={[
            styles.backgroundImage,
            {width: PAGE_WIDTH, height: PAGE_WIDTH * (4 / 3)},
          ]}
          blurRadius={15}
        />
        <View style={[GlobalStyle.header, {paddingLeft: 20}]}>
          <Image
            source={require('../assets/icons/ArtviewLogo.png')}
            style={GlobalStyle.logo}
          />
        </View>
        <View style={[styles.titleContainerTemp, {paddingTop: 16}]}>
          <Text style={styles.sectionTitle}>내 전시기록</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Records')}>
            <Text style={styles.viewAllText}>전체보기 &gt;</Text>
          </TouchableOpacity>
        </View>
        <CarouselParallax
          data={carouselData}
          onIndexChange={handleIndexChange}
        />
        <View style={GlobalStyle.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>추천전시</Text>
            <TouchableOpacity
            //추천전시 전체보기 페이지..
            >
              <Text style={styles.viewAllText}>전체보기 &gt;</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.sectionFlatList}
            horizontal
            data={recommendedExhibitions}
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
      </ScrollView>
      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('RecordingStart')}>
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
  titleContainerTemp: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    paddingTop: 2,
  },
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
