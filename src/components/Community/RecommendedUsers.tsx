import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';

type User = {
  userId: number;
  userName: string;
  userImageUrl: string;
};

type RecommendedUsersProps = {
  users: User[];
};

export default function RecommendedUsers({users}: RecommendedUsersProps) {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View>
      <Text style={GlobalStyle.sectionTitle}>추천 사용자</Text>
      <View style={styles.userContainer}>
        <FlatList
          data={users}
          horizontal
          keyExtractor={item => item.userId.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OtherUser', {writerId: item.userId})
              }
              style={styles.user}>
              <Image source={{uri: item.userImageUrl}} style={styles.image} />
              <Text style={styles.name}>{item.userName}</Text>
            </TouchableOpacity>
          )}
        />
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
    marginBottom: 50,
  },
  user: {
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
  },
});
