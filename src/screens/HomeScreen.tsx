import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import CarouselParallax from '../components/CarouselParallax';
import {StackParamList} from '../navigator/AppNavigator';

const carouselData = [
  {
    key: '1',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel1.png'),
  },
  {
    key: '2',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel1.png'),
  },
  {
    key: '3',
    title: '김민형 사진전',
    date: '2023.12.18',
    gallery: '아트가가 갤러리',
    image: require('../assets/images/carousel1.png'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/icons/ArtviewLogo.png')}
          style={styles.logo}
        />
      </View>
      <ScrollView>
        <View>
          <Text style={styles.sectionTitle}>내 전시기록</Text>
          <CarouselParallax data={carouselData} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Recording')}>
        <Text style={styles.floatingButtonText}>+ 기록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'violet',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlign: 'left',
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
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#000',
    width: 95,
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
  },
});
