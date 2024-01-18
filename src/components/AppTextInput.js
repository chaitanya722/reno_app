import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';

const AppTextInput = forwardRef((props, ref) => {
  return (
    <TextInput
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor={Colors.Primary}
      returnKeyType="next"
      {...props}
      style={[
        styles.inputFontSize,
        styles.input,
        {fontFamily: Fonts.GilroyMedium},
        props?.style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  inputFontSize: {
    fontSize: 14,
  },
  input: {
    color: Colors.Black,
    height: 45,
    marginTop: 10,
    fontSize: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: Colors.White,
  },
});

export default AppTextInput;
