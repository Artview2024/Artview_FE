import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import GlobalStyle from '../styles/GlobalStyle';
import {StackParamList} from '../navigator/AppNavigator';

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

  return (
    <View style={GlobalStyle.container}>
      {/* <TouchableOpacity style={GlobalStyle.header}>
        <BackArrowIcon />
      </TouchableOpacity> */}
      <Text style={GlobalStyle.header}>&lt;</Text>
      <Text style={GlobalStyle.sectionTitle}>전시회</Text>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 20}]}
        placeholder="전시회 검색하기"
        value={exhibition}
        onChangeText={setExhibition}
      />
      <Text style={GlobalStyle.sectionTitle}>장소</Text>
      <TextInput
        style={[GlobalStyle.inputBox, {marginBottom: 20}]}
        placeholder="장소 검색하기"
        value={location}
        onChangeText={setLocation}
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
        onPress={() => navigation.navigate('Recording')}>
        <Text style={[GlobalStyle.buttonText]}>관람 시작</Text>
      </TouchableOpacity>
    </View>
  );
}
