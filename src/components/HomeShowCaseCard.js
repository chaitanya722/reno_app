import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { vw } from '../util/dimenstions';


const HomeShowCaseCard = ({ data, onPress }) => {
  const { user_Info } = useSelector(state => state.home);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const likedProducts = await getLikedProducts();
        if (likedProducts && likedProducts.spid) {
          const isProductLiked = likedProducts.spid.includes(data?.pid);
          setIsLiked(isProductLiked);
        }
      } catch (error) {
        console.error('Error fetching liked products:', error.message);
      }
    };

    const fetchViewCount = async () => {
      try {
        const response = await axios.get(
          `http://139.59.236.50:8080/api/view_Product?pid=${data?.pid}`,
          {
            headers: {
              'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
            },
          }
        );

        const result = response.data;

        if (result.success) {
          setViewCount(result.viewCount);
        } else {
          console.error('Failed to fetch view count:', result.message);
        }
      } catch (error) {
        console.error('Error fetching view count:', error.message);
      }
    };

    fetchLikedProducts();
    fetchViewCount();
  }, [data?.pid]);

  const getLikedProducts = async () => {
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
        return {};
      }
    } catch (error) {
      console.error('Error fetching liked products:', error.message);
      return {};
    }
  };

  const handleHeartClick = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid;
      const spid = data?.pid;

      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('spid', spid);

      const response = await axios.post(
        'http://139.59.236.50:8080/api/like-spid',
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
      <View style={styles.cardContainer}>
        <ImageBackground
          source={{ uri: data?.thumbnail_photo }}
          style={styles.img}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.likeContainer}>
            <Ionicons
              name="heart"
              size={18}
              color={isLiked ? Colors.appred : Colors.White}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <Text style={styles.txt}>{data?.project_name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPriceText}>{data?.unit_price}</Text>
            <Text style={styles.priceText}>{data?.selling_price}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.viewingContainer}>
            <Ionicons
              name="eye-outline"
              size={20}
              color={Colors.Black}
            />
            <Text style={styles.viewingText}>{viewCount} views</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => {
                // Handle Learn More button press
              }}>
              <Text style={styles.learnMoreButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  mainContainer: {
    margin: vw(5),
    paddingBottom: vw(10),
    width: vw(192),
  },
  cardContainer: {
    backgroundColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    height: vw(280),
    position: 'relative',
  },
  img: {
    width: '100%',
    height: vw(140),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    width: vw(192),
    paddingLeft: vw(12),
    position: 'absolute',
    bottom: vw(20),
  },
  txt: {
    color: Colors.Gray,
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vw(15),
  },
  oldPriceText: {
    fontSize: vw(14),
    textDecorationLine: 'line-through',
    color: Colors.Gray,
    marginRight: vw(5),
  },
  priceText: {
    color: '#13AE3F',
    fontSize: vw(18),
  },
  viewingContainer: {
    marginBottom: vw(10),
    marginLeft: vw(10),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  viewingText: {
    fontSize: vw(14),
    fontWeight: '400',
    color: Colors.Gray,
    marginLeft: vw(5),
  },
  learnMoreButton: {
    backgroundColor: Colors.appBlue,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginTop: vw(5),
  },
  learnMoreButtonText: {
    color: '#09ABDC',
    fontSize: vw(14),
  },
  bottomRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: vw(10),
    width: '100%',
  },
});

export default HomeShowCaseCard;
