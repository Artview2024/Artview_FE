import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Pretendard',
    color: 'black',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 16,
    textAlign: 'left',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  inputBox: {
    height: 44,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
  },
  pointColor: {
    color: '#EA1B83',
  },
  button: {
    paddingHorizontal: 47,
    paddingVertical: 14,
    borderRadius: 15,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fullButton: {
    paddingHorizontal: 130,
    paddingVertical: 14,
    borderRadius: 15,
  },
  strokeButton: {
    paddingHorizontal: 47,
    paddingVertical: 14,
    borderRadius: 15,
    borderColor: 'black',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  inactiveButton: {
    backgroundColor: '#828282',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#000',
    width: 95,
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 14,
  },
  CommunityCardUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  CommunityCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 10,
  },
  CommunityCardText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
  },
  CommunityCardRating: {
    fontSize: 14,
    color: '#EA1B83',
  },
  EmotionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  EmotionButton: {
    fontSize: 12,
    color: 'black',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 7,
  },
});

export default GlobalStyle;
