import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import GlobalStyle from '../styles/GlobalStyle';

const exhibitions = [
  {
    id: 1,
    name: '김민형 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    image: require('../assets/images/carousel4.jpg'),
    rating: '4.5',
    imageList: [
      require('../assets/images/carousel4.jpg'),
      require('../assets/images/carousel4.jpg'),
    ],
  },
  {
    id: 2,
    name: '모던',
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
    name: '끝없는 계단',
    date: '2022.10.28',
    gallery: '서울미술관',
    image: require('../assets/images/carousel4.jpg'),
    rating: '3.8',
    imageList: [
      require('../assets/images/carousel4.jpg'),
      require('../assets/images/carousel4.jpg'),
    ],
  },
];

export default function MyScreen() {
  const ref = useRef(null);
  const following = '12';
  const follower = '31';
  const enjoyed = '29';
  useScrollToTop(ref);

  const [activeTab, setActiveTab] = useState('게시물');

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView ref={ref}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text style={GlobalStyle.header}>마이</Text>
        </View>

        <View style={styles.userInfo}>
          <Image
            style={styles.profileImage}
            source={require('../assets/images/user.png')}
          />
          <Text style={styles.profileName}>김민주</Text>
          <View style={styles.profileStats}>
            <View style={{flexDirection: 'row'}}>
              <Text>팔로잉 </Text>
              <Text style={[styles.statsText, {color: '#EA1B83'}]}>
                {following}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.statsText}>팔로워 </Text>
              <Text style={[styles.statsText, {color: '#EA1B83'}]}>
                {follower}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.statsText}>관람수 </Text>
              <Text style={[styles.statsText, {color: '#EA1B83'}]}>
                {enjoyed}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categories}>
          <Text style={styles.categoryText}>관심 분야</Text>
          <View style={styles.categoryTags}>
            <Text style={styles.categoryTag}>사진</Text>
            <Text style={styles.categoryTag}>과학기술</Text>
            <Text style={styles.categoryTag}>미술</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('게시물')}>
              <Text
                style={
                  activeTab === '게시물' ? styles.tabTextActive : styles.tabText
                }>
                게시물
              </Text>
            </TouchableOpacity>
            {activeTab === '게시물' && <View style={styles.activeTabLine} />}
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('관람')}>
              <Text
                style={
                  activeTab === '관람' ? styles.tabTextActive : styles.tabText
                }>
                관람
              </Text>
            </TouchableOpacity>
            {activeTab === '관람' && <View style={styles.activeTabLine} />}
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('스크랩')}>
              <Text
                style={
                  activeTab === '스크랩' ? styles.tabTextActive : styles.tabText
                }>
                스크랩
              </Text>
            </TouchableOpacity>
            {activeTab === '스크랩' && <View style={styles.activeTabLine} />}
          </View>
        </View>

        <View style={styles.exhibitionList}>
          {exhibitions.map(exhibition => (
            <View key={exhibition.id} style={styles.exhibitionWrapper}>
              <TouchableOpacity>
                <Image
                  source={exhibition.image}
                  style={[styles.exhibitionImage]}
                />
                <View style={{paddingTop: 7}}>
                  <Text style={GlobalStyle.mainText}>{exhibition.name}</Text>
                  <Text style={GlobalStyle.subText}>{exhibition.date}</Text>
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
  userInfo: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#828282',
  },
  editButton: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 14,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  categoryTags: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryTag: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginHorizontal: 5,
    fontSize: 12,
    fontWeight: 'medium',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 18,
    paddingBottom: 14,
    position: 'relative',
  },
  tabContainer: {
    alignItems: 'center',
    flex: 1,
  },
  activeTabLine: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#828282',
    paddingBottom: 8,
  },
  exhibitionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exhibitionWrapper: {
    width: '46%',
    marginVertical: 10,
  },
  exhibitionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
