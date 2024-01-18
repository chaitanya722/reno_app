import {View, Image, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot';

import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native';

const Caraouselanimation2 = ({navigation}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const focused = useIsFocused();
  const isUser = useSelector(state => state?.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const {height, width} = useWindowDimensions();

  useEffect(() => {
    handlebanner();
  }, []);

  const handlebanner = async () => {
    try {
      // Define the API endpoint URL
      const apiUrl = 'https://Reno.co/api/banner';

      // Set the Authorization header with the bearer token
      const headers = {
        Authorization: `Bearer ${isUser.token}`, // Add the bearer token to the request headers
      };

      const data = {
        type: '2',
      };

      // Make the POST request to log out
      const response = await axios.post(apiUrl, data, {headers});
      setData(response.data.data);
    } catch (error) {
      console.log(error.response); // => the response payload
    }
  };

  const renderitem = ({item}) => {
    return (
      <View style={{height: 220}}>
        {item?.banner_img ? (
          <Image
            source={{uri: item.banner_img}}
            style={{
              width: '90%',
              height: '60%',
              // flex:1,
              alignSelf: 'center',
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* <GestureHandlerRootView style={{flex: 1}}>
          <PanGestureHandler> */}
      <View style={{alignItems: 'center', marginTop: 10}}>
        {focused && data ? (
          <Carousel
            // pagingEnabled={true}
            loop={focused}
            width={width}
            height={140}
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
        {/* {data ? (
      <PaginationDot
        activeDotColor={'green'}
        curPage={activeIndex}
        maxPage={data.length}
      />
    ) : null} */}
      </View>

      {/* </PanGestureHandler>
        </GestureHandlerRootView> */}
    </View>
  );
};

export default Caraouselanimation2;
