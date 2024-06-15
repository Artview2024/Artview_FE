import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function MyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>마이</Text>
        <Image
          style={styles.profileImage}
          source={require('../assets/images/carousel1.png')}
        />
        <Text style={styles.profileName}>김민주</Text>
        <View style={styles.profileStats}>
          <Text style={styles.statsText}>팔로잉 12</Text>
          <Text style={styles.statsText}>팔로워 31</Text>
          <Text style={styles.statsText}>관람수 29</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categories}>
        <Text style={styles.categoryText}>관심 전시회</Text>
        <View style={styles.categoryTags}>
          <Text style={styles.categoryTag}>사진</Text>
          <Text style={styles.categoryTag}>과학기술</Text>
          <Text style={styles.categoryTag}>미술</Text>
        </View>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.tabTextActive}>게시물</Text>
        <Text style={styles.tabText}>관람</Text>
        <Text style={styles.tabText}>스크랩</Text>
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
          <Image
            style={styles.postImage}
            source={require('../assets/images/carousel1.png')}
          />
          <Text style={styles.postTitle}>심플함 속의 미학</Text>
          <Text style={styles.postDate}>2023.12.18</Text>
        </View>
        <View style={styles.post}>
          <Image
            style={styles.postImage}
            source={require('../assets/images/carousel1.png')}
          />
          <Text style={styles.postTitle}>고전포스터</Text>
          <Text style={styles.postDate}>2023.11.21</Text>
        </View>
        <View style={styles.post}>
          <Image
            style={styles.postImage}
            source={require('../assets/images/carousel1.png')}
          />
          <Text style={styles.postTitle}>타이틀</Text>
          <Text style={styles.postDate}>2023.10.10</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
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
    color: '#FF1493',
  },
  editButton: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryTags: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryTag: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingVertical: 10,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  posts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  post: {
    width: '45%',
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
  },
});
