import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView ,Image} from 'react-native';
import axios from 'axios';
import Colors from '../../../constants/colors';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

const EditProfile = ({ navigation,pic_url  }) => {
  const [uname, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [address, setAddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [country, setCountry] = useState('');
  const [profilePic, setProfilePic] = useState(pic_url);

  const [gender, setGender] = useState('');
  const { user_Info } = useSelector(state => state.home);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  


  const handleEditProfilePhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });

      // Set the selected image URI to the state
      setProfilePic(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      const mid = user_Info?.mid;

      const formData = new FormData();
      formData.append('mid', mid);

      if (profilePic) {
        formData.append('pic_url', {
          uri: profilePic,
          type: 'image/jpeg',
          name: 'profile_pic.jpg',
        });
      }

      if (uname) {
        formData.append('uname', uname);
      }

      if (firstName) {
        formData.append('fname', firstName);
      }

      if (lastName) {
        formData.append('lname', lastName);
      }

      if (bio) {
        formData.append('bio', bio);
      }

      if (email) {
        formData.append('email', email);
      }

      if (mobileNo) {
        formData.append('phn', mobileNo);
      }

      if (gender) {
        formData.append('gender', gender);
      }

      if (address) {
        formData.append('address', address);
      }

      if (country) {
        formData.append('country', country);
      }

      if (zipcode) {
        formData.append('zipcode', zipcode);
      }

      const response = await axios.put(
        'https://apis.devcorps.in/edit_member_details_crm',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
          },
        }
      );

      console.log(response.data); // Log the API response

      toggleModal();
    } catch (error) {
      console.error('Error editing profile:', error);
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.profilePicContainer}>
          <TouchableOpacity onPress={handleEditProfilePhoto}>
            {/* Display the uploaded photo or the previous one */}
            <Image source={{ uri: profilePic || user_Info?.pic_url }} style={styles.profilePic} />
            <Text style={styles.editPhotoText}>Edit Photo</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.label}>Username</Text>
        <TextInput
  style={styles.input}
  placeholder={user_Info?.uname}
  placeholderTextColor={Colors.Gray}
  onChangeText={setUsername}
  value={uname} // Use the correct state value
/>
<Text style={styles.label}>First Name</Text>
<TextInput
  style={styles.input}
  placeholder={user_Info?.fname}
  placeholderTextColor={Colors.Gray}
  onChangeText={setFirstName}
  value={firstName} // Use the correct state value
/>
<Text style={styles.label}>Last Name</Text>
<TextInput
  style={styles.input}
  placeholder={user_Info?.lname}
  placeholderTextColor={Colors.Gray}
  onChangeText={setLastName}
  value={lastName} // Use the correct state value
/>
<Text style={styles.label}>Address</Text>

<TextInput
  style={styles.input}
  placeholder={user_Info?.address}
  placeholderTextColor={Colors.Gray}
  onChangeText={setAddress}
  value={address} />
<Text style={styles.label}>Country</Text>

<TextInput
  style={styles.input}
  placeholder={user_Info?.country}
  placeholderTextColor={Colors.Gray}
  onChangeText={setCountry}
  value={country} // Use the correct state value
/>
<Text style={styles.label}>Zipcode</Text>

<TextInput
  style={styles.input}
  placeholder={user_Info?.zipcode}
  placeholderTextColor={Colors.Gray}
  onChangeText={setZipcode}
  value={zipcode} // Use the correct state value
/>

<Text style={styles.label}>Bio</Text>
<TextInput
  numberOfLines={2}
  style={[styles.input, ]}
  placeholder={user_Info?.bio}
  placeholderTextColor={Colors.Gray}
  onChangeText={setBio}
  value={bio} // Use the correct state value
/>

<Text style={styles.label}>Email</Text>
<TextInput
  numberOfLines={2}
  style={[styles.input, { textAlign: 'left' }]}
  placeholder={user_Info?.email}
  placeholderTextColor={Colors.Gray}
  onChangeText={setEmail}
  value={email} // Use the correct state value
/>


<Text style={styles.label}>Mobile No.</Text>
<TextInput
  numberOfLines={2}
  style={[styles.input, { textAlign: 'left' }]}
  placeholder={user_Info?.phn}
  placeholderTextColor={Colors.Gray}
  onChangeText={setMobileNo}
  value={mobileNo} // Use the correct state value
/>

<Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Others" value="Others" />
        </Picker>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={[styles.loginButton]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, { borderColor: '#8fc743', borderWidth: 1 }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: Colors.White }]}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Profile Updated!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { toggleModal(); navigation.navigate('Profile'); }}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 50,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color:Colors.Black,
    backgroundColor:'#FFFFFF'
  },
  loginButton: {
    backgroundColor: '#488C20',
    
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
    alignSelf: 'center',
  },

  label: {color: Colors.Gray, marginTop: 15,fontWeight:'500'},

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPhotoText: {
    color: '#488C20',
    marginTop: 8,
    marginLeft:18
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#488C20',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfile;
