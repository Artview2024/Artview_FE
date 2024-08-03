import uuid from 'react-native-uuid';

export const getShortFileName = (originalName: string): string => {
  const extension = originalName.split('.').pop();
  const shortName = uuid.v4();
  return `${shortName}.${extension}`;
};
