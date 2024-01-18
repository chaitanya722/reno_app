import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Colors from '../../../constants/colors';
import ProjectShowCaseSlider from '../../../components/projectShowCaseSlider';
import { vh } from '../../../util/dimenstions';
import RoutePaths from '../../../Navigations/RoutePaths';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReviewPopup from '../addreview';
import SimilarProductsSectionServ from '../similarProductSER';
import axios from 'axios';
import { useSelector } from 'react-redux';


const HomeServiceDetails = ({ route }) => {
  const { data } = route.params;
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isReviewPopupVisible, setReviewPopupVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { user_Info } = useSelector(state => state.home);


  useEffect(() => {
    fetchReviews();
    checkLikedStatus();
  }, []);

  const toggleHideReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const showAllReviewsButton = reviews.length > 2 && (
    <TouchableHighlight
      style={{
        backgroundColor: '#CFCFCF',
        padding: 6,
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center',
      }}
      onPress={toggleHideReviews}
      underlayColor="#CFCFCF"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <Text style={{ color: 'black', fontWeight: '700' }}>
          {showAllReviews ? 'Hide All Reviews' : 'Show All Reviews'}
        </Text>
        <MaterialIcons name={showAllReviews ? 'expand-less' : 'expand-more'} size={20} color="black" />
      </View>
    </TouchableHighlight>
  );

  const openReviewPopup = () => {
    setReviewPopupVisible(true);
  };

  const closeReviewPopup = () => {
    setReviewPopupVisible(false);
  };

  const submitReview = (reviewData) => {
    console.log('Review Submitted:', reviewData);
    fetchReviews();
  };

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
      if (likedItems && likedItems.pid && likedItems.pid.includes(data?.pid)) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error checking liked status:', error.message);
    }
  };

  const handleLikeClick = async () => {
    // Toggle the liked state
    setIsLiked(!isLiked);

    // You can also send a request to your server to update the like status
    // and count in your database
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid
      const pid = data?.pid;

      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('pid', pid);

      const response = await axios.post(
        'http://139.59.236.50:8080/api/like-pid',
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

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://apis2.devcorps.in/api/getreviews_bypid?pid=${data?.pid}`,
        {
          headers: {
            'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );

      const reviewData = await response.json();

      if (reviewData.success) {
        setReviews(reviewData.reviews);
      } else {
        console.error('Failed to fetch reviews:', reviewData.message);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProjectShowCaseSlider isShareShow={true} data={data?.gallery_images} />
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.Black, fontSize: 17, fontWeight: '700', flex: 1 }}>{data?.product_name}</Text>
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
            MRP: ${data?.selling_price}
          </Text>
          <Text style={{ color: '#3BA617', fontSize: 12, fontWeight: '500' }}>
            <Text style={{ textDecorationLine: 'line-through' }}>
              ${data?.unit_price}
            </Text>
          </Text>
        </View>
        <Text style={{ margin: 10, color: Colors.Black, fontSize: 14 }}>
          {data?.short_desc}
        </Text>
        <TouchableHighlight
          style={{
            alignItems: 'center',
            backgroundColor: '#488C20',
            padding: 10,
            margin: 10,
            borderRadius: 23,
            alignSelf: 'center',
            textDecorationLine: 'underline',
            width: '100%',
          }}
          onPress={() => navigation.navigate(RoutePaths.BookingHsm, { pid: data?.pid })}
          underlayColor={Colors.Green}>
          <Text style={{ color: Colors.White }}>Book Demo</Text>
        </TouchableHighlight>
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
          <Text style={{ color: Colors.Black, fontSize: 15, fontWeight: '400' }}>
            {data?.desc}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ marginRight: '45%', color: Colors.Gray, fontSize: 17 }}>
            Reviews ({reviews.length})
          </Text>
          <Text
            style={{
              marginRight: '45%',
              color: '#488C20',
              fontSize: 14,
              textDecorationLine: 'underline',
            }}
            onPress={openReviewPopup}>
            Write a Review
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Array.from({ length: data.rating }).map((_, index) => (
            <MaterialCommunityIcons key={index} name="star" size={18} color={Colors.appOrange} />
          ))}
        </View>
        <Text style={{ marginRight: '45%', color: Colors.Black, fontSize: 17 }}>
          {data.rating} out of 5
        </Text>
        {reviews
          .slice(0, showAllReviews ? reviews.length : 2)
          .map((review) => (
            <View key={review.rid} style={styles.reviewContainer}>
              <Image source={{ uri: review.review_photo }} style={styles.circularCardImage} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.Gray }}>
                    {review?.username}
                  </Text>
                </View>
                <Text style={{ marginLeft: 2, fontSize: 9, color: '#00819E' }}>verified purchase</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <MaterialCommunityIcons key={index} name="star" size={14} color={Colors.appOrange} />
                  ))}
                </View>
                <Text style={{ color: Colors.Black, fontSize: 14, fontWeight: '400' }}>
                  {review.review}
                </Text>
              </View>
            </View>
          ))}
        {showAllReviewsButton}
        {reviews.length > 2 && showAllReviews && (
          <View>
            {/* Additional reviews can be rendered here */}
          </View>
        )}
      </ScrollView>
      <ReviewPopup visible={isReviewPopupVisible} onClose={closeReviewPopup} onSubmit={submitReview} />
      <SimilarProductsSectionServ />
    </View>
  );
};

export default HomeServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
  },
  
  inputField: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    color: Colors.Black,
    borderColor: Colors.Green,
    borderRadius: 5,
    backgroundColor: Colors.White,
  },
  submitButton: {
    backgroundColor: Colors.lightgreen,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: Colors.green,
  },
  circularCardImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  marginRight:20
    
  },
  dateAndTimeContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Green,
    backgroundColor: Colors.White,
  },
  dateAndTimeText: {
    color: Colors.Black,
  },
  hintText: {
    color: Colors.Gray,
  },

  gap:{
    height:20
  }
});
