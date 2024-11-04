import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
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
import PhotoWarningModal from '../../components/Recording/PhotoWarningModal';
import DrawableSheet from '../../components/DrawableSheet';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useCameraPermission} from '../../hooks/useCameraPermissions';
import {updateArtImage} from '../../hooks/updateArtImages';
import {useFormState} from '../../hooks/useFormState';
import RecordingTemplate from '../../components/RecordingTemplate';
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

  const {
    exhibitionName,
    exhibitionDate,
    gallery,
    artList: initialArtList,
    mainImage,
    isEditMode = false,
    myReviewsId,
  } = route.params;

  const {imageUri, handleTakePhoto, handleSelectImage, setImageUri} =
    useImagePicker();

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

  const {requestCameraPermission} = useCameraPermission(handleTakePhoto);

  const scrollViewRef = useRef<ScrollView>(null);
  const drawableSheetRef = useRef<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [photoWarningVisible, setPhotoWarningVisible] = useState(false);
  const [onCloseAction, setOnCloseAction] = useState<(() => void) | undefined>(
    undefined,
  );
  const [finalData, setFinalData] = useState<any>(null);
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
    if (isEditMode && mainImage && initialArtList.length > 0) {
      const mainImageIndex = initialArtList.findIndex(
        art => art.image === mainImage,
      );
      if (mainImageIndex !== -1) {
        setMainImageIndex(mainImageIndex);
      }
    }
  }, [isEditMode, mainImage, initialArtList]);

  const handleOpenDrawableSheet = () => {
    if (drawableSheetRef.current) {
      const updatedArtList = updateArtImage(artIndex, imageUri, artList);
      setArtList(updatedArtList);
      drawableSheetRef.current.handleOpenBottomSheet();
    }
  };

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

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const checkPhotoBeforeAction = (action: () => void) => {
    if (!imageUri) {
      setOnCloseAction(() => {
        action(); // 모달이 닫힌 후 실행할 액션 설정
      });
      setPhotoWarningVisible(true); // 모달 열기
    } else {
      action(); // 이미지가 있는 경우 바로 실행
    }
  };

  const handleNext = () => {
    checkPhotoBeforeAction(() => {
      const updatedArtList = updateArtImage(artIndex, imageUri, artList);
      setArtList(updatedArtList);
      setArtIndex(artIndex + 1);
      resetForm();
      setToggleCheckBox(false);
      scrollViewRef.current?.scrollTo({y: 0, animated: false});
    });
  };

  const handlePrevious = () => {
    if (artIndex > 0) {
      checkPhotoBeforeAction(() => {
        const updatedArtList = updateArtImage(artIndex, imageUri, artList);
        setArtList(updatedArtList);
        setArtIndex(artIndex - 1); // 이전 인덱스로 이동
        scrollViewRef.current?.scrollTo({y: 0, animated: false});
      });
    }
  };

  // 기록 종료에서 사용하는 handleEndTour는 그대로 유지
  const handleEndTour = () => {
    const updatedArtList = updateArtImage(artIndex, imageUri, artList);
    setArtList(updatedArtList);

    const artWithoutImage = updatedArtList.some(art => !art.image);
    if (artWithoutImage) {
      setPhotoWarningVisible(true);
      return;
    }

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
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      rating: '',
      artList: updatedArtList,
      mainImage: mainImageUri,
    });
    setModalVisible(true);
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
          await handlePatchSubmit(dataToSend, rating);
        } else {
          await handlePostSubmit(dataToSend, rating);
        }
        setModalVisible(false);
        if (isEditMode) {
          navigation.navigate('Records');
        } else {
          navigation.navigate('Home');
        }
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
      <PhotoWarningModal
        visible={photoWarningVisible}
        onClose={() => setPhotoWarningVisible(false)}
        onCloseAction={onCloseAction}
        setOnCloseAction={setOnCloseAction}
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
