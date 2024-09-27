import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../../components/Text';

interface FilterTabsProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({activeTab, onSelectTab}) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        onPress={() => onSelectTab('전체')}
        style={styles.tabContainer}>
        <Text
          style={activeTab === '전체' ? styles.tabTextActive : styles.tabText}>
          전체
        </Text>
        {activeTab === '전체' && <View style={styles.activeTabLine} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelectTab('팔로우')}
        style={styles.tabContainer}>
        <Text
          style={
            activeTab === '팔로우' ? styles.tabTextActive : styles.tabText
          }>
          팔로우
        </Text>
        {activeTab === '팔로우' && <View style={styles.activeTabLine} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
  },
  tabContainer: {
    alignItems: 'center',
    flex: 1,
  },
  activeTabLine: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#828282',
    paddingBottom: 8,
  },
});

export default FilterTabs;
