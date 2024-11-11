import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchHeader from '../../components/Search/SearchHeader';
import Text from '../../components/Text';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import customAxios from '../../services/customAxios';
import {StackParamList} from '../../navigator/StackParamList';
import SearchResult from '../../components/Search/SearchResult';

type ExhibitionInfo = {
  exhibitionId: number;
  mainImageUrl: string;
  title: string;
  startDate: string;
  finishDate: string;
  location: string;
};

type PageType = {
  exhibitionDetailInfo: {
    exhibitionInfo: ExhibitionInfo;
  }[];
  hasNext: boolean;
  nextCursor: number;
};

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

const SearchScreen: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const {data, fetchNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['exhibitions', keyword],
    queryFn: ({pageParam = 0}) => fetchExhibitions({pageParam, keyword}),
    enabled: !!keyword, // keyword가 설정됐을 때만 활성화
    getNextPageParam: (lastPage: PageType) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

  const exhibitions =
    data?.pages?.flatMap(
      page =>
        page?.exhibitionDetailInfo?.map(item => item.exhibitionInfo) || [],
    ) || [];

  const handleExhibitionPress = (exhibitionId: number) => {
    navigation.navigate('ExhibitionDetail', {exhibitionId});
  };

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <View style={styles.container}>
      <SearchHeader onSearch={setKeyword} />
      {keyword ? (
        <SearchResult
          exhibitions={exhibitions}
          onExhibitionPress={handleExhibitionPress}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
        />
      ) : (
        <Text> </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SearchScreen;
