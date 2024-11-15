import React, {useState, useRef, useCallback, useEffect} from 'react';
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
import GlobalStyle from '../../styles/GlobalStyle';
import CommunityCard from '../../components/Community/CommunityCard';
import FilterTabs from '../../components/Community/FilterTabs';
import RecommendedUsers from '../../components/Community/RecommendedUsers';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import {StackParamList} from '../../navigator/StackParamList';
import customAxios from '../../services/customAxios';
import useRefresh from '../../hooks/useRefresh';

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
  const response = await customAxios.get(
    `/communications/main/${apiCategory}/${pageParam}`,
  );
  if (response.status !== 200) {
    throw new Error('Failed to fetch posts');
  }
  return response.data;
};

const fetchRecommendedUsers = async () => {
  const response = await customAxios.get('/user/recommend/follower');
  if (response.status !== 200) {
    throw new Error('Failed to fetch recommended users');
  }
  return response.data;
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
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

  const {refreshing, onRefresh} = useRefresh(refetch);

  const posts =
    data?.pages.flatMap(
      (page: PageType) => page.detailCommunicationsContentResponseDtoList,
    ) || [];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchRecommendedUsers();
        setRecommendedUsers(users);
      } catch (error: any) {
        console.error(
          'Failed to fetch recommended users:',
          error.response?.data,
        );
      }
    };

    getUsers();
  }, []);

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    ref.current?.scrollToOffset({animated: true, offset: 0});
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      ref.current?.scrollToOffset({animated: true, offset: 0});
      refetch();
    }, [refetch]),
  );

  const renderPost = useCallback(
    ({item, index}: {item: any; index: number}) => {
      if (index === 1 && recommendedUsers.length > 0 && posts.length > 1) {
        return (
          <>
            <RecommendedUsers users={recommendedUsers} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CommunityDetail', {
                  communicationsId: item.communicationsId,
                })
              }>
              <CommunityCard Posts={item} searchKeyword={searchKeyword} />
            </TouchableOpacity>
          </>
        );
      }
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CommunityDetail', {
              communicationsId: item.communicationsId,
            })
          }>
          <CommunityCard Posts={item} searchKeyword={searchKeyword} />
        </TouchableOpacity>
      );
    },
    [recommendedUsers, navigation, posts.length, searchKeyword],
  );

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Search', {searchType: 'community'})
            }>
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
        renderItem={renderPost}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? <Text>Loading...</Text> : null
        }
        ref={ref}
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
