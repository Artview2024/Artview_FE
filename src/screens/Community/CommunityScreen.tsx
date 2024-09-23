import React, {useState, useRef} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useScrollToTop,
} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';

import {API_BASE_URL} from '@env';
import GlobalStyle from '../../styles/GlobalStyle';
import CommunityCard from '../../components/Community/CommunityCard';
import CommunityDetailScreen from './CommunityDetailScreen';
import FilterTabs from '../../components/Community/FilterTabs';

import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';
import {StackParamList} from '../../navigator/StackParamList';

type PageType = {
  detailCommunicationsContentResponseDtoList: any[]; // 게시물 데이터 리스트
  nextCursor?: string; // 다음 페이지를 가져오기 위한 커서 값
};

const fetchPosts = async ({
  pageParam = 0,
  category,
}: {
  pageParam: number;
  category: string;
}) => {
  const apiCategory = category === '전체' ? 'all' : 'follow';

  const response = await fetch(
    `${API_BASE_URL}/communications/main/${apiCategory}/${pageParam}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ACCESS_TOKEN`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const ref = useRef(null);
  useScrollToTop(ref);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['posts', activeTab],
      queryFn: ({pageParam}) => fetchPosts({pageParam, category: activeTab}),
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.nextCursor,
    });

  // 데이터 평탄화(flatten) -> 리스트
  const posts =
    data?.pages.flatMap(
      (page: PageType) => page.detailCommunicationsContentResponseDtoList, // 페이지마다 리스트 병합(flatten)
    ) || [];

  return (
    <View style={GlobalStyle.container}>
      {/* 상단 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={GlobalStyle.header}>소통</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
          <SearchIcon width={24} height={24} style={{marginRight: 10}} />
          <NotificationIcon width={24} height={25} />
        </View>
      </View>

      {/* 카테고리 필터 */}
      <FilterTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 게시물 리스트 - 무한 스크롤 */}
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
        // 사용자가 스크롤을 맨 끝까지 내렸을 때 다음 페이지 요청
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage(); // 다음 페이지 데이터 요청
          }
        }}
        onEndReachedThreshold={0.5} // 화면의 50% 지점에서 다음 페이지 요청
        ListFooterComponent={() =>
          isFetchingNextPage ? <Text>Loading...</Text> : null
        }
        ref={ref}
      />

      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('PostingStart')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
