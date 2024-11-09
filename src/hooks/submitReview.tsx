import {Image} from 'react-native';
import customAxios from '../services/customAxios';
import mime from 'react-native-mime-types';

type ArtItem = {
  image: string;
  title: string;
  artist: string;
  memo: string;
  addImage?: string;
};

type FinalData = {
  exhibitionId: number;
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
) => {
  const updatedFinalData = {...finalData, rating: rating.toString()};

  const formData = new FormData();
  formData.append(
    'exhibitionId',
    String(updatedFinalData.exhibitionId), // exhibitionId를 String으로 변환하여 추가
  );
  formData.append('name', updatedFinalData.name || '');
  formData.append('date', updatedFinalData.date || '');
  formData.append('gallery', updatedFinalData.gallery || '');
  formData.append('rating', updatedFinalData.rating || '');

  updatedFinalData.artList.forEach((art: ArtItem, index: number) => {
    formData.append(`artList[${index}].title`, art.title || '');
    formData.append(`artList[${index}].artist`, art.artist || '');
    formData.append(`artList[${index}].contents`, art.memo || '');

    if (art.image && art.image.startsWith('file://')) {
      const addImageFile = {
        uri: art.image,
        type: mime.lookup(art.image) || 'image/jpeg',
        name: `art_${index}_add.${mime.extension(
          mime.lookup(art.image) || 'jpeg',
        )}`,
      };
      formData.append(`artList[${index}].image`, addImageFile);
    } else if (art.image) {
      formData.append(`artList[${index}].image`, art.image);
    }
  });

  if (updatedFinalData.mainImage) {
    if (updatedFinalData.mainImage.startsWith('http')) {
      formData.append('mainImage', updatedFinalData.mainImage);
    } else {
      const mainImageFile = {
        uri: updatedFinalData.mainImage.startsWith('file://')
          ? updatedFinalData.mainImage
          : `file://${updatedFinalData.mainImage}`,
        type: mime.lookup(updatedFinalData.mainImage) || 'image/jpeg',
        name: 'mainImage.jpeg',
      };
      formData.append('mainImage', mainImageFile);
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
  }

  try {
    const response = await customAxios.patch('/myReviews/modify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response?.data || error);
    throw error;
  }
};

// POST 요청
export const handlePostSubmit = async (
  finalData: FinalData,
  rating: number,
) => {
  const updatedFinalData = {...finalData, rating: rating.toString()};

  const formData = new FormData();
  formData.append('exhibitionId', String(updatedFinalData.exhibitionId));
  formData.append('name', updatedFinalData.name || '');
  formData.append('date', updatedFinalData.date || '');
  formData.append('gallery', updatedFinalData.gallery || '');
  formData.append('rating', updatedFinalData.rating || '');

  updatedFinalData.artList.forEach((art: ArtItem, index: number) => {
    formData.append(`artList[${index}].title`, art.title || '');
    formData.append(`artList[${index}].artist`, art.artist || '');
    formData.append(`artList[${index}].contents`, art.memo || '');

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
    const response = await customAxios.post('/myReviews/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response?.data || error);
    throw error;
  }
};
