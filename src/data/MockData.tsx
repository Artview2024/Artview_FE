export type ArtItem = {
  image: string;
  title: string;
  artist: string;
  memo: string;
};

export type Record = {
  id: number;
  name: string;
  date: string;
  gallery: string;
  mainImage: string;
  rating: string;
  artList: ArtItem[];
};

export const mockRecords: Record[] = [
  {
    id: 1,
    name: '이경준 사진전',
    date: '2023.12.18',
    gallery: '서울미술관',
    mainImage: require('../assets/images/artList3.jpg') as string,
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/artList3.jpg') as string,
        title: '뉴욕의 밤',
        artist: '김민형',
        memo: '좋다. 멋있고 짱이다.',
      },
      {
        image: require('../assets/images/artList2.jpg') as string,
        title: '뉴욕 건물',
        artist: '김민형',
        memo: '대칭이 좋다. ',
      },
      {
        image: require('../assets/images/artList1.jpg') as string,
        title: '갈색 건물',
        artist: '김민형',
        memo: '예쁘다',
      },
    ],
  },
  {
    id: 2,
    name: '인상주의의 출현',
    date: '2023.11.11',
    gallery: '서울미술관',
    mainImage: require('../assets/images/carousel4.jpg') as string,
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel5.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel6.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
    ],
  },
  {
    id: 3,
    name: 'SF 2021:판타지 오디세이',
    date: '2022.10.28',
    gallery: '서울시립북서울미술관',
    mainImage: require('../assets/images/carousel7.jpg') as string,
    rating: '4.5',
    artList: [
      {
        image: require('../assets/images/carousel6.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel7.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
      {
        image: require('../assets/images/carousel4.jpg') as string,
        title: '뉴욕거리',
        artist: '김민형',
        memo: '좋다. ',
      },
    ],
  },
  {
    id: 4,
    name: '디미 전시회',
    date: '2024.06.17',
    gallery: '서울여대',
    mainImage: require('../assets/images/android.png') as string,
    rating: '4.0',
    artList: [
      {
        image: require('../assets/images/android.png') as string,
        title: '티비에 바둑판',
        artist: '드로이드 안',
        memo: '티비..',
      },
    ],
  },
];
