import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import RoutePaths from './RoutePaths';
import TabBarButton from '../components/BottomTabBarBtn';
import CommonHeader from '../components/CommonHeader';
import Images from '../constants/Images';
import {Home, ShowCase, MarketPlace, Services, Profile, MyAccount} from '../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

const tabScreenOptions = (title, iconName, {navigation}) => {

  return {
    tabBarButton: ({onPress}) => {
      return (
        <TabBarButton
          title={title}
          focused={navigation.isFocused()}
          onPress={onPress}
          iconName={iconName}
        />
      );
    },
  };
};

const bottomTabScreenOptions = {
  lazy: true,
  header: CommonHeader,
  tabBarStyle: {height: 55},
};

const BottomTabNavigation = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case RoutePaths.home:
                return (
                  <Icon
                    name="home"
                    size={size}
                    color={focused ? '#8FC743' : '#545454'}
                  />
                );
              case RoutePaths.showCase:
                return (
                  <Icon
                    name="view-list"
                    size={size}
                    color={focused ? '#8FC743' : '#545454'}
                  />
                );
              case RoutePaths.MarketPlace:
                return (
                  <Icon
                    name="store"
                    size={size}
                    color={focused ? '#8FC743' : '#545454'}
                  />
                );
              case RoutePaths.Services:
                return (
                  <Icon
                    name="room-service"
                    size={size}
                    color={focused ? '#8FC743' : '#545454'}
                  />
                );
            
            }
          },
        header: props => {
          return <CommonHeader {...props} title={RoutePaths.AboutUs} />;
        },
        tabBarStyle: { height: 55 },
      })}>
      <>
      <Tab.Screen
          name={RoutePaths.home}
          component={Home}
          options={tabScreenOptions.bind(null, RoutePaths.home, Images.homeImg)}
        />
      <Tab.Screen
          name={RoutePaths.MarketPlace}
          component={MarketPlace}
          options={tabScreenOptions.bind(
            null,
            RoutePaths.MarketPlace,
            Images.marketPlace,
          )}
        />

      <Tab.Screen
          name={RoutePaths.Services}
          component={Services}
          options={tabScreenOptions.bind(
            null,
            RoutePaths.Services,
            Images.servicesImg,
          )}
        />
        
      <Tab.Screen
          name={RoutePaths.showCase}
          component={ShowCase}
          options={tabScreenOptions.bind(
            null,
            RoutePaths.showCase,
            Images.showcaseImg,
          )}
        />
       
     
      
      
       
      </>
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
