import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoutePaths from '../RoutePaths';
import Appdrawer from '../Appdrawer';
import {
  AboutUs,
  Cart,
  EditProfile,
  Inbox,
  LeaveReview,
  Listing,
  MarketPlace,
  MyAccount,
  MyBookings,
  MyPoint,
  Notification,
  Profile,
  SavedProduct,
  ShowCaseDetails,
  TeamList,
  Wallet,
  
} from '../../screens';
import CommonHeader from '../../components/CommonHeader';
import ChnagePassword from '../../screens/AuthStack/ChnagePassword';
import MarketPlaceDetails from '../../screens/DetailsScren/MarketPlaceDetails';
import MyLikes from '../../screens/HomeStack/MyLikes';
import CategoryPage from '../../components/categorycard_sm';
import HomeServiceDetails from '../../screens/DetailsScren/HomesercviceDetails';
import TransactionHistory from '../../screens/HomeStack/TransactionHistory';
import ChatScreen from '../../screens/HomeStack/Dashboard/Home/helpdesk';
import BookingSm from '../../screens/DetailsScren/ShowCaseDetails/booking_sm';
import Checkout from '../../screens/DetailsScren/ShowCaseDetails/chekout';
import ProductServiceDetails from '../../screens/DetailsScren/ProductServiceDetails';
import BookingHsm from '../../screens/DetailsScren/HomesercviceDetails/booking_hsm';
import CheckoutHsm from '../../screens/DetailsScren/HomesercviceDetails/chekout_hsm';
import CategoryMpm from '../../screens/HomeStack/Dashboard/MarketPlace/categories_page';
import ChatScreenListing from '../../screens/DetailsScren/MarketPlaceDetails/chatscreen_listing';
import ChatHeader from '../../components/chatheader';
import MyListingsScreen from '../../screens/HomeStack/Dashboard/MarketPlace/MyListing';
import ChatingScreen from '../../screens/chatScreen';
import TransactionHistoryScreen from '../../screens/marktetplace_PS';
import OrdersScreen from '../../screens/HomeStack/TransactionHistory/orderhistorytable';
import SupportCenterScreen from '../../screens/SupportCenter/support';
import EditListingScreen from '../../screens/HomeStack/Dashboard/MarketPlace/editlListing';
import ChattingScreen from '../../screens/chatScreen';
import BookingPage from '../../screens/booking';
import NotificationScreen from '../../screens/notificationScreen';
import BuyersScreen from '../../screens/buyers';
import AddListingScreen from '../../screens/HomeStack/Dashboard/MarketPlace/addlisting';
import OrdersPage from '../../screens/HomeStack/Cart/orderdetails';
import CheckoutCart from '../../screens/HomeStack/Cart/checkoutCart';
const Homestack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RoutePaths.appdrawer} component={Appdrawer} />
      <Stack.Screen
        name={RoutePaths.AboutUs}
        component={AboutUs}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader withBackBtn {...props} title={RoutePaths.AboutUs} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.Cart}
        component={Cart}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader withBackBtn {...props} 
              // title={RoutePaths.Cart} 
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.MyAccount}
        component={MyAccount}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.MyAccount}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.teamList}
        component={TeamList}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.teamList}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.Profile}
        component={Profile}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={RoutePaths.Profile}
                isProfile={true}
                isEditProfile={true}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.editProfile}
        component={EditProfile}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Edit your profile'}
                isProfile={true}
                isEditProfile={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.changePasswod}
        component={ChnagePassword}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.changePasswod}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.notification}
        component={Notification}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.notification}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.myPoint}
        component={MyPoint}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader withBackBtn {...props} title={RoutePaths.myPoint} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.wallet}
        component={Wallet}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader withBackBtn {...props} title={RoutePaths.wallet} />
            );
          },
        }}
      />
        <Stack.Screen
        name={RoutePaths.MarketplacePS}
        component={TransactionHistoryScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader withBackBtn {...props} title={'Transaction History '} />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.myBookings}
        component={MyBookings}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.myBookings}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.leaveReview}
        component={LeaveReview}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.leaveReview}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.savedProduct}
        component={SavedProduct}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.savedProduct}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.MyListingScreen}
        component={MyListingsScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader withBackBtn {...props} title="Listings "/>
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.inbox}
        component={Inbox}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader withBackBtn {...props} title={RoutePaths.inbox} />
            );
          },
        }}
      />
       <Stack.Screen
        name={RoutePaths.BookingSM}
        component={BookingSm}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.BookingSM}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.BookingHsm}
        component={BookingHsm}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.BookingHsm}
              />
            );
          },
        }}
      />
       <Stack.Screen
        name={RoutePaths.Chekout}
        component={Checkout}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
              //  title={RoutePaths.Chekout}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.ChekoutCart}
        component={CheckoutCart}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
              //  title={RoutePaths.Chekout}
              />
            );
          },
        }}
      />
        <Stack.Screen
        name={RoutePaths.ChekoutHsm}
        component={CheckoutHsm}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
              //  title={RoutePaths.ChekoutHsm}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.ShowCaseDetails}
        component={ShowCaseDetails}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
              
              />
            );
          },
        }}
      />
     
     
        <Stack.Screen
        name={RoutePaths.HomeServiceDetails}
        component={HomeServiceDetails}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.HomeServiceDetails}
              />
            );
          },
        }}
      />
           <Stack.Screen
        name={RoutePaths.ProductServiceDetails}
        component={ProductServiceDetails}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.ProductServiceDetails}
              />
            );
          },
        }}
      />
       <Stack.Screen
        name={RoutePaths.MarketPlaceDetails}
        component={MarketPlaceDetails}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.BookingHsm}
              />
            );
          },
        }}
      />

