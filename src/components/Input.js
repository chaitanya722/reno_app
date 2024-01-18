import React, {useRef} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import Colors from '../constants/colors';
const Input = ({
  placeholder = 'Enter here',
  heading = '',
  error = '',
  containerStyle,
  inputStyle,
  placeholderTextColor = Colors.Gray,
  TextInputStyle,
  secureTextEntry,
  leftImage,
  leftImageStyle,
  rightImage,
  code,
  RightIconOnPress,
  autoFocus,
  editable = true,
  keyboardType,
  ...rest
}) => {
  const inputRef = useRef();
  return (
    <View style={{flex: 1, width: '100%'}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          inputRef?.current?.focus();
        }}
        style={[style.container, containerStyle]}>
        <View>
          {heading != '' && <Text>{heading}</Text>}
          <View style={style.left}>
            {leftImage ? (
              <Image
                source={leftImage}
                style={[
                  {height: 20, width: 20, marginRight: 12},
                  leftImageStyle,
                ]}
                resizeMode={'contain'}
              />
            ) : null}
            {code && <Text>{code}</Text>}
            <TextInput
              ref={inputRef}
              autoFocus={autoFocus}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={[style.textInput, TextInputStyle]}
              editable={editable}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              {...rest}
            />
            <TouchableOpacity onPress={RightIconOnPress}>
              <Image
                resizeMode="contain"
                source={rightImage}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {error && (
        <View style={style.error}>
          <Text style={{color: 'red', fontSize: 12}}>*{error}</Text>
        </View>
      )}
    </View>
  );
};
export default Input;

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: Colors.Platinum1,
    borderWidth: 1,
    height: 52,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    flex: 1,
  },
  input: {
    height: 52,
    borderColor: Colors.Primary,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'red',
  },
  layout: {
    justifyContent: 'space-evenly',
  },
  heading: {
    marginTop: Platform.OS === 'android' ? 0 : 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    marginHorizontal: 5,
  },
  textInput: {
    color: Colors.Black,
    flex: 1,
  },
  error: {
    marginTop: 5,
  },
});
