import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../../constants/colors';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../services/environment';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import RoutePaths from '../../../Navigations/RoutePaths';


const CheckoutCart= ({ route }) => {
  const navigation = useNavigation();

  const { pid, totalAmount } = route.params;
  const [cartProducts, setCartProducts] = useState([]);

  const [projectDetails, setProjectDetails] = useState(null);

  const { user_Info } = useSelector(state => state.home);
  const [isEditingAddress, setEditingAddress] = useState(false);
  const [siteAddress, setSiteAddress] = useState(
    '123 Main Street, Cityville, Country'
  );
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Net Banking');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [isOrderPlacedModalVisible, setOrderPlacedModalVisible] = useState(false);


  
  const handleEditAddress = () => {
    setEditingAddress(true);
  };

  const [isSavedModalVisible, setSavedModalVisible] = useState(false);

  const handleSaveAddress = () => {
    // Save the updated address
    setEditingAddress(false);
    // You can also make an API call to save the updated address here

    // Show the "Saved" modal
    setSavedModalVisible(true);
  };
  
  const handleOrderPlaced = () => {
    // Show the "Order Placed" modal
    setOrderPlacedModalVisible(true);
  };

  const handleOrderPlacedModalClose = () => {
    // Close the "Order Placed" modal
    setOrderPlacedModalVisible(false);

    navigation.navigate(RoutePaths.OrdersScreen);

    // Optionally, navigate to the success screen or perform any other actions
  };

  const togglePaymentMode = (mode) => {
    // Implement your logic for toggling payment mode here
    setSelectedPaymentMode(mode);
  };

  const handleModalClose = () => {
    // Close the "Saved" modal
    setSavedModalVisible(false);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };
  useEffect(() => {
    // Fetch cart details
    fetchCartDetails();
  }, []);


  const fetchCartDetails = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

      const mid = user_Info?.mid;
      const response = await fetch(`https://apis2.devcorps.in/api/cart_hsm?mid=${mid}`, {
        headers: { 'api-key': apiKey },
      });
      const data = await response.json();

      if (data.success) {
        // Fetch details for each product in the cart
        const products = await Promise.all(data.products.map(async (product) => {
          const productDetails = await fetchProductDetails(product.pid);
          return {
            ...productDetails,
            count: product.count,
          };
        }));

        setCartProducts(products);
      } else {
        console.error('Failed to fetch cart details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching cart details:', error.message);
    }
    return products;
  };
 
  const fetchProductDetails = async (pid) => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

      const response = await fetch(`${BASE_URL}getProduct_hsm?pid=${pid}`, {
        headers: { 'api-key': apiKey },
      });
      const data = await response.json();

      if (data.success) {
        return data.product;
      } else {
        console.error('Failed to fetch product details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product details:', error.message);
    }
  };

  
  
      const placeOrder = async () => {
        try {
          // Fetch details for each product in the cart
          const productsData = await Promise.all(
            cartProducts.map(async (product) => {
              const productDetails = await fetchProductDetails(product.pid);
              return {
                pid: productDetails.pid,
                product_name: productDetails.product_name,
                price: productDetails.selling_price,
                photo: productDetails.thumbnail_image,
                count: product.count,
                reward_points: productDetails.reward_points,
              };
            })
          );
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
          const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
          // Construct the order data
          const orderData = {
            amount: totalAmount,
            currency: "SGD",
            email: user_Info?.email,
            phone: user_Info?.phn,
            name: user_Info?.uname,
            payment_methods: ["paynow_online"],
            purpose: cartProducts.map((product) => product.product_name).join(', '),
            expires_after: "5 mins",
            Odata: {
              mid: user_Info?.mid,
              amount: totalAmount,
              payment_mode: "Online",
              tracking_id: `TRACK${totalAmount}`,
              delivery_status: "Pending",
              payment_status: "pending",
              email: user_Info?.email,
              shipping_addr: "US, Washington DC, London 445423 USA", 
              contact: user_Info?.phn,
              uname: user_Info?.uname,
              coupon: "0 ",
              shipping: "25",
              subtotal: "97.00", 
              tax: "8", 
              products: productsData,
              date: formattedDate,
              time: formattedTime,
            },
            points: {
              mid: user_Info?.mid,
              camt: user_Info?.cashback_points,
              ramt: user_Info?.reward_points,
            },
          };
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const response = await fetch('https://apis.devcorps.in/payment-request', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      // Handle the API response result here
      console.log('Payment API Response:', result);

      handleOrderPlaced();
    } catch (error) {
      console.error('Error placing order:', error.message);
      // Handle error appropriately (e.g., show an error message)
    }
  };
  



  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
      

        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 20,
            color: Colors.Black,
          }}
        >
          Billing Details
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 20, color: Colors.Gray }}>
          Total Amount: {totalAmount} 
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 20, color: Colors.Black }}>
          Products Summary:
        </Text>

        {cartProducts.map((product) => (
        <View key={product.pid} style={styles.productContainer}>
          <Image source={{ uri: product.thumbnail_image }} style={styles.productImage} />
          <View style={styles.productDetails}>
           
            <Text style={styles.productName}>{product.product_name}</Text>
             <Text style={styles.actualPrice}>{`$${(
                parseFloat(product.unit_price)
              ).toFixed(2)}`}</Text>
              <Text style={styles.discountedPrice}>{`$${parseFloat(
                product.selling_price
              ).toFixed(2)}`}</Text>
               <Text style={styles.discountText}>
                {product.discount_type === 'amount'
                  ? `S$ ${parseFloat(product.discount).toFixed(2)} off`
                  : `${parseFloat(product.discount).toFixed(2)} % off`}
              </Text>
       
            <View style={styles.quantityContainer}>
             
              <Text style={styles.productQuantity}>{`${product.count}`}</Text>
              
            </View>
          </View>
        </View>
      ))}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            marginBottom: 20,
            color: Colors.Gray,
          }}
        >
          Deliver to
        </Text>

        <View style={styles.selectedAddressContainer}>
          <View style={styles.selectedAddressTile}>
            <View style={styles.selectedAddressIndicator} />
          </View>
          {isEditingAddress ? (
            <View style={styles.editAddressContainer}>
              <TextInput
                style={styles.editAddressInput}
                value={siteAddress}
                onChangeText={setSiteAddress}
              />
              <TouchableOpacity onPress={handleSaveAddress}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ marginLeft: 10, fontSize: 14, color: Colors.Black }}>
              {siteAddress}
            </Text>
          )}
        </View>

        {!isEditingAddress && (
          <TouchableOpacity
            style={styles.editAddressButton}
            onPress={toggleBottomSheet}
          >
            <Text style={styles.editAddressButtonText}>Edit address</Text>
          </TouchableOpacity>
        )}

        <Modal
          isVisible={isBottomSheetVisible}
          onBackdropPress={toggleBottomSheet}
          style={styles.bottomSheet}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Edit Address</Text>
            <TextInput
              style={styles.editAddressInput}
              value={siteAddress}
              onChangeText={setSiteAddress}
            />
                      <View style={styles.row}>

            <TouchableOpacity onPress={handleSaveAddress}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Text style={styles.saveButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={isSavedModalVisible} onBackdropPress={handleModalClose}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Saved</Text>
            <TouchableOpacity onPress={handleModalClose}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
          </View>

        </Modal>

        <View style={styles.gap} />

        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 20,
            color: Colors.Gray,
          }}
        >
          Get it by
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            marginBottom: 20,
            marginTop: -5,
            color: Colors.Gray,
          }}
        >
          04 Nov 2023, 4:30 pm
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 20,
            color: Colors.Gray,
          }}
        >
          Payment mode
        </Text>

        <View style={styles.paymentModeContainer}>
          <TouchableOpacity
            style={styles.paymentModeButton}
            onPress={() => togglePaymentMode('Net Banking')}
          >
            <CheckBox
              value={selectedPaymentMode === 'Net Banking'}
              onValueChange={() => togglePaymentMode('Net Banking')}
              tintColors={{ true: '#488C20', false: '#488C20' }}
            />
            <Text style={styles.paymentModeText}>paynow_online</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentModeButton}
            onPress={() => togglePaymentMode('Card')}
          >
            <CheckBox
              value={selectedPaymentMode === 'Card'}
              onValueChange={() => togglePaymentMode('Card')}
              tintColors={{ true: '#488C20', false: '#488C20' }}
            />
            <Text style={styles.paymentModeText}>card</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ContinueButton} onPress={placeOrder}>
          <Text style={styles.submitButtonText}>Place Order </Text>
        </TouchableOpacity>
        <Modal
        isVisible={isOrderPlacedModalVisible}
        onBackdropPress={handleOrderPlacedModalClose}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Order Placed</Text>
          <TouchableOpacity onPress={handleOrderPlacedModalClose} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    </ScrollView>
  );
};

