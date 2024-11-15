import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import Text from '../Text';

type SearchHeaderProps = {
  onSearch: (text: string) => void;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({onSearch}) => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');

  const handleSearch = () => {
    onSearch(inputText);
  };

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
          placeholder="검색 키워드를 입력해주세요"
          placeholderTextColor={'#828282'}
          value={inputText}
          onChangeText={setInputText}
        />
      </View>
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <SearchIcon name="search" size={24} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
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
  searchButton: {
    width: 40,
    alignItems: 'center',
  },
});

export default SearchHeader;
