import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface FilterTabsProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({activeTab, onSelectTab}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15,
        paddingBottom: 27,
      }}>
      <TouchableOpacity
        onPress={() => onSelectTab('전체')}
        style={{borderBottomWidth: activeTab === '전체' ? 2 : 0}}>
        <Text
          style={
            activeTab === '전체'
              ? {fontSize: 20, color: '#000', fontWeight: 'bold'}
              : {fontSize: 20, fontWeight: 'bold'}
          }>
          전체
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelectTab('팔로우')}
        style={{borderBottomWidth: activeTab === '팔로우' ? 2 : 0}}>
        <Text
          style={
            activeTab === '팔로우'
              ? {fontSize: 20, color: '#000', fontWeight: 'bold'}
              : {fontSize: 20, fontWeight: 'bold'}
          }>
          팔로우
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterTabs;
