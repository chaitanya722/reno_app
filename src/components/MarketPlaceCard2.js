import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vw } from '../util/dimenstions';
import axios from 'axios';

const MarketPlaceCard2 = ({ data, onPress }) => {
  const [picUrl, setPicUrl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { user_Info } = useSelector(state => state.home);

  const getLikedProductsByLid = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid;

      const response = await axios.get(
        `http://139.59.236.50:8080/api/liked-products?mid=${mid}`,
        {
          headers: {
            'api-key': apiKey,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        return result.likedItems;
      } else {
        console.error('Failed to fetch liked products:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching liked products:', error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const likedProducts = await getLikedProductsByLid();
        if (likedProducts && likedProducts.lid) {
          const isProductLiked = likedProducts.lid.includes(data?.lid);
          setIsLiked(isProductLiked);
        }
      } catch (error) {
        console.error('Error fetching liked products:', error.message);
      }
    };

    fetchLikedProducts();
  }, [data?.lid]);

  const handleHeartClick = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid;
      const lid = data?.lid;

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

      if (result.success) {
        // Toggle the liked state
        setIsLiked(!isLiked);
      } else {
        console.error('Failed to like the showcase:', result.message);
      }
    } catch (error) {
      console.error('Error liking the showcase:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <ImageBackground source={{ uri: data?.thumbnail_photo }} style={styles.img}>
        <TouchableOpacity onPress={handleHeartClick} style={styles.likeContainer}>
          <Ionicons
            name="heart"
            size={18}
            color={isLiked ? Colors.appred : Colors.White}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <Text style={styles.txt}>{data?.title}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.pricetxt}>${data?.price}</Text>
          <Text style={styles.viewingText}>3 people viewing</Text>
        </View>
        <View style={styles.bottomRow}>
          <Image source={{ uri: picUrl }} style={styles.circularImage} />
          <Text style={styles.bottomRowText}>{data?.seller_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: vw(12),
    padding: 10,
    width: 200,
    overflow: 'hidden',
    backgroundColor:'#ffffff'
  },
  img: {
    width: 200,
    height: 140,
    alignSelf: 'center',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.Gray,
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 12,
  },
  txt: {
    color: Colors.Gray,
    marginTop: 10,
  },
  pricetxt: {
    color: Colors.appred,
    fontSize: 18,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  viewingText: {
    color: Colors.Gray,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  circularImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  bottomRowText: {
    color: Colors.Gray,
  },
});

export default MarketPlaceCard2;