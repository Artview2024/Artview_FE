import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Text from '../../components/Text';

interface PhotoWarningModalProps {
  visible: boolean;
  onClose: () => void;
  onCloseAction?: () => void;
  setOnCloseAction: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
}

const PhotoWarningModal: React.FC<PhotoWarningModalProps> = ({
  visible,
  onClose,
  onCloseAction,
  setOnCloseAction,
}) => {
  const handleModalClose = () => {
    onClose();

    if (onCloseAction) {
      onCloseAction();
      setOnCloseAction(undefined);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleModalClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            사진 등록은 필수입니다.{'\n'} 사진을 등록해 주세요!
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleModalClose}>
            <Text style={styles.submitButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: Dimensions.get('window').width - 40,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PhotoWarningModal;
