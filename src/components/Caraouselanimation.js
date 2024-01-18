import {View, Image, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot';

// import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native';
import Images from '../constants/Images';

const Caraouselanimation = ({ navigation, data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const focused = useIsFocused();
  const { height, width } = useWindowDimensions();

  const renderitem = ({ item }) => {
    return (
      <View style={{ height: 179, width: '100%' }}>
        <Image
          source={{ uri: item?.banner_image_url }}
          style={{
            flex: 1,
            width: null,
            height: null,
            alignSelf: 'stretch',
            borderRadius: 20,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ paddingTop: 10 }}>
      <View style={{ alignItems: 'center' }}>
        {focused && data ? (
          <Carousel
            pagingEnabled={true}
            loop={focused}
            width={width}
            height={179}
            autoPlay={true}
            scrollEnabled={true}
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={renderitem}
          />
        ) : (
          <View style={{ width: width, height: 230 }} />
        )}
        {data ? (
          <PaginationDot
            activeDotColor={'green'}
            curPage={activeIndex}
            maxPage={data.length}
            sizeRatio={1.2}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Caraouselanimation;

