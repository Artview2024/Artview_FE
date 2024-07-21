import {useState} from 'react';

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

  const resetForm = () => {
    setTitle('');
    setArtist('');
    setMemo('');
    setArtIndex(artIndex + 1);
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
