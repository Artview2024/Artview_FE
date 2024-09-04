type ArtItem = {
  id: string;
  image: string;
  title: string;
  artist: string;
  memo: string;
};

export const updateArtImage = (
  artIndex: number,
  imageUri: string | null,
  artList: ArtItem[],
): ArtItem[] => {
  const updatedArtList = [...artList];

  if (imageUri) {
    updatedArtList[artIndex] = {
      ...updatedArtList[artIndex],
      image: imageUri,
    };
  }

  return updatedArtList;
};
