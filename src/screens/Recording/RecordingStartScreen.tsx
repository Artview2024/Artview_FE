import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../../styles/GlobalStyle';
import {StackParamList} from '../../navigator/StackParamList';
import Text from '../../components/Text';
import {useKeyboardVisibility} from '../../hooks/useKeyboardVisibility';
import customAxios from '../../services/customAxios';

interface Exhibition {
  exhibitionId: number;
  exhibition: string;
}

export default function RecordingStartScreen() {
  const [exhibition, setExhibition] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Exhibition[]>([]);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<'' | number>(
    '',
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const isFormFilled = exhibition && location && dateSelected;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const isKeyboardVisible = useKeyboardVisibility();

  const formatDate = (date: Date) => {
    return dateSelected
      ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      : '날짜 선택';
  };

  const fetchExhibitions = async (keyword: string) => {
    try {
      const response = await customAxios.get(
        `/myReviews/exhibition_title/${keyword}`,
      );
      setSearchResults(response.data);
    } catch (error: any) {
      console.error('Error fetching exhibitions:', error.response.data);
    }
  };

  const fetchLocation = async (exhibitionId: number) => {
    try {
      const response = await customAxios.get(
        `/myReviews/exhibition_location/${exhibitionId}`,
      );
      const locationData = response.data.exhibition || '';
      setLocation(locationData);
    } catch (error: any) {
      console.error('Error fetching location:', error.response.data);
      setLocation('');
    }
  };

  const handleExhibitionSelect = (
    exhibitionId: number,
    exhibitionName: string,
  ) => {
    setExhibition(exhibitionName);
    setSelectedExhibitionId(exhibitionId);
    setShowDropdown(false);
    fetchLocation(exhibitionId);
  };

  const handleStartRecording = () => {
    navigation.navigate('Recording', {
      exhibitionName: exhibition,
      exhibitionDate: formatDate(date),
      gallery: location,
      artList: [],
      isEditMode: false,
      exhibitionId: selectedExhibitionId,
    });
  };

  useEffect(() => {
    if (exhibition) {
      fetchExhibitions(exhibition);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [exhibition]);

  // 드롭다운 높이 설정: 3개 항목이면 약 150px, 그보다 적으면 항목 수에 따라 설정
  const dropdownHeight = Math.min(searchResults.length * 50, 150); // 각 항목의 높이를 약 50px로 가정

  return (
    <KeyboardAvoidingView style={GlobalStyle.container} behavior="height">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon
          name="chevron-back"
          size={24}
          color={'black'}
          style={{paddingRight: 3, paddingTop: 18}}
        />
      </TouchableOpacity>
      <Text style={GlobalStyle.sectionTitle}>전시회</Text>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 0, color: 'black'}]}
        placeholder="전시회명"
        placeholderTextColor={'#000'}
        value={exhibition}
        onChangeText={setExhibition}
        maxFontSizeMultiplier={1}
      />
      {showDropdown && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.exhibitionId.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() =>
                handleExhibitionSelect(item.exhibitionId, item.exhibition)
              }>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}>
                <Text>{item.exhibition}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          style={{
            maxHeight: dropdownHeight,
            borderWidth: 1,
            borderTopWidth: 0, // 위쪽 테두리 제거
            borderColor: '#ddd', // 테두리 색상
            borderBottomLeftRadius: 10, // 입력 필드와 같은 borderRadius
            borderBottomRightRadius: 10, // 입력 필드와 같은 borderRadius
          }}
        />
      )}
      <Text style={[GlobalStyle.sectionTitle, {marginTop: 20}]}>장소</Text>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 20, color: 'black'}]}
        placeholder="전시 장소"
        placeholderTextColor={'#000'}
        value={location}
        onChangeText={setLocation}
        editable
        maxFontSizeMultiplier={1}
      />
      <Text style={GlobalStyle.sectionTitle}>날짜</Text>
      <TouchableOpacity
        style={[
          GlobalStyle.inputBox,
          {marginBottom: 20, justifyContent: 'center'},
        ]}
        onPress={() => setDateOpen(true)}>
        <Text style={{color: '#000'}}>{formatDate(date)}</Text>
      </TouchableOpacity>
      <DatePicker
        mode="date"
        modal
        open={dateOpen}
        date={date}
        onConfirm={newDate => {
          setDateOpen(false);
          setDate(newDate);
          setDateSelected(true);
        }}
        onCancel={() => setDateOpen(false)}
      />
      {!isKeyboardVisible && (
        <TouchableOpacity
          style={[
            GlobalStyle.button,
            isFormFilled
              ? GlobalStyle.activeButton
              : GlobalStyle.inactiveButton,
          ]}
          disabled={!isFormFilled}
          onPress={handleStartRecording}>
          <Text style={GlobalStyle.buttonText}>기록 시작</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}
