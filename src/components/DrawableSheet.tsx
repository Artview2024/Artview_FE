import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import GlobalStyle from '../styles/GlobalStyle';
import MenuIcon from 'react-native-vector-icons/AntDesign';

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

const DrawableSheet = forwardRef(
  ({artList, setArtList}: DrawableSheetProps, ref) => {
    const windowHeight = Dimensions.get('window').height;
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      handleOpenBottomSheet() {
        setIsBottomSheetOpen(true);
      },
      handleCloseBottomSheet() {
        setIsBottomSheetOpen(false);
      },
    }));

    const renderItem = ({item, drag, isActive}: RenderItemParams<ArtItem>) => {
      return (
        <TouchableOpacity
          style={[
            styles.item,
            {backgroundColor: isActive ? '#f0f0f0' : '#fff'},
          ]}
          onLongPress={drag}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        style={GlobalStyle.container}
        visible={isBottomSheetOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBottomSheetOpen(false)}>
        <View style={styles.sheetContainer}>
          <View style={styles.sheetContent}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sheetTitle}>작품목록 편집</Text>
              <TouchableOpacity onPress={() => setIsBottomSheetOpen(false)}>
                <MenuIcon name="close" size={24} color={'black'} />
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
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default DrawableSheet;
