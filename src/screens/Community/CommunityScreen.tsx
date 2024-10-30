import React, {useState, useRef, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList as FlatListType,
} from 'react-native';
import Text from '../../components/Text';
import {
  useNavigation,
  NavigationProp,
  useScrollToTop,
  useFocusEffect,
} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';

import {API_BASE_URL} from '@env';
import GlobalStyle from '../../styles/GlobalStyle';
import CommunityCard from '../../components/Community/CommunityCard';
import FilterTabs from '../../components/Community/FilterTabs';

import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import {StackParamList} from '../../navigator/StackParamList';
import customAxios from '../../services/customAxios';

type PageType = {
  detailCommunicationsContentResponseDtoList: any[];
  nextCursor?: string;
};

const fetchPosts = async ({
  pageParam = 0,
  category,
}: {
  pageParam: number;
  category: string;
}) => {
  const apiCategory = category === '전체' ? 'all' : 'follow';

  //   const response = await fetch(
  //     `${API_BASE_URL}/communications/main/${apiCategory}/${pageParam}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },
  //   );

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch posts');
  //   }

  //   return response.json();
  // };
  const response = await customAxios.get(
    `/communications/main/${apiCategory}/${pageParam}`,
  );

  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }

  return response.data;
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const ref = useRef<FlatListType<any>>(null);
  useScrollToTop(ref);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} =
    useInfiniteQuery({
      queryKey: ['posts', activeTab],
      queryFn: ({pageParam}) => fetchPosts({pageParam, category: activeTab}),
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.nextCursor,
    });

  const posts =
    data?.pages.flatMap(
      (page: PageType) => page.detailCommunicationsContentResponseDtoList,
    ) || [];

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    ref.current?.scrollToOffset({animated: true, offset: 0});
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      ref.current?.scrollToOffset({animated: true, offset: 0});
      refetch();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={GlobalStyle.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={GlobalStyle.header}>소통</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchIcon width={24} height={24} style={{marginRight: 10}} />
          </TouchableOpacity>
          <NotificationIcon width={24} height={25} />
        </View>
      </View>

      <FilterTabs activeTab={activeTab} onSelectTab={handleTabSelect} />

      <FlatList
        style={{paddingBottom: 27}}
        data={posts}
        keyExtractor={item => item.communicationsId.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommunityDetail', {
                communicationsId: item.communicationsId,
              })
            }>
            <CommunityCard Posts={item} />
          </TouchableOpacity>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? <Text>Loading...</Text> : null
        }
        ref={ref} // ref에 FlatList 연결
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('PostingStart')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
