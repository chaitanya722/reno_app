import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { BASE_URL } from '../../../services/environment';
import Colors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { BottomSheet } from 'react-native-elements';
import { useSelector } from 'react-redux';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [productStates, setProductStates] = useState({});
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewSuccessModalVisible, setReviewSuccessModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user_Info } = useSelector(state => state.home);

  const userMid = user_Info?.mid;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `${BASE_URL}getOrderHistory_crm?mid=${userMid}`;
        const response = await fetch(url, {
          headers: {
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        });
        const result = await response.json();

        if (result.success) {
          const initialProductStates = {};
          result.orders.forEach((order) => {
            order.products.forEach((product) => {
              initialProductStates[product.pid] = { rating: 0, selectedProduct: null, isReviewModalVisible: false };
            });
          });
          setProductStates(initialProductStates);
          setOrders(result.orders);
        } else {
          console.error('Failed to fetch orders:', result.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isBottomSheetVisible) {
        setBottomSheetVisible(false);
        return true; // Prevent default action (exit app)
      }
      return false; // Default action (exit app)
    });

    return () => backHandler.remove();
  }, [isBottomSheetVisible]);

  const openBottomSheet = (product) => {
    setSelectedProduct(product);
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const toggleBottomSheet = (product) => {
    if (isBottomSheetVisible) {
      closeBottomSheet();
    } else {
      openBottomSheet(product);
    }
  };

  const handleStarClick = (index, product) => {
    setProductStates((prevProductStates) => ({
      ...prevProductStates,
      [product.pid]: { rating: index + 1, selectedProduct: product, isReviewModalVisible: false },
    }));
  };

  const toggleReviewModal = (product) => {
    setProductStates((prevProductStates) => ({
      ...prevProductStates,
      [product.pid]: { ...prevProductStates[product.pid], isReviewModalVisible: !prevProductStates[product.pid].isReviewModalVisible },
    }));
  };

  const toggleReviewSuccessModal = () => {
    setReviewSuccessModalVisible(!reviewSuccessModalVisible);
  };

  const submitReview = async () => {
    try {
      const formData = new FormData();
      formData.append('mid', userMid);
      formData.append('pid', selectedProduct.pid);
      formData.append('product_name', selectedProduct.product_name);
      formData.append('username', user_Info?.uname);
      formData.append('review', reviewText);
      formData.append('rating', productStates[selectedProduct.pid].rating.toString());
  
      const url = `https://apis2.devcorps.in/api/addreview_hsm`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
     
      const result = await response.json();
  
      if (result.success) {
        closeBottomSheet();
        setReviewText('');
        setReviewSuccessModalVisible(true); // Show the review success modal
        console.log('Selected product:', selectedProduct);
console.log('Rating:', productStates[selectedProduct.pid].rating.toString());

      } else {
        console.error('Failed to submit review:', result.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };
  

  const renderReviewSuccessModal = () => (
    <Modal isVisible={reviewSuccessModalVisible}>
      <View style={styles.reviewSuccessModal}>
        <Text style={styles.reviewSuccessText}>Review created successfully!</Text>
        <TouchableOpacity style={styles.okButton} onPress={toggleReviewSuccessModal}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderStars = (product) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarClick(i, product)}>
          <Ionicons
            name={i < productStates[product.pid].rating ? 'star' : 'star-outline'}
            size={24}
            color={i < productStates[product.pid].rating ? 'FFD700' : Colors.Gray}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderProductItem = ({ item: product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: product.photo }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.product_name}</Text>
        <View style={styles.row}>
          <Text style={styles.productPrice}>$ {product.price}</Text>
          <Text style={styles.productPrice}>13 Nov 2023</Text>
        </View>
        <View style={styles.rateContainer}>
          {renderStars(product)}
          <TouchableOpacity style={styles.rateButton} onPress={() => toggleBottomSheet(product)}>
            <Text style={styles.rateButtonText}>Rate this product</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.productDate}>{product.date}</Text>

      {/* Review Modal */}
      <Modal isVisible={productStates[product.pid].isReviewModalVisible}>
        <View style={styles.reviewModal}>
          <TextInput
            placeholder="Write your review..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            style={styles.reviewInput}
          />
          <TouchableOpacity style={styles.submitReviewButton} onPress={submitReview}>
            <Text style={styles.submitReviewButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );

  const renderBottomSheet = () => (
    <BottomSheet
      isVisible={isBottomSheetVisible}
      containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      onBackButtonPress={closeBottomSheet}
    >
      <View style={styles.bottomSheetContainer}>
        {/* Close Icon */}
        <TouchableOpacity style={styles.closeIcon} onPress={closeBottomSheet}>
          <Ionicons name="close" size={24} color="red" />
        </TouchableOpacity>

        {/* Your existing content */}
        <TextInput
          placeholder="Write your review..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          style={styles.reviewInput}
        />
        <TouchableOpacity style={styles.submitReviewButton} onPress={submitReview}>
          <Text style={styles.submitReviewButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );

  const renderItemFunction = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order id -#{item.oid}</Text>
      <FlatList data={item.products} renderItem={renderProductItem} keyExtractor={(product) => product.pid} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={orders} renderItem={renderItemFunction} keyExtractor={(item) => item.oid} contentContainerStyle={{ paddingVertical: 16 }} />
      <View style={styles.gap} />
      {renderBottomSheet()}
      {renderReviewSuccessModal()}
    </View>
  );
};
const handleStarClick = (index, product) => {
  setProductStates((prevProductStates) => ({
    ...prevProductStates,
    [product.pid]: { rating: index + 1, selectedProduct: product, isReviewModalVisible: false },
  }));
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
    color: Colors.Gray,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
    color: Colors.Black,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#488C20',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rateButton: {
    backgroundColor: '#488C20',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  productDate: {
    fontSize: 14,
    color: '#777',
  },
  gap: {
    height: 15,
  },
  reviewModal: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  reviewInput: {
    height: 100,
    borderColor: Colors.Gray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    color: '#000',
  },
  submitReviewButton: {
    backgroundColor: '#488C20',
    paddingVertical: 8,
    borderRadius: 4,
  },
  submitReviewButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 3,
    right: 6,
    zIndex: 1,
    color: 'red',
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 30, // Adjust the padding to increase the size
    borderRadius: 16, // Adjust the borderRadius if needed
  },
  reviewSuccessModal: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewSuccessText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  okButton: {
    backgroundColor: '#488C20',
    paddingVertical: 8,
    borderRadius: 4,
    width:50
  },
  okButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default OrdersScreen;
