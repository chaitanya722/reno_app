import {
  View,
  Image,
  useWindowDimensions,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native';
import Images from '../constants/Images';
import Colors from '../constants/colors';

const MarketPlaceSlider = ({data, onPress}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const focused = useIsFocused();

  const {height, width} = useWindowDimensions();

  const renderitem = ({item}) => {
    return (
      <ImageBackground
        source={{uri: item}}
        style={{
          width: '100%',
          height: '100%',
          // flex:1,
          alignSelf: 'center',

          resizeMode: 'cover',
        }}>
        <View
          style={{
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              borderRadius: 15,
              margin: 10,
              alignItems: 'center',
            }}>
           
          </TouchableOpacity>
          <View
            style={{
              height: 50,
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
           
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                backgroundColor: Colors.appred,
                borderRadius: 15,
                margin: 10,
                alignItems: 'center',
              }}>
              <Ionicons name="heart" size={18} color={Colors.White} />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{paddingTop: 10}}>
      {/* <GestureHandlerRootView style={{flex: 1}}>
        <PanGestureHandler> */}
      <View style={{alignItems: 'center'}}>
        {focused && data ? (
          <Carousel
            pagingEnabled={true}
            loop={focused}
            width={width}
            height={179}
            // autoPlay={true}
            scrollEnabled={true}
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={index => setActiveIndex(index)}
            renderItem={renderitem}
          />
        ) : (
          <View style={{width: width, height: 230}} />
        )}
      </View>

      {/* </PanGestureHandler>
      </GestureHandlerRootView> */}
    </View>
  );
};

export default MarketPlaceSlider;
