import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../../components/Text';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({activeTab, setActiveTab}) => (
  <View style={styles.tabs}>
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setActiveTab('게시물')}>
        <Text
          style={
            activeTab === '게시물' ? styles.tabTextActive : styles.tabText
          }>
          게시물
        </Text>
      </TouchableOpacity>
      {activeTab === '게시물' && <View style={styles.activeTabLine} />}
    </View>
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setActiveTab('관람')}>
        <Text
          style={activeTab === '관람' ? styles.tabTextActive : styles.tabText}>
          관람
        </Text>
      </TouchableOpacity>
      {activeTab === '관람' && <View style={styles.activeTabLine} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 18,
    paddingBottom: 14,
    position: 'relative',
  },
  tabContainer: {alignItems: 'center', flex: 1},
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

export default Tabs;
