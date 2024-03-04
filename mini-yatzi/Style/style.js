import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b59f74',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {

    marginBottom: 15,
    backgroundColor: 'darksalmon',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'darksalmon',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    fontFamily: 'NotoSansRegular',
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#b59f74',
  },
  homeContent: {
    width: '80%',
    alignItems: 'center',
  },
  homeText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'NotoSansRegular',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'rosybrown',
    fontSize: 15,
    fontFamily: 'NotoSansRegular',
    fontWeight: 'bold',
  },
  rulesText: {
    color: 'white',
    fontFamily: 'NotoSansRegular',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  throwButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  throwButtonText: {
    color: 'rosybrown',
    fontSize: 15,
    fontFamily: 'NotoSansRegular',
    fontWeight: 'bold',
  },
  totalPoints: {
    fontFamily: 'NotoSansRegular',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    color: 'white',
  },
  status: {
    fontSize: 16,
    fontFamily: 'NotoSansRegular',
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  bonusPoints: {
    fontSize: 15,
    fontFamily: 'NotoSansRegular',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
    color: 'white'
  },

  whiteText: {
    color: 'white',
  },
  homeContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b59f74',
    alignItems: 'center',
  }
  
});