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
    exhibitionId,
    myReviewsId = '',
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
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const [finalData, setFinalData] = useState<any>(null);

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
        action();
      });
      setPhotoWarningVisible(true);
    } else {
      action();
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
        setArtIndex(artIndex - 1);
        scrollViewRef.current?.scrollTo({y: 0, animated: false});
      });
    }
  };

  const handleEndTour = () => {
    const updatedArtList = updateArtImage(artIndex, imageUri, artList);
    setArtList(updatedArtList);

    if (updatedArtList.length === 0) {
      setPhotoWarningVisible(true);
      return;
    }

    const artWithoutImage = updatedArtList.some(art => !art.image);
    if (artWithoutImage) {
      setPhotoWarningVisible(true);
      return;
    }

    // mainImage 설정: 사용자가 설정하지 않았을 경우 첫 번째 artList 이미지 사용
    let mainImageUri = mainImage;
    if (!mainImage && updatedArtList.length > 0) {
      mainImageUri = updatedArtList[0].image;
    }

    const myReviewsId = route.params.myReviewsId || '';

    setFinalData({
      myReviewsId,
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      rating: '',
      mainImage: mainImageUri || '',
      artList: updatedArtList,
      exhibitionId: String(exhibitionId),
    });
    setModalVisible(true);
  };

  const handleRatingSubmit = async (rating: number) => {
    if (artList.length === 0) {
      setPhotoWarningVisible(true);
      return;
    }
    if (finalData) {
      try {
        const updatedFinalData = {...finalData, rating: rating.toString()};
        console.log(updatedFinalData);

        if (isEditMode) {
          await handlePatchSubmit(updatedFinalData, rating);
        } else {
          await handlePostSubmit(updatedFinalData, rating);
        }

        setModalVisible(false);

        if (isEditMode) {
          navigation.navigate('Records');
        } else {
          navigation.navigate('Home');
        }
      } catch (error: any) {
        console.error('Error:', error.response?.data || error);
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
              color="black"
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
              color="black"
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
        setImageUri={setImageUri}
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
