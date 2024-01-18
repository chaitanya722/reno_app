import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _doHomeService, _doMarketPlace, _doShowCase } from '../../../../store/home/home.action';
import Caraouselanimation from '../../../components/Caraouselanimation';
import { vh } from '../../../util/dimenstions';
import Colors from '../../../constants/colors';
import ProjectShowCaseSlider from '../../../components/projectShowCaseSlider';
import MarketPlaceSlider from '../../../components/MarketPlaceSlider';
import RoutePaths from '../../../Navigations/RoutePaths';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonHomeList from '../../../components/CommonHomeList';
import MarketPlaceCard from '../../../components/MarketPlaceCard';
import { BASE_URL } from '../../../services/environment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const MarketPlaceDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { isLoading, marketPlaceList, homeServiceList, showCaseList } =
    useSelector(state => state.home);
  console.log(item, 254654);
  const [picUrl, setPicUrl] = useState(null);
  const { user_Info } = useSelector(state => state.home);
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    // Call the API to get the member details
    const getMemberInfo = async () => {
      try {
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
        const mid = item?.mid;

        const response = await fetch(`${BASE_URL}viewmember_crm?mid=${mid}`, {
          headers: {
            'api-key': apiKey,
          },
        });

        const result = await response.json();

        if (result.success) {
          setPicUrl(result.member.pic_url);
        } else {
          console.error('Failed to fetch member details:', result.message);
        }
      } catch (error) {
        console.error('Error fetching member details:', error.message);
      }
    };

    getMemberInfo();
  }, []);

  const isSeller = user_Info?.mid === item?.seller_id;
  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
        const mid = user_Info?.mid

        const response = await axios.get(
          `http://139.59.236.50:8080/api/liked-products?mid=${mid}`,
          {
            headers: {
              'api-key': apiKey,
            },
          }
        );

        const likedItems = response.data?.likedItems;
        if (likedItems && likedItems.lid && likedItems.lid.includes(item?.lid)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error checking liked status:', error.message);
      }
    };

    checkLikedStatus();
  }, [item?.lid]);

  const handleLikeClick = async () => {
    // Toggle the liked state
    setIsLiked(!isLiked);

    // You can also send a request to your server to update the like status
    // and count in your database
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid
      const lid = item?.lid;

      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('lid', lid);

      const response = await axios.post(
        'http://139.59.236.50:8080/api/like-lid',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-key': apiKey,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        console.error('Failed to like the product:', result.message);
        // Reset the liked state if the request fails
        setIsLiked(!isLiked);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error liking the product:', error.message);
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
        <ScrollView>
          <ProjectShowCaseSlider
            isShareShow={true}
            data={item?.slider_photos}
          />
           <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.Black, fontSize: 17, fontWeight: '700', flex: 1 }}>{item?.service_name}</Text>
          <TouchableHighlight underlayColor="transparent" onPress={handleLikeClick}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isLiked ? (
                <Ionicons name="thumbs-up" size={20} color={Colors.Green} />
              ) : (
                <Ionicons name="thumbs-up-outline" size={20} color={Colors.Gray} />
              )}
              <Text style={{ color: isLiked ? Colors.Green : Colors.Gray, marginLeft: 5 }}>{isLiked ? 'Liked' : 'Like'}</Text>
            </View>
          </TouchableHighlight>
        </View>
          <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
           
            <Text style={{ color: '#3BA617', fontSize: 12, fontWeight: '500' }}>
              MRP: ${item?.price}
            </Text>
            <View style={styles.gap} />

            <Text style={{ color: Colors.Black, fontSize: 15, fontWeight: '500' }}>
              Description
            </Text>

            {!isSeller && (
              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  backgroundColor: '#488C20',
                  padding: 10,
                  margin: 10,
                  borderRadius: 23,
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  width: '100%'
                }}
                onPress={() => navigation.navigate(RoutePaths.ChatScreenListing, { mid: user_Info?.mid, lid: item?.lid, seller_id: item?.seller_id })}
                underlayColor={Colors.Green}
              >
                <Text style={{ color: Colors.White }}>Chat Now</Text>
              </TouchableHighlight>
            )}
          </View>
          <Text style={{ margin: 10, color: Colors.Black, fontSize: 14 }}>{item?.description}</Text>

          <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', marginBottom: 5, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', marginBottom: 5, justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.Black }}>Posted By</Text>
              <View style={styles.gap} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{ uri: picUrl }} style={styles.circularCardImage} />
                <Text style={{ color: Colors.Black }}>{item?.seller_name}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginBottom: 5, justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.Black }}>Service Area</Text>
              <View style={styles.gap} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MaterialIcons name="location-on" size={14} color="white" style={styles.locationIcon} />
                <View style={styles.gap1} />
                <Text style={{ color: Colors.Black }}>{item?.service_area}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between' }}>
            <Text style={[styles.txt,]}>
              Similar listings                  </Text>
          </View>

          <ScrollView horizontal={true}>
            <CommonHomeList
              isHorizontal={true}
              data={marketPlaceList}
              renderItem={(item, index) => {
                return (
                  <MarketPlaceCard
                    data={item.item}
                    onPress={() =>
                      _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                    }
                  />
                );
              }}
            />
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};

export default MarketPlaceDetails;

const styles = StyleSheet.create({
  gap: {
    height: 10
  },
  gap1: {
    width: 10
  },
  circularCardImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 20,
  },
  locationIcon: {
    backgroundColor: '#488C20',
    borderRadius: 40,
    padding: 6,
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Black,
  },
});