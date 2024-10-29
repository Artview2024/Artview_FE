import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import customAxios from '../../services/customAxios';

interface LikeButtonProps {
  communicationsId: number;
  isHeartClicked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  communicationsId,
  isHeartClicked,
}) => {
  const [liked, setLiked] = useState(isHeartClicked);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleLike = async () => {
    if (isProcessing) return; // 중복 요청 방지
    setIsProcessing(true);

    try {
      if (!liked) {
        // 좋아요 등록 (POST 요청)
        const requestBody = {
          communicationsId,
          isUserClickLick: true, // 좋아요 등록
        };

        console.log('POST 요청 바디:', requestBody);

        await customAxios.post('/communications/like', requestBody);

        setLiked(true); // 로컬 상태 업데이트
      } else {
        // 좋아요 취소 (DELETE 요청, 바디 포함)
        const requestBody = {
          communicationsId,
          isUserClickLick: false, // 좋아요 취소
        };

        console.log('DELETE 요청 바디:', requestBody);

        await customAxios.delete('/communications/like', {data: requestBody});

        setLiked(false); // 로컬 상태 업데이트
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Error Message:', error.response.data.message);
        console.error('Error Details:', error.response.data);
      } else {
        console.error('좋아요 처리에 실패했습니다.', error.message);
      }
    } finally {
      setIsProcessing(false); // 요청 완료 후 처리 중 상태 해제
    }
  };

  return (
    <TouchableOpacity onPress={toggleLike} disabled={isProcessing}>
      <AntDesign
        name={liked ? 'heart' : 'hearto'}
        size={24}
        color={liked ? '#EA1B83' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default LikeButton;
