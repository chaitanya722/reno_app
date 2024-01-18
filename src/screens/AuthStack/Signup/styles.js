import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    // flex:
    justifyContent: 'space-between',
  },
  textstyle: {
    fontSize: 24,
    color: '#02B563',
    fontWeight: '700',
    marginLeft: 20,
  },
  passwordview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,

    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    height: 45,
    paddingLeft: 20,
  },

  errorText: {
    color: 'red',
    fontSize: 10,
    margin: 5,

    bottom: 14,
  },
  centeredView: {
    flex: 1,
    backgroundColor:'rgba(52, 52, 52, 0.8)',
    justifyContent:"center",
    paddingHorizontal:20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    height:250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