const styles = {
  discountText: {
    fontSize: 12,
    color: '#FF4500', // Orange color for discount text
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white', // Set white background
    borderRadius: 10, // Optional: Add border radius for rounded corners
    padding: 10, // Optional: Add padding for spacing
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
 
  productImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.Black,
  },
  productPrice: {
    fontSize: 14,
    color: '#488C20',
    fontWeight: '600',
  },
  productQuantity: {
    fontSize: 14,
    color: Colors.Gray,
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
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center', 
  },
  submitButtonText: {
    color: Colors.White,
    fontSize: 15,
  },
  saveButtonText: {
    color: '#488C20',
    fontSize: 15,
  },
  ContinueButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 23,
    marginTop: 10,
    alignItems: 'center', 
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
  selectedAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedAddressTile: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: '#488C20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAddressIndicator: {
   
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.White,
  },

  productSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.Black,
  },
  productPrice: {
    fontSize: 14,
    color: '#488C20',
    fontWeight: '600',
  },
  editAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:8
  },
  editAddressInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
    borderColor: Colors.Green,
    color:Colors.Black
  },
  saveButtonText: {
    color: Colors.Green,
    fontSize: 14,
    fontWeight: '600',
  },
 
 
 
  gap:{
    height:20
  },
  editAddressButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editAddressButtonText: {
    color: Colors.White,
    fontSize: 15,
  },

  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetContent: {
    backgroundColor: Colors.White,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  row:{flexDirection:'row',padding:32},
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.Black,
  },
  editAddressInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    borderColor: Colors.Green,
    color: Colors.Black,
  },
  saveButtonText: {
    color: Colors.Green,
    fontSize: 14,
    fontWeight: '600',
  },

  paymentModeContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  paymentModeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  selectedPaymentMode: {
    backgroundColor: '#488C20', // Change the color as needed
  },
  paymentModeText: {
    color: Colors.Black,
    fontSize: 14,
    marginLeft: 10,
  },
  checkbox: {
    color: '#488C20', // Set the checkbox color to green
  },
  checkedCheckbox: {
    color: '#488C20', // Set the checked checkbox color to darker green
  },
  
  saveButtonText: {
    color: '#488C20',
    fontSize: 15,
    fontWeight: '600',
    marginRight:100
  },
  cancelButtonText: {
    color: '#488C20',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.Black,
  },
  okButton: {
    backgroundColor: '#3c9429',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  okButtonText: {
    color: Colors.White,
  },
};

export default CheckoutCart;
