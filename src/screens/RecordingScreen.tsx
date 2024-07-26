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

  const {
    imageUri,
    imageBase64,
    handleTakePhoto,
    handleSelectImage,
    setImageUri,
    setImageBase64,
  } = useImagePicker();

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

  useEffect(() => {
    if (isEditMode && artIndex < artList.length) {
      const currentArt = artList[artIndex];
      setTitle(currentArt.title);
      setArtist(currentArt.artist);
      setMemo(currentArt.memo);
      setImageUri(currentArt.image);
    } else {
      resetForm();
      setImageUri('');
      setImageBase64('');
    }
  }, [artIndex, isEditMode]);

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

  const handleNext = () => {
    const newArt: ArtItem = {
      id: Math.random().toString(),
      image: imageBase64
        ? `data:image/jpeg;base64,${imageBase64}`
        : imageUri || '',
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

    navigation.navigate('Recording', {
      exhibitionName,
      exhibitionDate,
      gallery,
      artList: updatedArtList,
      artIndex: artIndex + 1,
      isEditMode,
    });

    resetForm();
    setImageUri('');
    setImageBase64('');
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
      image: imageBase64
        ? `data:image/jpeg;base64,${imageBase64}`
        : imageUri || '',
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

    const finalData = {
      id: Math.random().toString(),
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      mainImage: updatedArtList.length > 0 ? updatedArtList[0].image : null,
      rating: '',
      artList: updatedArtList,
    };
    setFinalData(finalData);
    setModalVisible(true);
  };

  const handleRatingSubmit = async (rating: number) => {
    if (finalData) {
      const updatedFinalData = {
        ...finalData,
        rating: rating.toString(),
      };

      try {
        let response;
        if (isEditMode) {
          response = await axios.patch(
            `https://13.125.81.126/api/reviews/modify`,
            updatedFinalData,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ACCESS_TOKEN`,
              },
            },
          );
        } else {
          response = await axios.post(
            'https://13.125.81.126/api/reviews/save',
            updatedFinalData,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ACCESS_TOKEN`,
              },
            },
          );
        }
        console.log('Server Response:', response.data);

        setModalVisible(false);
        navigation.navigate('Records', {newRecord: updatedFinalData});
      } catch (error) {
        console.error('Error while saving review:', error);
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
