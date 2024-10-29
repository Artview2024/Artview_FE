import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import SearchHeader from '../../components/Search/SearchHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../../components/Text';

const SearchScreen = () => {
  const recentSearches: string[] = [
    '아름다운',
    '부모님과 보기 좋은 전시',
    '팀버튼 전시회',
  ];

  const renderSearchItem = ({item}: {item: string}) => (
    <View style={styles.searchItem}>
      <Icon name="time-outline" size={20} color="black" />
      <Text style={styles.searchText}>{item}</Text>
      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchHeader />
      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentSearchTitle}>최근 검색</Text>
        <TouchableOpacity>
          <Text style={styles.clearAll}>전체삭제</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentSearches}
        renderItem={renderSearchItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recentSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  recentSearchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearAll: {
    fontSize: 14,
    color: '#888',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
