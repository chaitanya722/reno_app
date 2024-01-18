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


const CheckoutHsm= ({ route }) => {
 
  const { pid } = route.params ;
  const [projectDetails, setProjectDetails] = useState(null);

  const { user_Info } = useSelector(state => state.home);
  const [isEditingAddress, setEditingAddress] = useState(false);
  const [siteAddress, setSiteAddress] = useState(
    '123 Main Street, Cityville, Country'
  );
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Net Banking');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleEditAddress = () => {
    setEditingAddress(true);
  };

  const handleSaveAddress = () => {
    // Save the updated address
    setEditingAddress(false);
    // You can also make an API call to save the updated address here
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };


  useEffect(() => {
    if (pid) {
      fetch(`${BASE_URL}getProduct_hsm?pid=${pid}`, {
        method: 'GET',
        headers: {
          'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the state with project details
          console.log('Project Details:', data.product);
          setProjectDetails(data.product);
        })
        .catch((error) => {
          console.error('Error fetching project details:', error);
        });
    }
  }, [pid]);
 




  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 20,
            color: Colors.Black,
          }}
        >
          Project Summary
        </Text>
        {projectDetails && (
          <View style={styles.productSummaryContainer}>
            <Image
              source={{ uri: projectDetails.thumbnail_image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {projectDetails.product_name}
              </Text>
              <Text style={styles.productPrice}>
                {`$${projectDetails.unit_price}`}
              </Text>
            </View>
          </View>
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 20,
            color: Colors.Gray,
          }}
        >
          Billing Details
        </Text>
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
            <Text style={styles.paymentModeText}>Net Banking</Text>
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
            <Text style={styles.paymentModeText}>Card</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.ContinueButton}
          onPress={null}
        >
          <Text style={styles.submitButtonText}>Continue </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
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
};

export default CheckoutHsm;
