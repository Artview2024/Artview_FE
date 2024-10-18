export type Record = {
  id: number;
  name: string;
  date: string;
  gallery: string;
  mainImage: string;
  rating: string;
  artList: Array<{
    image: string;
    title: string;
    artist: string;
    memo: string;
  }>;
};

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Tabs: {
    screen: string;
  };
  Records: undefined;
  Recording: {
    exhibitionName: string;
    exhibitionDate: string;
    gallery: string;
    artList: Array<{
      image: string | null;
      title: string | null;
      artist: string | null;
      memo: string | null;
    }>;
    artIndex?: number;
    isEditMode: boolean;
    myReviewsId?: number;
    mainImage?: string | null;
  };
  RecordingStart: undefined;
  Posting: {
    recordId: number;
  };
  PostingStart: undefined;
  RecordDetail: {record: Record};
  Community: {newPost?: any};
  CommunityDetail: {communicationsId: number};
  MyScreen: undefined;
  MyFollowScreen: {activeTab: string};
  ExhibitionDetail: undefined;
  ExhibitionsAll: {title: string};
  ReviewsAll: undefined;
  MyEdit: undefined;
};
