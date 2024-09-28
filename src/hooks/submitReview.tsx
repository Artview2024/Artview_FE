import {Image} from 'react-native';
import axios from 'axios';
import mime from 'react-native-mime-types';
import {API_BASE_URL} from '@env';

type ArtItem = {
  id: string;
  image: string;
  title: string;
  artist: string;
  memo: string;
  addImage?: string;
};

type FinalData = {
  id: string;
  myReviewsId?: string;
  name: string;
  date: string;
  gallery: string;
  rating: string;
  mainImage: string;
  artList: ArtItem[];
};

// PATCH 요청
export const handlePatchSubmit = async (
  finalData: FinalData,
  rating: number,
  ACCESS_TOKEN: string,
) => {
  const updatedFinalData = {
    ...finalData,
    rating: rating.toString(),
  };

  const formData = new FormData();
  formData.append('id', updatedFinalData.id);

  formData.append('myReviewsId', updatedFinalData.myReviewsId || '');

  formData.append('name', updatedFinalData.name || '');

  formData.append('date', updatedFinalData.date || '');

  formData.append('gallery', updatedFinalData.gallery || '');

  formData.append('rating', updatedFinalData.rating || '');

  updatedFinalData.artList.forEach((art: ArtItem, index: number) => {
    formData.append(`artList[${index}].title`, art.title || '');

    formData.append(`artList[${index}].artist`, art.artist || '');

    formData.append(`artList[${index}].contents`, art.memo || '');

    // art.image가 파일 형식인지 확인하여 addImage로 전송, 문자열이면 image로 전송
    if (art.image && art.image.startsWith('file://')) {
      // 파일 형식인 경우 addImage로 전송
      const addImageFile = {
        uri: art.image.startsWith('file://')
          ? art.image
          : `file://${art.image}`,
        type: mime.lookup(art.image) || 'image/jpeg',
        name: `art_${index}_add.${mime.extension(
          mime.lookup(art.image) || 'jpeg',
        )}`,
      };
      formData.append(`artList[${index}].addImage`, addImageFile);
      console.log(`artList[${index}].addImage:`, addImageFile);
    } else if (art.image) {
      // 문자열 형식인 경우 image로 전송
      formData.append(`artList[${index}].image`, art.image);
      console.log(`artList[${index}].image:`, art.image);
    }
  });

  if (updatedFinalData.mainImage) {
    if (updatedFinalData.mainImage.startsWith('http')) {
      formData.append('mainImage', updatedFinalData.mainImage);
      console.log('mainImage:', updatedFinalData.mainImage);
    } else {
      const mainImageFile = {
        uri: updatedFinalData.mainImage.startsWith('file://')
          ? updatedFinalData.mainImage
          : `file://${updatedFinalData.mainImage}`,
        type: mime.lookup(updatedFinalData.mainImage) || 'image/jpeg',
        name: 'mainImage.jpeg',
      };
      formData.append('mainImage', mainImageFile);
      console.log('mainImageFile:', mainImageFile);
    }
  } else {
    const resolvedAsset = Image.resolveAssetSource(
      require('../assets/images/thumbnail_basic.png'),
    );

    const defaultImageFile = {
      uri: resolvedAsset.uri,
      type: mime.lookup('png') || 'image/png',
      name: 'mainImage.png',
    };
    formData.append('mainImage', defaultImageFile);
    console.log('default mainImage:', defaultImageFile);
  }

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/myReviews/modify`,
      formData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

// POST 요청
export const handlePostSubmit = async (
  finalData: FinalData,
  rating: number,
  ACCESS_TOKEN: string,
) => {
  const updatedFinalData = {
    ...finalData,
    rating: rating.toString(),
  };

  const formData = new FormData();
  formData.append('id', updatedFinalData.id || '10001');
  formData.append('name', updatedFinalData.name || '');
  formData.append('date', updatedFinalData.date || '');
  formData.append('gallery', updatedFinalData.gallery || '');
  formData.append('rating', updatedFinalData.rating || '');

  updatedFinalData.artList.forEach((art: ArtItem, index: number) => {
    formData.append(`artList[${index}].title`, art.title || '');
    formData.append(`artList[${index}].artist`, art.artist || '');
    formData.append(`artList[${index}].content`, art.memo || '');

    if (art.image) {
      const imageFile = {
        uri: art.image.startsWith('file://')
          ? art.image
          : `file://${art.image}`,
        type: mime.lookup(art.image) || 'image/jpeg',
        name: `artList_${index}_image.${mime.extension(
          mime.lookup(art.image) || 'jpeg',
        )}`,
      };
      formData.append(`artList[${index}].image`, imageFile);
    }
  });

  if (updatedFinalData.mainImage) {
    const mainImageFile = {
      uri: updatedFinalData.mainImage.startsWith('file://')
        ? updatedFinalData.mainImage
        : `file://${updatedFinalData.mainImage}`,
      type: mime.lookup(updatedFinalData.mainImage) || 'image/jpeg',
      name: 'mainImage.jpeg',
    };
    formData.append('mainImage', mainImageFile);
  } else {
    const resolvedAsset = Image.resolveAssetSource(
      require('../assets/images/thumbnail_basic.png'),
    );
    const defaultImageFile = {
      uri: resolvedAsset.uri,
      type: mime.lookup('png') || 'image/png',
      name: 'mainImage.png',
    };
    formData.append('mainImage', defaultImageFile);
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/myReviews/save`,
      formData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};
