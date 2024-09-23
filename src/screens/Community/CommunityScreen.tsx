import React, {useState, useRef} from 'react';
import {ScrollView, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useScrollToTop,
} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import {useInfiniteQuery} from '@tanstack/react-query';

import {API_BASE_URL} from '@env';
import GlobalStyle from '../../styles/GlobalStyle';
import CommunityCard from '../../components/Community/CommunityCard';
import FilterTabs from '../../components/Community/FilterTabs';

import SearchIcon from '../../assets/icons/search-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';

type PageType = {
  items: any[];
  nextCursor?: string;
};

const fetchPosts = async ({
  pageParam = 1,
  category,
}: {
  pageParam: number;
  category: string;
}) => {
  const response = await fetch(
    `${API_BASE_URL}api/communications/${category}?cursor=${pageParam}`,
  );
  return response.json();
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('전체');
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const ref = useRef(null);
  useScrollToTop(ref);

  // useInfiniteQuery 무한 스크롤
  const {
    data,
    fetchNextPage, // 다음 페이지 데이터
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetchingNextPage, // 다음 페이지를 가져오는 중 (로딩 상태)
  } = useInfiniteQuery({
    queryKey: ['posts', activeTab], // 쿼리 키: 탭 선택에 따라
    queryFn: ({pageParam}) => fetchPosts({pageParam, category: activeTab}),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  return (
    <View style={GlobalStyle.container}>
      <ScrollView
        style={{flex: 1}}
        showsHorizontalScrollIndicator={false}
        ref={ref}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={GlobalStyle.header}>소통</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <SearchIcon width={24} height={24} style={{marginRight: 10}} />
            <NotificationIcon width={24} height={25} />
          </View>
        </View>

        <FilterTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        <FlatList
          style={{paddingBottom: 27}}
          data={data?.pages.flatMap((page: PageType) => page.items) || []}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CommunityCard Posts={item} />}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5} // 리스트의 50% 지점에서 onEndReached
          ListFooterComponent={() =>
            isFetchingNextPage ? <Text>Loading...</Text> : null
          }
        />
      </ScrollView>

      <TouchableOpacity
        style={GlobalStyle.floatingButton}
        onPress={() => navigation.navigate('PostingStart')}>
        <Text style={GlobalStyle.floatingButtonText}>+ 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}
