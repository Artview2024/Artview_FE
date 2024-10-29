import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import customAxios from '../../services/customAxios';
import Text from '../../components/Text';

interface FollowItem {
  id: number;
  name: string;
  imageUrl: string;
  isFollowing: boolean;
}

interface FollowListProps {
  followList: FollowItem[];
  activeTab: string;
  updateFollowingCount: (isFollowing: boolean) => void;
}

const FollowList: React.FC<FollowListProps> = ({
  followList,
  activeTab,
  updateFollowingCount,
}) => (
  <View style={{paddingTop: 5}}>
    {followList.length > 0 ? (
      followList.map(item => (
        <View key={item.id} style={styles.listItem}>
          <View style={styles.userInfo}>
            <Image source={{uri: item.imageUrl}} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <FollowButton
            userId={item.id}
            isFollowing={item.isFollowing}
            updateFollowingCount={updateFollowingCount}
          />
        </View>
      ))
    ) : (
      <Text style={{textAlign: 'center', padding: 20}}>
        팔로우 목록이 없습니다.
      </Text>
    )}
  </View>
);

const FollowButton = ({
  userId,
  isFollowing,
  updateFollowingCount,
}: {
  userId: number;
  isFollowing: boolean;
  updateFollowingCount: (isFollowing: boolean) => void;
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const toggleFollow = async () => {
    try {
      if (following) {
        await customAxios.delete('/user/unfollow', {
          data: {takeFollow: userId},
        });
        setFollowing(false);
        updateFollowingCount(false);
      } else {
        await customAxios.put('/user/follow', {
          takeFollow: userId,
        });
        setFollowing(true);
        updateFollowingCount(true);
      }
    } catch (error: any) {
      console.error(
        following ? '언팔로우 실패:' : '팔로우 실패:',
        error.response?.data.message || error.message,
      );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.followButton,
        following ? styles.following : styles.notFollowing,
      ]}
      onPress={toggleFollow}>
      <Text style={following ? styles.followingText : styles.notFollowingText}>
        {following ? '팔로잉' : '팔로우'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  following: {
    backgroundColor: '#fff',
    borderColor: '#4E4E4E',
  },
  notFollowing: {
    backgroundColor: '#4E4E4E',
    borderColor: '#4E4E4E',
  },
  followingText: {
    color: '#4E4E4E',
    fontWeight: 'bold',
  },
  notFollowingText: {
    color: '#fff',
  },
});

export default FollowList;