<Stack.Screen
        name={RoutePaths.CategoriesPage}
        component={CategoryMpm}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                // title={RoutePaths.BookingHsm}
              />
            );
          },
        }}
      /> 
      
<Stack.Screen
        name={RoutePaths.ChatScreenListing}
        component={ChatScreenListing}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                 title='Chat'
              />
            );
          },
        }}
      /> 
            
<Stack.Screen
        name={RoutePaths.ChattingScreen}
        component={ChattingScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                 title='Chats'
              />
            );
          },
        }}
      /> 
       
       <Stack.Screen
        name={RoutePaths.OrdersScreen}
        component={OrdersScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                 title='Orders'
              />
            );
          },
        }}
      /> 
       
       
   
       <Stack.Screen
        name={RoutePaths.categoryPage}
        component={CategoryPage}
        options={{
          headerShown: true,
          header: props => {
            return (
              <CommonHeader
                withBackBtn
                {...props}
                title={RoutePaths.categoryPage}
              />
            );
          },
        }}
      />
       <Stack.Screen
        name={RoutePaths.ChatScreen}
        component={ChatScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Customer Support'}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.Support}
        component={SupportCenterScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Support Center'}
              />
            );
          },
        }}
      />
      
      <Stack.Screen
        name={RoutePaths.Booking}
        component={BookingPage}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Bookings'}
              />
            );
          },
        }}
      />
         <Stack.Screen
        name={RoutePaths.EditListing}
        component={EditListingScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Edit your listing'}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={RoutePaths.AddListing}
        component={AddListingScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Add your listing'}
              />
            );
          },
        }}
      />
        <Stack.Screen
        name={RoutePaths.NotificationScreen}
        component={NotificationScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={'Notifications'}
              />
            );
          },
        }}
      />
        <Stack.Screen
        name={RoutePaths.Buyers}
        component={BuyersScreen}
        options={{
          headerShown: true,
          header: props => {
            return (
              <ChatHeader
                withBackBtn
                {...props}
                title={''}
              />
            );
          },
        }}
      />
      
 
    </Stack.Navigator>
    
    
  );
};

export default Homestack;

const styles = StyleSheet.create({});
