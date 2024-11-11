import React from 'react';
import {FlatList, TouchableOpacity, StyleSheet, View} from 'react-native';
import Text from '../../components/Text';

type ExhibitionInfo = {
  exhibitionId: number;
  mainImageUrl: string;
  title: string;
  startDate: string;
  finishDate: string;
  location: string;
};

type SearchResultProps = {
  exhibitions: ExhibitionInfo[];
  onExhibitionPress: (exhibitionId: number) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

const SearchResult: React.FC<SearchResultProps> = ({
  exhibitions,
  onExhibitionPress,
  fetchNextPage,
  hasNextPage,
}) => {
  const renderExhibition = ({item}: {item: ExhibitionInfo}) => (
    <TouchableOpacity
      onPress={() => onExhibitionPress(item.exhibitionId)}
      style={styles.exhibitionItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {item.startDate} - {item.finishDate}
      </Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  if (exhibitions.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={exhibitions}
      keyExtractor={item => item.exhibitionId.toString()}
      renderItem={renderExhibition}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  exhibitionItem: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
  },
});

export default SearchResult;
