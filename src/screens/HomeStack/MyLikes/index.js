import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import CommonHomeList from '../../../components/CommonHomeList';
import HomeServiceCard from '../../../components/HomeServiceCard';
import RoutePaths from '../../../Navigations/RoutePaths';
import TopCard from '../../../components/TopCard';

const MyLikes = ({navigation}) => {
  const {isLoading, marketPlaceList, homeServiceList, showCaseList} =
    useSelector(state => state.home);

  const _handleButtonClick = (item, routePath) => {
    console.log(item);
    console.log(routePath);
    navigation.navigate(routePath, {item: item});
  };

  return (
    <View style={{flex: 1}}>
      <CommonHomeList
        isHorizontal={false}
        data={homeServiceList}
        headerTitle={'Home Service'}
        renderItem={(item, index) => {
          return (
            <HomeServiceCard
              data={item.item}
              onPress={() =>
                _handleButtonClick(item.item, RoutePaths.ShowCaseDetails)
              }
            />
          );
        }}
      />
    </View>
  );
};

export default MyLikes;
