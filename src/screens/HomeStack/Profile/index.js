import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/colors';
import ProfileCard from '../../../components/ProfileCard';
import { useSelector } from 'react-redux';
import RoutePaths from '../../../Navigations/RoutePaths';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Modalize } from 'react-native-modalize';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
const Profile = () => {
  const { user_Info } = useSelector((state) => state.home);

  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const apiKey = '90bd6f5b-033f-42e7-8e92-2a443dfa42f8'

  const openBottomSheet = () => {
    modalizeRef.current?.open();
  };

  const handleVideoUpload = async () => {
    if (!selectedVideo || !agreeTerms) {
      return;
    }

   

    const formData = new FormData();
    formData.append('mid', user_Info?.mid);
    formData.append('video', {
      uri: selectedVideo.path,
      type: selectedVideo.mime,
      name: selectedVideo.filename || 'video.mp4',
    });

    try {
      const response = await fetch('https://apis.devcorps.in/applyKYC', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      // Handle the result as needed
      console.log('Upload Result:', result);

      // Clear the selected video and close the modal
      setSelectedVideo(null);
      setAgreementChecked(false);
      modalizeRef.current?.close();
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

 
  
  const handleChooseVideo = async () => {
    try {
      const response = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
      });

      if (response.path) {
        setSelectedVideo(response);
      }
    } catch (error) {
      console.error('Error selecting video:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {user_Info?.pic_url ? (
            <Image source={{ uri: user_Info?.pic_url }} style={styles.circularCardImage} />
          ) : (
            <Text style={styles.circularCardText}>
              {user_Info?.fname ? user_Info?.fname[0].toUpperCase() : 'S'}
            </Text>
          )}
          <View style={styles.gap} />
          <View style={styles.nameContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.welcome}>Welcome {user_Info?.fname}!</Text>
              <MaterialIcons name={'verified-user'} size={20} color="#0C67C2" />
            </View>
            <Text style={styles.name}>@{user_Info?.uname}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.name}>{user_Info?.bio}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Divider />
        <View style={styles.box}>
          <ProfileCard heading={'Email Address'} title={user_Info?.email} />
        </View>
        <View style={styles.box}>
          <ProfileCard heading={'Phone No.'} title={user_Info?.phn} />
        </View>
        <View style={styles.box}>
          <ProfileCard heading={'Gender'} title={user_Info?.gender} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Details</Text>
        <Divider />
        <View style={styles.box}>
          <ProfileCard heading={'City'} title={user_Info?.country} />
        </View>
        <View style={styles.box}>
          <ProfileCard heading={'ZipCode'} title={user_Info?.zipcode} />
        </View>
        <View style={styles.box}>
          <ProfileCard heading={'Address'} title={user_Info?.address} />
        </View>
        <TouchableHighlight
          style={{
            alignItems: 'center',
            backgroundColor: '#488C20',
            padding: 10,
            margin: 10,
            borderRadius: 4,
            alignSelf: 'center',
            textDecorationLine: 'underline',
            width: '100%',
          }}
          onPress={openBottomSheet}
          underlayColor={Colors.Green}>
          <Text style={{ color: Colors.White, fontWeight: '400' }}>Complete KYC Verification</Text>
        </TouchableHighlight>
      </View>

      {/* Bottom Sheet */}
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        adjustToContentHeight
        handlePosition="inside">
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetTitle}>KYC Information</Text>
          <View style={styles.bottomSheetItem}>
            <Text style={styles.bottomSheetLabel}>Name:</Text>
            <Text style={styles.bottomSheetValue}>
              {user_Info?.fname} {user_Info?.lname}
            </Text>
          </View>
          <View style={styles.bottomSheetItem}>
            <Text style={styles.bottomSheetLabel}>Phone:</Text>
            <Text style={styles.bottomSheetValue}>{user_Info?.phn}</Text>
          </View>
          <View style={styles.bottomSheetItem}>
            <Text style={styles.bottomSheetLabel}>Email:</Text>
            <Text style={styles.bottomSheetValue}>{user_Info?.email}</Text>
          </View>
          <View style={styles.bottomSheetItem}>
            <Text style={styles.bottomSheetLabel}>Address:</Text>
            <Text style={styles.bottomSheetValue}>{user_Info?.address}</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleChooseVideo}>
            <Text style={styles.uploadButtonText}>Upload Video KYC</Text>
          </TouchableOpacity>

          {/* Display selected video details */}
          {selectedVideo && (
            <View style={styles.selectedVideoContainer}>
              <Text style={styles.selectedVideoText}>Selected Video:</Text>
              <Text>{selectedVideo.path}</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>
          <CheckBox
            value={agreeTerms}
            onValueChange={() => setAgreeTerms(!agreeTerms)}
            tintColors={{ true: '#488C20', false: Colors.Black }}
          />
          <Text style={{ marginLeft: 8, color: Colors.Gray, fontSize: 13 }}>I agree to terms and conditions, and accept the privacy policy </Text>
        </View>

          <TouchableOpacity
style={[styles.submitButton, !agreeTerms & { backgroundColor: Colors.Gray }]}
onPress={handleVideoUpload}
        
            >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </ScrollView>
  );
};


const Divider = () => <View style={styles.divider} />;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginLeft: 15,
  },
  submitButtonText: {
    color: Colors.White,
    fontSize: 15,
  },
  selectedVideoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.LightGray,
    borderRadius: 5,
  },
  selectedVideoText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    marginBottom: 5,
  },

  headerContainer: {
    padding: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.Gray,
  },
  submitButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'column',

    paddingVertical: 20,
    borderBottomColor: Colors.Gray,
  },

  circularCardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  circularCardText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.White,
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#878787',
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#878787',
  },
  email: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.Gray,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.appOrange,
    marginHorizontal: 5,
    fontWeight: '600',
  },
  verified: {
    fontSize: 14,
    color: Colors.lightgreen,
    marginLeft: 5,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Black,
    marginBottom: 10,
  },
  biotext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0C67C2',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.Gray,
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: Colors.White,
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#488C20',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },

  gap: {
    width: 20,
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bottomSheetTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.Black,
  },
  bottomSheetItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomSheetLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Gray,
  },
  bottomSheetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
  },
});

export default Profile;
