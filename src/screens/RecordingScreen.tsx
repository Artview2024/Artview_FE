import React, {useRef, useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MenuIcon from 'react-native-vector-icons/Feather';
import GlobalStyle from '../styles/GlobalStyle';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {StackParamList} from '../navigator/StackParamList';
import RatingModal from '../components/RatingModal';
import DrawableSheet from '../components/DrawableSheet';
import axios from 'axios';
import {useImagePicker} from '../hooks/useImagePicker';
import {useCameraPermission} from '../hooks/useCameraPermissions';
import {useFormState} from '../hooks/useFormState';
import {StyleSheet} from 'react-native';
import RecordingTemplate from '../components/RecordingTemplate';

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
    isEditMode = false,
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
  const [finalData, setFinalData] = useState<any>(null);

  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (artIndex < artList.length) {
      const currentArt = artList[artIndex];
      if (currentArt) {
        setTitle(currentArt.title || '');
        setArtist(currentArt.artist || '');
        setMemo(currentArt.memo || '');
        setImageUri(currentArt.image || '');
      } else {
        resetForm();
        setImageUri('');
      }
    }
  }, [artIndex, artList, resetForm]);

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

  const handleNext = () => {
    const newArt: ArtItem = {
      id: Math.random().toString(),
      image: imageUri || '',
      title: title || '',
      artist: artist || '',
      memo: memo || '',
    };

    const updatedArtList = [...artList];
    if (artIndex < updatedArtList.length) {
      updatedArtList[artIndex] = newArt;
    } else {
      updatedArtList.push(newArt);
    }

    setArtList(updatedArtList);
    setArtIndex(artIndex + 1);
    resetForm();
    setImageUri('');
    setToggleCheckBox(false);
    scrollViewRef.current?.scrollTo({y: 0, animated: false});
  };

  const handlePrevious = () => {
    if (artIndex > 0) {
      const prevArt = artList[artIndex - 1];
      if (prevArt) {
        setTitle(prevArt.title);
        setArtist(prevArt.artist);
        setMemo(prevArt.memo);
        setImageUri(prevArt.image);
      }
      setArtIndex(artIndex - 1);
      scrollViewRef.current?.scrollTo({y: 0, animated: false});
    }
  };

  const handleEndTour = () => {
    const newArt: ArtItem = {
      id: Math.random().toString(),
      image: imageUri || '',
      title,
      artist,
      memo,
    };
    const updatedArtList = [...artList];
    if (artIndex < updatedArtList.length) {
      updatedArtList[artIndex] = newArt;
    } else {
      updatedArtList.push(newArt);
    }

    setFinalData({
      id: Math.random().toString(),
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      mainImage:
        mainImageIndex !== null && mainImageIndex < updatedArtList.length
          ? updatedArtList[mainImageIndex].image
          : updatedArtList.length > 0
          ? updatedArtList[0].image
          : null,
      rating: '',
      artList: updatedArtList,
    });
    setModalVisible(true);
  };

  const handleRatingSubmit = async (rating: number) => {
    if (finalData) {
      const updatedFinalData = {
        ...finalData,
        rating: rating.toString(),
      };

      const formData = new FormData();
      formData.append('file', {
        uri: updatedFinalData.mainImage,
        type: 'image/jpeg',
        name: 'mainImage.jpg',
      });
      formData.append('name', updatedFinalData.name);
      formData.append('date', updatedFinalData.date);
      formData.append('gallery', updatedFinalData.gallery);
      formData.append('rating', updatedFinalData.rating);

      updatedFinalData.artList.forEach(
        (art: {image: any; title: any; artist: any; memo: any}, index: any) => {
          formData.append(`artList[${index}][image]`, {
            uri: art.image,
            type: 'image/jpeg',
            name: `art_${index}.jpg`,
          });
          formData.append(`artList[${index}][title]`, art.title);
          formData.append(`artList[${index}][artist]`, art.artist);
          formData.append(`artList[${index}][memo]`, art.memo);
        },
      );

      console.log('Final Data : ', updatedFinalData);

      try {
        const url = isEditMode
          ? 'http://13.125.81.126/api/myReviews/modify'
          : 'http://13.125.81.126/api/myReviews/save';

        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ACCESS_TOKEN`,
          },
        });

        setModalVisible(false);
        navigation.navigate('Records');
      } catch (error) {
        console.error('Error:', error);
        console.error('Error response:', (error as any).response?.data);
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
          <TouchableOpacity
            onPress={() => {
              if (drawableSheetRef.current) {
                drawableSheetRef.current.handleOpenBottomSheet();
              }
            }}>
            <MenuIcon
              name="menu"
              size={24}
              color={'black'}
              style={{paddingRight: 3, paddingTop: 18}}
            />
          </TouchableOpacity>
        </View>

        <Text style={{paddingTop: 7, paddingBottom: 13}}>
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
