import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from 'react-native';
import Colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vw } from '../util/dimenstions';
import { useNavigation } from '@react-navigation/native';
import RoutePaths from '../Navigations/RoutePaths';
import { useSelector } from 'react-redux';
import axios from 'axios';

const HomeServiceCard = ({ data, onPress }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const { user_Info } = useSelector(state => state.home);

  const handleHeartClick = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const mid = user_Info?.mid;
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

  const handlePress = () => {
    const route =
      data.item_category === 'prodcat'
        ? RoutePaths.ProductServiceDetails
        : RoutePaths.HomeServiceDetails;

    navigation.navigate(route, { data });
  };

  const getViewCount = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const pid = data?.pid;

      const response = await axios.get(
        `http://139.59.236.50:8080/api/view_Product?pid=${pid}`,
        {
          headers: {
            'api-key': apiKey,
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

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const likedProducts = await getLikedProducts();
        if (likedProducts && likedProducts.pid) {
          const isProductLiked = likedProducts.pid.includes(data?.pid);
          setIsLiked(isProductLiked);
        }
      } catch (error) {
        console.error('Error fetching liked products:', error.message);
      }
    };
  
    const fetchViewCount = async () => {
      try {
        await getViewCount();
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

      const response = await axios.get(`http://139.59.236.50:8080/api/liked-products?mid=${mid}`, {
        headers: {
          'api-key': apiKey,
        },
      });

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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <ImageBackground
          source={data?.thumbnail_image ? { uri: data?.thumbnail_image } : null}
          style={styles.img}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.likeContainer}
          >
            <Ionicons
              name="heart"
              size={18}
              color={isLiked ? Colors.appred : Colors.White}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <View style={styles.titleAndOldPriceContainer}>
            {data?.rating && (
              <View
                style={{
                  width: 40,
                  height: 18,
                  justifyContent: 'space-around',
                  backgroundColor: Colors.appOrange,
                  borderRadius: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14, color: Colors.White, fontWeight: '600' }}>
                  {data?.rating}
                </Text>
                <Ionicons name="star" size={15} color={Colors.White} />
              </View>
            )}
            <Text style={styles.txt}>{data?.product_name}</Text>
            {data?.unit_price && (
              <Text style={styles.oldPriceText}>
                ${data?.unit_price}
              </Text>
            )}
          </View>
          <View style={styles.priceAndReviewContainer}>
            {data?.selling_price && (
              <Text style={styles.priceText}>
                ${data?.selling_price}
              </Text>
            )}
          </View>
          {data?.discount && (
            <View style={styles.discountContainer}>
              <Ionicons
                name="pricetag"
                size={18}
                color="#09ABDC"
                style={styles.discountIcon}
              />
              <Text style={styles.discountText}>
                Save up to {data?.discount}% off
              </Text>
            </View>
          )}
          {viewCount > 0 && (
            <View style={styles.viewCountContainer}>
              <Ionicons
                name="eye-outline"
                size={18}
                color={Colors.Gray}
                style={styles.viewCountIcon}
              />
              <Text style={styles.viewCountText}>
                {viewCount} views
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    margin: vw(5),
    padding: vw(10),
    width: vw(190),
  },
  cardContainer: {
    backgroundColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    height: vw(300),
    width:vw(190),
    position: 'relative',
  },
  img: {
    width: '100%',
    height: vw(130),
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
    fontSize:14
  },
  titleAndOldPriceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: vw(5),
  },
  oldPriceText: {
    fontSize: vw(14),
    textDecorationLine: 'line-through',
    color: Colors.Gray,
    marginRight: vw(5),
  },
  priceAndReviewContainer: {
    flexDirection: 'row',
  
    alignItems: 'center',
  },
  priceText: {
    color: '#13AE3F',
    fontSize: vw(16),
  },
  reviewText: {
    fontSize: vw(14),
    color: Colors.Gray,
    marginLeft: vw(5),
    fontWeight: '600',
  },
  viewingContainer: {
    marginTop: vw(10),
    padding: vw(10),
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.Gray,
    alignItems: 'center',
  },
  viewingText: {
    fontSize: vw(12),
    fontWeight: '300',
    color: 'Colors.Gray',
    marginLeft: vw(10),
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vw(5),
  },
  discountIcon: {
    marginRight: vw(5),
  },
  discountText: {
    color: '#09ABDC',
    fontSize: vw(14),
    fontWeight: '600',
  },
  viewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vw(5),
  },
  viewCountIcon: {
    marginRight: vw(5),
  },
  viewCountText: {
    color: Colors.Gray,
    fontSize: vw(14),
    fontWeight: '600',
  },
});

export default HomeServiceCard;

