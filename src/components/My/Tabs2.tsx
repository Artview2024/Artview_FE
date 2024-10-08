import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';
import GlobalStyle from '../../styles/GlobalStyle'; // GlobalStyle import

interface Tabs2Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  following: string;
  follower: string;
  enjoyed: string;
}

const Tabs2: React.FC<Tabs2Props> = ({
  activeTab,
  setActiveTab,
  following,
  follower,
  enjoyed,
}) => (
  <View style={styles.tabs}>
    <View style={styles.tabContainer}>
      {/* 팔로잉 숫자 */}
      <Text style={[styles.countText, GlobalStyle.pointColor]}>
        {following}
      </Text>
      <TouchableOpacity onPress={() => setActiveTab('팔로잉')}>
        <Text
          style={
            activeTab === '팔로잉' ? styles.tabTextActive : styles.tabText
          }>
          팔로잉
        </Text>
      </TouchableOpacity>
      {activeTab === '팔로잉' && <View style={styles.activeTabLine} />}
    </View>

    <View style={styles.tabContainer}>
      {/* 팔로워 숫자 */}
      <Text style={[styles.countText, GlobalStyle.pointColor]}>{follower}</Text>
      <TouchableOpacity onPress={() => setActiveTab('팔로워')}>
        <Text
          style={
            activeTab === '팔로워' ? styles.tabTextActive : styles.tabText
          }>
          팔로워
        </Text>
      </TouchableOpacity>
      {activeTab === '팔로워' && <View style={styles.activeTabLine} />}
    </View>

    <View style={styles.tabContainer}>
      {/* 관람 숫자 */}
      <Text style={[styles.countText, GlobalStyle.pointColor]}>{enjoyed}</Text>
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
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
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

export default Tabs2;
