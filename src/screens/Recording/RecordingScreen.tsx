import React, {useRef, useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
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
import axios from 'axios';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useCameraPermission} from '../../hooks/useCameraPermissions';
import {useFormState} from '../../hooks/useFormState';
import {StyleSheet} from 'react-native';
import RecordingTemplate from '../../components/RecordingTemplate';
import {Image} from 'react-native';

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
    isEditMode = false,
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

  // artIndex가 변경될 때마다 현재 아트 정보를 설정
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

  // '다음' 버튼 클릭 시 현재 데이터를 저장하고 다음 인덱스로 이동
  const handleNext = () => {
    const newArt: ArtItem = {
      id: Math.random().toString(), // 임의의 ID
      image: imageUri || '',
      title: title || '',
      artist: artist || '',
      memo: memo || '',
    };

    const updatedArtList = [...artList];
    if (artIndex < updatedArtList.length) {
      updatedArtList[artIndex] = newArt; // 기존 항목 업데이트
    } else {
      updatedArtList.push(newArt);
    }

    setArtList(updatedArtList);
    setArtIndex(artIndex + 1);
    resetForm();
    setImageUri('');
    setToggleCheckBox(false); // 체크박스 초기화
    scrollViewRef.current?.scrollTo({y: 0, animated: false});
  };

  // '이전' 버튼 클릭 시 이전 데이터로 이동
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

  // 기록 종료 시 최종 데이터를 설정하고 모달
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

    let mainImageUri = '';
    if (updatedArtList.length > 0) {
      if (mainImageIndex !== null && mainImageIndex < updatedArtList.length) {
        mainImageUri = updatedArtList[mainImageIndex].image || '';
      } else {
        const resolvedAsset = Image.resolveAssetSource(
          require('../../assets/images/android.png'),
        );
        mainImageUri = resolvedAsset.uri; // 로컬 이미지의 URI를 가져옵니다.
      }
    }

    setFinalData({
      id: 10001, // 임시 ID
      name: exhibitionName,
      date: exhibitionDate,
      gallery: gallery,
      mainImage: mainImageUri,
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

      // FormData 객체 생성
      const formData = new FormData();

      
      /* 
      // requestDto JSON 데이터를 문자열로 변환하여 FormData에 추가
      const requestDtoBlob = new Blob(
        [
          JSON.stringify({
            id: updatedFinalData.id || 10001,
            name: updatedFinalData.name || '',
            date: updatedFinalData.date || '',
            gallery: updatedFinalData.gallery || '',
            rating: updatedFinalData.rating || '',
            artList: updatedFinalData.artList.map((art: any) => ({
              title: art.title || '',
              artist: art.artist || '',
              content: art.memo || '',
            })),
          }),
        ],
        {type: 'application/json', lastModified: Date.now()}, // lastModified 추가
      );

      formData.append('requestDto', requestDtoBlob); */

      // requestDto의 각 필드를 분해하여 FormData에 추가하는 방법
      formData.append('id', updatedFinalData.id || '10001');
      formData.append('name', updatedFinalData.name || '');
      formData.append('date', updatedFinalData.date || '');
      formData.append('gallery', updatedFinalData.gallery || '');
      formData.append('rating', updatedFinalData.rating || '');

      // artList의 각 항목을 개별적으로 FormData에 추가
      // updatedFinalData.artList.forEach((art: any, index: number) => {
      //   formData.append(`artList[${index}].title`, art.title || '');
      //   formData.append(`artList[${index}].artist`, art.artist || '');
      //   formData.append(`artList[${index}].content`, art.memo || '');
      // });

      // 메인 이미지가 있으면 FormData에 추가
      if (updatedFinalData.mainImage) {
        let mainImageFile;

        if (typeof updatedFinalData.mainImage === 'string') {
          // 로컬 이미지가 아닌 경우 처리
          mainImageFile = {
            uri: updatedFinalData.mainImage.startsWith('file://')
              ? updatedFinalData.mainImage
              : 'file://' + updatedFinalData.mainImage,
            type: 'image/jpeg',
            name: 'mainImage.jpeg',
          };
        } else {
          // 로컬 이미지인 경우
          mainImageFile = {
            uri: updatedFinalData.mainImage, // require로 불러온 이미지의 URI
            type: 'image/jpg',
            name: 'mainImage.jpg',
          };
        }

        formData.append('mainImage', mainImageFile);
      }

      //각 작품 이미지(contentImages)를 FormData에 추가
      updatedFinalData.artList.forEach((art: any, index: number) => {
        if (art.image) {
          const contentImageFile = {
            uri: art.image.startsWith('file://')
              ? art.image
              : 'file://' + art.image,
            type: 'image/jpeg',
            name: `art_${index}.jpeg`,
          };
          formData.append('contentImages', contentImageFile);
        }
      });

      try {
        const response = await axios({
          method: isEditMode ? 'PATCH' : 'POST',
          url: isEditMode
            ? 'http://13.125.81.126/api/myReviews/modify'
            : 'http://13.125.81.126/api/myReviews/test',
          data: formData,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS_TOKEN`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response:', response.data);
        setModalVisible(false);
        navigation.navigate('Records');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
          if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error during setup:', error.message);
          }
        } else {
          console.error('Unknown error:', (error as Error).message);
        }
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
