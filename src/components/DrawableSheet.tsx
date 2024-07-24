import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MenuIcon from 'react-native-vector-icons/AntDesign';

const reorderIcon = require('../assets/icons/reorder-icon.png');

type ArtItem = {
  id: string;
  image: string;
  title: string;
  artist: string;
  memo: string;
};

type DrawableSheetProps = {
  artList: ArtItem[];
  setArtList: (data: ArtItem[]) => void;
};

type CustomCheckBoxProps = {
  isChecked: boolean;
  onPress: () => void;
};

const CustomCheckBox = ({isChecked, onPress}: CustomCheckBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
};

const DrawableSheet = forwardRef(
  ({artList, setArtList}: DrawableSheetProps, ref) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    useImperativeHandle(ref, () => ({
      handleOpenBottomSheet() {
        setIsBottomSheetOpen(true);
      },
      handleCloseBottomSheet() {
        setIsBottomSheetOpen(false);
      },
    }));

    const toggleSelectAll = () => {
      if (selectedItems.size === artList.length) {
        setSelectedItems(new Set());
      } else {
        setSelectedItems(new Set(artList.map(item => item.id)));
      }
    };

    const toggleSelectItem = (id: string) => {
      const newSelectedItems = new Set(selectedItems);
      if (newSelectedItems.has(id)) {
        newSelectedItems.delete(id);
      } else {
        newSelectedItems.add(id);
      }
      setSelectedItems(newSelectedItems);
    };

    const deleteSelectedItems = () => {
      const newArtList = artList.filter(item => !selectedItems.has(item.id));
      setArtList(newArtList);
      setSelectedItems(new Set());
    };

    const renderItem = ({item, drag, isActive}: RenderItemParams<ArtItem>) => {
      return (
        <TouchableOpacity
          style={[
            styles.item,
            {backgroundColor: isActive ? '#f0f0f0' : '#fff'},
          ]}
          onLongPress={drag}>
          <CustomCheckBox
            isChecked={selectedItems.has(item.id)}
            onPress={() => toggleSelectItem(item.id)}
          />
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
          <Image source={reorderIcon} style={styles.reorderIcon} />
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        visible={isBottomSheetOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBottomSheetOpen(false)}>
        <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
          <View style={styles.overlay}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetContent}>
                <View style={styles.header}>
                  <Text style={styles.sheetTitle}>작품목록 편집</Text>
                  <TouchableOpacity onPress={() => setIsBottomSheetOpen(false)}>
                    <MenuIcon name="close" size={24} color={'black'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.header}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CustomCheckBox
                      isChecked={selectedItems.size === artList.length}
                      onPress={toggleSelectAll}
                    />
                    <Text style={styles.artist}>전체선택</Text>
                  </View>
                  <TouchableOpacity onPress={deleteSelectedItems}>
                    <Text style={styles.select}>삭제</Text>
                  </TouchableOpacity>
                </View>
                <DraggableFlatList
                  data={artList}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  onDragEnd={({data}) => setArtList(data)}
                />
              </View>
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sheetContent: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  select: {
    fontSize: 14,
    color: '#4E4E4E',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  artist: {
    fontSize: 14,
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 13,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4E4E4E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#4E4E4E',
  },
  checkmark: {
    width: 6,
    height: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
    transform: [{rotate: '45deg'}, {translateX: -1}, {translateY: -1}],
  },
  reorderIcon: {
    width: 16,
    height: 14.5,
    marginLeft: 'auto',
  },
});

export default DrawableSheet;