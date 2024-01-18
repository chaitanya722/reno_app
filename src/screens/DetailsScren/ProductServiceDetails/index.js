import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Colors from '../../../constants/colors';
import ProjectShowCaseSlider from '../../../components/projectShowCaseSlider';
import { vh } from '../../../util/dimenstions';
import RoutePaths from '../../../Navigations/RoutePaths';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ProductServiceDetails = ({ route }) => {
  const { data } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const { user_Info } = useSelector(state => state.home);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
        const mid = user_Info?.mid;
        const pid = data?.pid;

        const response = await axios.get(
          `http://139.59.236.50:8080/api/cart_hsm/cart?mid=${mid}&pid=${pid}`,
          {
            headers: {
              'api-key': apiKey,
            },
          }
        );

        const result = response.data;

        if (result.success) {
          setIsInCart(result.existsInCart);
        } else {
          console.error('Failed to check cart status:', result.message);
          // You might want to show an error message to the user
        }
      } catch (error) {
        console.error('Error checking cart status:', error.message);
      }
    };

    checkCartStatus();
  }, [data?.pid])

  const handleAddToCart = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid;
      const pid = data?.pid;

      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('pid', pid);

      const response = await axios.post(
        'http://139.59.236.50:8080/api/cart_hsm',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-key': apiKey,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        // Product added to the cart successfully
        setIsInCart(true);
      } else {
        console.error('Failed to add the product to the cart:', result.message);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error adding the product to the cart:', error.message);
    }
  };


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
        if (likedItems && likedItems.pid && likedItems.pid.includes(data?.pid)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error checking liked status:', error.message);
      }
    };

    checkLikedStatus();
  }, [data?.pid]);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <TouchableHighlight
          style={styles.button}
          onPress={handleAddToCart}
          underlayColor={Colors.Green}
          disabled={isInCart} // Disable button if product is already in the cart
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: Colors.White }}>
              {isInCart ? 'Added in Cart' : 'Add To Cart'}
            </Text>
            {isInCart && <Ionicons name="checkmark" size={20}  color={Colors.White} style={{ marginLeft: 5 }} />}
          </View>
        </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {}}
            underlayColor={Colors.Green}>
            <Text style={{ color: Colors.White }}>Buy Now</Text>
          </TouchableHighlight>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.Black }}>
          Description
        </Text>
        <View style={{ backgroundColor: '#F5F5F5', minHeight: vh(54), padding: 10 }}>
          <Text style={{ color: Colors.Black, fontSize: 15, fontWeight: '400' }}>
            {data?.desc}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  circularCardImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#488C20',
    padding: 10,
    margin: 10,
    borderRadius: 23,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    width: '40%',
  },
  gap: {
    height: 20,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ProductServiceDetails;
