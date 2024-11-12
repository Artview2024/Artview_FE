import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Text from '../../components/Text';
import Calendar from 'react-native-vector-icons/Ionicons';
import LocationPin from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../../styles/GlobalStyle';

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
  searchKeyword: string;
};

// 키워드 강조 함수
const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <Text key={index} style={GlobalStyle.pointColor}>
        {part}
      </Text>
    ) : (
      <Text key={index}>{part}</Text>
    ),
  );
};

const SearchResult: React.FC<SearchResultProps> = ({
  exhibitions,
  onExhibitionPress,
  fetchNextPage,
  hasNextPage,
  searchKeyword, // 추가된 부분
}) => {
  const renderExhibition = ({item}: {item: ExhibitionInfo}) => (
    <TouchableOpacity
      onPress={() => onExhibitionPress(item.exhibitionId)}
      style={styles.exhibitionItem}>
      <Image source={{uri: item.mainImageUrl}} style={styles.mainImage} />
      <View style={{marginLeft: 10}}>
        <Text style={styles.title}>
          {highlightKeyword(item.title, searchKeyword)}
        </Text>
        <View style={styles.infoRow}>
          <Calendar name="calendar-outline" size={15} color={'#000'} />
          <Text style={styles.subInfo}>
            {item.startDate} - {item.finishDate}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <LocationPin name="location-outline" size={15} color={'#000'} />
          <Text style={styles.subInfo}>{item.location}</Text>
        </View>
      </View>
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
    <View style={GlobalStyle.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  exhibitionItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  mainImage: {
    width: 60,
    height: 90,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
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
