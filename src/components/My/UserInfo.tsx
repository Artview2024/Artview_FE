import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FollowButton from './FollowButton';
import Text from '../Text';
import {useDerivedValue} from 'react-native-reanimated';

interface UserInfoProps {
  userId: number;
  following: string | number;
  follower: string | number;
  enjoyed: string | number;
  userName: string;
  userImageUrl: string;
  isOtherUser?: boolean;
  isFollowing?: boolean;
  updateFollowingCount?: (isFollowing: boolean) => void;
  navigation?: any;
}

const UserInfo: React.FC<UserInfoProps> = ({
  userId,
  following,
  follower,
  enjoyed,
  userName,
  userImageUrl,
  isOtherUser = false,
  isFollowing = false,
  updateFollowingCount = () => {},
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
    {isOtherUser ? (
      <FollowButton
        userId={userId}
        isFollowing={isFollowing}
        updateFollowingCount={updateFollowingCount}
      />
    ) : (
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('MyEdit')}>
        <Text style={styles.editProfileButtonText}>프로필 수정</Text>
      </TouchableOpacity>
    )}
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
