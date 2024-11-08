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
      id: string;
      image: string | null;
      title: string | null;
      artist: string | null;
      memo: string | null;
      isMainImage?: boolean;
    }>;
    artIndex?: number;
    isEditMode: boolean;
    exhibitionId?: number | null;
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
  OtherUser: {writerId?: number};
  MyScreen: undefined;
  MyFollowScreen: {activeTab: string; userId?: number; isOtherUser?: boolean};
  MyEdit: {userInterest?: any};
  InterestSelection: undefined;
  ExhibitionDetail: undefined;
  ExhibitionsAll: {title: string};
  ReviewsAll: undefined;
  Search: undefined;
};
