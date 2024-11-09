import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';

type User = {
  userId: number;
  userName: string;
  userImageUrl: string;
};

type RecommendedUsersProps = {
  users: User[];
};

export default function RecommendedUsers({users}: RecommendedUsersProps) {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyle.sectionTitle}>추천 사용자</Text>
      <View style={styles.userContainer}>
        {users.map(user => (
          <View key={user.userId} style={styles.user}>
            <Image source={{uri: user.userImageUrl}} style={styles.image} />
            <Text style={styles.name}>{user.userName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
  },
});
