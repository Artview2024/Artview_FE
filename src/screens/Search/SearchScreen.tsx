import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchHeader from '../../components/Search/SearchHeader';
import Text from '../../components/Text';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import SearchResult from '../../components/Search/SearchResult';
import GlobalStyle from '../../styles/GlobalStyle';

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

type PageType = {
  exhibitionDetailInfo?: {exhibitionInfo: ExhibitionInfo}[];
  detailCommunicationsContentResponseDtoList?: CommunityInfo[];
  hasNext: boolean;
  nextCursor: number;
};

type SearchScreenRouteProp = RouteProp<StackParamList, 'Search'>;

const fetchExhibitions = async ({
  pageParam = 0,
  keyword,
}: {
  pageParam: number;
  keyword: string;
}): Promise<PageType> => {
  const response = await customAxios.get(
    `/exhibition/search/${keyword}/${pageParam}`,
  );
  if (response.status !== 200) {
    throw new Error('Failed to fetch exhibitions');
  }
  return response.data;
};

const fetchCommunity = async ({
  pageParam = 0,
  keyword,
}: {
  pageParam: number;
  keyword: string;
}): Promise<PageType> => {
  const response = await customAxios.get(
    `/communications/search/${keyword}/${pageParam}`,
  );
  if (response.status !== 200) {
    throw new Error('Failed to fetch community posts');
  }
  return response.data;
};

const SearchScreen: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const route = useRoute<SearchScreenRouteProp>();
  const searchType = route.params?.searchType || 'exhibition';
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const {data, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['search', keyword, searchType],
    queryFn: ({pageParam = 0}) =>
      searchType === 'exhibition'
        ? fetchExhibitions({pageParam, keyword})
        : fetchCommunity({pageParam, keyword}),
    enabled: !!keyword,
    getNextPageParam: (lastPage: PageType) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

  const exhibitions =
    data?.pages.flatMap(
      page =>
        page?.exhibitionDetailInfo?.map(item => item.exhibitionInfo) || [],
    ) || [];

  const communityPosts =
    data?.pages.flatMap(
      page => page?.detailCommunicationsContentResponseDtoList || [],
    ) || [];

  const handleExhibitionPress = (exhibitionId: number) => {
    navigation.navigate('ExhibitionDetail', {exhibitionId});
  };

  const handleCommunityPress = (communicationsId: number) => {
    navigation.navigate('CommunityDetail', {communicationsId});
  };

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <View style={GlobalStyle.container}>
      <SearchHeader onSearch={setKeyword} />
      {keyword ? (
        <SearchResult
          searchType={searchType}
          exhibitions={searchType === 'exhibition' ? exhibitions : []}
          communityPosts={searchType === 'community' ? communityPosts : []}
          onItemPress={
            searchType === 'exhibition'
              ? handleExhibitionPress
              : handleCommunityPress
          }
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          searchKeyword={keyword}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default SearchScreen;
