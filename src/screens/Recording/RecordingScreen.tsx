import React, {useRef, useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MenuIcon from 'react-native-vector-icons/Feather';
import GlobalStyle from '../../styles/GlobalStyle';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import RatingModal from '../../components/RatingModal';
import DrawableSheet from '../../components/DrawableSheet';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useCameraPermission} from '../../hooks/useCameraPermissions';
import {updateArtImage} from '../../hooks/updateArtImages';
import {useFormState} from '../../hooks/useFormState';
import {StyleSheet} from 'react-native';
import RecordingTemplate from '../../components/RecordingTemplate';
import {Image} from 'react-native';
import {handlePatchSubmit, handlePostSubmit} from '../../hooks/submitReview';

type ArtItem = {
  id: string;
  image: string;
  title: string;
  artist: string;
  memo: string;
};

type RecordingScreenRouteProp = RouteProp<StackParamList, 'Recording'>;

export default function RecordingScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RecordingScreenRouteProp>();

  // 라우트에서 필요한 파라미터 추출
  const {
    exhibitionName,
    exhibitionDate,
    gallery,
    artList: initialArtList,
    mainImage,
    isEditMode = false,
    myReviewsId,
  } = route.params;

  // 이미지 선택 및 카메라 촬영을 처리하는 커스텀 훅 사용
  const {imageUri, handleTakePhoto, handleSelectImage, setImageUri} =
    useImagePicker();

  // 제목, 아티스트, 메모 등의 폼 상태를 관리하는 커스텀 훅 사용
  const {
    title,
    setTitle,
    artist,
    setArtist,
    memo,
    setMemo,
    toggleCheckBox,
    setToggleCheckBox,
    artIndex,
    setArtIndex,
    artList,
    setArtList,
    resetForm,
  } = useFormState(initialArtList);

  // 카메라 권한을 요청하는 커스텀 훅 사용
  const {requestCameraPermission} = useCameraPermission(handleTakePhoto);

  // ScrollView 및 DrawableSheet에 대한 참조 생성
  const scrollViewRef = useRef<ScrollView>(null);
  const drawableSheetRef = useRef<any>(null);

  // 모달 및 데이터 관련 상태 관리
  const [modalVisible, setModalVisible] = useState(false);
  const [finalData, setFinalData] = useState<any>(null);

  // 메인 이미지 인덱스를 관리하는 상태
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (artIndex < artList.length) {
      const currentArt = artList[artIndex];
      setTitle(currentArt.title || '');
      setArtist(currentArt.artist || '');
      setMemo(currentArt.memo || '');
      setImageUri(currentArt.image || '');
    } else {
      resetForm();
      setImageUri('');
    }
  }, [artIndex]);

  useEffect(() => {
    // 수정 모드일 때만 실행되는 useEffect
    if (isEditMode && mainImage && initialArtList.length > 0) {
      const mainImageIndex = initialArtList.findIndex(
        art => art.image === mainImage,
      );
      if (mainImageIndex !== -1) {
        setMainImageIndex(mainImageIndex); // 수정 모드일 때 기존의 대표사진을 설정
      }
    }
  }, [isEditMode, mainImage, initialArtList]);

  const handleOpenDrawableSheet = () => {
    if (drawableSheetRef.current) {
      // 현재 작성 중인 아트 항목을 저장
      const updatedArtList = updateArtImage(artIndex, imageUri, artList);
      setArtList(updatedArtList);

      // DrawableSheet 열기
      drawableSheetRef.current.handleOpenBottomSheet();
    }
  };

  // 체크박스 상태 변경 시 이전 아트의 데이터를 불러오는 기능
  const handleCheckBoxChange = (newValue: boolean) => {
    setToggleCheckBox(newValue);
    if (newValue && artIndex > 0) {
      const prevArt = artList[artIndex - 1];
      if (prevArt) {
        setTitle(prevArt.title);
        setArtist(prevArt.artist);
        setMemo(prevArt.memo);
        setImageUri(prevArt.image);
      }
    }
  };

  // 메인 이미지를 설정하는 기능
  const handleSetMainImage = (index: number) => {
    setMainImageIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleNext = () => {
    if (title || artist || memo || imageUri) {
      // 아트 항목 업데이트
      const updatedArtList = updateArtImage(artIndex, imageUri, artList);
      setArtList(updatedArtList);

      // 다음 아트 항목으로 이동
      setArtIndex(artIndex + 1);
      resetForm();
      setToggleCheckBox(false);
      scrollViewRef.current?.scrollTo({y: 0, animated: false});
    }
  };

  const handlePrevious = () => {
    if (artIndex > 0) {
      setArtIndex(artIndex - 1);
      scrollViewRef.current?.scrollTo({y: 0, animated: false});
    }
  };

  // 기록 종료 시 최종 데이터를 설정하고 모달
  const handleEndTour = () => {
    if (title || artist || memo || imageUri) {
      const updatedArtList = updateArtImage(artIndex, imageUri, artList);
      setArtList(updatedArtList);

      let mainImageUri = '';
      if (updatedArtList.length > 0) {
        if (mainImageIndex !== null && mainImageIndex < updatedArtList.length) {
          mainImageUri = updatedArtList[mainImageIndex].image || '';
        } else {
          const resolvedAsset = Image.resolveAssetSource(
            require('../../assets/images/thumbnail_basic.png'),
          );
          mainImageUri = resolvedAsset.uri;
        }
      }

      setFinalData({
        id: 10001, // 임시 ID
        name: exhibitionName,
        date: exhibitionDate,
        gallery: gallery,
        rating: '',
        artList: updatedArtList,
        mainImage: mainImageUri,
      });
      setModalVisible(true);
    }
  };

  const handleRatingSubmit = async (rating: number) => {
    if (finalData) {
      try {
        const dataToSend = {
          ...finalData,
          myReviewsId,
          mainImage: finalData.artList[mainImageIndex || 0]?.image,
        };

        if (isEditMode) {
          await handlePatchSubmit(dataToSend, rating, 'ACCESS_TOKEN');
        } else {
          await handlePostSubmit(dataToSend, rating, 'ACCESS_TOKEN');
        }
        setModalVisible(false);
        navigation.navigate('Records');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={[GlobalStyle.container]}>
      <ScrollView ref={scrollViewRef}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              name="chevron-back"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[GlobalStyle.sectionTitle, {paddingBottom: 0}]}>
            {exhibitionName}
          </Text>
          <TouchableOpacity onPress={handleOpenDrawableSheet}>
            <MenuIcon
              name="menu"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18}}
            />
          </TouchableOpacity>
        </View>

        <Text style={{paddingTop: 7, paddingBottom: 13, color: 'black'}}>
          {exhibitionDate} | {gallery}
        </Text>
        <RecordingTemplate
          imageUri={imageUri}
          title={title}
          artist={artist}
          memo={memo}
          toggleCheckBox={toggleCheckBox}
          requestCameraPermission={requestCameraPermission}
          handleCheckBoxChange={handleCheckBoxChange}
          setTitle={setTitle}
          setArtist={setArtist}
          setMemo={setMemo}
          isMainImage={mainImageIndex === artIndex}
          onSetMainImage={() => handleSetMainImage(artIndex)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.leftButton]}
            onPress={handlePrevious}>
            <Text style={(GlobalStyle.buttonText, {color: 'black'})}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[GlobalStyle.activeButton, styles.rightButton]}
            onPress={handleNext}>
            <Text style={GlobalStyle.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[GlobalStyle.activeButton, styles.endTourButton]}
          onPress={handleEndTour}>
          <Text style={GlobalStyle.buttonText}>기록 종료</Text>
        </TouchableOpacity>
      </ScrollView>
      <RatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleRatingSubmit}
      />
      <DrawableSheet
        ref={drawableSheetRef}
        artList={artList}
        setArtList={setArtList}
        currentArtIndex={artIndex}
        setArtIndex={setArtIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 19,
    marginBottom: 16,
  },
  leftButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  rightButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  endTourButton: {
    paddingHorizontal: 130,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
});
