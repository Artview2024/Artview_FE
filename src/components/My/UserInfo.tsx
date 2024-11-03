import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';

interface UserInfoProps {
  following: string;
  follower: string;
  enjoyed: string;
  userName: string;
  userImageUrl: string;
  navigation: any;
}

const UserInfo: React.FC<UserInfoProps> = ({
  following,
  follower,
  enjoyed,
  userName,
  userImageUrl,
  navigation,
}) => (
  <View style={styles.userInfo}>
    <Image style={styles.profileImage} source={{uri: userImageUrl}} />
    <Text style={styles.profileName}>{userName}</Text>
    <View style={styles.profileStats}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyFollowScreen', {activeTab: '팔로잉'})
        }>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.statsText}>팔로잉 </Text>
          <Text style={[styles.statsText, {color: '#EA1B83'}]}>
            {following}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyFollowScreen', {activeTab: '팔로워'})
        }>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.statsText}>팔로워 </Text>
          <Text style={[styles.statsText, {color: '#EA1B83'}]}>{follower}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MyFollowScreen', {activeTab: '관람'})
        }>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.statsText}>기록수 </Text>
          <Text style={[styles.statsText, {color: '#EA1B83'}]}>{enjoyed}</Text>
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      style={styles.editProfileButton}
      onPress={() => navigation.navigate('MyEdit')}>
      <Text style={styles.editProfileButtonText}>프로필 수정</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  userInfo: {alignItems: 'center'},
  profileImage: {width: 80, height: 80, borderRadius: 40, marginVertical: 10},
  profileName: {fontSize: 20, fontWeight: 'bold'},
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 10,
  },
  statsText: {fontSize: 14, color: '#828282'},
  editProfileButton: {
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#EA1B83',
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default UserInfo;
