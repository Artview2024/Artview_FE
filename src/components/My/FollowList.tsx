import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../../components/Text';

interface FollowItem {
  id: number;
  name: string;
}

interface FollowListProps {
  followList: FollowItem[];
}

const FollowList: React.FC<FollowListProps> = ({followList}) => (
  <View style={{paddingTop: 5}}>
    {followList.map(item => (
      <TouchableOpacity key={item.id} style={styles.listItem}>
        <Image
          source={require('../../assets/images/user.png')}
          style={styles.avatar}
        />
        {/* <Image source={{uri: item.imageUrl}} style={styles.avatar} /> */}
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
