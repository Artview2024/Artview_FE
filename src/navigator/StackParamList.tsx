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
  Home: undefined;
  Tabs: undefined;
  Records: {newRecord?: Record};
  Recording: {
    exhibitionName: string;
    exhibitionDate: string;
    gallery: string;
    artList: Array<{
      image: string | null;
      title: string;
      artist: string;
      memo: string;
    }>;
    artIndex?: number;
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
