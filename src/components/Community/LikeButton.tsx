import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {API_BASE_URL} from '@env';

interface LikeButtonProps {
  communicationsId: number;
  isHeartClicked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  communicationsId,
  isHeartClicked,
}) => {
  const toggleLike = async () => {
    try {
      if (!isHeartClicked) {
        const requestBody = {
          communicationsId,
          isUserClickLike: true,
        };

        console.log('POST 요청 바디:', requestBody);

        // 좋아요 등록 (POST 요청)
        await axios.post(`${API_BASE_URL}/communications/like`, requestBody, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS_TOKEN`, // 실제 토큰 값으로 교체
          },
        });
      } else {
        const requestBody = {
          communicationsId,
          isUserClickLike: false,
        };

        console.log('DELETE 요청 바디:', requestBody);

        // 좋아요 취소 (DELETE 요청, 바디 포함)
        await axios.delete(`${API_BASE_URL}/communications/like`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ACCESS_TOKEN`, // 실제 토큰 값으로 교체
          },
          data: requestBody,
        });
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Error Message:', error.response.data.message);
        console.error('Error Details:', error.response.data);
      } else {
        console.error('좋아요 처리에 실패했습니다.', error.message);
      }

      // 요청 바디 확인
      console.error('보낸 요청 바디:', {
        communicationsId,
        isUserClickLike: !isHeartClicked,
      });
    }
  };

  return (
    <TouchableOpacity onPress={toggleLike}>
      <AntDesign
        name={isHeartClicked ? 'heart' : 'hearto'}
        size={24}
        color={isHeartClicked ? '#EA1B83' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default LikeButton;
