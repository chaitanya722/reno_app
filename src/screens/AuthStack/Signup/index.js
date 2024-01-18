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
  Alert,
} from 'react-native';
import Images from '../../../constants/Images';
import {vh, vw} from '../../../util/dimenstions';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {SIGN_UP} from '../../../services/ApiUrls';
import {Request_params} from '../../../services/postApi';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../store/actionTypes';
import {Formik} from 'formik';
import {signUpValidationSchema} from '../../../helper/Schema';
import Input from '../../../components/Input';
import {_dosignup} from '../../../store/auth/auth.actions';
import LoadingScreen from './LoadingScreen';

const SignUp = ({ navigation }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async (values) => {
    console.log('Submitting form with values:', values);

    try {
      let formdata = new FormData();
      formdata.append('uname', values.Name);
      formdata.append('pwd', values.Password);
      formdata.append('email', values.Email);
      formdata.append('phn', values.PhoneNumber);

      console.log('Form Data:', formdata);

      // Assuming _dosignup returns a promise
      await dispatch(_dosignup(formdata));

      // After successful signup, set isEmailVerified to false
      setIsEmailVerified(false);

      // Show loading screen or any UI indicating email verification
      // You can navigate to a loading screen or show a modal, etc.
      // For example:
      navigation.navigate('LoadingScreen');
    } catch (error) {
      // Handle signup error
      console.error('Signup Error:', error);
    }
  };

  useEffect(() => {
    // Simulate email verification after 3 seconds
    const verificationTimer = setTimeout(() => {
      setIsEmailVerified(true);
    }, 3000);

    return () => clearTimeout(verificationTimer);
  }, []);

  // Redirect based on email verification status
  useEffect(() => {
    if (isEmailVerified) {
      // Email is verified, navigate to the main content
      navigation.navigate('MainContent');
    }
  }, [isEmailVerified, navigation]);

  // Render the loading screen while email is being verified
  if (!isEmailVerified) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundImage} style={styles.image}>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
            <Icon name="arrow-back-outline" size={24} />
          </TouchableOpacity>
          <Image source={Images.logo} style={styles.logo} />

          <View style={styles.form}>
            <Text style={styles.text}>SIGN UP</Text>

            <Formik
              initialValues={{
                Name: '',
                Email: '',
                PhoneNumber: '',
                Password: '',
              }}
              validationSchema={signUpValidationSchema}
              onSubmit={(values) => {
                // doRegister(values);
                handleSignUp(values);
              }}>
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <Input
                    placeholder="User Name"
                    value={values.Name}
                    onChangeText={handleChange('Name')}
                    error={errors.Name && touched.Name && errors.Name}
                  />
                  <Input
                    placeholder="E-mail"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    error={errors.Email && touched.Email && errors.Email}
                  />
                  <Input
                    placeholder="Password"
                    value={values.Password}
                    onChangeText={handleChange('Password')}
                    error={errors.Password && touched.Password && errors.Password}
                  />
                  <Input
                    placeholder="Mobile Number"
                    value={values.PhoneNumber}
                    onChangeText={handleChange('PhoneNumber')}
                    error={
                      errors.PhoneNumber && touched.PhoneNumber && errors.PhoneNumber
                    }
                  />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WebViewPage', {
                        title: 'Terms & Condition',
                        url: url.PRIVACY_POLICY,
                      })
                    }
                    style={{ alignSelf: 'flex-start', marginVertical: 11 }}>
                    <Text style={{ fontSize: 12 }}>
                      By signing up, you agree to our{' '}
                      {
                        <Text style={{ color: '#88B347', fontSize: 12 }}>
                          Terms &
                        </Text>
                      }
                      {
                        <Text style={{ color: '#88B347', fontSize: 12 }}>
                          {' '}
                          Privacy Policy
                        </Text>
                      }{' '}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.loginButton, { backgroundColor: '#8fc743' }]}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={styles.orContainer}>
              <View style={styles.line} />

              <Text style={styles.font12gray}>OR</Text>

              <View
                style={{ flex: 0.6, height: 1, backgroundColor: '#dfdfdf' }}
              />
            </View>
            <TouchableOpacity
              style={[styles.loginButtonFacebook, { backgroundColor: '#3A589B' }]}
              onPress={() => handleFacebookLogin()}>
              <Text style={styles.buttonText}>Login with Facebook</Text>
            </TouchableOpacity>
            <View style={styles.alreadyAccount}>
              <Text style={styles.signinText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.clickableText}>Sign In</Text>
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
    alignSelf: 'center',
    height: vh(92),
    width: vw(174),
    marginTop: 20,
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
  line: { flex: 0.6, height: 1, backgroundColor: '#dfdfdf' },
  orText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  alreadyAccount: {
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
  backbtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default SignUp;