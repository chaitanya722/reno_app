import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image,Modal, TouchableOpacity, StyleSheet, TouchableHighlight, Pressable } from 'react-native';
import Colors from '../../../constants/colors';
import RoutePaths from '../../../Navigations/RoutePaths';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../../components/CommonHeader';
import { BASE_URL } from '../../../services/environment';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector} from 'react-redux';



const CartScreen = () => {
  
  const [cartProducts, setCartProducts] = useState([]);
  const [selOffer, setSelOffer] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [OfferData, setOfferData] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);




  
  useEffect(() => {
    // Fetch cart details
    fetchCartDetails();
  }, []);

  const [cashback, setCashback] = useState(0);
const [reward, setReward] = useState(0);
  const [generalConfig, setGeneralConfig] = useState(null);

  const { user_Info} =
    useSelector(state => state.home);

  useEffect(() => {
    // Fetch general configurations
    fetchGeneralConfig();
  }, []);
  const calculateTotalAmount = () => {
    const subTotal = calculateTotalPrice();
    const savings = calculateSavings();
    const tax = calculateTax();
    const shippingCharges = calculateShippingCharges();
    const deduction = isCashbackSelected ? cashback : isRewardsSelected ? reward : 0;
    const promoDeduction = appliedPromoCode ? parseFloat(appliedPromoCode) : 0;
  
    let totalAmount = subTotal - savings + tax + shippingCharges - deduction;
  
    // Ensure totalAmount is not less than 0
    totalAmount = Math.max(totalAmount, 0);
  
    setTotalAmount(totalAmount);
    return totalAmount
  };
  const applyOffer = (selectedOffer) => {
    // Calculate the deduction based on the selected offer
    const offerDeduction = selectedOffer.offer_type === 'Price'
      ? selectedOffer.price
      : (totalAmount * selectedOffer.price) / 100;
  
    // Deduct the offer value from the total amount
    const updatedTotalAmount = totalAmount - offerDeduction;
  
    setAppliedPromoCode(selectedOffer.promotion_code);
    setTotalAmount(updatedTotalAmount > 0 ? updatedTotalAmount : 0); // Ensure totalAmount is not less than 0
    setModalVisible(false);
    setSelOffer(0);
    setSelectedOffer(selectedOffer); // Set the selected offer
  };
  
  const removeAppliedOffer = () => {
    setAppliedPromoCode(''); // Remove the applied promo code
    setTotalAmount(totalAmount + selectedOffer.price); // Add back the deducted amount
    setSelectedOffer(null); // Reset selected offer
  };
  
  
  
  
  
  const fetchGeneralConfig = async () => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';
      const response = await axios.get(`${BASE_URL}getGeneralConf_cms`, {
        headers: {
          'api-key': apiKey,
        },
      });

      if (response.data.success) {
        setGeneralConfig(response.data.data);
      } else {
        console.error('Failed to fetch general configurations:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching general configurations:', error.message);
    }
  };
  
  const calculateCashback = () => {
    return user_Info?.cashback_points * generalConfig.cashback_rate;
  };

  const calculateRewards = () => {
    return user_Info?.reward_points * generalConfig.reward_rate;
  };



  const calculateTotalPrice = () => {
    return cartProducts.reduce((acc, product) => acc + product.unit_price * product.count, 0);
  };

  const calculateTax = () => {
    // Check if generalConfig is available
    if (generalConfig) {
      const taxPercentage = parseFloat(generalConfig.other_charges);
      return (taxPercentage / 100) * (calculateTotalPrice()-calculateSavings());
    }
    return 0;
  };

  const calculateShippingCharges = () => {
    // Check if generalConfig is available
    if (generalConfig) {
      return parseFloat(generalConfig.shipping_charges);
    }
    return 0;
  };


