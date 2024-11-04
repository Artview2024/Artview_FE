import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FollowButton from './FollowButton';
import Text from '../../components/Text';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

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
  updateFollowingCount,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={{paddingTop: 5}}>
      {followList.length > 0 ? (
        followList.map(item => (
          <View key={item.id} style={styles.listItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OtherUser', {writerId: item.id})
              }>
              <View style={styles.userInfo}>
                <Image source={{uri: item.imageUrl}} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
});

export default FollowList;
