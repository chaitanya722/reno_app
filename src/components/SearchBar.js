import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import AppTextInput from './AppTextInput';
import { normalize } from '../util/dimenstions';
const SearchBar = props => {
  const {onChangeText} = props;
  const [search, setSearch] = useState('');

  const onChangeTextHandler = useCallback(
    text => {
      setSearch(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  return (
    <AppTextInput
      style={styles.inputStyle}
      placeholder={'Search'}
      value={search}
      onChangeText={onChangeTextHandler}
      placeholderTextColor={'#CACACA'}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    width:'80%',
    fontSize: normalize(15),
    borderRadius: 10,

  },
});

export default SearchBar;