useEffect(() => {
}, [OfferData])
console.log(OfferData);


  const pid='0ec46cd2319e49d4bfebd8c05aa08eb6'
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
  useEffect(() => {
    calculateTotalAmount();
  }, [cartProducts, cashback, reward, isCashbackSelected, isRewardsSelected]);
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

  const incrementQuantity = async (pid) => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

      const formData = new FormData();
      formData.append('mid',  user_Info?.mid
      );
      formData.append('pid', pid);

      const response = await fetch('https://apis2.devcorps.in/api/cart_hsm', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Update the local state with the new quantity
        setCartProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.pid === pid ? { ...product, count: product.count + 1 } : product
          )
        );
      } else {
        console.error('Failed to increase quantity:', data.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const removeitem = async (pid) => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

      const formData = new FormData();
      formData.append('mid', user_Info?.mid);
      formData.append('pid', pid);

      const response = await fetch('https://apis2.devcorps.in/api/cart_hsm', {
        method: 'DELETE',
        headers: {
          'api-key': apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Update the local state with the new quantity
        setCartProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.pid === pid ? { ...product,  count: product.count - 1  } : product
          )
        );
      } else {
        console.error('Failed to decrease quantity:', data.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelOffer(0); // Reset selected offer when closing the modal
  };
  
  const handleCheckout = () => {
    const totalAmount = calculateTotalAmount();
    navigation.navigate(RoutePaths.ChekoutCart, { totalAmount });
  };


  const handleOffer = async () => {
    const pnames = cartProducts.map((product) => product.product_name);
    console.log(pnames);
  
    try {
      const formData = new FormData();
      formData.append('pname', pnames);
  
      const response = await fetch('https://apis.devcorps.in/view_offers_cart', {
        method: 'POST',
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        setOfferData(responseData.data);
        setModalVisible(true); // Open the modal to view the available offers
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const [isCashbackSelected, setIsCashbackSelected] = useState(false);
  const [isRewardsSelected, setIsRewardsSelected] = useState(false);
  const handleCashback = () => {
    const cashbackValue = calculateCashback();
    if (!isCashbackSelected) {
      // If Cashback is not currently selected, select it
      setCashback(cashbackValue);
      setIsCashbackSelected(true);
  
      // If Rewards is selected, unselect it
      if (isRewardsSelected) {
        setReward(0);
        setIsRewardsSelected(false);
        // Subtract the Rewards amount from the total amount
        setTotalAmount(totalAmount - calculateRewards());
      }
  
      // Subtract the Cashback amount from the total amount
      setTotalAmount(totalAmount - cashbackValue);
    } else {
      // If Cashback is currently selected, unselect it
      setCashback(0);
      setIsCashbackSelected(false);
  
      // Add the Cashback amount back to the total amount
      setTotalAmount(totalAmount + cashbackValue);
    }
  };
  
  // Update handleRewards function
  const handleRewards = () => {
    const rewardsValue = calculateRewards();
    if (!isRewardsSelected) {
      // If Rewards is not currently selected, select it
      setReward(rewardsValue);
      setIsRewardsSelected(true);
  
      // If Cashback is selected, unselect it
      if (isCashbackSelected) {
        setCashback(0);
        setIsCashbackSelected(false);
        // Subtract the Cashback amount from the total amount
        setTotalAmount(totalAmount - calculateCashback());
      }
  
      // Subtract the Rewards amount from the total amount
      setTotalAmount(totalAmount - rewardsValue);
    } else {
      // If Rewards is currently selected, unselect it
      setReward(0);
      setIsRewardsSelected(false);
  
      // Add the Rewards amount back to the total amount
      setTotalAmount(totalAmount + rewardsValue);
    }
  };
  
  
  const decrementQuantity = async (pid) => {
    try {
      const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8';

      const formData = new FormData();
      formData.append('mid', 'ac64d2d7eb9d40819bc72a420d8cb412');
      formData.append('pid', pid);

      // Fetch the current count for the product
      const currentProduct = cartProducts.find((product) => product.pid === pid);
      const currentCount = currentProduct ? currentProduct.count : 0;

      if (currentCount > 1) {
        formData.append('count', (currentCount - 1).toString());

        const response = await fetch('http://139.59.236.50:8080/api/cart_hsm', {
          method: 'PUT',
          headers: {
            'api-key': apiKey,
          },
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          // Update the local state with the new quantity
          setCartProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.pid === pid ? { ...product, count: currentCount - 1 } : product
            )
          );
        } else {
          console.error('Failed to decrement quantity:', data.message);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const calculateSavings = () => {
    // Logic to calculate savings based on your application
    return cartProducts.reduce(
      (acc, product) => acc + (product.discount_type === 'amount' ? product.discount : (product.unit_price * product.discount) / 100) * product.count,
      0
    );
  };
  const removeProduct = async (pid) => {
    // Use the decrementQuantity function to remove the product
    await removeitem(pid);
    // Fetch updated cart details
    fetchCartDetails();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
              <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end' }}>
                <Text style={{ fontSize: 18, color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select an Offer</Text>
              {OfferData.length > 0 ? (
                OfferData.map((item, index) => (
                  <View key={index} style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 19, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={{ fontWeight: '500', fontSize: 12 }}>{item.promotion_title}</Text>
                      <Text>{item.promotion_code}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {item.products.length > 0 &&
                        item.products.map((product, productIndex) => (
                          <View
                            key={productIndex}
                            style={{ backgroundColor: Colors.lightgreen, padding: 5, borderRadius: 5, marginRight: 5, marginBottom: 5 }}
                          >
                            <Text style={{ color: 'white', fontSize: 10 }}>{product}</Text>
                          </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                      <Text style={{ color: '#09ABDC', fontSize: 14 }}>
                        {item.offer_type === 'Price' ? `S$ ${item.price}` : `${item.price} Off`}
                      </Text>
                      {item.promotion_type === 'Shipping' ? (
                        item.minimum_shopping <= totalAmount && item.max_discount_amount >= totalDiscount ? (
                          <TouchableHighlight
                          style={styles.button}
                          onPress={() => {
                            if (appliedPromoCode) {
                              // If an offer is applied, show the option to remove it
                              removeAppliedOffer();
                            } else {
                              // Otherwise, show available offers
                              setModalVisible(!modalVisible);
                              handleOffer();
                            }
                          }}
                          underlayColor={Colors.Green}
                        >
                          <Text style={{ color: Colors.White }}>
                            {appliedPromoCode ? 'Applied' : selOffer ? 'Applied' : 'View Offers'}
                          </Text>
                        </TouchableHighlight>
                        
                        
                        ) : (
                          <Text style={{ color: 'red' }}>Not Applicable</Text>
                        )
                      ) : (
                        <TouchableOpacity
  style={{ backgroundColor: 'green', padding: 8, borderRadius: 5 }}
  onPress={() => applyOffer(item)}
>
  <Text style={{ color: 'white' }}>Apply</Text>
</TouchableOpacity>

                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No Offers Available on these Products</Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
       
     {/* Your Cart Details */}
     <View style={styles.cartDetailsContainer}>
     <Text style={styles.Label}>Your Cart Details</Text>

        <View style={styles.cartDetailsRow}>
          <Text style={styles.cartDetailsLabel}>Sub Total</Text>
          <Text style={styles.cartDetailsAmount}>{`S$ ${calculateTotalPrice().toFixed(2)}`}</Text>
        </View>
        <View style={styles.cartDetailsRow}>
          <Text style={styles.cartDetailsLabel}>Savings</Text>
          <Text style={styles.cartDetailsAmount}>{`- S$ ${calculateSavings().toFixed(2)}`}</Text>
        </View>
        <View style={styles.cartDetailsRow}>
          <Text style={styles.cartDetailsLabel}>Tax</Text>
          <Text style={styles.cartDetailsAmount}>{`+${calculateTax().toFixed(2)}`}</Text>
        </View>
        <View style={styles.cartDetailsRow}>
          <Text style={styles.cartDetailsLabel}>Shipping Charges</Text>
          <Text style={styles.cartDetailsAmount}>{`+ S$ ${calculateShippingCharges().toFixed(2)}`}</Text>
        </View>
      </View>
      
      <View style={styles.gap}/>
      {appliedPromoCode ? (
          // Display applied promo code information
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.cartDetailsLabel}>Promo Code Applied:</Text>
            <Text style={styles.cartDetailsAmount}>{`- ${appliedPromoCode}`}</Text>
          </View>
        ) : (
          // Display Cashback and Reward buttons
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableHighlight
  style={isCashbackSelected ? styles.button1Selected : styles.button1}
  onPress={handleCashback}
  underlayColor={Colors.Green}>
  <Text style={{ color: isCashbackSelected ? Colors.White : Colors.White }}>Cashback</Text>
</TouchableHighlight>

<TouchableHighlight
  style={isRewardsSelected ? styles.button1Selected : styles.button1}
  onPress={handleRewards}
  underlayColor={Colors.Green}>
  <Text style={{ color: isRewardsSelected ? Colors.White : Colors.White }}>Reward</Text>
</TouchableHighlight>
  {isCashbackSelected && (
    <Text style={styles.cashbackRewardTextSelected}>{`      - S$ ${cashback.toFixed(2)}`}</Text>
  )}
  {isRewardsSelected && (
    <Text style={styles.cashbackRewardTextSelected}>{`      - S$ ${reward.toFixed(2)}`}</Text>
  )}
 
</View>



        )}

      <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 5 }}>
    
      <TouchableHighlight
  style={isCashbackSelected || isRewardsSelected ? styles.buttonDisabled : styles.button}
  onPress={() => {
    if (appliedPromoCode) {
      // If an offer is applied, show the option to remove it
      removeAppliedOffer();
    } else if (!(isCashbackSelected || isRewardsSelected)) {
      // Otherwise, show available offers if neither Cashback nor Reward is selected
      setModalVisible(!modalVisible);
      handleOffer();
    }
  }}
  underlayColor={Colors.Gray} // Change underlayColor to Gray when disabled
  disabled={isCashbackSelected || isRewardsSelected} // Disable the button when Cashback or Reward is selected
>
  <Text style={{ color: Colors.White }}>
    {appliedPromoCode ? 'Remove Offer' : selOffer ? 'Remove Offer' : 'View Offers'}
  </Text>
</TouchableHighlight>


        <View style={styles.cartDetailsRow}>
  <Text style={styles.cartDetailsLabel}>Total Amount</Text>
  <Text style={styles.cartDetailsAmount}>{`           S$ ${totalAmount.toFixed(2)}`}</Text>
</View>

        <TouchableHighlight
          style={styles.button}
          onPress={handleCheckout}
          underlayColor={Colors.Green}>
          <Text style={{ color: Colors.White }}>Proceed to Buy</Text>
        </TouchableHighlight>
      </View>
      {cartProducts.map((product) => (
        <View key={product.pid} style={styles.productContainer}>
          <Image source={{ uri: product.thumbnail_image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => removeProduct(product.pid)}>
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
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
              <TouchableOpacity onPress={() => decrementQuantity(product.pid)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productQuantity}>{`${product.count}`}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(product.pid)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
  button: {
    alignItems: 'center',
    backgroundColor: '#488C20',
    padding: 7,
    margin: 10,
    borderRadius: 8,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    width: '100%',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#488C20',
    padding: 7,
    margin: 2,
    borderRadius: 8,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    width: '30%',
  },
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 6,
    marginTop:10,
    marginBottom: 10,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
  },
  totalContainer: {
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    
    color: Colors.Gray,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: Colors.Black,
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
    padding: 20,
    borderRadius: 10,
  },
  offerItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 19,
    marginBottom: 10,
  },
  noOffersText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gap: {
    height: 20,
  },
  actualPrice: {
    fontSize: 14,
    color: Colors.Gray,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 14,
    color: '#488C20',
    fontWeight: '600',
  },
  cartDetailsContainer: {
    marginTop: 20,
    backgroundColor:'white',

    padding:14,
    marginTop:'-15'
  },
  cartDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor:'white',
    padding:8,
    
  },
  cartDetailsLabel: {
    fontSize: 14,
    color: Colors.Gray,
    fontWeight: '400',
  },
  cartDetailsAmount: {
    fontSize: 14,
    color: Colors.Black,
    fontWeight: '600',
  },
   Label: {
    fontSize: 17,
    color: Colors.Gray,
    fontWeight: '500',
    marginBottom:10
  },
  cashbackRewardTextSelected: {
    fontSize: 14,
    fontWeight:'500',
    color: Colors.Black,
  },
  
  button1Selected: {
    alignItems: 'center',
    backgroundColor: Colors.Black,
    padding: 7,
    margin: 2,
    borderRadius: 8,
    alignSelf: 'center',
    width: '30%',
  },
  
});

export default CartScreen;