import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import BackIcon from 'react-native-vector-icons/Ionicons';
import GlobalStyle from '../../styles/GlobalStyle';
import {StackParamList} from '../../navigator/StackParamList';
import Text from '../../components/Text';

export default function RecordingStartScreen() {
  const [exhibition, setExhibition] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const isFormFilled = exhibition && location && dateSelected;

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const formatDate = (date: Date) => {
    return dateSelected
      ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      : '날짜 선택하기';
  };

  const handleStartRecording = async () => {
    const exhibitionId = '2'; // 일단 기본값

    navigation.navigate('Recording', {
      exhibitionName: exhibition,
      exhibitionDate: formatDate(date),
      gallery: location,
      artList: [],
      isEditMode: false,
      exhibitionId,
    });
  };

  return (
    <View style={GlobalStyle.container}>
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
        style={[GlobalStyle.inputBox, {marginBottom: 20, color: 'black'}]}
        placeholder="전시회 검색하기"
        placeholderTextColor={'#000'}
        value={exhibition}
        onChangeText={setExhibition}
        maxFontSizeMultiplier={1}
      />
      <Text style={GlobalStyle.sectionTitle}>장소</Text>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 20, color: 'black'}]}
        placeholder="장소 검색하기"
        placeholderTextColor={'#000'}
        value={location}
        onChangeText={setLocation}
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
        onCancel={() => {
          setDateOpen(false);
        }}
      />
      <TouchableOpacity
        style={[
          GlobalStyle.button,
          isFormFilled ? GlobalStyle.activeButton : GlobalStyle.inactiveButton,
        ]}
        disabled={!isFormFilled}
        onPress={handleStartRecording}>
        <Text style={[GlobalStyle.buttonText]}>기록 시작</Text>
      </TouchableOpacity>
    </View>
  );
}
