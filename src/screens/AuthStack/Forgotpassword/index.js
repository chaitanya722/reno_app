import React, {useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../../constants/Images';
import RoutePaths from '../../../Navigations/RoutePaths';

const Forgotpassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // // console.log("Login");
    // navigation.navigate("DrawerNavigator");
    console.log('password submit')
  };
 

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundImage} style={styles.image}>
        <ScrollView>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.form}>
            <Text style={styles.text}>FORGOT PASSWORD?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              onChangeText={setEmail}
              value={email}
            />
            <TouchableOpacity
              style={[styles.loginButton, {backgroundColor: '#8fc743'}]}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.alreadAccount}>
              <Text style={styles.signinText}>
                Back To
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(RoutePaths.login)}>
                  <Text style={styles.clickableText}> Login</Text>
                </TouchableOpacity>
        
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logo: {
    zIndex: 1,
    marginTop: 68,
    alignSelf: 'center',
    height:154,
    width:294

  },
  form: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: '#2b2b2b',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  checkAndForgotContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#8FC743', // Add your desired color for checked state
    borderWidth: 0,
  },
  label: {
    fontSize: 16,
  },
  forgotPwd: {
    color: '#0D99FF',
  },
  loginButtonFacebook: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  line: {flex: 0.6, height: 1, backgroundColor: '#dfdfdf'},
  orText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  alreadAccount: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginTop: 10,
  },
  signinText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  clickableText: {
    color: '#8FC743',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  buildings: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '75%',
    alignSelf: 'center',
  },
  font12gray: {
    fontSize: 12,
    color: '#aaa',
    margin: 10,
  },
});

export default Forgotpassword;
