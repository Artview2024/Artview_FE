import React, {useEffect} from 'react';
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
import CommunityCard from '../../components/Community/CommunityCard';

type ExhibitionInfo = {
  exhibitionId: number;
  mainImageUrl: string;
  title: string;
  startDate: string;
  finishDate: string;
  location: string;
};

type CommunityInfo = {
  communicationsId: number;
  ImageAndTitle: Record<string, string>;
  name: string;
  rate: string;
  date: string;
  gallery: string;
  content: string;
  keyword: string[];
  isHeartClicked: boolean;
  writerId: number;
  writerName: string;
  writerImage: string;
};

type SearchResultProps = {
  searchType: 'exhibition' | 'community';
  exhibitions?: ExhibitionInfo[];
  communityPosts?: CommunityInfo[];
  onItemPress: (id: number) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  searchKeyword: string;
};

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
  searchType,
  exhibitions = [],
  communityPosts = [],
  onItemPress,
  fetchNextPage,
  hasNextPage,
  searchKeyword,
}) => {
  const renderExhibition = ({item}: {item: ExhibitionInfo}) => (
    <TouchableOpacity
      onPress={() => onItemPress(item.exhibitionId)}
      style={styles.exhibitionItem}>
      <Image source={{uri: item.mainImageUrl}} style={styles.mainImage} />
      <View style={{marginLeft: 10}}>
        <Text style={styles.title}>
          {highlightKeyword(item.title, searchKeyword)}
        </Text>
        <View style={styles.infoRow}>
          <Calendar name="calendar-outline" size={15} color="#000" />
          <Text style={styles.subInfo}>
            {item.startDate} - {item.finishDate}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <LocationPin name="location-outline" size={15} color="#000" />
          <Text style={styles.subInfo}>
            {highlightKeyword(item.location, searchKeyword)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCommunityPost = ({item}: {item: CommunityInfo}) => (
    <TouchableOpacity onPress={() => onItemPress(item.communicationsId)}>
      <CommunityCard Posts={item} searchKeyword={searchKeyword} />
    </TouchableOpacity>
  );

  if (searchType === 'exhibition' && exhibitions.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
      </View>
    );
  }

  if (searchType === 'community' && communityPosts.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View>
      {searchType === 'exhibition' ? (
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
      ) : (
        <FlatList
          data={communityPosts}
          keyExtractor={item => item.communicationsId.toString()}
          renderItem={renderCommunityPost}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
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
