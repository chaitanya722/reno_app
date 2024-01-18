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
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import RoutePaths from '../../../Navigations/RoutePaths';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../services/environment';

const BookingHsm = ({ route }) => {
  const [siteAddress, setSiteAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);

  const { user_Info } = useSelector(state => state.home);
  const { pid } = route.params;
  const navigation = useNavigation();

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const showSuccessModal = () => setSuccessModalVisible(true);
  const hideSuccessModal = () => setSuccessModalVisible(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = time => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  useEffect(() => {
    if (pid) {
      fetch(`${BASE_URL}getProduct_hsm?pid=${pid}`, {
        method: 'GET',
        headers: {
          'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      })
        .then(response => response.json())
        .then(data => {
          setProjectDetails(data.product);
        })
        .catch(error => {
          console.error('Error fetching project details:', error);
        });
    }
  }, [pid]);

  const handlePhotoUpload = () => {
    if (photos.length >= 3) {
      return;
    }

    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
    })
      .then(response => {
        const remainingSlots = 3 - photos.length;
        const selectedImages = response
          .slice(0, remainingSlots)
          .map(photo => photo.path);
        setPhotos([...photos, ...selectedImages]);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleSubmit = async () => {
    if (!agreeTerms) {
      return;
    }

    const formData = new FormData();
    formData.append('mid',user_Info?.mid)
    formData.append('user', user_Info.uname);
    formData.append('title', projectDetails.project_name);
    formData.append('venue', siteAddress);
    formData.append('phone', contactNo);
    formData.append('date', selectedDate.toISOString().split('T')[0]);
    formData.append('time', selectedTime);
    formData.append('desc', description);
    formData.append('consultant', 'not assigned');
    formData.append('price', projectDetails.project_rate);
    formData.append('status', 'Pending');

    photos.forEach((photo, index) => {
      formData.append(`image${index + 1}`, {
        uri: photo,
        type: 'image/jpeg',
        name: `photo${index + 1}.jpg`,
      });
    });

    try {
      const response = await fetch(
        'https://apis.devcorps.in/addbooking_hsm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        showSuccessModal();
      } else {
        console.error('Error creating booking:', data.msg);
      }
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20, color: Colors.Black }}>
          Product Summary
        </Text>
        {projectDetails && (
          <View style={styles.productSummaryContainer}>
            <Image
              source={{ uri: projectDetails.thumbnail_image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{projectDetails.product_name}</Text>
              <Text style={styles.productPrice}>{`$${projectDetails.selling_price}`}</Text>
            </View>
          </View>
        )}

        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20, color: Colors.Black }}>
          Booking Details
        </Text>

        <TextInput
          placeholder="Site Address"
          placeholderTextColor={Colors.Gray}
          value={siteAddress}
          onChangeText={(text) => setSiteAddress(text)}
          style={styles.inputField}
        />

        <TextInput
          placeholder="Contact No"
          placeholderTextColor={Colors.Gray}
          value={contactNo}
          onChangeText={(text) => setContactNo(text)}
          keyboardType="numeric"
          style={styles.inputField}
        />

        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.dateAndTimeContainer}
        >
          <Text style={styles.dateAndTimeText}>
            {selectedDate
              ? `Selected Date: ${selectedDate.toDateString()}`
              : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={showTimePicker}
          style={styles.dateAndTimeContainer}
        >
          <Text style={styles.dateAndTimeText}>
            {selectedTime
              ? `Selected Time: ${selectedTime}`
              : 'Select Time'}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Description"
          placeholderTextColor={Colors.Gray}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={4}
          style={styles.inputField}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePhotoUpload}
        >
          <Text style={styles.submitButtonText}>Upload Images</Text>
        </TouchableOpacity>

        <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 10 }}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={{ width: 100, height: 100, marginHorizontal: 5 }}
            />
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>
          <CheckBox
            value={agreeTerms}
            onValueChange={() => setAgreeTerms(!agreeTerms)}
            tintColors={{ true: '#488C20', false: Colors.Black }}
          />
          <Text style={{ marginLeft: 8, color: Colors.Gray, fontSize: 13 }}>I agree to terms and conditions, and accept the privacy policy </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !agreeTerms && { backgroundColor: Colors.Gray }]}
          onPress={handleSubmit}
          disabled={!agreeTerms}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        {/* Success Modal */}
        <Modal isVisible={isSuccessModalVisible}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 40,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 ,color:'#000'}}>
              Booking created successfully!
            </Text>
            <TouchableOpacity
              onPress={() => {
                hideSuccessModal();
                navigation.navigate(RoutePaths.ChekoutHsm, { pid: pid });
              }}
            >
 <Text style={{ fontSize: 16,fontWeight:'#600',color:'#488C20' }}>Proceed to Checkout</Text>
             </TouchableOpacity>
          </View>
        </Modal>
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
};

export default BookingHsm;
