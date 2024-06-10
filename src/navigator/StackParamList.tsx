export type Record = {
  id: number;
  name: string;
  date: string;
  gallery: string;
  mainImage: any;
  rating: string;
  artList: Array<{
    image: any;
    title: string;
    artist: string;
    contents: string;
  }>;
};

export type StackParamList = {
  Tabs: undefined;
  Records: undefined;
  Recording: {
    exhibitionName: string;
    exhibitionDate: string;
    gallery: string;
    rating: string;
    artworks: Array<{
      image: string;
      title: string;
      artist: string;
      memo: string;
    }>;
  };
  RecordingStart: undefined;
  Posting: {
    exhibition: {
      id: number;
      name: string;
      date: string;
      gallery: string;
      image: any;
      rating: string;
      imageList: any[];
    };
  };
  PostingStart: undefined;
  RecordDetail: {record: Record};
};
