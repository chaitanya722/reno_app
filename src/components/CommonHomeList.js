import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

import CommonListHeader from './CommonListHeader';

const CommonHomeList = ({
  navigation,
  headerTitle,
  data,
  renderItem,
  isHorizontal,
  onPress,
  routePath,
}) => {
  return (
    <View>
      {!isHorizontal ? null : (
        <CommonListHeader
          title={headerTitle}
          onPress={() => navigation.navigate(routePath)}
        />
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={isHorizontal ? 1 : 2}
        horizontal={isHorizontal}
        data={data}
        renderItem={({ item, index }) =>
          renderItem({ item, index, style: styles.itemText }) // Pass style prop
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    color: 'black', // Set text color to black
    // Other text styles if needed
  },
});

export default CommonHomeList;
