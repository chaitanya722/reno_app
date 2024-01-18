import {showMessage} from 'react-native-flash-message';
import Colors from '../constants/colors';
import { normalize,vh } from './dimenstions';

export const showSnackError = (text: any, duration?: number) =>
  showMessage({
    message: text,
    description: '',
    duration: duration ? duration : 3000,
    type: 'default',
    backgroundColor: Colors.darkGray,
    titleStyle: {fontSize: normalize(14),fontFamily: 'Poppins-Regular',padding: vh(10)}
  });

export const showSnack = (text: any) =>
  showMessage({
    message: text,
    description: '',
    duration: 3000,
    type: 'default',
    backgroundColor: Colors.darkGray,
    titleStyle: {fontSize: normalize(14),fontFamily: 'Poppins-Regular',padding: vh(10)}
  });

export const showSnackSuccess = (text: any) =>
  showMessage({
    message: text,
    description: '',
    duration: 3000,
    type: 'default',
    backgroundColor: Colors.darkGray,
    titleStyle: {fontSize: normalize(14),fontFamily: 'Poppins-Regular',padding: vh(10)}
  });

export const showSnackOTP = (text: any) =>
  showMessage({
    message: text,
    description: '',
    duration: 3000,
    type: 'default',
    backgroundColor: Colors.darkGray,
    titleStyle: {fontSize: normalize(14),fontFamily: 'Poppins-Regular',padding: vh(10)}
  });

export const showSnackBar = (text: any) =>
  showMessage({
    message: text,
    description: '',
    duration: 3000,
    type: 'default',
    backgroundColor: Colors.darkGray,
    titleStyle: {fontSize: normalize(14),fontFamily: 'Poppins-Regular',padding: vh(10)}
  });
