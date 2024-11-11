import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/My/Header';
import Text from '../../components/Text';
import InterestCategoryButton from '../../components/Interests/InterestCategoryButton';
import GlobalStyle from '../../styles/GlobalStyle';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackParamList} from '../../navigator/StackParamList';
import customAxios from '../../services/customAxios';

interface RouteParams {
  userInterest?: string[];
}

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

const InterestSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'InterestSelection'>>();
  const {userInterest = []} = route.params || {};

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(userInterest);

  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const response = await customAxios.get('/user/myPage/interest');
        const rawInterests = response.data;
        const parsedInterests = JSON.parse(rawInterests);

        setSelectedCategories(prevCategories => {
          const updatedCategories = [...prevCategories];
          parsedInterests.forEach((interest: string) => {
            if (!updatedCategories.includes(interest)) {
              updatedCategories.push(interest);
            }
          });
          return updatedCategories;
        });
      } catch (error: any) {
        console.error('관심 분야 가져오기 실패:', error.response?.data);
      }
    };

    fetchUserInterests();
  }, []);

  // 카테고리 선택 로직
  const handleCategoryPress = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category),
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 선택 완료 시 MyEditScreen으로 선택된 카테고리 데이터 전달
  const handleSubmit = () => {
    navigation.navigate('MyEdit', {userInterest: selectedCategories});
  };

  return (
    <View style={GlobalStyle.container}>
      <Header title="관심 분야 선택" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          관심 있는{'\n'}전시회 카테고리를 선택해주세요
        </Text>
        <Text style={styles.subtitle}>
          최대 3개까지 선택 가능합니다.{'\n'}선택하신 카테고리는 마이페이지에서
          확인 가능합니다
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
