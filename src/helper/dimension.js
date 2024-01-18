import {Dimensions, PixelRatio} from 'react-native';

export const DesignWidth = 414;
export const DesignHeight = 896;
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
const widthBaseScale = screenWidth / 414;
const heightBaseScale = screenHeight / 896;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 390;


export function normalize(size) {
  const isTablet = screenWidth >= 600 && screenHeight >= 600;
  if(isTablet) {
    let based = 'width';
    const newSize = (based === 'height') ? 
              size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }else {
    const fontScale = PixelRatio.getFontScale();
    const getFontSize = size / fontScale;
    return getFontSize;
  }
  
  //return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = (width) => {
  let percent = (width / DesignWidth) * 100;
  const elemWidth = parseFloat(percent + '%');
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const vh = (height) => {
  let percent = (height / DesignHeight) * 100;
  const elemHeight = parseFloat(percent + '%');
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
