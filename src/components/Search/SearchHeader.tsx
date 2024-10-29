import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';

const SearchHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <BackIcon name="chevron-back" size={24} color={'black'} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="감상 키워드, 글, 전시회 검색하기"
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
  },
  searchContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000',
  },
  rightSpace: {
    width: 40,
  },
});

export default SearchHeader;
