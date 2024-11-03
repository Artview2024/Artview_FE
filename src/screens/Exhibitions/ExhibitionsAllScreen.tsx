import React, {useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useScrollToTop, useRoute, RouteProp} from '@react-navigation/native';
import Header from '../../components/My/Header';
import GlobalStyle from '../../styles/GlobalStyle';
import ExhibitionList from '../../components/My/ExhibitionList';
import Records from '../../components/Records';
import {StackParamList} from '../../navigator/StackParamList';
import {useInfiniteQuery} from '@tanstack/react-query';
import customAxios from '../../services/customAxios';

type ExhibitionsScreenRouteProp = RouteProp<StackParamList, 'ExhibitionsAll'>;

const recommendedExhibitions = [
  {
    id: 1,
    title: 'SERIOUS',
    name: 'SERIOUS',
    date: '2024.05.14~05.30',
    gallery: '성남 갤러리홀',
    image: require('../../assets/images/recommend1.png'),
  },
  {
    id: 2,
    title: '웨딩전',
    name: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/recommend2.png'),
  },
  {
    id: 3,
    title: '웨딩전',
    name: '웨딩전',
    date: '2024.05.04~07.30',
    gallery: '갤러리',
    image: require('../../assets/images/carousel1.png'),
  },
];

const fetchExhibitions = async ({
  pageParam = 0,
  title,
}: {
  pageParam?: number;
  title: string;
}) => {
  const endpoint =
    title === '진행 중인 전시' ? '/exhibition/ongoing' : '/exhibition/upcoming';

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
  useScrollToTop(ref);

  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['exhibitions', route.params.title],
    queryFn: ({pageParam}) =>
      fetchExhibitions({pageParam, title: route.params.title}),
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: route.params.title !== '추천전시',
    initialPageParam: 0,
  });

  const exhibitions =
    data?.pages.flatMap(page =>
      page.exhibitionInfos.map((item: any) => {
        const startDate = item.startDate.split(' ')[0];
        const finishDate = item.finishDate.split(' ')[0];

        return {
          id: item.exhibitionId,
          title: item.title,
          name: item.title,
          date: `${startDate}~${finishDate}`,
          gallery: item.location,
          image: {uri: item.mainImageUrl},
        };
      }),
    ) || [];

  const handleExhibitionSelect = (id: number) => {
    setSelectedExhibition(id);
  };

  return (
    <View style={GlobalStyle.container}>
      <Header title={route.params.title || '추천전시'} />
      {route.params.title === '추천전시' ? (
        <Records
          exhibitions={recommendedExhibitions}
          selectedExhibition={selectedExhibition}
          onExhibitionSelect={handleExhibitionSelect}
          backAction={() => {}}
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
