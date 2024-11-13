import React, {useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {
  useScrollToTop,
  useRoute,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import Header from '../../components/My/Header';
import GlobalStyle from '../../styles/GlobalStyle';
import ExhibitionList from '../../components/My/ExhibitionList';
import Records from '../../components/Records';
import {StackParamList} from '../../navigator/StackParamList';
import {useInfiniteQuery} from '@tanstack/react-query';
import customAxios from '../../services/customAxios';
import {NavigationProp} from '@react-navigation/native';

type ExhibitionsScreenRouteProp = RouteProp<StackParamList, 'ExhibitionsAll'>;

const fetchExhibitions = async ({
  pageParam = 0,
  title,
}: {
  pageParam?: number;
  title: string;
}) => {
  let endpoint = '';
  if (title === '진행 중인 전시') {
    endpoint = '/exhibition/ongoing';
  } else if (title === '무료 전시') {
    endpoint = '/exhibition/free';
  } else if (title === '온라인 전시') {
    endpoint = '/exhibition/online';
  }

  try {
    const response = await customAxios.get(`${endpoint}/${pageParam}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching exhibitions:',
      error.response?.data || error.message,
    );
  }
};

export default function ExhibitionsAllScreen() {
  const route = useRoute<ExhibitionsScreenRouteProp>();
  const ref = useRef(null);
  const [selectedExhibition, setSelectedExhibition] = useState<number | null>(
    null,
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  useScrollToTop(ref);

  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['exhibitions', route.params.title],
    queryFn: ({pageParam}) =>
      fetchExhibitions({pageParam, title: route.params.title}),
    getNextPageParam: lastPage =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

  const exhibitions =
    data?.pages.flatMap(page =>
      page?.exhibitionInfos.map((item: any) => {
        return {
          id: item.exhibitionId,
          name: item.title,
          gallery: item.location,
          image: {uri: item.mainImageUrl},
        };
      }),
    ) || [];

  const handleExhibitionSelect = (id: number) => {
    const isOnlineExhibition = route.params.title === '온라인 전시';
    setSelectedExhibition(id);
    navigation.navigate('ExhibitionDetail', {
      exhibitionId: id,
      isOnlineExhibition,
    });
  };

  return (
    <View style={GlobalStyle.container}>
      <Header title={route.params.title || '진행 중인 전시'} />
      {route.params.title === '진행 중인 전시' ||
      route.params.title === '무료 전시' ||
      route.params.title === '온라인 전시' ? (
        <Records
          exhibitions={exhibitions}
          selectedExhibition={selectedExhibition}
          onExhibitionSelect={handleExhibitionSelect}
          showGallery={true}
        />
      ) : (
        <FlatList
          data={exhibitions}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => <ExhibitionList exhibitions={[item]} />}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ref={ref}
        />
      )}
    </View>
  );
}
