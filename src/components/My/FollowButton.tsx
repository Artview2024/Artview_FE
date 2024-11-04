import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import customAxios from '../../services/customAxios';
import Text from '../Text';

interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
  updateFollowingCount: (isFollowing: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowing,
  updateFollowingCount,
}) => {
  const [following, setFollowing] = useState<boolean>(isFollowing);

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
        error.response?.data || error.message,
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

export default FollowButton;
