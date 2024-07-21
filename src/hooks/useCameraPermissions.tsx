import {PermissionsAndroid, Alert} from 'react-native';

export const useCameraPermission = (handleTakePhoto: () => void) => {
  const checkCameraPermissions = async () => {
    const cameraGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    const storageGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return cameraGranted && storageGranted;
  };

  const requestCameraPermission = async () => {
    const hasPermission = await checkCameraPermissions();
    if (!hasPermission) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          handleTakePhoto();
        } else {
          Alert.alert(
            '권한이 거절되었습니다.',
            '해당 기능을 사용하기 위해서는 카메라 권한이 허용되어야 합니다.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      handleTakePhoto();
    }
  };

  return {
    requestCameraPermission,
  };
};
