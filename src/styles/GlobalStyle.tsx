import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlign: 'left',
    color: '#000',
  },
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  pointColor: {
    color: '#EA1B83',
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
  },
});

export default GlobalStyle;
