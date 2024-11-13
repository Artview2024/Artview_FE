export type Record = {
  exhibitionId: number | null;
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
    exhibitionId?: string | number | null;
    mainImage?: string | null;
    myReviewsId?: string;
  };
  RecordingStart: undefined;
  Posting: {
    recordId: number;
  };
  PostingStart: undefined;
  RecordDetail: {record: Record; exhibitionId: number | null};
  Community: {newPost?: any};
  CommunityDetail: {communicationsId: number};
  OtherUser: {writerId?: number};
  MyScreen: undefined;
  MyFollowScreen: {activeTab: string; userId?: number; isOtherUser?: boolean};
  MyEdit: {
    userInfo?: {
      userName: string;
      userImageUrl: string;
    };
    userInterest: string[];
  };
  InterestSelection: {userInterest: any};
  ExhibitionDetail: {exhibitionId: number; isOnlineExhibition: boolean};
  ExhibitionsAll: {title: string};
  ReviewsAll: {exhibitionId: number};
  Search: undefined;
};
