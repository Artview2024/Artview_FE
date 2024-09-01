import {useState, useEffect} from 'react';

export const useFormState = (initialArtList: any[]) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [memo, setMemo] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [artIndex, setArtIndex] = useState(0);
  const [artList, setArtList] = useState(
    initialArtList.map((item, index) => ({
      id: index.toString(),
      image: item.image || '',
      title: item.title || '',
      artist: item.artist || '',
      memo: item.memo || '',
    })),
  );

  // 입력값 변경 시 artList 자동 업데이트
  useEffect(() => {
    const newArt = {
      id: artIndex.toString(),
      image: '', // imageUri 받아오기
      title: title || '',
      artist: artist || '',
      memo: memo || '',
    };

    if (newArt.image || newArt.title || newArt.artist || newArt.memo) {
      const updatedArtList = [...artList];
      updatedArtList[artIndex] = newArt;
      setArtList(updatedArtList);
    }
  }, [title, artist, memo, artIndex]);

  const resetForm = () => {
    setTitle('');
    setArtist('');
    setMemo('');
  };

  return {
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
  };
};
