import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../../components/Text';

interface UserInfoProps {
  following: string;
  follower: string;
  enjoyed: string;
}

const UserInfo: React.FC<UserInfoProps> = ({following, follower, enjoyed}) => (
  <View style={styles.userInfo}>
    <Image
      style={styles.profileImage}
      source={require('../../assets/images/user.png')}
    />
    <Text style={styles.profileName}>김민주</Text>
    <View style={styles.profileStats}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.statsText}>팔로잉 </Text>
        <Text style={[styles.statsText, {color: '#EA1B83'}]}>{following}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.statsText}>팔로워 </Text>
        <Text style={[styles.statsText, {color: '#EA1B83'}]}>{follower}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.statsText}>관람수 </Text>
        <Text style={[styles.statsText, {color: '#EA1B83'}]}>{enjoyed}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.editButton}>
      <Text style={styles.editButtonText}>프로필 수정</Text>
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
  editButton: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 8,
  },
  editButtonText: {fontSize: 14},
});

export default UserInfo;
