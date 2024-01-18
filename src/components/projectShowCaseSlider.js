import {View, Image, useWindowDimensions, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native';
import Images from '../constants/Images';
import Colors from '../constants/colors';



const ProjectShowCaseSlider = ({ navigation, isShareShow, data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const focused = useIsFocused();
  const { height, width } = useWindowDimensions();

  const renderitem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item }}
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          resizeMode: 'cover',
        }}
      >
        {/* Your image content goes here */}
      </ImageBackground>
    );
  };

  return (
    <View style={{ paddingTop: 10 }}>
      {/* Fixed heart icon outside the carousel */}
     

      <View style={{ alignItems: 'center' }}>
        {focused && data ? (
          <Carousel
            pagingEnabled={true}
            loop={focused}
            width={width}
            height={179}
            scrollEnabled={true}
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={renderitem}
          />
        ) : (
          <View style={{ width: width, height: 230 }} />
        )}
      </View>
    </View>
  );
};

export default ProjectShowCaseSlider;
