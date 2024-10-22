import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/My/Header';
import Text from '../../components/Text';
import InterestCategoryButton from '../../components/Interests/InterestCategoryButton'; // 새로 만든 컴포넌트 가져오기
import GlobalStyle from '../../styles/GlobalStyle';

const mockCategories = [
  {title: '현대미술', imageUrl: 'https://example.com/image1.jpg'},
  {title: '공예', imageUrl: 'https://example.com/image1.jpg'},
  {title: '사진', imageUrl: 'https://example.com/image1.jpg'},
  {title: '과학 및 기술', imageUrl: 'https://example.com/image1.jpg'},
  {title: '그래픽 디자인', imageUrl: 'https://example.com/image1.jpg'},
  {title: '문화', imageUrl: 'https://example.com/image1.jpg'},
  {title: '자연', imageUrl: 'https://example.com/image1.jpg'},
  {title: '역사', imageUrl: 'https://example.com/image1.jpg'},
  {title: '특별 전시', imageUrl: 'https://example.com/image1.jpg'},
];

const InterestSelectionScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryPress = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <Header title={''} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          관심 있는{'\n'}전시회 카테고리를 선택해주세요
        </Text>
        <Text style={styles.subtitle}>
          2개 이상 선택해주세요{'\n'}선택하신 카테고리는 마이페이지에서 확인
          가능합니다
        </Text>

        <View style={styles.categoriesContainer}>
          {mockCategories.map((category, index) => (
            <InterestCategoryButton
              key={index}
              title={category.title}
              imageUrl={category.imageUrl}
              isSelected={selectedCategories.includes(category.title)}
              onPress={() => handleCategoryPress(category.title)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>선택 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#828282',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 15,
    backgroundColor: '#EA1B83',
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InterestSelectionScreen;
